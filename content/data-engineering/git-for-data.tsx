import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Git and Version Control for Data Projects — Data Engineering | Chaduvuko',
  description:
    'Git for data engineers — branching strategies, handling large files, dbt project workflows, CI/CD triggers, undoing mistakes safely, and the git commands every DE uses daily.',
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

interface TableRow { [key: string]: string }
interface CompareTableProps {
  headers: { label: string; color?: string }[]
  rows: TableRow[]
  keys: string[]
}

const CompareTable = ({ headers, rows, keys }: CompareTableProps) => (
  <div style={{ overflowX: 'auto', marginBottom: 28 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={h.label} style={{
              padding: '10px 16px', textAlign: 'left',
              fontSize: i === 0 ? 10 : 11, fontWeight: 700,
              letterSpacing: i === 0 ? '.12em' : '.06em',
              textTransform: 'uppercase',
              color: h.color ?? 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)',
              background: h.color ? `${h.color}08` : 'var(--bg2)',
              minWidth: i === 0 ? 130 : 160,
            }}>{h.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
            {keys.map((k, ki) => (
              <td key={k} style={{
                padding: '10px 16px',
                color: ki === 0 ? 'var(--muted)' : 'var(--text)',
                fontSize: ki === 0 ? 11 : 13,
                fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit',
                fontWeight: ki === 0 ? 700 : 400,
                textTransform: ki === 0 ? 'uppercase' : 'none',
                letterSpacing: ki === 0 ? '.06em' : 'normal',
                borderBottom: '1px solid var(--border)',
                borderLeft: ki > 0 && headers[ki]?.color
                  ? `2px solid ${headers[ki].color}40`
                  : ki > 0 ? '1px solid var(--border)' : 'none',
                verticalAlign: 'top',
              }}>{row[k]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function GitForDataModule() {
  return (
    <LearnLayout
      title="Git and Version Control for Data Projects"
      description="Branching strategies, large file handling, dbt workflows, CI/CD, and undoing mistakes safely."
      section="Data Engineering — Module 17"
      readTime="55 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 — Why Git for Data Engineers ─────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Git Is Not Optional" />
        <SectionTitle>Git for Data Engineers — More Than Just Committing Code</SectionTitle>

        <Para>
          Every data engineer uses Git daily. Not just for committing pipeline code —
          for managing dbt model changes that affect production dashboards, for
          triggering CI/CD pipelines that deploy Airflow DAGs, for reviewing SQL
          transformations before they hit the Gold layer (Bronze/Silver/Gold refers
          to the medallion architecture pattern — you&rsquo;ll learn this fully in Module
          30; for now, just know Gold is the final, most-refined layer), and for
          rolling back a bad deployment that broke a morning report.
        </Para>

        <Para>
          The Git knowledge most tutorials cover — add, commit, push — is the tip
          of what a data engineer needs. This module covers the patterns that
          actually appear in professional data engineering workflows: branching
          strategies for data projects, what to never commit, handling large data
          files, collaborative dbt workflows, and recovering safely from mistakes
          that happen in production.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 14,
          }}>
            Seven skills this module builds
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {[
              { num: '01', name: 'Core workflow', desc: 'The daily git commands every DE runs — staging, committing, branching, merging.' },
              { num: '02', name: 'Branching strategy', desc: 'GitHub Flow and trunk-based development for data projects.' },
              { num: '03', name: '.gitignore for data', desc: 'What to never commit — secrets, data files, generated outputs.' },
              { num: '04', name: 'Large files', desc: 'Git LFS for binary and large data assets.' },
              { num: '05', name: 'dbt workflows', desc: 'How dbt projects use git — model changes, PR reviews, CI runs.' },
              { num: '06', name: 'CI/CD triggers', desc: 'GitHub Actions that test and deploy on push.' },
              { num: '07', name: 'Undoing mistakes', desc: 'revert, reset, restore — which to use when.' },
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

        <TryThis>
          Open a repo you work in and run <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>git log --oneline -10</code>.
          For each commit, ask whether the message alone tells you why the change
          was made, not just what changed. Part 03&rsquo;s branching strategy exists
          specifically to make that answer consistently &ldquo;yes.&rdquo;
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 02 — Core Git Workflow ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Core Workflow" />
        <SectionTitle>The Core Git Workflow — What You Run Every Day</SectionTitle>

        <Para>
          Git&rsquo;s daily workflow is small — maybe ten commands used regularly. The
          key is understanding what each one actually does to your repository&rsquo;s
          state, not just memorising the syntax. Knowing the internal model
          prevents the mistakes that send people running to StackOverflow.
        </Para>

        <SubSubTitle>The three areas: working directory, staging, and repository</SubSubTitle>

        <CodeBox label="Git's three-area model — the mental model that explains everything">{`WORKING DIRECTORY          STAGING AREA             REPOSITORY
(what you edit)            (what will be committed)  (committed history)

orders_pipeline.py ──────── git add ──────────────► [staged snapshot]
                                                            │
                                                       git commit
                                                            │
                                                            ▼
                                                     [commit object]
                                                     in .git/objects/

git status         → shows difference between working dir and staging
git diff            → shows changes in working dir NOT yet staged
git diff --staged   → shows changes staged but NOT yet committed

The staging area (index) lets you craft commits precisely: you can stage
parts of a file, or stage some files but not others, choosing exactly
what goes into each commit.`}</CodeBox>

        <SubSubTitle>Setup, starting a project, and checking state</SubSubTitle>

        <CodeBox label="One-time config, cloning, and reading repository state">{`# SETUP (once per machine):
git config --global user.name "Sarah Mitchell"
git config --global user.email "sarah@company.com"
git config --global init.defaultBranch main

# STARTING A PROJECT:
git init                                       # initialise new repo
git clone git@github.com:org/repo.git          # clone via SSH (preferred)
git clone https://github.com/org/repo.git      # clone via HTTPS

# CHECKING STATE:
git status                        # what has changed? what is staged?
git status -s                     # short format: M=modified, A=added, ?=untracked
git diff                          # unstaged changes (working dir vs staging)
git diff --staged                 # staged changes (staging vs last commit)
git diff main..feature-branch     # difference between two branches
git log --oneline -20             # last 20 commits, one line each
git log --oneline --graph --all   # visual branch graph
git show abc1234                  # show a specific commit's changes`}</CodeBox>

        <SubSubTitle>Staging, committing, and remote operations</SubSubTitle>

        <CodeBox label="Getting changes into a commit, and moving commits to/from the remote">{`# STAGING AND COMMITTING:
git add models/silver/orders.sql       # stage specific file
git add -p                             # interactive staging: choose hunks to stage
                                       # (the most powerful add option)
git commit -m "feat: add orders deduplication in Silver layer"
git commit --amend -m "fix: correct commit message"
# --amend: modify the LAST commit (only before pushing!)

# Conventional commit prefixes (industry standard):
# feat: new feature   fix: bug fix   refactor: no behaviour change
# test: test changes  docs: docs only   chore: maintenance   ci: CI config

# REMOTE OPERATIONS:
git remote -v                          # show configured remotes
git fetch origin                       # download remote changes, do NOT merge
git pull origin main                   # fetch + merge (or rebase if configured)
git pull --rebase origin main          # fetch + rebase (cleaner history)
git push origin feature/orders-dedup   # push branch to remote
git push -u origin feature/orders-dedup  # push and set upstream tracking`}</CodeBox>

        <SubSubTitle>Creating, switching, and merging branches</SubSubTitle>

        <CodeBox label="The daily branch operations">{`# CREATING AND SWITCHING:
git branch                             # list local branches (* = current)
git switch -c feature/customer-metrics # create AND switch (most common)

# Always branch from the latest main:
git switch main
git pull origin main
git switch -c feature/orders-backfill

# MERGING:
git switch main
git merge feature/orders-backfill          # merge feature into main
git merge --no-ff feature/orders-backfill  # force a merge commit (preserves history)
git merge --squash feature/orders-backfill # squash all commits into one`}</CodeBox>

        <SubSubTitle>Rebasing, deleting branches, and stashing</SubSubTitle>

        <CodeBox label="Replaying commits, cleanup, and saving work in progress without committing">{`# REBASING — replays your commits on top of another branch (linear history):
git switch feature/orders-backfill
git rebase main          # replay feature commits on top of latest main
                         # if conflicts: fix, then git rebase --continue
                         # to abort:     git rebase --abort

# RULE: never rebase commits that have been pushed to a shared branch.
# Rebasing rewrites history — safe on your local feature branch, dangerous
# on main or any branch others have pulled.

# DELETING BRANCHES:
git branch -d feature/orders-backfill     # delete (safe — refuses if unmerged)
git push origin --delete feature/orders-backfill  # delete remote branch

# STASHING — save work in progress without committing:
git stash push -m "WIP: orders backfill logic"   # stash with a name
git stash list                    # list all stashes
git stash pop                     # apply most recent stash and remove it`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — Branching Strategy ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Branching Strategy" />
        <SectionTitle>Branching Strategies — What Works for Data Projects</SectionTitle>

        <Para>
          Software engineering teams have well-established branching strategies —
          Git Flow, GitHub Flow, trunk-based development. Data engineering projects
          have specific needs that influence which strategy works best: dbt model
          changes that affect multiple downstream consumers, pipelines that must not
          break overnight runs, and data quality that cannot be &ldquo;rolled back&rdquo; the
          way application code can.
        </Para>

        <SubTitle>GitHub Flow — the standard for data teams</SubTitle>

        <Para>
          GitHub Flow is the most widely used branching strategy for data engineering
          teams. It is simple: one protected main branch, short-lived feature branches,
          pull requests for review, and merge to main only after CI passes. Every
          merge to main triggers a deployment.
        </Para>

        <SubSubTitle>Steps 1-4 — branch, commit small, push, open the PR</SubSubTitle>

        <CodeBox label="GitHub Flow for a dbt data project — the first half of the workflow">{`1. MAIN IS ALWAYS DEPLOYABLE
   main branch = what is running in production right now
   Never commit directly to main — it is branch-protected
   Every push to main automatically deploys (via CI/CD)

2. CREATE A FEATURE BRANCH FOR EVERY CHANGE
   git switch main && git pull origin main
   git switch -c feat/add-customer-ltv-model
   # Branch naming: feat/..., fix/..., refactor/..., hotfix/...

3. MAKE SMALL, FOCUSED COMMITS
   git add models/gold/customer_ltv.sql
   git commit -m "feat: add customer lifetime value Gold model"
   git add tests/gold/customer_ltv.yml
   git commit -m "test: add not_null and positive_value tests for LTV"
   # Why small commits? Easier to review, easier to revert, easier to bisect.

4. PUSH AND OPEN A PULL REQUEST
   git push -u origin feat/add-customer-ltv-model
   # PR description should include: what changed and why, tests added,
   # how to verify the output, and any downstream impact.`}</CodeBox>

        <SubSubTitle>Steps 5-8 — CI, review, merge, deploy</SubSubTitle>

        <CodeBox label="GitHub Flow — the second half of the workflow">{`5. CI RUNS AUTOMATICALLY ON PUSH
   # dbt compile (SQL is valid), dbt test on changed models
   # (data quality checks pass), sqlfluff lint (SQL style)
   # If CI fails, fix before requesting review

6. CODE REVIEW
   # At least one other data engineer checks: is the SQL logic correct?
   # Are edge cases (NULLs, duplicates) handled? Are tests comprehensive?
   # Is naming consistent with existing conventions?

7. SQUASH AND MERGE (or merge commit)
   # Most data teams squash feature branch commits into one:
   # "feat: add customer lifetime value Gold model (#47)"

8. DEPLOY
   # Merge to main → CI runs dbt run + dbt test in production
   # If tests fail in production → revert the merge immediately`}</CodeBox>

        <SubTitle>Trunk-based development — for experienced teams</SubTitle>

        <Para>
          Trunk-based development is an even simpler strategy: everyone commits
          directly to main (or short-lived branches merged within a day). It
          requires strong CI that catches problems before they reach production,
          and feature flags for work-in-progress that should not yet be visible.
          It produces the cleanest possible history and eliminates long-lived
          branches that become hard to merge.
        </Para>

        <CompareTable
          headers={[
            { label: 'Dimension' },
            { label: 'GitHub Flow', color: '#00e676' },
            { label: 'Trunk-Based', color: '#7b61ff' },
            { label: 'Git Flow', color: '#f97316' },
          ]}
          keys={['dim', 'github', 'trunk', 'gitflow']}
          rows={[
            { dim: 'Branch lifetime', github: 'Days to a week', trunk: 'Hours to a day', gitflow: 'Weeks (feature branches)' },
            { dim: 'Complexity', github: 'Low — easy to learn', trunk: 'Very low', gitflow: 'High — many branch types' },
            { dim: 'CI requirement', github: 'Strong CI needed', trunk: 'Very strong CI needed', gitflow: 'Moderate' },
            { dim: 'Release control', github: 'Continuous deployment', trunk: 'Continuous deployment', gitflow: 'Scheduled releases' },
            { dim: 'Best for data teams', github: '✓ Most common choice', trunk: 'Experienced teams only', gitflow: 'Not recommended — too complex for data' },
            { dim: 'Merge conflicts', github: 'Occasional (short branches)', trunk: 'Rare (branches merge same day)', gitflow: 'Frequent (long-lived branches diverge)' },
          ]}
        />

        <Callout type="tip">
          <strong>For most data engineering teams:</strong> start with GitHub Flow.
          It is simple enough to teach a junior engineer in 30 minutes, provides
          enough structure to protect production, and is what the majority of
          tech companies use for their data teams. Add trunk-based
          development only when the team has strong automated testing and
          experienced engineers comfortable with continuous deployment.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 — .gitignore for Data Projects ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — .gitignore" />
        <SectionTitle>.gitignore — What Never Goes Into a Data Repository</SectionTitle>

        <Para>
          The .gitignore file lists files and patterns that git should never track.
          For data projects, the consequences of committing the wrong things range
          from annoying (large binary files that bloat the repository forever) to
          catastrophic (secrets that give attackers access to production databases).
        </Para>

        <SubSubTitle>Secrets and raw data files</SubSubTitle>

        <CodeBox label="The two highest-stakes categories">{`# ── SECRETS — never commit these ──────────────────────────────────────────
.env                    # local environment variables (DB passwords, API keys)
.env.*                  # .env.local, .env.production, etc.
*.pem                   # SSH private keys
*.key                   # private keys
*_credentials.json      # GCP / AWS credential files
profiles.yml            # dbt profiles (contains DB connection strings!)
                        # EXCEPTION: profiles.yml.example (template, no real values)

# ── DATA FILES — data does not belong in git ──────────────────────────────
*.csv
*.parquet
*.json.gz
data/
raw/
output/
# EXCEPTION: small fixture/seed files used in tests (< 1 MB)
# Unignore with: !tests/fixtures/small_sample.csv`}</CodeBox>

        <SubSubTitle>Generated outputs, Python, and notebooks</SubSubTitle>

        <CodeBox label="Everything that gets rebuilt automatically">{`# ── GENERATED OUTPUTS — rebuilt by running the pipeline ───────────────────
target/                 # dbt compiled SQL and run artifacts
dbt_packages/           # dbt dependencies (like node_modules)
logs/
*.log

# ── PYTHON ──────────────────────────────────────────────────────────────
__pycache__/
*.py[cod]
.venv/
venv/
.pytest_cache/
.coverage
.mypy_cache/
.ruff_cache/

# ── JUPYTER NOTEBOOKS — output cells can contain data ─────────────────────
# Option 1: ignore all notebooks (*.ipynb)
# Option 2: commit notebooks but strip outputs first:
#   pip install nbstripout && nbstripout --install
.ipynb_checkpoints/`}</CodeBox>

        <SubSubTitle>OS/editor files, Airflow, Terraform, and checking your work</SubSubTitle>

        <CodeBox label="The remaining categories, and how to verify your .gitignore is working">{`.DS_Store
Thumbs.db
.idea/
.vscode/settings.json   # personal settings (commit .vscode/extensions.json instead)

# ── AIRFLOW ──────────────────────────────────────────────────────────────
airflow.db              # local SQLite Airflow database
airflow-webserver.pid

# ── TERRAFORM ────────────────────────────────────────────────────────────
*.tfstate
.terraform/
*.tfvars                # may contain secrets

# ── CHECKING WHAT WOULD BE IGNORED ────────────────────────────────────────
git check-ignore -v filename                 # why is this file being ignored?
git ls-files --ignored --exclude-standard    # list all ignored files`}</CodeBox>

        <SubTitle>What happens when you accidentally commit a secret</SubTitle>

        <Para>
          Committing a secret to a git repository — even briefly, even to a private
          repo — is a serious security incident. Git history is permanent; deleting
          the file does not remove it from history. Anyone who cloned the repo before
          the deletion still has it. GitHub&rsquo;s secret scanning will flag it. If the
          repo is ever made public, the secret is exposed.
        </Para>

        <SubSubTitle>Step 1-2 — rotate the secret, then rewrite history</SubSubTitle>

        <CodeBox label="Immediate rotation, then removing the secret from every commit">{`# SITUATION: you committed a .env file with a real API key

# STEP 1: Immediately rotate/revoke the secret
# Go to Stripe/AWS/GCP console and revoke the leaked key RIGHT NOW.
# Rotation takes 2 minutes; remediation takes 2 hours — do it first.

# STEP 2: Remove from history
pip install git-filter-repo
git filter-repo --path .env --invert-paths
# This rewrites ALL history, removing .env from every commit
# (BFG Repo Cleaner is a faster alternative for large repos)`}</CodeBox>

        <SubSubTitle>Step 3-4 — force push, notify, and prevent recurrence</SubSubTitle>

        <CodeBox label="Completing the cleanup and closing the gap for next time">{`# STEP 3: Force push (coordinate with team first!)
git push origin --force --all
git push origin --force --tags

# STEP 4: Notify all collaborators — everyone who cloned the repo must
# re-clone, since their local .git/objects still has the secret.

# PREVENT RECURRENCE:
# 1. Add .env to .gitignore (and commit the .gitignore)
# 2. Add a pre-commit secret scanner:
#    pip install detect-secrets
#    detect-secrets scan > .secrets.baseline
# 3. Enable GitHub secret scanning in repo settings
# 4. Use git-secrets or gitleaks in pre-commit hooks`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Large Files and Git LFS ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Large Files" />
        <SectionTitle>Large Files — Git LFS and What Belongs in Object Storage</SectionTitle>

        <Para>
          Git is designed for text files — code, SQL, YAML, Markdown. It handles
          binary and large files poorly. A 100 MB Parquet file committed to a
          repository adds 100 MB permanently — even after you delete it from the
          working tree, it remains in the repository history, making every clone
          and fetch download that data forever.
        </Para>

        <Para>
          The rule for data engineering: data files (CSV, Parquet, JSON exports,
          model artifacts) belong in object storage (S3, ADLS, GCS), not in Git.
          Git tracks the code that produces the data, not the data itself.
        </Para>

        <SubTitle>Git LFS — for the large binary files that do belong in the repo</SubTitle>

        <Para>
          Some large files legitimately belong in a repository — ML model weights
          checked in alongside the code that uses them, reference datasets used in
          tests, documentation assets. Git Large File Storage (LFS) handles these
          by replacing the large file in git history with a small pointer file,
          while storing the actual content on an LFS server.
        </Para>

        <SubSubTitle>Setup, tracking, and using LFS</SubSubTitle>

        <CodeBox label="Enabling LFS and tracking file types">{`git lfs install                      # enable LFS (once per machine)

git lfs track "*.parquet"            # track all .parquet files with LFS
git lfs track "*.pkl"                # track model pickle files

# The above commands update .gitattributes:
cat .gitattributes
# *.parquet filter=lfs diff=lfs merge=lfs -text

# IMPORTANT: commit .gitattributes to the repo
git add .gitattributes
git commit -m "chore: configure Git LFS for binary files"

# After tracking is configured, git add/commit works normally:
git add tests/fixtures/sample_orders.parquet
git commit -m "test: add 50k row sample fixture for integration tests"
git push origin main
# → LFS stores the large file on the LFS server
# → Git history contains only a 134-byte pointer file`}</CodeBox>

        <SubSubTitle>Checking LFS status, and where LFS stops being the right tool</SubSubTitle>

        <CodeBox label="LFS limits, and what belongs in object storage instead">{`git lfs ls-files           # list files currently managed by LFS
git lfs status             # LFS status of working directory

# LFS LIMITS: GitHub Free gives 1 GB LFS storage + 1 GB bandwidth/month.
# For data engineering: LFS is for files under ~500 MB.
# Anything larger → object storage (S3/ADLS) + reference by URL.

# WHAT NEVER USES LFS (goes to object storage instead):
# Production data files (terabytes of Parquet), pipeline outputs,
# archived historical data, ML training datasets.
# → Reference these in your pipeline config as S3/ADLS paths —
#   never check the files themselves into git.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — dbt Git Workflows ──────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — dbt Git Workflows" />
        <SectionTitle>dbt Project Git Workflows — How the Industry Does It</SectionTitle>

        <Para>
          dbt (data build tool) is the most widely adopted transformation layer
          in modern data stacks. A dbt project is a git repository. Every model
          change is a code change that can be reviewed, tested, and deployed
          through git. The dbt + git workflow is one of the things that transformed
          data engineering from ad-hoc SQL scripts to professional software
          engineering practice.
        </Para>

        <SubSubTitle>The dbt project structure in git</SubSubTitle>

        <CodeBox label="dbt project git structure — what goes where">{`freshcart_dbt/                    # git repository root
├── .gitignore                    # includes target/, dbt_packages/, logs/
├── .github/workflows/
│   ├── ci.yml                    # run dbt compile + test on PR
│   └── deploy.yml                # run dbt run + test on merge to main
├── dbt_project.yml               # project config (committed)
├── profiles.yml.example          # TEMPLATE — no real credentials (committed)
│                                 # actual profiles.yml is gitignored
├── models/
│   ├── staging/                  # stg_ models: raw → typed
│   ├── intermediate/             # int_ models: business logic
│   ├── marts/                     # fct_/dim_ prefixes follow dimensional modeling
│   │                              # conventions (covered fully in Module 33)
│   │   ├── core/dim_customers.sql       # dim_ = dimension/lookup table
│   │   └── finance/fct_orders.sql       # fct_ = fact/transaction table
│   └── _schema.yml               # model documentation + tests (committed)
├── seeds/                        # small reference CSVs (committed — these are code)
│   └── store_mapping.csv         # 10-row mapping table, fine in git
└── snapshots/                    # SCD2 snapshot definitions

# WHAT IS gitignored: target/, dbt_packages/, logs/, profiles.yml`}</CodeBox>

        <SubTitle>The dbt PR workflow — step by step</SubTitle>

        <SubSubTitle>Steps 1-5 — branch, build, test locally, commit</SubSubTitle>

        <CodeBox label="Adding a new customer lifetime value model to the Gold layer">{`# Step 1: Branch from latest main
git switch main && git pull origin main
git switch -c feat/customer-ltv-gold-model

# Step 2: Create the model — models/marts/finance/fct_customer_ltv.sql

# Step 3: Add schema.yml entry with tests
# models:
#   - name: fct_customer_ltv
#     columns:
#       - name: customer_id
#         tests: [not_null, unique]
#       - name: total_revenue
#         tests: [not_null, {dbt_utils.accepted_range: {min_value: 0}}]

# Step 4: Test locally before committing
dbt compile -s fct_customer_ltv              # check SQL compiles
dbt run -s fct_customer_ltv --target dev     # run against dev database
dbt test -s fct_customer_ltv --target dev    # run data quality tests

# Step 5: Commit with a clear message
git add models/marts/finance/fct_customer_ltv.sql models/marts/finance/_schema.yml
git commit -m "feat: add customer lifetime value fact model

- Aggregates total revenue, order count, and first/last order date
- Used by Finance dashboard LTV widget"`}</CodeBox>

        <SubSubTitle>Steps 6-10 — push, review, merge, verify</SubSubTitle>

        <CodeBox label="The rest of the workflow, from PR to production verification">{`# Step 6: Push and open PR
git push -u origin feat/customer-ltv-gold-model

# Step 7: CI runs automatically (dbt compile + test)

# Step 8: Reviewer checks:
# - Does the SQL handle NULLs correctly?
# - Are there tests for the new columns?
# - Does it join to the correct Silver tables?
# - Does dbt docs show correct lineage?

# Step 9: Merge and deploy
# Squash and merge → triggers deploy.yml → dbt run + test in production

# Step 10: Verify in production
dbt run -s fct_customer_ltv --target prod
dbt test -s fct_customer_ltv --target prod`}</CodeBox>

        <SubTitle>Handling breaking changes in dbt</SubTitle>

        <CodeBox label="A backward-compatible column rename, staged across separate commits">{`# BREAKING CHANGE: orders.total_amount is used in 12 downstream models.
# Renaming it directly breaks all 12 at once. Instead:

# Step 1: add the new column alongside the old one
#   SELECT order_amount AS order_revenue,   -- new name
#          order_amount AS total_amount,    -- OLD name kept for transition
git commit -m "feat: add order_revenue column (deprecating total_amount)"

# Step 2: announce deprecation in schema.yml
#   - name: total_amount
#     description: "DEPRECATED — use order_revenue instead. Removed 2026-04-01."

# Step 3: update all 12 downstream models, each in its own reviewed PR

# Step 4: once every consumer is updated, remove the old column
git commit -m "breaking: remove deprecated total_amount column from fct_orders

All downstream models have been updated to use order_revenue.
Verified in production on 2026-03-31."

# WHY GIT MAKES THIS SAFE: each step is a separate, revertible commit —
# the transition is visible in history, and any step can be rolled back
# independently with git revert.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — CI/CD with GitHub Actions ─────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — CI/CD" />
        <SectionTitle>CI/CD with GitHub Actions — Automated Testing and Deployment</SectionTitle>

        <Para>
          CI (Continuous Integration) automatically runs tests when code is pushed.
          CD (Continuous Deployment) automatically deploys when tests pass on the
          main branch. Together they ensure that only tested, reviewed code reaches
          production — and they run without anyone remembering to trigger them.
        </Para>

        <Para>
          GitHub Actions is the standard CI/CD tool for repositories hosted on
          GitHub. Every action is defined in a YAML file in{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>.github/workflows/</code>.
          These files are committed to the repository and version-controlled like
          any other code.
        </Para>

        <SubSubTitle>The CI workflow — trigger and setup</SubSubTitle>

        <CodeBox label=".github/workflows/ci.yml — runs on every PR, validates dbt compiles">{`name: dbt CI
on:
  pull_request:
    branches: [main]
    paths: ['models/**', 'tests/**', 'macros/**', 'dbt_project.yml']

jobs:
  dbt-ci:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: |
          pip install dbt-snowflake==1.8.0
          dbt deps`}</CodeBox>

        <SubSubTitle>Writing profiles with per-run isolation</SubSubTitle>

        <CodeBox label="Each CI run gets its own schema — no cross-run contamination">{`      - name: Write dbt profiles
        run: |
          mkdir -p ~/.dbt
          cat > ~/.dbt/profiles.yml << 'PROFILES'
          freshcart:
            target: ci
            outputs:
              ci:
                type: snowflake
                account: \${{ secrets.SNOWFLAKE_ACCOUNT }}
                user: \${{ secrets.SNOWFLAKE_CI_USER }}
                password: \${{ secrets.SNOWFLAKE_CI_PASSWORD }}
                database: FRESHCART_CI
                schema: dbt_ci_\${{ github.run_id }}
          PROFILES
        # Each CI run gets its own schema — deleted at end of job`}</CodeBox>

        <SubSubTitle>Compile, test only what changed, and clean up</SubSubTitle>

        <CodeBox label="State-based selection keeps CI fast, and cleanup always runs">{`      - name: dbt compile
        run: dbt compile --target ci
        # Catches SQL syntax errors before running anything

      - name: dbt run (changed models only)
        run: dbt run --target ci --select state:modified+ --defer --state ./prod-manifest
        # state:modified+: only run models that changed and their downstream deps
        # --defer: use production results for unmodified upstream models

      - name: dbt test (changed models only)
        run: dbt test --target ci --select state:modified+ --defer --state ./prod-manifest

      - name: Cleanup CI schema
        if: always()   # run even if previous steps failed
        run: dbt run-operation drop_schema --args '{schema: dbt_ci_\${{ github.run_id }}}'`}</CodeBox>

        <SubSubTitle>The production deployment workflow</SubSubTitle>

        <CodeBox label=".github/workflows/deploy.yml — runs when a PR merges to main">{`name: dbt Deploy
on:
  push:
    branches: [main]

jobs:
  dbt-deploy:
    runs-on: ubuntu-latest
    environment: production   # requires manual approval in GitHub settings
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.11' }
      - run: |
          pip install dbt-snowflake==1.8.0
          dbt deps
      - name: Write production profiles
        run: |
          mkdir -p ~/.dbt
          cat > ~/.dbt/profiles.yml << 'PROFILES'
          freshcart:
            target: prod
            outputs:
              prod:
                type: snowflake
                account: \${{ secrets.SNOWFLAKE_ACCOUNT }}
                user: \${{ secrets.SNOWFLAKE_PROD_USER }}
                password: \${{ secrets.SNOWFLAKE_PROD_PASSWORD }}
                database: FRESHCART_PROD
          PROFILES`}</CodeBox>

        <SubSubTitle>Running the deploy, and alerting on failure</SubSubTitle>

        <CodeBox label="dbt run + test in production, with a Slack alert if either fails">{`      - name: dbt run
        run: dbt run --target prod
      - name: dbt test
        run: dbt test --target prod

      - name: Notify on failure
        if: failure()
        run: |
          curl -s -X POST \${{ secrets.SLACK_WEBHOOK }} \\
            -H 'Content-type: application/json' \\
            -d '{"text": ":red_circle: dbt deploy failed on main — check GitHub Actions"}'

      - name: Generate and upload docs
        if: success()
        run: dbt docs generate --target prod`}</CodeBox>

        <SubTitle>GitHub Actions for Python pipelines</SubTitle>

        <CodeBox label=".github/workflows/pipeline-tests.yml — lint, type-check, test with coverage">{`name: Pipeline Tests
on:
  pull_request:
    paths: ['pipelines/**', 'tests/**', 'requirements*.txt']

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.11' }
      - name: Cache pip dependencies
        uses: actions/cache@v4
        with:
          path: ~/.cache/pip
          key: \${{ runner.os }}-pip-\${{ hashFiles('requirements.txt') }}
      - run: pip install -r requirements.txt -r requirements-dev.txt
      - name: Lint and type-check
        run: |
          ruff check pipelines/ tests/
          mypy pipelines/ --ignore-missing-imports
      - name: Run unit tests with coverage
        run: pytest tests/unit/ --cov=pipelines --cov-report=xml --cov-fail-under=80 -v`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Undoing Mistakes ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Undoing Mistakes" />
        <SectionTitle>Undoing Mistakes — The Right Tool for Each Situation</SectionTitle>

        <Para>
          Every data engineer eventually needs to undo something in git. The key
          is choosing the right undo command for each situation — using the wrong
          one can make a bad situation worse, especially when working on a shared
          branch that others have already pulled.
        </Para>

        <Para>
          The fundamental rule: commands that rewrite history (reset, amend,
          rebase) are safe on your local branches and dangerous on shared branches.
          Commands that add new commits (revert) are always safe on shared branches.
        </Para>

        <SubSubTitle>git revert — safe on shared branches</SubSubTitle>

        <CodeBox label="Adds a new commit that undoes a previous one, history intact">{`git revert abc1234            # create a new commit that reverses abc1234
git revert HEAD               # revert the most recent commit

# Example: a bad model was deployed to production
# git log --oneline shows:
# f8a3b2c  feat: update customer LTV formula ← this is wrong
# abc1234  feat: add store revenue model

git revert f8a3b2c            # creates: "Revert feat: update customer LTV formula"
git push origin main          # safe to push — history is intact`}</CodeBox>

        <SubSubTitle>git reset — rewrites history, local-only</SubSubTitle>

        <CodeBox label="Three modes, from softest to most destructive">{`# NEVER use on a shared branch that others have pulled.
git reset --soft HEAD~1       # undo last commit, KEEP changes staged
                              # use to: re-commit with a different message

git reset --mixed HEAD~1      # undo last commit, KEEP changes unstaged (default)

git reset --hard HEAD~1       # undo last commit, DISCARD all changes
                              # DESTRUCTIVE: changes are gone`}</CodeBox>

        <SubSubTitle>git restore, and the decision tree</SubSubTitle>

        <CodeBox label="Discarding working-directory changes, and choosing the right tool">{`git restore orders.sql           # discard all unstaged changes to orders.sql
git restore --staged orders.sql  # unstage a file (keep changes in working dir)

# DECISION TREE:
# Has the commit been pushed to a shared branch?
#   YES → git revert (adds new commit, history preserved)
#   NO  → git reset --soft/--mixed/--hard, depending on what to keep
# Just want to discard file changes (not commits)? → git restore filename
# Accidentally staged a file? → git restore --staged filename`}</CodeBox>

        <SubSubTitle>git reflog — the safety net for everything</SubSubTitle>

        <CodeBox label="Recovering commits that a reset --hard appeared to destroy">{`git reflog                    # show all recent HEAD positions
# f8a3b2c (HEAD -> main) HEAD@{0}: commit: feat: update LTV formula
# 9f8e7d6 HEAD@{2}: reset: moving to HEAD~1   ← you reset here
# 1b2c3d4 HEAD@{3}: commit: fix: correct NULL handling  ← this was "lost"

# Recover the "lost" commit after a reset --hard:
git reset --hard 1b2c3d4      # go back to the state before the reset
# or: git checkout -b recovery-branch 1b2c3d4

# reflog entries expire after 90 days by default`}</CodeBox>

        <SubSubTitle>git cherry-pick — moving one commit to another branch</SubSubTitle>

        <CodeBox label="Applying a specific commit without merging the whole branch">{`# SCENARIO: a critical bug fix was committed on feature/orders-fix but
# needs to be deployed to main NOW without waiting for the full PR

git switch main
git cherry-pick abc1234        # apply commit abc1234 to main
git push origin main           # deploy the fix

git cherry-pick --no-commit abc1234   # applies changes but does not commit
git status                            # review what was applied
git commit -m "hotfix: cherry-pick orders fix from feature branch"`}</CodeBox>

        <Output>{`COMMON RECOVERY SCENARIOS:

"I committed to main instead of my feature branch"
  git reset --soft HEAD~1 && git switch -c fix/my-feature && git commit -m "..."

"I pushed a broken commit to main and need to revert urgently"
  git revert bad_commit_hash && git push origin main

"I accidentally deleted a branch"
  git reflog | grep feat/deleted-branch
  git checkout -b feat/deleted-branch recovered_hash`}</Output>
      </section>

      <Divider />

      {/* ── Part 09 — Git for Collaboration ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Collaboration Patterns" />
        <SectionTitle>Collaboration — Pull Requests, Code Review, and Conflict Resolution</SectionTitle>

        <SubSubTitle>Writing a PR description that gets reviewed quickly</SubSubTitle>

        <CodeBox label="The sections a good data engineering PR always includes">{`Title: feat: add daily store revenue Gold model (#47)

## What
Adds gold.daily_store_revenue — aggregates delivered order revenue per
store per day, with 7-day moving averages and month-to-date totals.

## Why
Powers the FreshCart Revenue Dashboard. Currently a direct 4-minute
Snowflake query — this pre-aggregated model reduces it to <1 second.

## Changes
- models/marts/finance/daily_store_revenue.sql (new)
- models/marts/finance/_schema.yml (updated — new model + tests)

## How to verify
dbt run -s daily_store_revenue --target dev
SELECT * FROM dev.daily_store_revenue WHERE order_date = '2026-03-17' LIMIT 10
Expected: 10 rows (one per store), all revenue values > 0

## Downstream impact
The Revenue Dashboard will use this model once deployed. No existing
models reference it.`}</CodeBox>

        <SubSubTitle>Reviewing a data engineering PR</SubSubTitle>

        <CodeBox label="The four things every review should check">{`1. CORRECTNESS
   Does the SQL logic match the description? Are NULLs handled explicitly?
   Could the JOINs produce duplicates? Are edge cases handled?

2. PERFORMANCE
   Does it filter early (before JOINs)? Correlated subqueries that should
   be JOINs? For Snowflake: does it filter on the clustering key?

3. TESTS
   not_null on required columns? unique on grain columns? relationship
   tests for FK columns?

4. NAMING AND CONVENTIONS
   snake_case columns? Correct model prefix (stg_/int_/fct_/dim_)?
   Schema.yml documentation for all new columns?`}</CodeBox>

        <SubTitle>Resolving merge conflicts</SubTitle>

        <SubSubTitle>The conflict markers, and choosing the resolution</SubSubTitle>

        <CodeBox label="What a conflict looks like, and how to resolve it">{`git merge feature/orders-fix
# CONFLICT (content): Merge conflict in models/silver/orders.sql

# In the conflicted file:
#  WITH base AS (SELECT * FROM raw.orders
# <<<<<<< HEAD (main branch version)
#      WHERE status IN ('placed', 'confirmed', 'delivered', 'cancelled')
# =======
#      WHERE status IN ('placed', 'confirmed', 'delivered', 'cancelled', 'refunded')
# >>>>>>> feature/orders-fix (incoming branch version)
#  )

# <<<<<<< HEAD: your current branch's version. =======: separator.
# >>>>>>> branch: the incoming branch's version.
# Choose which to keep (or write a new version combining both), then:
git add models/silver/orders.sql    # mark as resolved
git commit                          # complete the merge`}</CodeBox>

        <SubSubTitle>Merge tools, aborting, and preventing conflicts up front</SubSubTitle>

        <CodeBox label="Escape hatches, and the habits that keep conflicts rare">{`git mergetool                       # opens a configured visual merge tool
git merge --abort                   # abandon the merge, go back to pre-merge state

# PREVENTING CONFLICTS:
# 1. Keep feature branches short-lived (< 1 week)
# 2. Pull and rebase frequently: git pull --rebase origin main
# 3. Communicate if two people need the same file
# 4. One dbt model per file — conflicts are per-file, so isolated files
#    mean isolated changes`}</CodeBox>
      </section>

      <Divider />

      {/* ── Misconceptions ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Git for Data Engineering</SectionTitle>

        {[
          {
            wrong: '"Deleting a committed secret file in a new commit removes it from the repository"',
            right: 'Part 04 is explicit that git history is permanent — a later commit that deletes a file leaves the secret fully intact and retrievable in every earlier commit. The only real fix is rewriting history with git filter-repo (or BFG), and the very first step, before touching git at all, is rotating the credential.',
          },
          {
            wrong: '"git reset is a generally safe way to undo a commit, same as git revert"',
            right: 'Part 08 draws a hard line here: reset rewrites history and is only safe on commits nobody else has pulled, while revert adds a new commit and is always safe on a shared branch. This module\'s Real World incident and Error Library both exist specifically to reinforce which one is correct on main.',
          },
          {
            wrong: '"dbt_packages/ and target/ should be committed so CI doesn\'t need to rebuild them"',
            right: 'Part 06 is explicit that these are generated, not source — like node_modules, they\'re rebuilt from dbt_project.yml and packages.yml by dbt deps. This module\'s Error Library shows exactly what happens when a CI workflow skips that step: dbt deps failing with a missing-package error because nothing installed it first.',
          },
          {
            wrong: '"Renaming a widely-used dbt column is safe as long as you update the SQL correctly"',
            right: 'Part 06\'s breaking-change section is built around the actual risk: even a perfectly correct rename breaks every one of the 12 downstream models simultaneously the moment it merges. The staged migration (add the new column, deprecate the old one, migrate consumers, then remove it) is what keeps that from becoming a production incident.',
          },
          {
            wrong: '"CI running the full dbt project on every PR is just how dbt CI works"',
            right: 'Part 07 shows the alternative that most production CI setups actually use — state:modified+ with --defer runs only the changed models and their downstream dependencies against a production manifest, turning a 30-minute full run into a sub-5-minute one for a typical single-model PR.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 10 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 10 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Bad Deployment and a Safe Recovery — Using Git Correctly</SectionTitle>

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
            Scenario — FreshCart · Finance team raises alarm at 09:15 AM
          </div>

          <Para>
            A colleague merged a PR at 8:55 AM that refactored the
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> fct_orders</code> model.
            The merge triggered the deploy CI which ran dbt — all tests passed.
            At 9:15 AM the finance team calls: &ldquo;The revenue dashboard shows zero
            for March 17th. Something is wrong.&rdquo;
          </Para>

          <SubSubTitle>Step 1 — identify the bad commit</SubSubTitle>

          <CodeBox label="Finding what changed, and spotting the exact bug">{`git log --oneline -5
# f8a3b2c  (HEAD -> main) refactor: simplify fct_orders CTE chain (#52)
# abc1234  feat: add store_tier dimension (#51)

git show f8a3b2c -- models/marts/finance/fct_orders.sql
# Shows the diff — you spot it immediately:
# -  WHERE o.status = 'delivered'
# +  WHERE o.status = 'complete'
# The status value was changed to 'complete', which does not exist —
# zero rows match.`}</CodeBox>

          <SubSubTitle>Steps 2-6 — revert, deploy, verify, and fix properly</SubSubTitle>

          <CodeBox label="The full recovery, from revert to re-opening the PR with a fix">{`# Step 2: Revert immediately (do NOT reset — this is shared main)
git revert f8a3b2c --no-edit
# Creates: Revert "refactor: simplify fct_orders CTE chain (#52)"

# Step 3: Push the revert — this triggers another deploy
git push origin main

# Step 4: Monitor CI — deploy runs dbt run + test, tests pass, deploy succeeds

# Step 5: Verify the dashboard recovered
# SELECT COUNT(*) FROM prod.fct_orders WHERE order_date = '2026-03-17'
# Returns: 48,234 rows ← correct

# Step 6: Fix the original PR properly — correct the WHERE clause and add
# a recency test that would have caught this:
#   - dbt_utils.recency: {datepart: day, field: order_date, interval: 1}
# Re-open the PR with the fix.`}</CodeBox>

          <Output>{`Total time from alarm to recovery: 8 minutes. The revert was safe because
it added a new commit rather than rewriting history — CI/CD could
immediately redeploy it just like any other push to main. A git reset
would have required a force push, coordination with everyone who had
pulled main, and risked confusing CI about what state to deploy.`}</Output>

          <Para>
            The lesson: <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>git revert</code> is
            the production recovery tool. It is the only undo command that is
            safe on a shared branch and plays nicely with CI/CD pipelines.
            Know this before you need it at 9 AM.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 11 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 11 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is the difference between git revert, git reset, and git restore? When would you use each?',
            a: `These three commands undo changes in different ways and are appropriate for different situations.

git revert creates a new commit that exactly reverses the changes of a specified previous commit. The original commit stays in history and a new "revert" commit is added. This is always safe on shared branches because it only adds to history — it never rewrites it. This is the correct tool when you need to undo a commit that has already been pushed to main or any branch that others have pulled. In a data engineering context, when a bad dbt model deployment causes a production issue, you git revert the merge commit and push — CI/CD redeploys the working version immediately.

git reset moves the HEAD pointer backward in the commit history, effectively removing commits from the branch. The --soft flag keeps the removed commits' changes as staged changes. The --mixed flag (default) keeps them as unstaged changes. The --hard flag discards them entirely. Because reset rewrites history, it is only safe on commits that have not been pushed to a shared branch. If you accidentally committed debug code to your local feature branch and want to clean it up before pushing, git reset is the right tool.

git restore operates on the working directory and staging area — it does not touch commits at all. git restore filename discards uncommitted changes to a file. git restore --staged filename unstages a file without discarding the changes. Use this when you want to throw away edits in your working directory or un-add a file you accidentally staged.`,
          },
          {
            q: 'Q2. What should a data engineering team put in .gitignore, and why is each category important?',
            a: `A data engineering .gitignore has four critical categories, each with different consequences for getting them wrong.

Secrets are the most critical — API keys, database passwords, .env files, GCP credential JSON files, dbt profiles.yml with real connection strings. Committing a secret to git means it is in the history permanently, even after deletion. Anyone who ever clones the repository can extract it. If the repository is ever made public or if GitHub's secret scanning flags it, you face a security incident. Once a secret is committed, the correct response is to immediately revoke and rotate it, then use git filter-repo to rewrite history.

Data files — CSV, Parquet, JSON exports, binary data — should never be in git. Git is designed for text files. A 100 MB Parquet file in git history is there forever, making every clone download that data whether it is needed or not. At scale, a data repository with several large files can grow to gigabytes of download just to clone. All actual data belongs in object storage (S3, ADLS, GCS), referenced by path in pipeline config files.

Generated outputs — dbt's target/ directory, compiled SQL, run artifacts, __pycache__, .pyc files, virtual environments — are rebuilt from source code. Committing them creates noise in git diffs (every run changes timestamps), wastes storage, and creates conflicts when multiple people run the same tool.

Notebook outputs — Jupyter notebook cells can embed dataframe outputs, charts, or even raw data in the notebook JSON. Without stripping outputs before committing, notebooks create large, noisy diffs and can accidentally leak data. Use nbstripout to automatically strip outputs before commits.`,
          },
          {
            q: 'Q3. Describe the GitHub Flow branching strategy and why it works well for data teams.',
            a: `GitHub Flow is built around one rule: the main branch is always deployable, and every change goes through a short-lived feature branch and a pull request.

The workflow has six steps. Create a branch from the latest main, giving it a descriptive name that indicates what the change is. Make small, focused commits on the branch. Push the branch and open a pull request. CI runs automatically on the PR — for a dbt project this means dbt compile to catch syntax errors and dbt test to verify data quality on changed models. Team members review the SQL logic, test coverage, and naming conventions. On approval, the branch is merged (usually squash merged for a clean main history) and the merge triggers automatic deployment.

This works well for data teams for several specific reasons. Short-lived branches mean less divergence from main, fewer merge conflicts, and smaller, more reviewable PRs. The PR review step catches logic errors in SQL before they reach production — a reviewer who notices a missing COALESCE or a WHERE clause that accidentally excludes NULLs prevents a data quality incident. The CI integration with dbt test means data quality tests run automatically on every proposed change, not just manually when an engineer remembers. The always-deployable main branch means that when something breaks in production, a revert commit is a valid and immediate recovery path.

The alternative, Git Flow, adds develop, release, and hotfix branches, which add complexity without proportionate benefit for data projects where there is typically no concept of a versioned release — data transformations are continuously deployed, not bundled into releases.`,
          },
          {
            q: 'Q4. How would you set up a GitHub Actions workflow that automatically runs dbt tests on every pull request?',
            a: `A CI workflow for a dbt project lives in .github/workflows/ci.yml and is triggered by the pull_request event targeting the main branch.

The workflow needs to: check out the code, install Python and the appropriate dbt adapter (dbt-snowflake, dbt-bigquery, etc.), write a dbt profiles.yml using secrets stored in GitHub (database credentials must never be hardcoded in workflow files), run dbt deps to install packages, run dbt compile to catch SQL syntax errors, and run dbt test.

The most important optimisation is running only changed models and their downstream dependencies using dbt's state-based selection: dbt run --select state:modified+ --defer --state ./prod-manifest. This requires a production manifest.json artifact to be available (typically stored in S3 or as a workflow artifact from the last production run). Without this optimisation, CI runs the full dbt project on every PR, which can take 30 minutes for a large project. With it, a PR that changes one model typically runs in under 5 minutes.

Secrets management in GitHub Actions is straightforward: store database credentials in the repository's Settings > Secrets and variables > Actions. Reference them in the workflow as \${{ secrets.SNOWFLAKE_PASSWORD }}. These are injected as environment variables at runtime and never appear in logs. Never write credentials directly in workflow YAML files — even if the repository is private today, it may not be in the future.

For CI isolation, give each PR run its own database schema: dbt_ci_\${{ github.run_id }}. This ensures multiple simultaneous PR runs do not interfere with each other. Drop the schema at the end of the workflow regardless of success or failure using if: always() on the cleanup step.`,
          },
          {
            q: 'Q5. A colleague accidentally committed and pushed a file containing a production database password to the main branch. What do you do?',
            a: `This is a security incident, not just a git problem. The correct response has four steps in strict priority order.

Step one, and the most important: immediately revoke and rotate the compromised credential. Go to the database console right now and change the password. Assume the credential is already compromised — GitHub indexes public repositories almost immediately, and even private repositories may have been cloned by automated tools or CI systems that log their environment. Rotating the credential takes two minutes. The git remediation takes two hours. Do the two-minute thing first.

Step two: remove the file from git history. The standard modern tool is git filter-repo: pip install git-filter-repo, then git filter-repo --path .env --invert-paths. This rewrites the entire repository history to never have contained the file. Alternatively, BFG Repo Cleaner is faster for large repositories. After rewriting history, force push all branches: git push origin --force --all.

Step three: notify all collaborators. Everyone who has cloned the repository since the credential was committed has a copy of it in their local .git/objects directory. They must all re-clone the repository because their local history still contains the credential. Send a message to the whole team explaining what happened and what action they need to take.

Step four: prevent recurrence. Add .env and any other credential-containing files to .gitignore immediately. Add a pre-commit hook using detect-secrets or gitleaks that scans staged changes for patterns matching credentials before allowing a commit. Enable GitHub's secret scanning feature in the repository settings — it automatically detects common credential patterns in pushes and notifies repository admins.`,
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

      {/* ── Common Mistakes ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Using git add . as the default staging habit instead of reviewing what\'s actually being staged',
            a: 'Part 02\'s workflow section shows git add -p as the deliberate alternative for a reason — a blanket git add . happily stages a stray .env file or a debug print statement right alongside the real change, with nothing forcing a second look before it\'s committed.',
          },
          {
            q: 'Force-pushing to main to "fix" a rejected push instead of pulling and rebasing first',
            a: 'This module\'s Error Library is explicit that a rejected push means someone else\'s commits are on the remote that you don\'t have locally yet — git pull --rebase origin main is the fix; force-pushing over it silently discards their work, which is a very different outcome than the one you intended.',
          },
          {
            q: 'Rebasing a feature branch that a teammate has already pulled and is building on top of',
            a: 'Part 02 states the rule plainly: rebasing rewrites commit hashes, so anyone who already has the old commits gets a diverged history the moment you rewrite yours. Rebase is for your own unpushed local commits — once a branch is shared, only revert or a merge is safe.',
          },
          {
            q: 'Treating a merge conflict as something to resolve by guessing rather than understanding both changes',
            a: 'Part 09\'s conflict-resolution walkthrough is built around exactly this risk — picking the wrong side of a conflict marker without understanding why the other branch made its change can silently reintroduce a bug that branch existed specifically to fix.',
          },
          {
            q: 'Writing a PR description that just repeats the diff instead of explaining what changed and why',
            a: 'Part 09\'s PR template is deliberately structured around "why" and "how to verify," not just "what" — a reviewer who can\'t tell why a model changed or how to check the output ends up either rubber-stamping the PR or spending extra review cycles asking questions the description should have answered.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
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
            error: `error: failed to push some refs to 'origin' — Updates were rejected because the remote contains work that you do not have locally`,
            cause: 'Someone else pushed commits to the remote branch after you last pulled. Your local branch and the remote branch have diverged — git refuses to push because doing so would overwrite the commits you have not downloaded yet.',
            fix: 'Pull the remote changes first: git pull --rebase origin main. This fetches the remote commits and replays your local commits on top of them, producing a linear history. Resolve any conflicts that arise, then git push. Never use git push --force on a shared branch to bypass this error — it overwrites other people\'s work. Force push is only appropriate on your own feature branch when no one else has pulled it.',
          },
          {
            error: `WARNING: LF will be replaced by CRLF in pipeline.py. The file will have its original line endings in your working directory`,
            cause: 'Git is configured with core.autocrlf=true (Windows default), which automatically converts Unix line endings (LF) to Windows line endings (CRLF) on checkout and back to LF on commit. When a file has LF endings and you are on Windows, git warns that it will change the line endings. On a team with mixed Windows and Mac/Linux developers, this causes noisy diffs where every line appears changed.',
            fix: 'Add a .gitattributes file to the repository that specifies explicit line ending behaviour: * text=auto (auto-detect text files and normalise), *.py text eol=lf, *.sql text eol=lf, *.sh text eol=lf. Commit this file and all team members run git add --renormalize . to rewrite existing files. This ensures consistent LF endings for all code files regardless of the developer\'s OS, eliminating the warning and the spurious diffs.',
          },
          {
            error: `CONFLICT (content): Merge conflict in models/silver/orders.sql — Automatic merge failed; fix conflicts and then commit the result`,
            cause: 'Two branches both modified the same lines in the same file. Git cannot determine which version to keep without human judgment, so it marks the file with conflict markers and halts the merge.',
            fix: 'Open the conflicted file. Git marks the conflict with <<<<<<< HEAD (your version), ======= (separator), and >>>>>>> branch-name (incoming version). Edit the file to keep the correct version — this may be one branch\'s version, the other\'s, or a combination. Remove all the conflict markers completely. Then git add the file to mark the conflict as resolved and git commit to complete the merge. To prevent conflicts: keep feature branches short-lived and regularly pull and rebase from main (git pull --rebase origin main) to incorporate other people\'s changes before they diverge significantly.',
          },
          {
            error: `dbt Cloud / GitHub Actions: dbt deps failed — Could not find a package with name 'dbt_utils' in packages.yml`,
            cause: 'The packages.yml file specifies dbt package dependencies but the dbt_packages/ directory (where packages are installed) is gitignored and was not built before running dbt commands in CI. The workflow is missing the dbt deps step.',
            fix: 'Add dbt deps as a step in the CI workflow before any dbt compile, run, or test commands: run: dbt deps. This installs the packages listed in packages.yml into the dbt_packages/ directory. The dbt_packages/ directory should remain gitignored (like node_modules in JavaScript) — it is always rebuilt from packages.yml. If the issue occurs locally, run dbt deps in the project directory before any other dbt commands.',
          },
          {
            error: `fatal: refusing to merge unrelated histories`,
            cause: 'Two git repositories with entirely separate commit histories are being merged. This happens most commonly when a local repository was initialised with git init and a separate empty repository was created on GitHub, and then someone tries to merge them. Both repositories have different root commits — git sees them as unrelated projects.',
            fix: 'If the intention is to connect an existing local repository to a new empty GitHub repository: add the remote (git remote add origin URL), then force pull with history allowance: git pull origin main --allow-unrelated-histories. Resolve any conflicts, then push normally. If this is happening unexpectedly during a regular merge, it likely means you are targeting the wrong branch or repository — double-check git remote -v and ensure you are on the correct branch before merging.',
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
        'Git has three areas: working directory (what you edit), staging area (what will be committed), and repository (committed history). git add moves changes to staging. git commit moves staged changes to history. git diff shows unstaged changes. git diff --staged shows staged changes not yet committed.',
        'GitHub Flow is the right branching strategy for most data teams: one protected main branch, short-lived feature branches, pull requests with CI, and merge-to-main triggers deployment. Keep branches alive for days, not weeks. Merge conflicts increase exponentially with branch age.',
        'Never commit secrets, data files, generated outputs, or notebook outputs. A .gitignore for data projects must cover .env files, profiles.yml (dbt), target/ and dbt_packages/ directories, *.csv/*.parquet data files, __pycache__, and virtual environments.',
        'When a secret is accidentally committed: immediately rotate the credential, then use git filter-repo to rewrite history, force push, and notify all collaborators to re-clone. Rotation comes first — assume the secret is already compromised.',
        'dbt projects are git repositories. Every model change goes through a PR with CI that runs dbt compile and dbt test. Use state:modified+ selection to run only changed models in CI — this keeps CI fast (minutes, not hours). The dbt_packages/ directory is gitignored and rebuilt by dbt deps in CI.',
        'GitHub Actions workflows live in .github/workflows/ and are version-controlled alongside the code. Store all credentials as GitHub Secrets and reference them as \${{ secrets.NAME }}. Give each CI run an isolated schema (dbt_ci_\${{ github.run_id }}) to prevent cross-run contamination.',
        'git revert is the production recovery tool — it adds a new commit that undoes a previous one, leaving history intact. It is always safe on shared branches and plays correctly with CI/CD. git reset rewrites history — only use it on commits that have not been pushed.',
        'git reflog is the safety net for everything. It records every position HEAD has been in the last 90 days, including after resets and deletions. If you accidentally lose commits with reset --hard, git reflog shows you the commit hash to recover to.',
        'Merge conflicts are resolved by editing the conflict markers out of the file, keeping the correct version, then git add to mark resolved and git commit to complete the merge. Prevent conflicts by keeping branches short-lived and rebasing frequently: git pull --rebase origin main.',
        'A good data PR includes: what changed and why, what tests were added, how to verify the output, and downstream impact. Review checks: NULL handling, duplicate risk from JOINs, filter pushdown, test coverage on grain columns, and naming consistency.',
      ]} />


      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 18 covers REST APIs for data ingestion — authentication, pagination, rate limiting, and how to build robust ingestion classes that handle all three reliably without manual intervention.
        </p>
        <Link href="/learn/data-engineering/working-with-apis" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 18 → Working with APIs — REST, Auth, Pagination, Rate Limits
        </Link>
      </div>
    </LearnLayout>
  )
}
