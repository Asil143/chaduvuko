import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { Callout } from '@/components/content/Callout'
import Link from 'next/link'

const C = '#ff4757'

const s = {
  p: { fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 16 } as React.CSSProperties,
  h: { fontSize: 20, fontWeight: 700, color: 'var(--heading)', marginTop: 36, marginBottom: 12 } as React.CSSProperties,
  hl: { color: C, fontWeight: 600 } as React.CSSProperties,
  block: {
    background: 'var(--code-bg)', border: '1px solid var(--border)',
    borderRadius: 8, padding: '16px 20px', fontFamily: 'monospace',
    fontSize: 13, lineHeight: 1.8, marginBottom: 20, whiteSpace: 'pre-wrap' as const,
    overflowX: 'auto' as const,
  },
  table: { width: '100%', borderCollapse: 'collapse' as const, marginBottom: 24, fontSize: 14 },
  th: { background: 'var(--code-bg)', padding: '10px 14px', textAlign: 'left' as const, fontWeight: 600, borderBottom: '2px solid var(--border)' },
  td: { padding: '10px 14px', borderBottom: '1px solid var(--border)', verticalAlign: 'top' as const },
  divider: { border: 'none', borderTop: '1px solid var(--border)', margin: '40px 0' },
  iqBox: { background: 'var(--code-bg)', borderLeft: `4px solid ${C}`, borderRadius: 6, padding: '16px 20px', marginBottom: 20 },
  errBox: { background: '#1a0a0a', borderLeft: '4px solid #ff4757', borderRadius: 6, padding: '16px 20px', marginBottom: 20 },
}

function Part({ children }: { children: React.ReactNode }) { return <div style={{ marginBottom: 48 }}>{children}</div> }
function H({ children }: { children: React.ReactNode }) { return <h2 style={s.h}>{children}</h2> }
function P({ children }: { children: React.ReactNode }) { return <p style={s.p}>{children}</p> }
function Hl({ children }: { children: React.ReactNode }) { return <span style={s.hl}>{children}</span> }
function HR() { return <hr style={s.divider} /> }
function Block({ children }: { children: React.ReactNode }) { return <pre style={s.block}>{children}</pre> }
function IQ({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div style={s.iqBox}>
      <div style={{ fontWeight: 700, color: C, marginBottom: 8 }}>Q: {q}</div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}
function Err({ title, cause, fix }: { title: string; cause: string; fix: string }) {
  return (
    <div style={s.errBox}>
      <div style={{ color: '#ff4757', fontWeight: 700, marginBottom: 6 }}>✗ {title}</div>
      <div style={{ fontSize: 13, color: '#ccc', marginBottom: 4 }}><strong>Why it happens:</strong> {cause}</div>
      <div style={{ fontSize: 13, color: '#ccc' }}><strong>Fix:</strong> {fix}</div>
    </div>
  )
}
function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#0a1a0a', borderLeft: '4px solid #2ed573', borderRadius: 6, padding: '14px 18px', marginBottom: 20, fontSize: 14, color: '#ccc', lineHeight: 1.8 }}>
      <strong style={{ color: '#2ed573' }}>Pro tip:</strong> {children}
    </div>
  )
}

export default function Module20() {
  return (
    <LearnLayout
      title="Secure Coding — Building Software That Does Not Break Under Attack"
      description="Input validation, output encoding, parameterised queries, secrets management, dependency hygiene, SAST/DAST in CI/CD, and threat modelling — the complete developer security toolkit."
      section="Cybersecurity — Module 20"
      readTime="34 min"
      updatedAt="May 2026"
    >
      <Part>
        <P>
          IBM System Sciences Institute measured the cost of fixing a defect at each phase of the software development lifecycle.
          A bug fixed during design costs <Hl>1×</Hl>. The same bug fixed during testing costs <Hl>10×</Hl>.
          Fixed in production after a breach? <Hl>100× or more</Hl> — and that ignores regulatory fines, litigation, and brand damage.
        </P>
        <P>
          Security is not a layer you bolt on after the feature is built. It is a set of habits that cost almost nothing when practiced from the start and enormous amounts when ignored.
          This module teaches those habits: the precise techniques that prevent the vulnerability classes attackers exploit most — SQL injection, XSS, broken authentication, secrets leakage, vulnerable dependencies — and the tooling that catches what human review misses.
        </P>
        <Callout type="info">
          This module targets developers who want to write secure code and security engineers who review it. No prior security expertise required — every concept builds from first principles.
        </Callout>
      </Part>

      <HR />

      <Part>
        <H>The Secure Design Principles Every Developer Must Know</H>
        <P>
          Before any code is written, certain design principles should shape every decision. These are not theoretical ideals — they are the direct ancestors of real controls in real systems.
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Principle</th>
              <th style={s.th}>What it means</th>
              <th style={s.th}>Violation example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Least privilege', 'Every component runs with the minimum permissions needed — nothing more', 'App DB user has CREATE TABLE and DROP rights it never needs'],
              ['Defense in depth', 'Multiple independent controls so one failure does not cause a breach', 'Relying on WAF alone; no input validation in application code'],
              ['Fail securely', 'When errors occur, the system defaults to denying access, not granting it', 'catch(e) {} swallows auth error and lets request through'],
              ['Separation of concerns', 'Authentication, authorisation, business logic, and data access in separate layers', 'Controller directly queries DB and makes auth decisions inline'],
              ['Minimise attack surface', 'Disable unused features, endpoints, ports, and services', 'Admin API exposed on public internet "for convenience"'],
              ['Never trust user input', 'All data from outside the trust boundary is hostile until proven otherwise', 'Using raw query params in SQL strings'],
              ['Avoid security by obscurity', 'Security must not depend on the attacker not knowing implementation details', '"Our API paths are random GUIDs so attackers won\'t find them"'],
              ['Secure defaults', 'Out-of-the-box configuration is the most restrictive that still works', 'Framework ships with debug mode on; developers forget to disable it'],
            ].map(([p, m, v]) => (
              <tr key={p}>
                <td style={{ ...s.td, fontWeight: 600, color: C }}>{p}</td>
                <td style={s.td}>{m}</td>
                <td style={{ ...s.td, fontFamily: 'monospace', fontSize: 13, color: '#aaa' }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ProTip>
          When reviewing a PR, ask one question for each principle: Does this change widen the attack surface? Does it add a new trust boundary crossing without validation? One pass through this list catches 80% of design-level security issues.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>Input Validation — The First Line of Defence</H>
        <P>
          Every piece of data that enters your application from the outside world — HTTP parameters, JSON bodies, headers, cookies, file uploads, environment variables from external systems, data read from a database you did not write — is untrusted.
          <Hl> Input validation </Hl> is the process of enforcing that data conforms to what you expect before it touches any sensitive operation.
        </P>
        <P>
          There are two validation philosophies. <Hl>Allowlist validation</Hl> (also called whitelist) defines exactly what is permitted and rejects everything else. <Hl>Blocklist validation</Hl> defines what is forbidden and permits everything else.
          Allowlist is always stronger — attackers excel at finding characters and encodings that bypass blocklists.
        </P>
        <Block>{`# WEAK — blocklist approach (easy to bypass)
def validate_username(username):
    forbidden = ["'", '"', ";", "--", "/*"]
    for char in forbidden:
        if char in username:
            raise ValueError("Invalid character")
    return username

# Bypass: username = "admin\\x27"  (URL-encoded single quote)
# Or:      username = "admin\\u0027"  (Unicode escape)


# STRONG — allowlist approach
import re

def validate_username(username: str) -> str:
    if not isinstance(username, str):
        raise TypeError("Username must be a string")
    if not 3 <= len(username) <= 32:
        raise ValueError("Username must be 3-32 characters")
    if not re.fullmatch(r'[a-zA-Z0-9_-]+', username):
        raise ValueError("Username may only contain letters, digits, _ and -")
    return username


# For structured data — use a validation library (Pydantic, Zod, Joi)
from pydantic import BaseModel, EmailStr, constr, validator
from typing import Optional

class CreateUserRequest(BaseModel):
    username: constr(min_length=3, max_length=32, pattern=r'^[a-zA-Z0-9_-]+$')
    email: EmailStr
    age: Optional[int] = None

    @validator('age')
    def age_range(cls, v):
        if v is not None and not 13 <= v <= 120:
            raise ValueError('Age must be between 13 and 120')
        return v

# Pydantic raises ValidationError on first invalid field
# with a structured error you can return as 400 Bad Request`}</Block>
        <P>
          Validation must happen <Hl>server-side</Hl>, always. Client-side validation (JavaScript form checks) is a UX convenience — attackers bypass it by sending raw HTTP requests with curl or Burp Suite. Never rely on it as a security control.
        </P>
        <P>
          Special cases that catch developers off guard:
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Input type</th>
              <th style={s.th}>Attack if not validated</th>
              <th style={s.th}>Correct validation</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['File upload', 'Attacker uploads webshell.php disguised as image.jpg', 'Check magic bytes (not extension), restrict MIME types, scan with AV, store outside web root'],
              ['Redirect URL', 'Open redirect: attacker links to your site then redirects to phishing page', 'Allowlist redirect targets or use opaque tokens mapped server-side'],
              ['Integer input', 'Integer overflow, negative quantities, absurdly large values', 'Enforce min/max bounds explicitly; never trust numeric range from client'],
              ['JSON arrays', 'Mass assignment — extra fields overwrite internal fields like role or isAdmin', 'Explicitly declare accepted fields; use a strict schema; never spread raw body onto model'],
              ['Unicode', 'Homograph attacks, case-folding bypasses, null byte injection', 'Normalise to NFC/NFKC before validation; reject null bytes; validate after normalisation'],
            ].map(([t, a, c]) => (
              <tr key={t}>
                <td style={{ ...s.td, fontWeight: 600 }}>{t}</td>
                <td style={{ ...s.td, color: '#ff6b81' }}>{a}</td>
                <td style={s.td}>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ProTip>
          Validate at the system boundary — the HTTP handler or message queue consumer — not deep inside business logic. If validation lives in a utility function called from twelve places, it will eventually be called from a thirteenth place that forgets to invoke it.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>Output Encoding — Preventing Injection at the Output Layer</H>
        <P>
          Input validation controls what enters the system. <Hl>Output encoding</Hl> controls what leaves it safely.
          Injection attacks — XSS, SQL injection, command injection, LDAP injection — all share the same root cause: data is interpreted as code because it was not encoded correctly for its destination context.
        </P>
        <P>
          The key insight is that encoding is <Hl>context-dependent</Hl>. The same string requires different encoding depending on where it is placed:
        </P>
        <Block>{`User input:  O'Brien <script>alert(1)</script>

HTML body context:
  O&#39;Brien &lt;script&gt;alert(1)&lt;/script&gt;
  → &lt; and &gt; prevent tag injection

HTML attribute context (double-quoted):
  O&#39;Brien &lt;script&gt;alert(1)&lt;/script&gt;
  → &#39; prevents attribute break-out

JavaScript string context:
  O\\u0027Brien \\u003cscript\\u003ealert(1)\\u003c\\/script\\u003e
  → Unicode escape prevents script injection

URL query parameter context:
  O%27Brien%20%3Cscript%3Ealert%281%29%3C%2Fscript%3E
  → Percent-encoding for URL safety

CSS property context:
  Never interpolate untrusted data into CSS — no encoding is fully safe here`}</Block>
        <P>
          Modern frameworks handle HTML encoding automatically — React JSX, Django templates, Jinja2, and Angular all HTML-encode by default. The dangerous moments are when you opt out:
        </P>
        <Block>{`// DANGEROUS — React dangerouslySetInnerHTML with unencoded user data
function Comment({ text }) {
  return <div dangerouslySetInnerHTML={{ __html: text }} />  // XSS if text is unsanitised
}

// SAFE — React encodes automatically
function Comment({ text }) {
  return <div>{text}</div>  // React encodes < > & " ' automatically
}

// When you genuinely need to render HTML (e.g., CMS content):
import DOMPurify from 'dompurify'
function RichComment({ html }) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href'],
  })
  return <div dangerouslySetInnerHTML={{ __html: clean }} />
}

// Python — Jinja2 auto-escapes in .html templates
# SAFE:   {{ user.name }}       → auto HTML-encoded
# UNSAFE: {{ user.name | safe }} → bypasses encoding — never use with untrusted data

# For non-HTML contexts, encode explicitly:
import html, urllib.parse, shlex

html.escape(user_input)                     # HTML context
urllib.parse.quote(user_input)              # URL context
shlex.quote(user_input)                     # Shell argument (still prefer subprocess list form)`}</Block>
        <ProTip>
          The rule of thumb: encode for the final interpreter, not the intermediate transport. If the data ends up in JavaScript inside an HTML page, HTML-encode the page AND JavaScript-encode the value within the script block. Double encoding where the contexts nest.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>Parameterised Queries — The Definitive SQL Injection Fix</H>
        <P>
          SQL injection has appeared in the OWASP Top 10 every year since 2003. It is entirely preventable with one technique: <Hl>parameterised queries</Hl> (also called prepared statements). The database driver sends the SQL template and the data separately — the database engine never confuses data with SQL syntax.
        </P>
        <Block>{`# VULNERABLE — string concatenation
def get_user(username):
    query = f"SELECT * FROM users WHERE username = '{username}'"
    return db.execute(query)

# Attack: username = "' OR '1'='1" → dumps all users
# Attack: username = "'; DROP TABLE users; --" → destroys table


# SAFE — parameterised query (Python psycopg2)
def get_user(username: str):
    query = "SELECT id, email, role FROM users WHERE username = %s"
    return db.execute(query, (username,))
    # Driver sends query and data separately — no injection possible


# SAFE — SQLAlchemy ORM (parameterised automatically)
from sqlalchemy import select
stmt = select(User).where(User.username == username)
result = session.execute(stmt)

# SAFE — SQLAlchemy Core with text() for raw SQL
from sqlalchemy import text
stmt = text("SELECT id, email FROM users WHERE username = :username")
result = session.execute(stmt, {"username": username})


# Node.js — pg library
const result = await pool.query(
  'SELECT id, email FROM users WHERE username = $1',
  [username]
)

# Node.js — mysql2
const [rows] = await connection.execute(
  'SELECT id, email FROM users WHERE username = ?',
  [username]
)

# Java — PreparedStatement
PreparedStatement ps = conn.prepareStatement(
  "SELECT id, email FROM users WHERE username = ?"
);
ps.setString(1, username);
ResultSet rs = ps.executeQuery();


# SECOND-ORDER SQL INJECTION — data stored then used in a query later
# Even parameterised inserts don't protect against this pattern:

# Step 1: attacker stores malicious username (safely inserted)
username = "admin'--"
db.execute("INSERT INTO users (username) VALUES (%s)", (username,))

# Step 2: developer later uses stored value without parameterisation
stored = db.fetchone("SELECT username FROM users WHERE id = %s", (user_id,))
# BUG: uses stored value in a new unparameterised query
db.execute(f"SELECT * FROM admins WHERE username = '{stored['username']}'")
# Fix: ALWAYS parameterise, even with "trusted" data from your own DB`}</Block>
        <P>
          Dynamic ORDER BY and table names cannot be parameterised — the database driver only allows data placeholders for values, not identifiers.
          For these cases, use an explicit allowlist:
        </P>
        <Block>{`ALLOWED_SORT_COLUMNS = {'created_at', 'username', 'email', 'score'}
ALLOWED_SORT_DIRS = {'ASC', 'DESC'}

def get_users_sorted(sort_col: str, sort_dir: str):
    if sort_col not in ALLOWED_SORT_COLUMNS:
        sort_col = 'created_at'  # safe default
    if sort_dir.upper() not in ALLOWED_SORT_DIRS:
        sort_dir = 'ASC'
    # Now safe to interpolate — values are controlled by allowlist
    query = f"SELECT * FROM users ORDER BY {sort_col} {sort_dir}"
    return db.execute(query)`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Secrets Management — Keeping Credentials Out of Code</H>
        <P>
          The GitHub Secret Scanning team reports that <Hl>over 1 million secrets</Hl> are accidentally committed to public repositories every year. API keys, database passwords, private keys, and tokens embedded in source code are discovered within minutes by bots that scrape every public commit.
          Even private repositories are at risk — secrets in git history persist after deletion, accessible to every employee and contractor with read access.
        </P>
        <P>
          The core rule: <Hl>secrets never belong in source code</Hl>. Not in comments. Not in test files. Not in config files checked into git. Not in Docker build args. Not in CI/CD logs.
        </P>
        <Block>{`# BAD — hardcoded credentials (found in production codebases constantly)
DATABASE_URL = "postgresql://admin:SuperSecret123@prod-db.example.com/app"
AWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
STRIPE_KEY = "sk_live_EXAMPLE_REPLACE_WITH_REAL_KEY"


# BETTER — environment variables (still risky if env is logged or leaked)
import os
DATABASE_URL = os.environ["DATABASE_URL"]
# Problem: .env files committed, docker-compose.yml with real values, CI logs


# BEST — dedicated secrets manager
# AWS Secrets Manager
import boto3, json

def get_secret(secret_name: str) -> dict:
    client = boto3.client('secretsmanager', region_name='us-east-1')
    response = client.get_secret_value(SecretId=secret_name)
    return json.loads(response['SecretString'])

db_creds = get_secret("prod/myapp/database")
conn = psycopg2.connect(
    host=db_creds["host"],
    user=db_creds["username"],
    password=db_creds["password"],
    dbname=db_creds["dbname"]
)

# HashiCorp Vault
import hvac
client = hvac.Client(url='https://vault.internal:8200', token=os.environ['VAULT_TOKEN'])
secret = client.secrets.kv.v2.read_secret_version(path='myapp/database')
password = secret['data']['data']['password']`}</Block>
        <P>
          Secrets manager patterns to follow in every project:
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Practice</th>
              <th style={s.th}>Why it matters</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Short TTL tokens', 'AWS IAM roles with temporary credentials expire in minutes/hours — stolen creds have a small window'],
              ['Secret rotation', 'Rotate DB passwords, API keys on a schedule (90 days max). Secrets manager can automate Lambda-triggered rotation'],
              ['Audit access logs', 'Every read of a secret is logged — detect unusual access patterns before they become breaches'],
              ['Least-privilege IAM', 'Each service reads only the secrets it needs; a compromised microservice cannot read another service\'s secrets'],
              ['Separate per-environment', 'Prod secrets isolated from staging; dev secrets have no access to production data'],
              ['Pre-commit hooks', 'Run gitleaks or git-secrets before every commit to catch accidental hardcoding locally'],
              ['Scan CI history', 'truffleHog scans git history for high-entropy strings and known secret patterns'],
            ].map(([p, w]) => (
              <tr key={p}>
                <td style={{ ...s.td, fontWeight: 600 }}>{p}</td>
                <td style={s.td}>{w}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Block>{`# Pre-commit hook — add to .git/hooks/pre-commit (or use pre-commit framework)
#!/bin/sh
# Run gitleaks on staged files
gitleaks protect --staged --redact
if [ $? -ne 0 ]; then
  echo "ERROR: Potential secret detected. Commit blocked."
  echo "If false positive, add to .gitleaksignore"
  exit 1
fi

# .pre-commit-config.yaml (pre-commit framework)
repos:
  - repo: https://github.com/zricethezav/gitleaks
    rev: v8.18.0
    hooks:
      - id: gitleaks`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Dependency Management and Supply Chain Security</H>
        <P>
          The average Node.js application has <Hl>over 1,000 transitive dependencies</Hl>. Each one is code you did not write, maintained by people you did not vet, introducing CVEs you did not choose to accept. Supply chain attacks — where attackers compromise a popular package to inject malicious code into thousands of downstream applications — have grown dramatically: the SolarWinds breach, the event-stream npm package backdoor, and the XZ Utils compromise all exploited this vector.
        </P>
        <P>
          <Hl>Software Composition Analysis (SCA)</Hl> tools scan your dependency tree against vulnerability databases (NVD, GitHub Advisory, OSV) and flag packages with known CVEs.
        </P>
        <Block>{`# Python — audit with pip-audit and safety
pip install pip-audit
pip-audit                        # scan installed packages
pip-audit -r requirements.txt    # scan requirements file
pip-audit --fix                  # auto-upgrade vulnerable packages

pip install safety
safety check                     # check against PyPI Safety DB


# Node.js — built-in and third-party
npm audit                        # scan for vulnerabilities
npm audit fix                    # auto-fix where possible
npm audit fix --force            # fix even with breaking changes (review first)

npx snyk test                    # Snyk: deeper analysis + licence checks
npx audit-ci --critical          # fail CI on critical vulns only


# Java — OWASP Dependency-Check
mvn org.owasp:dependency-check-maven:check
# or Gradle:
./gradlew dependencyCheckAnalyze


# Container images — Trivy
trivy image python:3.11           # scan base image
trivy fs .                        # scan filesystem / project
trivy image --severity HIGH,CRITICAL myapp:latest


# GitHub Actions — automated dependency scanning
# Dependabot (dependabot.yml):
version: 2
updates:
  - package-ecosystem: "pip"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10

  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"    # daily for npm — ecosystem moves faster`}</Block>
        <P>
          Lock files (<code>package-lock.json</code>, <code>Pipfile.lock</code>, <code>poetry.lock</code>) pin the exact versions of every dependency including transitive ones. Commit them. Without a lock file, <code>npm install</code> can pull a different (potentially malicious) version on each build.
        </P>
        <P>
          Beyond CVEs, watch for these supply chain attack patterns:
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Attack type</th>
              <th style={s.th}>How it works</th>
              <th style={s.th}>Defence</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Typosquatting', 'Register "reqeusts" or "colourama" — developers typo the install', 'Verify package name, check download count and creation date before installing new packages'],
              ['Dependency confusion', 'Publish a public package with same name as an internal package — package manager pulls the public one', 'Scope internal packages (@company/pkg), set up private registry with upstream proxy'],
              ['Maintainer compromise', 'Attacker compromises a maintainer\'s npm/PyPI account and publishes malicious version', 'Pin to exact versions + hashes in lock file, review diff before upgrading'],
              ['Build system injection', 'Malicious code in build scripts, postinstall hooks, setup.py', 'Run npm install in a sandbox, review postinstall scripts, use --ignore-scripts for known-good packages'],
              ['SBOM manipulation', 'Attacker modifies software bill of materials to hide malicious component', 'Generate SBOM from source at build time with Syft/CycloneDX, sign it with Cosign'],
            ].map(([a, h, d]) => (
              <tr key={a}>
                <td style={{ ...s.td, fontWeight: 600, color: C }}>{a}</td>
                <td style={s.td}>{h}</td>
                <td style={s.td}>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Part>

      <HR />

      <Part>
        <H>Security Testing in CI/CD — Shifting Left</H>
        <P>
          <Hl>Shifting security left</Hl> means catching vulnerabilities in the development pipeline before code reaches production. Three automated test types integrate directly into CI/CD:
        </P>
        <P>
          <Hl>SAST (Static Application Security Testing)</Hl> analyses source code without executing it. It finds SQL injection, hardcoded secrets, path traversal, insecure crypto, and hundreds of other patterns by matching against rule sets. Tools: Semgrep, Bandit (Python), ESLint with security plugins (JS), CodeQL (GitHub), SonarQube.
        </P>
        <P>
          <Hl>DAST (Dynamic Application Security Testing)</Hl> sends attack payloads to a running application. It finds XSS, injection flaws, broken auth, SSRF, and misconfigurations that only appear at runtime. Tools: OWASP ZAP, Nuclei, Burp Suite Enterprise.
        </P>
        <P>
          <Hl>SCA (Software Composition Analysis)</Hl> scans dependencies for known CVEs — covered above with pip-audit, npm audit, Trivy, Snyk.
        </P>
        <Block>{`# GitHub Actions — complete security pipeline

name: Security Pipeline
on: [push, pull_request]

jobs:
  sast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Semgrep SAST — 3,000+ rules for Python, JS, Go, Java, etc.
      - name: Semgrep SAST
        uses: semgrep/semgrep-action@v1
        with:
          config: >-
            p/security-audit
            p/secrets
            p/owasp-top-ten
        env:
          SEMGREP_APP_TOKEN: \${{ secrets.SEMGREP_TOKEN }}

      # Bandit — Python-specific SAST
      - name: Bandit (Python)
        run: |
          pip install bandit
          bandit -r src/ -ll -f json -o bandit-report.json
          # -ll = only medium and high severity

      # Gitleaks — secret scanning
      - name: Gitleaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

  sca:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Trivy vulnerability scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          severity: 'HIGH,CRITICAL'
          exit-code: '1'    # fail pipeline on HIGH/CRITICAL

  dast:
    runs-on: ubuntu-latest
    needs: [build]   # run after app is deployed to staging
    steps:
      - name: ZAP Baseline Scan
        uses: zaproxy/action-baseline@v0.11.0
        with:
          target: 'https://staging.example.com'
          rules_file_name: '.zap/rules.tsv'
          cmd_options: '-a'  # ajax spider for SPAs`}</Block>
        <P>
          Practical integration thresholds to avoid alert fatigue:
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Finding severity</th>
              <th style={s.th}>Action</th>
              <th style={s.th}>Timeline</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Critical (CVSS 9.0+)', 'Block merge, page on-call, treat as P1 incident', 'Fix within 24 hours'],
              ['High (CVSS 7.0–8.9)', 'Block merge to main, create tracked ticket', 'Fix within 7 days'],
              ['Medium (CVSS 4.0–6.9)', 'Create ticket, allow merge with acknowledgement', 'Fix within 30 days'],
              ['Low / Informational', 'Log for review, do not block pipeline', 'Address in quarterly security sprint'],
              ['Secret detected', 'Block merge immediately, rotate the secret', 'Rotate before merge is possible'],
            ].map(([sev, act, time]) => (
              <tr key={sev}>
                <td style={{ ...s.td, fontWeight: 600 }}>{sev}</td>
                <td style={s.td}>{act}</td>
                <td style={{ ...s.td, color: C }}>{time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ProTip>
          Start with SAST and secret scanning on day one — they run in seconds and catch the highest-impact issues cheapest. Add SCA on week one. Add DAST on a staging environment once you have a working deployment pipeline. Trying to add all three at once overwhelms teams with false positives.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>Authentication and Session Security in Code</H>
        <P>
          Authentication flaws are so common because the implementation details matter enormously. Getting 95% right still means accounts are compromised.
        </P>
        <Block>{`# Password storage — NEVER store plaintext or MD5/SHA1

# BAD — MD5 (broken in seconds with rainbow tables)
import hashlib
stored_hash = hashlib.md5(password.encode()).hexdigest()

# BAD — SHA256 without salt (vulnerable to rainbow tables)
stored_hash = hashlib.sha256(password.encode()).hexdigest()

# GOOD — bcrypt (adaptive, built-in salt, work factor)
import bcrypt
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))
# Verify:
bcrypt.checkpw(password.encode(), hashed)

# BETTER — Argon2id (winner of Password Hashing Competition, recommended by OWASP)
from argon2 import PasswordHasher
ph = PasswordHasher(
    time_cost=3,       # iterations
    memory_cost=65536, # 64 MB RAM
    parallelism=4,
    hash_len=32,
    salt_len=16,
)
hashed = ph.hash(password)
# Verify:
try:
    ph.verify(hashed, password)
    if ph.check_needs_rehash(hashed):
        hashed = ph.hash(password)  # upgrade parameters on login
except Exception:
    raise InvalidPasswordError()


# Secure session token generation
import secrets
session_token = secrets.token_urlsafe(32)  # 256 bits of randomness
# NEVER use: random.random(), uuid4() for security tokens, or predictable sequences


# Constant-time comparison — prevents timing attacks on token comparison
import hmac
def verify_token(provided: str, stored: str) -> bool:
    return hmac.compare_digest(
        provided.encode('utf-8'),
        stored.encode('utf-8')
    )
# DO NOT use: provided == stored  (short-circuits, leaks length via timing)


# Session fixation prevention — regenerate session ID on privilege change
# Flask example:
from flask import session
session.clear()                    # clear old session
session.regenerate()               # new session ID
session['user_id'] = user.id       # set new session data after login


# Cookie security flags
Set-Cookie: session=token; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600
# HttpOnly  — JavaScript cannot read the cookie (XSS mitigation)
# Secure    — only sent over HTTPS
# SameSite=Strict — not sent in cross-site requests (CSRF mitigation)
# Max-Age   — explicit expiry`}</Block>
        <ProTip>
          The most common auth mistake in greenfield apps is rolling a custom session system when the framework already provides one. Flask-Login, Django's auth framework, Spring Security — use them. Every line of custom auth code is a potential CVE.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>Cryptography in Code — Using It Without Breaking It</H>
        <P>
          The golden rule of applied cryptography: <Hl>do not implement cryptographic primitives yourself</Hl>. Use high-level libraries. Even expert cryptographers make implementation mistakes. Timing side channels, padding oracle vulnerabilities, nonce reuse — these are subtle and catastrophic.
        </P>
        <Block>{`# Symmetric encryption — AES-GCM (authenticated encryption)
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

key = os.urandom(32)          # 256-bit key — store in secrets manager
aesgcm = AESGCM(key)

# Encrypt
nonce = os.urandom(12)        # 96-bit nonce — NEVER reuse with same key
ciphertext = aesgcm.encrypt(nonce, plaintext, associated_data)

# Decrypt — raises InvalidTag if tampered
plaintext = aesgcm.decrypt(nonce, ciphertext, associated_data)

# BAD — AES-ECB (identical plaintext blocks produce identical ciphertext)
# BAD — AES-CBC without MAC (padding oracle attacks)
# BAD — reusing nonces with GCM (catastrophic — breaks authentication)


# Asymmetric encryption — use X25519 for key exchange, Ed25519 for signing
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey

private_key = Ed25519PrivateKey.generate()
public_key = private_key.public_key()
signature = private_key.sign(message)
public_key.verify(signature, message)  # raises InvalidSignature on failure

# BAD — RSA with PKCS#1 v1.5 padding (ROBOT attack, Bleichenbacher)
# GOOD — RSA with OAEP padding for encryption, PSS for signing
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
ciphertext = public_key.encrypt(message, padding.OAEP(
    mgf=padding.MGF1(algorithm=hashes.SHA256()),
    algorithm=hashes.SHA256(),
    label=None
))


# Hashing — SHA-256 for integrity, not passwords
import hashlib
digest = hashlib.sha256(data).hexdigest()

# HMAC — for message authentication codes
import hmac, hashlib
mac = hmac.new(key, message, hashlib.sha256).digest()
# Verify:
expected = hmac.new(key, received_message, hashlib.sha256).digest()
hmac.compare_digest(mac, expected)  # constant-time


# TLS — let the OS/framework handle it
# Python requests — always verify certs (default True, never set verify=False)
import requests
response = requests.get('https://api.example.com', verify=True)
# Never: verify=False — defeats TLS entirely

# Pinning (for high-security mobile/desktop clients)
from requests_toolbelt.adapters import host_header_ssl
# Or use OS certificate pinning APIs`}</Block>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Use case</th>
              <th style={s.th}>Use this</th>
              <th style={s.th}>Never use</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Password hashing', 'Argon2id, bcrypt (cost ≥ 12), scrypt', 'MD5, SHA-1, SHA-256 (unsalted), custom'],
              ['Symmetric encryption', 'AES-256-GCM, ChaCha20-Poly1305', 'DES, 3DES, AES-ECB, AES-CBC without MAC'],
              ['Key exchange', 'X25519 (ECDH), FFDHE-4096+', 'RSA < 2048, DH < 2048, ECDH P-192'],
              ['Digital signatures', 'Ed25519, ECDSA P-256, RSA-PSS', 'RSA-PKCS#1v1.5, DSA, ECDSA without deterministic k'],
              ['Hashing / integrity', 'SHA-256, SHA-3, BLAKE2', 'MD5, SHA-1, CRC32'],
              ['Random numbers', 'secrets module, os.urandom(), CSPRNG', 'random module, Math.random(), time-seeded PRNGs'],
              ['TLS version', 'TLS 1.3 (TLS 1.2 minimum)', 'SSLv3, TLS 1.0, TLS 1.1'],
            ].map(([u, use, never]) => (
              <tr key={u}>
                <td style={{ ...s.td, fontWeight: 600 }}>{u}</td>
                <td style={{ ...s.td, color: '#2ed573' }}>{use}</td>
                <td style={{ ...s.td, color: '#ff4757' }}>{never}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Part>

      <HR />

      <Part>
        <H>Threat Modelling — Finding Vulnerabilities Before Attackers Do</H>
        <P>
          <Hl>Threat modelling</Hl> is a structured process for identifying what could go wrong in a system before it is built or changed. Done at design time, it costs one meeting and a whiteboard. Done after a breach, it costs millions and reputations.
        </P>
        <P>
          The most widely used framework is <Hl>STRIDE</Hl>, developed by Microsoft. Each letter is a threat category:
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Threat</th>
              <th style={s.th}>Violates</th>
              <th style={s.th}>Example</th>
              <th style={s.th}>Control</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Spoofing', 'Authentication', 'Attacker forges another user\'s JWT', 'Strong auth, signature verification'],
              ['Tampering', 'Integrity', 'Attacker modifies order total in transit', 'HMAC, TLS, signed tokens'],
              ['Repudiation', 'Non-repudiation', 'User denies placing an order they made', 'Immutable audit logs, digital signatures'],
              ['Information Disclosure', 'Confidentiality', 'Error message reveals DB schema', 'Generic errors, TLS, least-privilege DB access'],
              ['Denial of Service', 'Availability', 'Attacker floods endpoint, crashes service', 'Rate limiting, circuit breakers, autoscaling'],
              ['Elevation of Privilege', 'Authorisation', 'Regular user accesses admin endpoint', 'RBAC, ABAC, explicit authorisation checks on every action'],
            ].map(([t, v, e, c]) => (
              <tr key={t}>
                <td style={{ ...s.td, fontWeight: 600, color: C }}>{t}</td>
                <td style={s.td}>{v}</td>
                <td style={s.td}>{e}</td>
                <td style={s.td}>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <P>
          A practical threat modelling session for a new feature takes 60–90 minutes with 3–5 people (developer, security engineer, product manager, architect). The output is a list of threats with mitigations, not a document — a Jira ticket per unmitigated threat is sufficient.
        </P>
        <Block>{`Threat modelling session agenda (90 minutes):

1. Scope (10 min)
   - What are we modelling? New payment flow? Password reset? File upload?
   - Draw a simple data flow diagram: actors → components → data stores
   - Mark trust boundaries: where does data cross from untrusted to trusted?

2. Asset identification (10 min)
   - What is valuable? User PII, payment data, session tokens, private keys
   - What must stay available? Core user journeys

3. Threat enumeration using STRIDE (40 min)
   - Walk each data flow on the diagram
   - For each flow: "Can an attacker Spoof/Tamper/etc. at this boundary?"
   - Don't filter yet — write everything down

4. Risk rating (15 min)
   - DREAD or CVSS-lite: severity × likelihood
   - Identify top 5 risks

5. Mitigations (15 min)
   - For each top risk: what control prevents or detects it?
   - Accept, transfer, mitigate, or avoid
   - Create tickets for unmitigated risks before feature is merged`}</Block>
        <P>
          Tools that automate parts of threat modelling: <Hl>OWASP Threat Dragon</Hl> (free, diagram-driven), <Hl>Microsoft Threat Modeling Tool</Hl> (STRIDE-native), <Hl>IriusRisk</Hl> (enterprise, integrates with Jira).
        </P>
        <ProTip>
          The best time to threat model is when a design document is written, before any code exists. The second best time is during the first PR review for a new feature. By the time code is in production, architectural flaws cost 100× more to fix.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>Error Handling and Logging — Information Leakage and Audit Trails</H>
        <P>
          Error messages are a dual-edged problem. Too much detail and you give attackers a roadmap — stack traces reveal framework versions, file paths, database schemas, and internal logic. Too little detail and developers cannot debug production issues.
        </P>
        <Block>{`# BAD — leaks stack trace, DB schema, file paths to client
@app.errorhandler(Exception)
def handle_error(e):
    return jsonify({
        "error": str(e),
        "traceback": traceback.format_exc(),   # NEVER
        "query": current_query,                 # NEVER
    }), 500

# GOOD — generic client response, detailed internal logging
import uuid, logging

logger = logging.getLogger(__name__)

@app.errorhandler(Exception)
def handle_error(e):
    error_id = str(uuid.uuid4())
    logger.error(
        "Unhandled exception",
        extra={
            "error_id": error_id,
            "error": str(e),
            "traceback": traceback.format_exc(),
            "user_id": g.get("user_id"),
            "path": request.path,
            "method": request.method,
        }
    )
    return jsonify({
        "error": "An unexpected error occurred",
        "error_id": error_id,   # safe: user can report this for support
    }), 500


# Security audit logging — what to log
import json
from datetime import datetime, timezone

def audit_log(event: str, user_id: str | None, details: dict, outcome: str):
    entry = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "event": event,
        "user_id": user_id,
        "outcome": outcome,     # "success" | "failure"
        "details": details,
        "ip": request.remote_addr,
        "user_agent": request.headers.get("User-Agent"),
    }
    security_logger.info(json.dumps(entry))

# Events to always log:
# auth.login_success, auth.login_failure, auth.logout
# auth.mfa_success, auth.mfa_failure
# account.password_change, account.email_change
# authz.access_denied (user tried to access something they shouldn't)
# admin.privilege_granted, admin.user_deleted
# data.export, data.bulk_delete (high-value data operations)

# What NOT to log:
# Passwords (even hashed), session tokens, credit card numbers,
# full SSNs, health data — log the action, not the sensitive value`}</Block>
        <P>
          Log aggregation matters as much as log generation. Logs written to a server that an attacker can then delete are useless for forensics. Ship logs to a centralised SIEM (Splunk, Elastic, Datadog) in real time, with write-once storage.
        </P>
      </Part>

      <HR />

      <Part>
        <H>Workplace Scenario — The Security Review That Saved a Fintech Launch</H>
        <P>
          A fintech startup is three weeks from launching a lending API. A contracted security engineer runs a SAST scan and threat model on the codebase. The findings:
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Finding</th>
              <th style={s.th}>Severity</th>
              <th style={s.th}>Impact</th>
              <th style={s.th}>Fix time</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['AWS RDS password hardcoded in config.py committed to GitHub', 'Critical', 'Full database access — all 12,000 loan applications', '2 hours (rotate secret, move to Secrets Manager)'],
              ['Loan amount parameter not validated — accepts negative values', 'High', 'Attacker requests -$50,000 loan, credits their account', '30 minutes (add min=0 validator)'],
              ['SQL query built with f-string for loan status filter', 'High', 'SQL injection — dump all loan records', '1 hour (parameterise query)'],
              ['Error responses include SQLAlchemy exception with table names', 'Medium', 'Reveals schema, helps attacker craft targeted SQLi', '15 minutes (generic error handler)'],
              ['Session tokens generated with Python random module', 'High', 'Predictable tokens — session hijacking', '20 minutes (replace with secrets.token_urlsafe)'],
              ['No rate limiting on loan application endpoint', 'Medium', 'Automated enumeration of SSNs via timing differences', '2 hours (add rate limiter, normalise response times)'],
            ].map(([f, sev, imp, fix]) => (
              <tr key={f}>
                <td style={s.td}>{f}</td>
                <td style={{ ...s.td, color: sev === 'Critical' ? '#ff4757' : sev === 'High' ? '#ffa502' : '#ffdd59', fontWeight: 600 }}>{sev}</td>
                <td style={s.td}>{imp}</td>
                <td style={{ ...s.td, color: '#2ed573' }}>{fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <P>
          Total remediation time: <Hl>one sprint (two weeks)</Hl>. The hardcoded AWS credential had already been scraped by a GitHub scanner bot — the team rotated it in time. If launched with these vulnerabilities, a single breach would have triggered PCI-DSS and GLBA notification requirements, potential state AG investigation, and class-action exposure for every affected borrower.
        </P>
        <P>
          The security review cost $8,000. The prevented breach would have cost an estimated $2–4 million in fines, remediation, legal, and reputational damage. <Hl>Security is not a cost centre — it is risk transfer.</Hl>
        </P>
      </Part>

      <HR />

      <Part>
        <H>Interview Questions — Secure Coding</H>
        <IQ q="What is the difference between input validation and output encoding, and why do you need both?">
          Input validation enforces that incoming data conforms to expected type, format, length, and range before it enters the system. Output encoding transforms data into a safe representation for its destination context before it leaves the system. You need both because they protect against different attacks at different phases: validation stops malformed data from reaching business logic; encoding prevents valid data from being misinterpreted as code by interpreters like HTML parsers, SQL engines, or shells. A value that passes validation (say, a username containing single quotes) still needs SQL encoding before a query and HTML encoding before a web page.
        </IQ>
        <IQ q="A developer argues that their application is safe from SQL injection because they use an ORM. How do you respond?">
          ORMs parameterise queries by default, which does eliminate most SQL injection. But three cases remain dangerous: (1) raw SQL escape hatches — SQLAlchemy's text(), Django's raw(), ActiveRecord's where() with string interpolation — all bypass ORM parameterisation; (2) second-order injection, where data safely stored gets retrieved and used in a later unparameterised query; (3) dynamic identifiers like ORDER BY column names that ORMs typically cannot parameterise and require allowlist validation. The ORM reduces risk significantly but does not eliminate the need to understand parameterisation or validate dynamic query parts.
        </IQ>
        <IQ q="How do you securely store API keys that your application needs at runtime?">
          At runtime, secrets should be fetched from a dedicated secrets manager (AWS Secrets Manager, HashiCorp Vault, GCP Secret Manager) using the application's IAM identity — no static credentials needed to bootstrap. The application gets a short-lived token (AWS instance profile, Kubernetes ServiceAccount OIDC token) that authorises reading only the specific secrets it needs. Secrets are never in environment variables set at deploy time (visible in CI logs, Kubernetes manifests, process listings), never in config files committed to git, and never in Docker image layers. Access is logged, secrets are rotated on schedule, and each service has least-privilege access to only its own secrets.
        </IQ>
        <IQ q="What is STRIDE and when would you use it?">
          STRIDE is a threat categorisation framework: Spoofing (forging identity), Tampering (modifying data), Repudiation (denying actions), Information Disclosure (exposing confidential data), Denial of Service (disrupting availability), and Elevation of Privilege (gaining unauthorised access). You use it during threat modelling sessions — typically when designing a new feature or reviewing a significant architecture change. You draw a data flow diagram, identify trust boundaries, then systematically ask which STRIDE threats apply at each data flow crossing a boundary. The output is a list of threats with assigned mitigations or accepted risks, tracked as engineering tickets. It transforms "is this secure?" from a vague question into a structured checklist.
        </IQ>
        <IQ q="What should and should not be included in application error messages returned to clients?">
          Client error messages should include a generic description of what went wrong (enough for the user to understand the failure class), an opaque error ID that support staff can use to look up the full details in internal logs, and any user-actionable information (e.g., which field failed validation). They must never include stack traces, database query text, internal file paths, framework versions, exception class names, SQL error messages, or any data that helps an attacker map the system. Internally, log everything — full stack trace, user ID, request parameters, query that failed, server hostname — to a centralised log system the user cannot access. The principle: the client gets just enough to report the problem; the internal system gets everything needed to diagnose it.
        </IQ>
      </Part>

      <HR />

      <Part>
        <H>Common Mistakes — Secure Coding</H>
        <Err
          title="Validating on the client only"
          cause="JavaScript form validation is bypassed by sending raw HTTP requests — any attacker uses curl or Burp Suite to skip it entirely. Developers sometimes mistake client-side validation for a security control."
          fix="All validation must happen server-side. Client-side validation is a UX nicety. The server is the only trust boundary — treat all incoming data as hostile regardless of what the client claims to have validated."
        />
        <Err
          title="Using == for token comparison (timing attack)"
          cause="String equality short-circuits on the first non-matching character. By measuring response time across many requests, an attacker can determine the correct token one character at a time, eventually brute-forcing it without ever seeing it."
          fix="Always use hmac.compare_digest() (Python), crypto.timingSafeEqual() (Node), or your language's equivalent constant-time comparison for any security-sensitive comparison: tokens, HMAC digests, session IDs."
        />
        <Err
          title="Logging sensitive data"
          cause="Developers add debug logging during development and forget to remove it, or log entire request bodies 'for debugging' — capturing passwords, session tokens, credit card numbers, and PII in plaintext log files accessible to anyone with log access."
          fix="Establish a logging policy: log the action and outcome, never the sensitive value. Audit log pipelines regularly with a secrets scanner. In structured logging, explicitly list allowed fields and reject everything else. Treat log files as sensitive data stores with appropriate access controls."
        />
        <Err
          title="Catching exceptions and continuing silently"
          cause="catch (e) {} or except: pass swallows errors silently. If an authentication check throws an exception and the catch block allows the request to proceed, the application silently bypasses auth — the most dangerous possible fail mode."
          fix="Follow the 'fail securely' principle: exceptions in security checks must deny access, not grant it. Log the exception with full context and return a generic error to the client. Never let an error in a security control default to open."
        />
        <Err
          title="Storing secrets in environment variables set in CI/CD configuration"
          cause="CI/CD systems like GitHub Actions, Jenkins, and CircleCI often log environment variables in build output, expose them to all jobs in a pipeline, or make them readable via the configuration API. Storing production secrets in CI environment variables creates broad exposure."
          fix="Use a secrets manager (AWS Secrets Manager, Vault) and have the application fetch secrets at runtime using its IAM identity. For CI/CD pipelines specifically, use the platform's secrets store (GitHub Encrypted Secrets, not environment variables in .yml files) and scope them to specific workflows and environments."
        />
      </Part>

      <HR />

      <KeyTakeaways items={[
        'Fixing a security bug at design time costs 1× — in production after a breach it costs 100×. Security is a design activity, not a testing activity.',
        'Allowlist validation (permit known-good) is always stronger than blocklist validation (deny known-bad) — attackers find encodings that bypass blocklists.',
        'Output encoding is context-dependent: HTML, SQL, shell, URL, and JavaScript contexts each require different encoding. Encode for the final interpreter.',
        'Parameterised queries completely eliminate SQL injection for value parameters. Dynamic identifiers (column names, table names) require explicit allowlisting.',
        'Secrets never belong in source code, config files, or environment variables set at deploy time. Use a dedicated secrets manager with IAM-based access and short-lived credentials.',
        'Lock files (package-lock.json, Pipfile.lock) pin exact transitive dependency versions — commit them. Run SCA tools (npm audit, pip-audit, Trivy) in CI to catch CVEs.',
        'SAST (Semgrep, CodeQL) runs in seconds and catches injection flaws, hardcoded secrets, and insecure patterns without executing code. Add it to every CI pipeline.',
        'STRIDE threat modelling at design time costs one meeting. Walking STRIDE through a data flow diagram systematically identifies threats before a line of code is written.',
        'Error messages should be generic to clients but detailed internally. Log full context (stack trace, user ID, query) to your SIEM; return only an opaque error ID to users.',
        'Constant-time comparison (hmac.compare_digest) is mandatory for security token comparison — timing attacks can reconstruct tokens one character at a time from response time differences.',
      ]} />

      <HR />

      <Callout type="info">
        Secure coding is the defensive foundation — you understand how vulnerabilities are born and prevented. In{' '}
        <Link href="/learn/cybersecurity/penetration-testing-methodology">
          Module 21: Penetration Testing Methodology
        </Link>
        , you switch to the offensive side: how professional pentesters plan and execute engagements, the five-phase methodology, rules of engagement, scoping, reporting, and the legal and ethical framework that separates authorised security testing from criminal hacking.
      </Callout>
    </LearnLayout>
  )
}
