import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
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
      section="Data Engineering"
      readTime="55 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — Why Git for Data Engineers ─────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Git Is Not Optional" />
        <SectionTitle>Git for Data Engineers — More Than Just Committing Code</SectionTitle>

        <Para>
          Every data engineer uses Git daily. Not just for committing pipeline code —
          for managing dbt model changes that affect production dashboards, for
          triggering CI/CD pipelines that deploy Airflow DAGs, for reviewing SQL
          transformations before they hit the Gold layer, and for rolling back a
          bad deployment that broke a morning report.
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
      </section>

      <Divider />

      {/* ── Part 02 — Core Git Workflow ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Core Workflow" />
        <SectionTitle>The Core Git Workflow — What You Run Every Day</SectionTitle>

        <Para>
          Git's daily workflow is small — maybe ten commands used regularly. The
          key is understanding what each one actually does to your repository's
          state, not just memorising the syntax. Knowing the internal model
          prevents the mistakes that send people running to StackOverflow.
        </Para>

        <SubTitle>The three areas: working directory, staging, and repository</SubTitle>

        <CodeBox label="Git's three-area model — the mental model that explains everything">{`Your git repository has three distinct areas:

  WORKING DIRECTORY          STAGING AREA             REPOSITORY
  (what you edit)            (what will be committed)  (committed history)

  orders_pipeline.py ──────── git add ──────────────► [staged snapshot]
                                                              │
                                                         git commit
                                                              │
                                                              ▼
                                                       [commit object]
                                                       in .git/objects/

  git status    → shows difference between working dir and staging
  git diff      → shows changes in working dir NOT yet staged
  git diff --staged → shows changes staged but NOT yet committed

  The staging area (index) lets you craft commits precisely:
  you can stage parts of a file, or stage some files but not others,
  choosing exactly what goes into each commit.`}</CodeBox>

        <SubTitle>The commands used every day</SubTitle>

        <CodeBox label="Daily git workflow — the commands and what each actually does">{`# ── SETUP (once per machine) ──────────────────────────────────────────────────
git config --global user.name "Priya Sharma"
git config --global user.email "priya@company.com"
git config --global core.editor "vim"       # or nano, code --wait, etc.
git config --global init.defaultBranch main

# ── STARTING A PROJECT ────────────────────────────────────────────────────────
git init                          # initialise new repo in current directory
git clone git@github.com:org/repo.git          # clone via SSH (preferred)
git clone https://github.com/org/repo.git      # clone via HTTPS

# ── CHECKING STATE ────────────────────────────────────────────────────────────
git status                        # what has changed? what is staged?
git status -s                     # short format: M=modified, A=added, ?=untracked
git diff                          # unstaged changes (working dir vs staging)
git diff --staged                 # staged changes (staging vs last commit)
git diff main..feature-branch     # difference between two branches
git log --oneline -20             # last 20 commits, one line each
git log --oneline --graph --all   # visual branch graph
git show abc1234                  # show a specific commit's changes

# ── STAGING AND COMMITTING ────────────────────────────────────────────────────
git add models/silver/orders.sql       # stage specific file
git add models/                        # stage entire directory
git add -p                             # interactive staging: choose hunks to stage
                                       # (the most powerful add option)
git add .                              # stage everything (use carefully)

git commit -m "feat: add orders deduplication in Silver layer"
git commit --amend -m "fix: correct commit message"
# --amend: modify the LAST commit (only before pushing!)

# Conventional commit prefixes (industry standard):
# feat:     new feature or transformation
# fix:      bug fix in pipeline logic
# refactor: restructuring without behaviour change
# test:     adding or updating tests
# docs:     documentation only
# chore:    maintenance (update deps, rename files)
# ci:       CI/CD configuration changes

# ── REMOTE OPERATIONS ─────────────────────────────────────────────────────────
git remote -v                          # show configured remotes
git remote add origin git@github.com:org/repo.git
git fetch origin                       # download remote changes, do NOT merge
git pull origin main                   # fetch + merge (or rebase if configured)
git pull --rebase origin main          # fetch + rebase (cleaner history)
git push origin feature/orders-dedup  # push branch to remote
git push -u origin feature/orders-dedup  # push and set upstream tracking`}</CodeBox>

        <SubTitle>Branching — the operations you need fluently</SubTitle>

        <CodeBox label="Branch operations — creating, switching, merging, and cleaning up">{`# ── CREATING AND SWITCHING ────────────────────────────────────────────────────
git branch                             # list local branches (* = current)
git branch -a                          # list all branches (local + remote)
git branch feature/customer-metrics    # create branch (does NOT switch)
git switch feature/customer-metrics    # switch to branch (modern syntax)
git switch -c feature/customer-metrics # create AND switch (most common)
git checkout -b feature/customer-metrics  # older syntax, same result

# Always branch from the latest main:
git switch main
git pull origin main
git switch -c feature/orders-backfill

# ── MERGING ───────────────────────────────────────────────────────────────────
git switch main
git merge feature/orders-backfill      # merge feature into main
git merge --no-ff feature/orders-backfill  # force a merge commit (preserves history)
git merge --squash feature/orders-backfill # squash all commits into one

# ── REBASING ──────────────────────────────────────────────────────────────────
# Rebase replays your commits on top of another branch
# Result: linear history (no merge commits)

git switch feature/orders-backfill
git rebase main          # replay feature commits on top of latest main
                         # if conflicts: fix, then git rebase --continue
                         # to abort:     git rebase --abort

# RULE: never rebase commits that have been pushed to a shared branch
# Rebasing rewrites history — safe on your local feature branch,
# dangerous on main or any branch others have pulled

# ── DELETING BRANCHES ─────────────────────────────────────────────────────────
git branch -d feature/orders-backfill     # delete (safe — refuses if unmerged)
git branch -D feature/orders-backfill     # force delete (even if unmerged)
git push origin --delete feature/orders-backfill  # delete remote branch

# ── STASHING: save work in progress without committing ────────────────────────
git stash                         # stash all changes (working dir + staged)
git stash push -m "WIP: orders backfill logic"   # stash with a name
git stash list                    # list all stashes
git stash pop                     # apply most recent stash and remove it
git stash apply stash@{2}         # apply specific stash, keep it in list
git stash drop stash@{0}          # remove a stash without applying`}</CodeBox>
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
          break overnight runs, and data quality that cannot be "rolled back" the
          way application code can.
        </Para>

        <SubTitle>GitHub Flow — the standard for data teams</SubTitle>

        <Para>
          GitHub Flow is the most widely used branching strategy for data engineering
          teams. It is simple: one protected main branch, short-lived feature branches,
          pull requests for review, and merge to main only after CI passes. Every
          merge to main triggers a deployment.
        </Para>

        <CodeBox label="GitHub Flow for a dbt data project — complete workflow">{`GITHUB FLOW — step by step:

1. MAIN IS ALWAYS DEPLOYABLE
   main branch = what is running in production right now
   Never commit directly to main — it is branch-protected
   Every push to main automatically deploys (via CI/CD)

2. CREATE A FEATURE BRANCH FOR EVERY CHANGE
   git switch main && git pull origin main
   git switch -c feat/add-customer-ltv-model
   # Branch naming conventions:
   # feat/short-description     — new model or transformation
   # fix/broken-metric-name     — fixing a bug in existing logic
   # refactor/orders-cte-chain  — restructuring without logic change
   # hotfix/wrong-revenue-calc  — urgent production fix

3. MAKE SMALL, FOCUSED COMMITS
   # One logical change per commit — not "all my changes"
   git add models/gold/customer_ltv.sql
   git commit -m "feat: add customer lifetime value Gold model"

   git add tests/gold/customer_ltv.yml
   git commit -m "test: add not_null and positive_value tests for LTV"

   # Why small commits?
   # → Easier to review in PRs (one change = one thing to understand)
   # → Easier to revert (revert one commit, not a batch of unrelated changes)
   # → Easier to bisect if a bug is introduced

4. PUSH AND OPEN A PULL REQUEST
   git push -u origin feat/add-customer-ltv-model
   # Open PR on GitHub/GitLab
   # PR description should include:
   #   - What this changes and why
   #   - What tests were added or updated
   #   - How to verify the output (sample query, expected row count)
   #   - Any downstream impact (dashboards that will change)

5. CI RUNS AUTOMATICALLY ON PUSH
   # GitHub Actions / GitLab CI runs:
   #   - dbt compile (SQL is valid)
   #   - dbt test on changed models (data quality checks pass)
   #   - sqlfluff lint (SQL style)
   # If CI fails, fix before requesting review

6. CODE REVIEW
   # At least one other data engineer reviews:
   #   - Is the SQL logic correct?
   #   - Are there edge cases (NULLs, duplicates) that are not handled?
   #   - Are the tests comprehensive?
   #   - Is the naming consistent with existing conventions?

7. SQUASH AND MERGE (or merge commit)
   # Most data teams squash feature branch commits into one:
   # "feat: add customer lifetime value Gold model (#47)"
   # Clean main branch history — one commit per feature

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
          Indian tech companies use for their data teams. Add trunk-based
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

        <CodeBox label=".gitignore for a data engineering project — complete template">{`# ─────────────────────────────────────────────────────────────────────────────
# .gitignore for a data engineering project (dbt + Python pipelines)
# ─────────────────────────────────────────────────────────────────────────────

# ── SECRETS — never commit these ──────────────────────────────────────────────
.env                    # local environment variables (DB passwords, API keys)
.env.*                  # .env.local, .env.production, etc.
*.pem                   # SSH private keys
*.key                   # private keys
*_credentials.json      # GCP / AWS credential files
profiles.yml            # dbt profiles (contains DB connection strings!)
                        # EXCEPTION: profiles.yml.example (template with no real values)

# ── DATA FILES — data does not belong in git ──────────────────────────────────
*.csv
*.parquet
*.json.gz
*.avro
*.orc
data/
raw/
output/
# EXCEPTION: small fixture/seed files used in tests (< 1 MB)
# Unignore with: !tests/fixtures/small_sample.csv

# ── GENERATED OUTPUTS — rebuilt by running the pipeline ───────────────────────
target/                 # dbt compiled SQL and run artifacts
dbt_packages/           # dbt dependencies (like node_modules)
logs/                   # pipeline log files
*.log

# ── PYTHON ────────────────────────────────────────────────────────────────────
__pycache__/
*.py[cod]               # .pyc, .pyo, .pyd
*.pyo
.venv/
venv/
env/
.Python
*.egg-info/
dist/
build/
.pytest_cache/
.coverage
htmlcov/
.mypy_cache/
.ruff_cache/

# ── JUPYTER NOTEBOOKS — output cells can contain data ─────────────────────────
# Option 1: ignore all notebooks
# *.ipynb
# Option 2: commit notebooks but strip outputs before committing
# (use nbstripout: pip install nbstripout && nbstripout --install)
.ipynb_checkpoints/

# ── MACOS / WINDOWS SYSTEM FILES ──────────────────────────────────────────────
.DS_Store
Thumbs.db
desktop.ini

# ── EDITORS ───────────────────────────────────────────────────────────────────
.idea/
.vscode/settings.json   # personal settings (commit .vscode/extensions.json instead)
*.swp
*.swo
*~

# ── AIRFLOW ───────────────────────────────────────────────────────────────────
airflow.db              # local SQLite Airflow database
airflow-webserver.pid

# ── TERRAFORM ─────────────────────────────────────────────────────────────────
*.tfstate
*.tfstate.*
.terraform/
*.tfvars                # may contain secrets


# ── CHECKING WHAT WOULD BE IGNORED ────────────────────────────────────────────
# git check-ignore -v filename      # why is this file being ignored?
# git ls-files --ignored --exclude-standard   # list all ignored files
# git ls-files --others --exclude-standard    # list untracked non-ignored files`}</CodeBox>

        <SubTitle>What happens when you accidentally commit a secret</SubTitle>

        <Para>
          Committing a secret to a git repository — even briefly, even to a private
          repo — is a serious security incident. Git history is permanent; deleting
          the file does not remove it from history. Anyone who cloned the repo before
          the deletion still has it. GitHub's secret scanning will flag it. If the
          repo is ever made public, the secret is exposed.
        </Para>

        <CodeBox label="Recovering from an accidentally committed secret">{`# SITUATION: you committed a .env file with a real API key
# Last commit: abc1234

# ── STEP 1: Immediately rotate/revoke the secret ──────────────────────────────
# Go to Razorpay/AWS/GCP console and revoke the leaked key RIGHT NOW
# Do this before anything else — assume the key is already compromised
# Rotation takes 2 minutes; remediation takes 2 hours — do it first

# ── STEP 2: Remove from history ───────────────────────────────────────────────
# Option A: git filter-repo (modern, recommended)
pip install git-filter-repo
git filter-repo --path .env --invert-paths
# This rewrites ALL history, removing .env from every commit

# Option B: BFG Repo Cleaner (faster for large repos)
# java -jar bfg.jar --delete-files .env
# git reflog expire --expire=now --all
# git gc --prune=now --aggressive

# ── STEP 3: Force push (coordinate with team first!) ──────────────────────────
git push origin --force --all
git push origin --force --tags

# ── STEP 4: Notify all collaborators ──────────────────────────────────────────
# Everyone who cloned the repo must re-clone — their local copies
# still have the secret in their .git/objects

# ── PREVENT RECURRENCE ────────────────────────────────────────────────────────
# 1. Add .env to .gitignore (and commit the .gitignore)
# 2. Add a pre-commit hook that scans for secrets:
#    pip install detect-secrets
#    detect-secrets scan > .secrets.baseline
#    detect-secrets audit .secrets.baseline
# 3. Enable GitHub secret scanning in repo settings
# 4. Use git-secrets or gitleaks in pre-commit hooks

# Pre-commit hook that blocks commits containing likely secrets:
# .git/hooks/pre-commit
# #!/bin/bash
# if git diff --cached | grep -E "(password|api_key|secret|token)\s*=\s*['\"][^'\"]{8,}"; then
#   echo "ERROR: Possible secret detected in staged changes"
#   exit 1
# fi`}</CodeBox>
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

        <CodeBox label="Git LFS — setup and usage">{`# ── INSTALLATION ──────────────────────────────────────────────────────────────
git lfs install            # enable LFS for your git installation (once per machine)

# ── TRACKING FILE TYPES ───────────────────────────────────────────────────────
git lfs track "*.parquet"           # track all .parquet files with LFS
git lfs track "*.pkl"               # track model pickle files
git lfs track "*.h5"                # track Keras model files
git lfs track "tests/fixtures/*.csv"  # track large test fixtures

# The above commands update .gitattributes:
cat .gitattributes
# *.parquet filter=lfs diff=lfs merge=lfs -text
# *.pkl filter=lfs diff=lfs merge=lfs -text

# IMPORTANT: commit .gitattributes to the repo
git add .gitattributes
git commit -m "chore: configure Git LFS for binary files"

# ── USING LFS ─────────────────────────────────────────────────────────────────
# After tracking is configured, git add/commit works normally:
git add tests/fixtures/sample_orders.parquet
git commit -m "test: add 50k row sample fixture for integration tests"
git push origin main
# → LFS automatically stores the large file on the LFS server
# → Git history contains only a 134-byte pointer file

# ── CHECKING LFS STATUS ───────────────────────────────────────────────────────
git lfs ls-files           # list files currently managed by LFS
git lfs status             # LFS status of working directory
git lfs env                # show LFS configuration

# ── LFS LIMITS ────────────────────────────────────────────────────────────────
# GitHub Free:     1 GB LFS storage, 1 GB bandwidth/month (free)
# GitHub Pro:      2 GB storage, 2 GB bandwidth
# GitHub Team:     4 GB storage, 4 GB bandwidth
# Additional packs: $5/month per 50 GB storage + 50 GB bandwidth
#
# For data engineering: LFS is for files under ~500 MB
# Anything larger → object storage (S3/ADLS) + reference by URL

# ── WHAT NEVER USES LFS (goes to object storage instead) ─────────────────────
# Production data files (terabytes of Parquet)
# Pipeline outputs
# Archived historical data
# ML training datasets
# → Reference these in your pipeline config as S3/ADLS paths
#   never check the files themselves into git`}</CodeBox>
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

        <SubTitle>The dbt project structure in git</SubTitle>

        <CodeBox label="dbt project git structure — what goes where">{`freshmart_dbt/                    # git repository root
├── .gitignore                    # includes target/, dbt_packages/, logs/
├── .github/
│   └── workflows/
│       ├── ci.yml                # run dbt compile + test on PR
│       └── deploy.yml            # run dbt run + test on merge to main
├── dbt_project.yml               # project config (committed)
├── packages.yml                  # dbt package dependencies (committed)
├── profiles.yml.example          # TEMPLATE — no real credentials (committed)
│                                 # actual profiles.yml is gitignored
├── models/
│   ├── staging/                  # stg_ models: raw → typed
│   │   ├── _sources.yml          # source definitions (committed)
│   │   └── stg_orders.sql        # (committed)
│   ├── intermediate/             # int_ models: business logic
│   │   └── int_orders_enriched.sql
│   ├── marts/
│   │   ├── core/
│   │   │   └── dim_customers.sql
│   │   └── finance/
│   │       └── fct_orders.sql
│   └── _schema.yml               # model documentation + tests (committed)
├── tests/
│   └── generic/                  # custom generic tests
├── macros/                       # reusable SQL macros
├── seeds/                        # small reference CSVs (committed — these are code)
│   └── store_mapping.csv         # 10-row mapping table, fine in git
└── snapshots/                    # SCD2 snapshot definitions

# WHAT IS gitignored:
# target/          — compiled SQL and run results (generated, not source)
# dbt_packages/    — installed packages (like node_modules)
# logs/            — dbt run logs
# profiles.yml     — contains DB credentials`}</CodeBox>

        <SubTitle>The dbt PR workflow — step by step</SubTitle>

        <CodeBox label="dbt model change — complete PR workflow">{`# SCENARIO: Add a new customer lifetime value model to the Gold layer

# Step 1: Branch from latest main
git switch main && git pull origin main
git switch -c feat/customer-ltv-gold-model

# Step 2: Create the model
# models/marts/finance/fct_customer_ltv.sql
# (write SQL here)

# Step 3: Add schema.yml entry with tests
# models/marts/finance/_schema.yml
# models:
#   - name: fct_customer_ltv
#     description: Customer lifetime value aggregated from delivered orders
#     columns:
#       - name: customer_id
#         tests: [not_null, unique]
#       - name: total_revenue
#         tests: [not_null, {dbt_utils.accepted_range: {min_value: 0}}]

# Step 4: Test locally before committing
dbt compile -s fct_customer_ltv              # check SQL compiles
dbt run -s fct_customer_ltv --target dev    # run against dev database
dbt test -s fct_customer_ltv --target dev   # run data quality tests
dbt docs generate && dbt docs serve          # preview documentation

# Step 5: Commit with clear message
git add models/marts/finance/fct_customer_ltv.sql
git add models/marts/finance/_schema.yml
git commit -m "feat: add customer lifetime value fact model

- Aggregates total revenue, order count, and first/last order date
- Partitioned by customer_id with covering tests
- Used by Finance dashboard LTV widget"

# Step 6: Push and open PR
git push -u origin feat/customer-ltv-gold-model
# Open PR on GitHub

# Step 7: CI runs automatically (see next section)

# Step 8: Reviewer checks:
# - Does the SQL handle NULLs correctly?
# - Are there tests for the new columns?
# - Does it join to the correct Silver tables?
# - Is the naming consistent (fct_ prefix, snake_case)?
# - Does dbt docs show correct lineage?

# Step 9: Merge and deploy
# Squash and merge → triggers deploy.yml → dbt run + test in production

# Step 10: Verify in production
dbt run -s fct_customer_ltv --target prod
dbt test -s fct_customer_ltv --target prod`}</CodeBox>

        <SubTitle>Handling breaking changes in dbt</SubTitle>

        <CodeBox label="Breaking changes in dbt — how to manage safely with git">{`# BREAKING CHANGE: renaming a column used by downstream models and dashboards

# Problem: orders.total_amount is used in 12 downstream models
# You need to rename it to order_revenue for consistency
# If you just rename it, 12 models break simultaneously

# SAFE APPROACH: backward-compatible migration via git

# Step 1: Add the new column alongside the old one (backward compatible)
# In fct_orders.sql:
#   SELECT
#     order_amount AS order_revenue,   -- new name
#     order_amount AS total_amount,    -- OLD name kept for transition
#     ...

git commit -m "feat: add order_revenue column (deprecating total_amount)"

# Step 2: Announce deprecation — update schema.yml
# models:
#   - name: fct_orders
#     columns:
#       - name: total_amount
#         description: "DEPRECATED — use order_revenue instead. Removed 2026-04-01."

# Step 3: Update all downstream models to use order_revenue
# Each model gets its own PR, reviewed and deployed independently

# Step 4: Once all downstream consumers are updated, remove the old column
git commit -m "breaking: remove deprecated total_amount column from fct_orders

All downstream models have been updated to use order_revenue.
Verified in production on 2026-03-31."

# WHY GIT MAKES THIS SAFE:
# Each step is a separate commit with clear intent
# The transition period is visible in git history
# If something breaks, you can see exactly which commit introduced the change
# Revert to any step in the migration with git revert <commit>`}</CodeBox>
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

        <CodeBox label=".github/workflows/ci.yml — dbt CI pipeline on pull requests">{`# Runs on every PR — validates SQL compiles and tests pass in dev
name: dbt CI

on:
  pull_request:
    branches: [main]
    paths:
      - 'models/**'
      - 'tests/**'
      - 'macros/**'
      - 'dbt_project.yml'
      - 'packages.yml'

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
          dbt deps

      - name: Write dbt profiles
        run: |
          mkdir -p ~/.dbt
          cat > ~/.dbt/profiles.yml << 'PROFILES'
          freshmart:
            target: ci
            outputs:
              ci:
                type: snowflake
                account: \${{ secrets.SNOWFLAKE_ACCOUNT }}
                user: \${{ secrets.SNOWFLAKE_CI_USER }}
                password: \${{ secrets.SNOWFLAKE_CI_PASSWORD }}
                role: CI_ROLE
                database: FRESHMART_CI
                warehouse: CI_WH
                schema: dbt_ci_\${{ github.run_id }}
          PROFILES
        # Each CI run gets its own schema — no cross-run contamination
        # Schema is deleted at end of job

      - name: dbt compile
        run: dbt compile --target ci
        # Catches SQL syntax errors before running anything

      - name: dbt run (changed models only)
        run: |
          dbt run \
            --target ci \
            --select state:modified+ \
            --defer \
            --state ./prod-manifest
        # state:modified+: only run models that changed and their downstream deps
        # --defer: use production results for unmodified upstream models
        # This makes CI fast — only runs what changed

      - name: dbt test (changed models only)
        run: |
          dbt test \
            --target ci \
            --select state:modified+ \
            --defer \
            --state ./prod-manifest

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: dbt-test-results
          path: target/run_results.json

      - name: Cleanup CI schema
        if: always()   # run even if previous steps failed
        run: |
          dbt run-operation drop_schema --args \
            '{schema: dbt_ci_\${{ github.run_id }}}'`}</CodeBox>

        <CodeBox label=".github/workflows/deploy.yml — production deployment on merge to main">{`# Runs when PR is merged to main — deploys to production
name: dbt Deploy

on:
  push:
    branches: [main]

jobs:
  dbt-deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    environment: production   # requires manual approval in GitHub settings

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
          dbt deps

      - name: Write production profiles
        run: |
          mkdir -p ~/.dbt
          cat > ~/.dbt/profiles.yml << 'PROFILES'
          freshmart:
            target: prod
            outputs:
              prod:
                type: snowflake
                account: \${{ secrets.SNOWFLAKE_ACCOUNT }}
                user: \${{ secrets.SNOWFLAKE_PROD_USER }}
                password: \${{ secrets.SNOWFLAKE_PROD_PASSWORD }}
                role: TRANSFORMER_ROLE
                database: FRESHMART_PROD
                warehouse: TRANSFORM_WH
                schema: DBT_PROD
          PROFILES

      - name: dbt run (full refresh on schedule, incremental otherwise)
        run: dbt run --target prod

      - name: dbt test
        run: dbt test --target prod

      - name: Notify on failure
        if: failure()
        run: |
          curl -s -X POST \${{ secrets.SLACK_WEBHOOK }} \
            -H 'Content-type: application/json' \
            -d '{"text": ":red_circle: dbt deploy failed on main — check GitHub Actions"}'

      - name: Generate and upload docs
        if: success()
        run: |
          dbt docs generate --target prod
          # Upload target/catalog.json and target/manifest.json
          # to S3 or a docs hosting service`}</CodeBox>

        <SubTitle>GitHub Actions for Python pipelines</SubTitle>

        <CodeBox label=".github/workflows/pipeline-tests.yml — testing Python pipeline code">{`name: Pipeline Tests

on:
  pull_request:
    paths:
      - 'pipelines/**'
      - 'tests/**'
      - 'requirements*.txt'

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up Python 3.11
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Cache pip dependencies
        uses: actions/cache@v4
        with:
          path: ~/.cache/pip
          key: \${{ runner.os }}-pip-\${{ hashFiles('requirements.txt') }}

      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install -r requirements-dev.txt

      - name: Run linting (ruff)
        run: ruff check pipelines/ tests/

      - name: Run type checking (mypy)
        run: mypy pipelines/ --ignore-missing-imports

      - name: Run unit tests with coverage
        run: |
          pytest tests/unit/ \
            --cov=pipelines \
            --cov-report=xml \
            --cov-fail-under=80 \
            -v

      - name: Upload coverage report
        uses: codecov/codecov-action@v4
        with:
          file: ./coverage.xml`}</CodeBox>
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

        <CodeBox label="The three undo commands — when to use each">{`# ── git revert — SAFE: adds a new commit that undoes a previous commit ────────
# Use when: undoing a commit that has been pushed to a shared branch
# Effect: history is preserved, a new "revert" commit is added
# Safe for: main, develop, any branch others have pulled

git revert abc1234            # create a new commit that reverses abc1234
git revert abc1234 --no-edit  # no commit message prompt (uses default message)
git revert HEAD               # revert the most recent commit

# Example: a bad model was deployed to production
# git log --oneline shows:
# f8a3b2c  feat: update customer LTV formula ← this is wrong
# abc1234  feat: add store revenue model
# 9f8e7d6  fix: correct NULL handling in orders

git revert f8a3b2c            # creates new commit: "Revert feat: update customer LTV formula"
git push origin main          # safe to push — history is intact


# ── git reset — REWRITES HISTORY: moves HEAD back ─────────────────────────────
# Use when: undoing commits that have NOT been pushed (local only)
# Effect: commits are removed from history (or unstaged)
# NEVER use on a shared branch that others have pulled

# Three modes:
git reset --soft HEAD~1       # undo last commit, KEEP changes staged
                              # use to: re-commit with different message or split into two commits

git reset --mixed HEAD~1      # undo last commit, KEEP changes in working dir (unstaged)
                              # this is the default if you omit --soft or --hard

git reset --hard HEAD~1       # undo last commit, DISCARD all changes
                              # DESTRUCTIVE: changes are gone
                              # use to: completely abandon a branch's last commit

# Undo last 3 commits (local only):
git reset --soft HEAD~3       # keeps all changes staged

# ── git restore — SAFE: discards working directory changes ────────────────────
git restore orders.sql        # discard all unstaged changes to orders.sql
git restore .                 # discard all unstaged changes in working directory
git restore --staged orders.sql  # unstage a file (keep changes in working dir)
git restore --staged .           # unstage everything


# ── DECISION TREE: which undo command to use ──────────────────────────────────
#
# Has the commit been pushed to a shared branch?
#   YES → git revert (adds new commit, history preserved)
#   NO  → choose based on what you want to keep:
#           Keep changes staged?     → git reset --soft HEAD~N
#           Keep changes unstaged?   → git reset --mixed HEAD~N
#           Discard changes entirely? → git reset --hard HEAD~N
#           (N = number of commits to undo)
#
# Just want to discard file changes (not commits)?
#   → git restore filename
#
# Accidentally staged a file for commit?
#   → git restore --staged filename`}</CodeBox>

        <SubTitle>Advanced recovery — reflog and cherry-pick</SubTitle>

        <CodeBox label="Git reflog and cherry-pick — for harder recovery scenarios">{`# ── GIT REFLOG: the safety net for everything ────────────────────────────────
# reflog records every position HEAD has been, including after resets
# If you accidentally deleted commits with reset --hard, reflog saves you

git reflog                    # show all recent HEAD positions
# Output:
# f8a3b2c (HEAD -> main) HEAD@{0}: commit: feat: update LTV formula
# abc1234 HEAD@{1}: commit: feat: add store revenue model
# 9f8e7d6 HEAD@{2}: reset: moving to HEAD~1   ← you reset here
# 1b2c3d4 HEAD@{3}: commit: fix: correct NULL handling  ← this was "lost"

# Recover the "lost" commit after a reset --hard:
git reset --hard 1b2c3d4      # go back to the state before the reset
# or:
git checkout -b recovery-branch 1b2c3d4   # create a new branch at the lost commit

# reflog entries expire after 90 days by default


# ── GIT CHERRY-PICK: apply a specific commit to a different branch ────────────
# Use when: a critical fix was made on the wrong branch, or you need
# one specific commit from a feature branch without merging the whole thing

# SCENARIO: a critical bug fix was committed on feature/orders-fix
# but it needs to be deployed to main NOW without waiting for the full PR

git switch main
git cherry-pick abc1234        # apply commit abc1234 to main
git push origin main           # deploy the fix

# Cherry-pick a range of commits:
git cherry-pick abc1234..def5678   # apply all commits from abc1234 to def5678

# Cherry-pick without committing (inspect first):
git cherry-pick --no-commit abc1234   # applies changes but does not commit
git status                            # review what was applied
git commit -m "hotfix: cherry-pick orders fix from feature branch"


# ── COMMON RECOVERY SCENARIOS ────────────────────────────────────────────────

# "I committed to main instead of my feature branch"
git log --oneline -3           # note the commit hash (abc1234)
git reset --soft HEAD~1        # undo the commit, keep changes staged
git switch -c fix/my-feature   # create the branch you meant to use
git commit -m "original message"  # re-commit on the correct branch

# "I pushed a broken commit to main and need to revert urgently"
git log --oneline -5           # find the bad commit hash
git revert bad_commit_hash     # create revert commit
git push origin main           # deploy the revert immediately

# "I accidentally deleted a branch"
git reflog | grep feat/deleted-branch  # find the last commit on that branch
git checkout -b feat/deleted-branch recovered_hash  # recreate it`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 09 — Git for Collaboration ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Collaboration Patterns" />
        <SectionTitle>Collaboration — Pull Requests, Code Review, and Conflict Resolution</SectionTitle>

        <SubTitle>Writing pull requests that get reviewed quickly</SubTitle>

        <CodeBox label="Pull request best practices for data teams">{`# A good data engineering PR description includes:

Title: feat: add daily store revenue Gold model (#47)

Description:
## What
Adds a new Gold layer model \`gold.daily_store_revenue\` that aggregates
delivered order revenue per store per day, with 7-day moving averages
and month-to-date totals.

## Why
Powers the FreshMart Revenue Dashboard's store performance widget.
Currently this runs as a direct Snowflake query that takes 4 minutes
— this pre-aggregated model reduces it to <1 second.

## Changes
- models/marts/finance/daily_store_revenue.sql (new)
- models/marts/finance/_schema.yml (updated — new model + tests)
- tests/generic/assert_positive_revenue.sql (new custom test)

## How to verify
Run: dbt run -s daily_store_revenue --target dev
Then: SELECT * FROM dev.daily_store_revenue WHERE order_date = '2026-03-17' LIMIT 10
Expected: 10 rows (one per store), all revenue values > 0

## Downstream impact
The Revenue Dashboard will use this model once deployed.
No existing models reference this new model.

## Tests added
- not_null on order_date, store_id, daily_revenue
- unique on (order_date, store_id)
- dbt_utils.accepted_range: daily_revenue >= 0


# ── REVIEWING A DATA ENGINEERING PR ──────────────────────────────────────────
# What to check when reviewing SQL/dbt changes:

# 1. Correctness
#    - Does the SQL logic match the description?
#    - Are NULLs handled explicitly (COALESCE where needed)?
#    - Are there potential duplicates from JOINs?
#    - Does it handle edge cases (empty partitions, all-null groups)?

# 2. Performance
#    - Does it filter early (before JOINs)?
#    - Are there correlated subqueries that should be JOINs?
#    - For Snowflake: does it filter on the clustering key?

# 3. Tests
#    - Are there not_null tests on required columns?
#    - Are there unique tests on grain columns?
#    - Are relationship tests defined for FK columns?

# 4. Naming and conventions
#    - snake_case column names?
#    - Correct model prefix (stg_, int_, fct_, dim_)?
#    - Schema.yml documentation for all new columns?`}</CodeBox>

        <SubTitle>Resolving merge conflicts</SubTitle>

        <CodeBox label="Merge conflicts — understanding and resolving them">{`# Conflicts occur when two branches modify the same lines
# Git cannot automatically choose which change to keep

# ── WHEN A CONFLICT OCCURS ────────────────────────────────────────────────────
git merge feature/orders-fix
# CONFLICT (content): Merge conflict in models/silver/orders.sql
# Automatic merge failed; fix conflicts and then commit the result.

# ── THE CONFLICT MARKERS ──────────────────────────────────────────────────────
# In the conflicted file (models/silver/orders.sql):

#  WITH base AS (
#      SELECT * FROM raw.orders
# <<<<<<< HEAD (main branch version)
#      WHERE status IN ('placed', 'confirmed', 'delivered', 'cancelled')
# =======
#      WHERE status IN ('placed', 'confirmed', 'delivered', 'cancelled', 'refunded')
# >>>>>>> feature/orders-fix (incoming branch version)
#  )

# <<<<<<< HEAD: your current branch's version
# =======: separator
# >>>>>>> branch: the incoming branch's version
# You must choose which version to keep (or write a new version combining both)

# ── RESOLVING THE CONFLICT ────────────────────────────────────────────────────
# Option A: Keep incoming change (feature branch is correct)
# Edit the file to:
#  WHERE status IN ('placed', 'confirmed', 'delivered', 'cancelled', 'refunded')

# Option B: Keep current (main is correct, feature branch was wrong)
#  WHERE status IN ('placed', 'confirmed', 'delivered', 'cancelled')

# Option C: Combine both (often the right answer)
# (in this case same as option A)

# After editing:
git add models/silver/orders.sql    # mark as resolved
git commit                          # complete the merge

# ── USING A MERGE TOOL ────────────────────────────────────────────────────────
git mergetool                       # opens configured visual merge tool
# Configure VS Code as merge tool:
# git config --global merge.tool vscode
# git config --global mergetool.vscode.cmd 'code --wait \$MERGED'

# ── ABORTING A MERGE ──────────────────────────────────────────────────────────
git merge --abort                   # abandon the merge, go back to pre-merge state

# ── PREVENTING CONFLICTS ──────────────────────────────────────────────────────
# 1. Keep feature branches short-lived (< 1 week)
# 2. Pull and rebase frequently: git pull --rebase origin main
# 3. Communicate: if two people need the same file, coordinate
# 4. Structure dbt models so each model is in its own file
#    (conflicts are per-file — one model per file = isolated changes)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 10 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
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
            Scenario — FreshMart · Finance team raises alarm at 09:15 AM
          </div>

          <Para>
            A colleague merged a PR at 8:55 AM that refactored the
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> fct_orders</code> model.
            The merge triggered the deploy CI which ran dbt — all tests passed.
            At 9:15 AM the finance team calls: "The revenue dashboard shows zero
            for March 17th. Something is wrong."
          </Para>

          <Para>
            <strong>Step 1 — Identify the bad commit:</strong>
          </Para>

          <CodeBox label="Diagnosing and reverting a bad production deployment">{`# Find recent commits on main
git log --oneline -5
# f8a3b2c  (HEAD -> main) refactor: simplify fct_orders CTE chain (#52)
# abc1234  feat: add store_tier dimension (#51)
# 9f8e7d6  fix: correct NULL handling in promotions (#50)
# ...

# The refactor (f8a3b2c) was the deploy that broke things
# Quick check — what changed?
git show f8a3b2c --stat
# models/marts/finance/fct_orders.sql | 47 +++++-----

git show f8a3b2c -- models/marts/finance/fct_orders.sql
# Shows the diff — you spot it immediately:
# -  WHERE o.status = 'delivered'
# +  WHERE o.status = 'complete'
# The status value was changed from 'delivered' to 'complete'
# which does not exist — zero rows match

# Step 2: Revert immediately (do NOT reset — this is shared main)
git revert f8a3b2c --no-edit
# Creates: Revert "refactor: simplify fct_orders CTE chain (#52)"

# Step 3: Push the revert — this triggers another deploy
git push origin main

# Step 4: Monitor CI
# watch GitHub Actions — deploy runs dbt run + test
# Tests pass, deploy succeeds

# Step 5: Verify the dashboard recovered
# SELECT COUNT(*) FROM prod.fct_orders WHERE order_date = '2026-03-17'
# Returns: 48,234 rows ← correct

# Step 6: Fix the original PR properly
# Go back to the feature branch, fix the WHERE clause,
# add a test that would have caught this:
# - name: fct_orders
#   tests:
#     - dbt_utils.recency:
#         datepart: day
#         field: order_date
#         interval: 1
#         severity: error
# Re-open the PR with the fix`}</CodeBox>

          <Para>
            Total time from alarm to recovery: 8 minutes. The revert was safe
            because it added a new commit rather than rewriting history — the
            CI/CD pipeline could immediately redeploy it just like any other
            push to main. A git reset would have required a force push,
            coordination with everyone who had pulled main, and risked
            confusing CI about what state to deploy.
          </Para>

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
      <section style={{ marginBottom: 64 }}>
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

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
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

    </LearnLayout>
  )
}