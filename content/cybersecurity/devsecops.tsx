import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { Callout } from '@/components/content/Callout'

const C = '#ff4757'

const Part = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 48 }}>
    <h2 style={{ fontSize: 22, fontWeight: 700, color: C, marginBottom: 16 }}>{title}</h2>
    {children}
  </div>
)
const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 8, marginTop: 24 }}>{children}</h3>
)
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 14 }}>{children}</p>
)
const Hl = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: C, fontWeight: 600 }}>{children}</span>
)
const HR = () => <hr style={{ border: 'none', borderTop: `1px solid ${C}22`, margin: '32px 0' }} />
const Block = ({ children }: { children: React.ReactNode }) => (
  <pre style={{
    background: 'var(--code-bg, #1a1a2e)', color: '#e2e8f0', borderRadius: 8,
    padding: '16px 20px', fontSize: 13, overflowX: 'auto', marginBottom: 20,
    border: `1px solid ${C}33`, lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word'
  }}>{children}</pre>
)
const IQ = ({ q, a }: { q: string; a: string }) => (
  <div style={{ background: `${C}11`, border: `1px solid ${C}44`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
    <div style={{ color: C, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Interview Question</div>
    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, color: 'var(--text)' }}>{q}</div>
    <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{a}</div>
  </div>
)
const Err = ({ title, bad, good }: { title: string; bad: string; good: string }) => (
  <div style={{ background: '#1a0a0a', border: `1px solid ${C}66`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
    <div style={{ color: C, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Common Mistake — {title}</div>
    <div style={{ fontSize: 13, marginBottom: 4 }}><span style={{ color: '#ff6b6b' }}>Bad: </span><span style={{ color: '#ccc' }}>{bad}</span></div>
    <div style={{ fontSize: 13 }}><span style={{ color: '#51cf66' }}>Good: </span><span style={{ color: '#ccc' }}>{good}</span></div>
  </div>
)
const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#0a1628', border: '1px solid #1e40af', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 14, color: '#93c5fd', lineHeight: 1.8 }}>
    <span style={{ fontWeight: 700 }}>Pro Tip: </span>{children}
  </div>
)

export default function Module35() {
  return (
    <LearnLayout
      title="DevSecOps — Security Embedded in the Pipeline"
      description="Embed security into every phase of the SDLC without slowing delivery. Build SAST/DAST/SCA gates, secure CI/CD pipelines, scan infrastructure-as-code, manage secrets, and build a security culture where developers own security outcomes."
      section="Cybersecurity — Module 35"
      readTime="38 min"
      updatedAt="May 2026"
    >

      <Part title="What Is DevSecOps?">
        <P>
          DevSecOps integrates security practices into the DevOps workflow — making security a shared responsibility across development, operations, and security teams rather than a gating function that sits at the end. The goal is to catch and fix security issues as early as possible in the development lifecycle, where fixes are cheapest.
        </P>
        <P>
          The core shift: security moves from <Hl>"gate at the end"</Hl> (slow, confrontational, finds issues too late) to <Hl>"guardrail throughout"</Hl> (fast, collaborative, fixes issues when context is fresh). Developers do not become security experts; security becomes part of their normal workflow.
        </P>

        <H>The DevSecOps Toolchain by Phase</H>
        <Block>{`SDLC Phase        | Security Activity              | Key Tools
─────────────────────────────────────────────────────────────────
Plan / Design     | Threat modelling                | OWASP Threat Dragon, Miro
                  | Security requirements            | OWASP ASVS
─────────────────────────────────────────────────────────────────
Code              | IDE security plugins            | Semgrep, Snyk (IDE)
                  | Pre-commit hooks                | gitleaks, detect-secrets
─────────────────────────────────────────────────────────────────
Build / CI        | SAST (Static Analysis)          | Semgrep, CodeQL, Checkmarx
                  | SCA (dependency vuln)           | Trivy, Snyk, OWASP DC
                  | Secret scanning                 | Gitleaks, TruffleHog
                  | Container image scanning        | Trivy, Grype, Clair
                  | IaC scanning                    | Checkov, tfsec, KICS
─────────────────────────────────────────────────────────────────
Test / DAST       | DAST (Dynamic Analysis)         | OWASP ZAP, Burp Suite
                  | API security testing            | ZAP API scan, Dredd
─────────────────────────────────────────────────────────────────
Deploy            | Image signing                   | Cosign, Notary
                  | Runtime policy enforcement      | OPA/Gatekeeper, Kyverno
─────────────────────────────────────────────────────────────────
Operate           | Runtime security monitoring     | Falco, Sysdig
                  | CSPM (cloud posture)            | Wiz, Orca, AWS Security Hub
                  | VM scanning                     | Tenable, Qualys
─────────────────────────────────────────────────────────────────
Monitor / Respond | SIEM, EDR, threat hunting       | Splunk, CrowdStrike (Module 31/34)`}
        </Block>

        <H>Security Champions Programme</H>
        <P>
          A Security Champions programme embeds one or two security-enthusiastic developers in each engineering team. They are <Hl>not security experts</Hl> — they are a bridge, translating security requirements into developer language, running threat models in sprint planning, and being the first call when the SAST scanner fires.
        </P>
        <Block>{`Security Champions model:

Role: Developer in an engineering team, not a separate security team member
Time: 10-20% of their sprint allocation

Responsibilities:
  - Run threat model sessions for new features (30-min structured session)
  - Triage SAST/SCA findings for their team — filter false positives
  - Review PR security concerns (not a full security review — spot check)
  - Attend monthly champions meeting (share patterns, get training)
  - Escalate to central security team when needed

Security team's role:
  - Run training programme (quarterly workshops)
  - Provide tooling and runbooks
  - Handle escalations and policy questions
  - NOT: review every PR, block every deployment

Metrics to track:
  - Time from SAST finding to ticket creation (target: same day)
  - Champion engagement: attendance, PRs reviewed
  - Security debt trend by team`}
        </Block>

        <IQ
          q="What is the difference between SAST, DAST, and SCA? When do you use each?"
          a="SAST (Static Application Security Testing) analyses source code without running it — like a security-aware code review. It catches issues in code logic: SQL injection, hardcoded secrets, insecure function calls. Run it in CI on every commit. Fast, no running app needed, but produces false positives and misses runtime-only issues. DAST (Dynamic Application Security Testing) tests a running application by sending attack payloads — like a lightweight automated penetration test. It finds issues SAST cannot: authentication bypasses, server-side logic issues, real injection vulnerabilities in the running context. Run it against a staging environment after deployment. SCA (Software Composition Analysis) inventories third-party dependencies and checks them against CVE databases. It finds vulnerabilities in the libraries you use, not the code you write. Run it in CI. Together they provide layered coverage: SAST finds code-quality security issues early, SCA finds dependency risk continuously, and DAST validates the running application before production promotion."
        />
      </Part>

      <HR />

      <Part title="SAST — Static Analysis in CI">
        <P>
          SAST tools analyse source code for security issues without executing it. They are fast enough to run on every commit and give developers immediate feedback at the point of introduction — when context is fresh and the fix is straightforward.
        </P>

        <H>Semgrep — Rules-Based SAST</H>
        <Block>{`# Install Semgrep
pip install semgrep

# Scan with OWASP Top 10 ruleset
semgrep --config "p/owasp-top-ten" ./src/

# Scan with multiple rulesets
semgrep --config "p/python" --config "p/javascript" --config "p/secrets" ./

# Run with SARIF output (for GitHub Code Scanning upload)
semgrep --config "p/owasp-top-ten" --sarif --output semgrep.sarif ./

# Custom rule — detect hardcoded AWS credentials
# File: rules/hardcoded_aws.yml
rules:
  - id: hardcoded-aws-access-key
    patterns:
      - pattern: |
          $KEY = "AKIA..."
    message: "Hardcoded AWS access key detected. Use environment variables or secrets manager."
    languages: [python, javascript, typescript, go, java]
    severity: ERROR
    metadata:
      cwe: "CWE-798: Use of Hard-coded Credentials"
      owasp: "A07:2021 - Identification and Authentication Failures"

semgrep --config rules/hardcoded_aws.yml ./`}
        </Block>

        <H>CodeQL — Deep Semantic Analysis</H>
        <Block>{`# CodeQL analyses code as a database of relationships — finds complex multi-step vulnerabilities
# Free for open source; GitHub Advanced Security for private repos

# GitHub Actions — CodeQL analysis
name: CodeQL Analysis
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * 1'     # weekly full scan

jobs:
  analyze:
    runs-on: ubuntu-latest
    permissions:
      security-events: write
      actions: read
    strategy:
      matrix:
        language: [javascript, python]   # add java, go, csharp, ruby, swift as needed
    steps:
      - uses: actions/checkout@v4
      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: \${{ matrix.language }}
          queries: security-extended    # more rules than default
      - name: Autobuild
        uses: github/codeql-action/autobuild@v3
      - name: Run CodeQL analysis
        uses: github/codeql-action/analyze@v3
        with:
          category: "/language:\${{ matrix.language }}"
          output: results/
          upload: true`}
        </Block>

        <H>Managing SAST False Positives</H>
        <Block>{`SAST false positive management strategy:

Rule 1: Never suppress without investigation
  Bad:  # nosemgrep: hardcoded-password  (blindly suppressing)
  Good: Understand WHY it fired, confirm it is a FP, document why

Rule 2: Suppress at rule level with justification
  # Python Semgrep suppression (inline)
  password_check = validate_password(input_pw)  # nosemgrep: hardcoded-password
  # This is a function call, not a hardcoded value — rule is confused by variable name

Rule 3: Track suppression rate
  - High suppression rate = bad rule (tune or disable)
  - Low suppression rate = rule is high-value (keep)

Rule 4: Create team-specific baselines
  - First run: scan existing code, baseline all existing findings
  - Going forward: only NEW findings block the build
  - Existing findings tracked separately for remediation sprint

Rule 5: Monthly FP review with champions
  - Review top 10 most-suppressed rules
  - Tune or remove rules with > 80% FP rate`}
        </Block>
      </Part>

      <HR />

      <Part title="SCA — Software Composition Analysis">
        <P>
          Open source makes up 70-90% of modern application code. SCA tools inventory these dependencies and alert when known vulnerabilities are discovered in them. <Hl>Supply chain attacks have made SCA more critical than ever</Hl> — attackers now target libraries used by thousands of downstream applications.
        </P>

        <H>Dependency Scanning with Trivy and Snyk</H>
        <Block>{`# Trivy — fast, comprehensive, open-source SCA
# Scan application dependencies
trivy fs . --scanners vuln --severity CRITICAL,HIGH --format table
trivy fs . --scanners vuln --format sarif --output trivy.sarif

# Scan a container image
trivy image python:3.11-slim --severity CRITICAL,HIGH

# Scan with secret detection and IaC
trivy fs . --scanners vuln,misconfig,secret

# JSON output for CI integration
trivy fs . --format json --output trivy-results.json
python -c "
import json
data = json.load(open('trivy-results.json'))
for result in data.get('Results', []):
    for vuln in result.get('Vulnerabilities', []):
        if vuln['Severity'] in ['CRITICAL', 'HIGH']:
            print(f\"{vuln['VulnerabilityID']}: {vuln['PkgName']} {vuln.get('InstalledVersion')} -> {vuln.get('FixedVersion', 'no fix')} [{vuln['Severity']}]\")
"

# Snyk CLI (free tier available, better developer UX)
npm install -g snyk
snyk auth                           # authenticate
snyk test                           # scan current project
snyk test --severity-threshold=high # only fail on high+
snyk monitor                        # continuous monitoring (sends to Snyk cloud)
snyk container test nginx:latest    # container scanning`}
        </Block>

        <H>OWASP Dependency Check</H>
        <Block>{`# OWASP Dependency-Check — mature, Java-based, supports many ecosystems
# Download: https://owasp.org/www-project-dependency-check/

dependency-check --scan ./lib/ --format HTML --out reports/
dependency-check --scan pom.xml --format JSON --out reports/

# Maven plugin (Java projects)
# Add to pom.xml:
# <plugin>
#   <groupId>org.owasp</groupId>
#   <artifactId>dependency-check-maven</artifactId>
#   <version>9.0.0</version>
#   <configuration>
#     <failBuildOnCVSS>7</failBuildOnCVSS>  <!-- fail on CVSS >= 7 -->
#   </configuration>
# </plugin>
mvn dependency-check:check

# npm audit (built-in, run in any Node.js project)
npm audit
npm audit --audit-level=high     # exit non-zero only on high+
npm audit fix                    # auto-fix compatible updates
npm audit fix --force            # fix including breaking changes (review carefully)`}
        </Block>

        <H>Supply Chain Security</H>
        <Block>{`Supply chain attack vectors and mitigations:

THREAT: Malicious package published with typosquatted name
  (e.g., "colourama" instead of "colorama")
MITIGATION:
  - Use exact package names and versions in lock files
  - Enable private registry mirroring (Artifactory, Nexus)
  - Require package hash verification in requirements.txt / package-lock.json

THREAT: Compromised maintainer account — malicious code injected into legit package
  (SolarWinds, XZ Utils, event-stream incidents)
MITIGATION:
  - Pin to specific commit hash or verified release tag, not mutable version tag
  - Enable Dependabot / Renovate for automated update PRs with diff review
  - Audit major dependency updates manually before merging

THREAT: Dependency confusion — private package name scooped by attacker on public registry
  (Alex Birsan's 2021 research — affected Apple, Microsoft, PayPal)
MITIGATION:
  - Register your private package names on public registries (empty placeholder)
  - Use scoped packages (@company/package-name)
  - Configure pip/npm to use private registry with fallback disabled

# Sigstore — cryptographically sign and verify release artefacts
# Verify a Python package signature
pip install sigstore
python -m sigstore verify identity \
  --bundle package.sigstore \
  --cert-identity maintainer@example.com \
  --cert-oidc-issuer https://accounts.google.com \
  package-1.0.tar.gz`}
        </Block>
      </Part>

      <HR />

      <Part title="Secrets Management in CI/CD">
        <P>
          Secrets (API keys, database passwords, TLS certificates, cloud credentials) are the most common cause of cloud breaches. <Hl>A secret committed to a Git repository — even briefly — must be treated as permanently compromised</Hl>: GitHub indexes all public repos immediately and attackers scan for leaked secrets in near-real-time.
        </P>

        <H>Preventing Secrets from Entering Version Control</H>
        <Block>{`# Pre-commit hook — gitleaks scans every commit before it is recorded
# Install gitleaks
brew install gitleaks

# Manual scan — check entire repo history
gitleaks detect --source . --verbose

# Scan staged changes only (for pre-commit hook use)
gitleaks protect --staged

# Install as pre-commit hook (using pre-commit framework)
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.4
    hooks:
      - id: gitleaks

# detect-secrets — alternative, integrates well with Python projects
pip install detect-secrets
detect-secrets scan > .secrets.baseline    # baseline known non-secrets
detect-secrets scan --baseline .secrets.baseline  # only flag new findings

# TruffleHog — scans git history for secrets (GitHub Actions integration)
trufflehog git file://. --only-verified   # only report verified live secrets`}
        </Block>

        <H>Secrets in CI/CD Pipelines</H>
        <Block>{`# GitHub Actions — correct secrets usage
jobs:
  deploy:
    steps:
      - name: Deploy to AWS
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: aws s3 sync ./dist s3://my-bucket/

# NEVER do this in GitHub Actions:
# run: aws configure set aws_access_key_id AKIAIOSFODNN7EXAMPLE  (hardcoded!)
# run: echo $MY_SECRET     (leaks secret to logs)

# Log masking: GitHub automatically masks values of secrets
# But: if you split/transform a secret, the masked value changes and may leak
# Example of what NOT to do:
# run: echo \${{ secrets.API_KEY }} | cut -c1-5  (partial key may appear in logs)

# HashiCorp Vault — enterprise secrets management
# Inject secrets at runtime, not at build time
vault kv get -field=password secret/myapp/database

# GitHub Actions + Vault (OIDC — no long-lived credentials needed)
- name: Import Vault Secrets
  uses: hashicorp/vault-action@v3
  with:
    url: https://vault.company.com
    method: jwt
    role: github-actions-role
    secrets: |
      secret/data/myapp/database password | DB_PASSWORD ;
      secret/data/myapp/api key | API_KEY`}
        </Block>

        <H>Responding to a Leaked Secret</H>
        <Block>{`Leaked secret response (treat as immediate P1):

Step 1 — Revoke IMMEDIATELY (do not wait to confirm misuse)
  - AWS key: aws iam delete-access-key --access-key-id AKIA...
  - GitHub token: Settings > Developer settings > Personal access tokens > Revoke
  - Database password: ALTER USER app_user WITH PASSWORD 'new_secure_password';

Step 2 — Audit usage (what happened while it was exposed?)
  - AWS: CloudTrail logs for the compromised key
  - GitHub: audit log for the token's activity
  - GCP: Cloud Audit Logs

Step 3 — Remove from git history
  # git-filter-repo (preferred — replaces BFG Repo Cleaner)
  pip install git-filter-repo
  git filter-repo --path-glob '*.env' --invert-paths
  git filter-repo --replace-text <(echo "AKIA_BADKEY==>REDACTED")
  git push --force  # force push after history rewrite

  # IMPORTANT: All collaborators must re-clone — their local copies still have the secret
  # GitHub: contact support to purge cached views

Step 4 — Issue new secret and rotate dependent systems
Step 5 — Add detection: gitleaks pre-commit hook + TruffleHog in CI`}
        </Block>

        <IQ
          q="A developer accidentally committed an AWS access key to a public GitHub repository. What do you do?"
          a="The response is immediate and follows a strict order. First: revoke the key right now — do not wait to check whether it was used. Use aws iam delete-access-key or the AWS console. The key is compromised the moment it is public; GitHub bots scrape public repositories within seconds. Second: check CloudTrail for any actions taken with that key — look for CreateUser, AttachPolicy, RunInstances, or data access events. This determines whether you have a breach to investigate or just a leak to clean up. Third: remove the key from git history using git-filter-repo and force-push (notify all collaborators to re-clone). Contact GitHub support to purge cached views. Fourth: issue a new key, update all systems using the old key, and implement prevention: gitleaks pre-commit hook, TruffleHog in CI, and developer education."
        />
      </Part>

      <HR />

      <Part title="Container and Kubernetes Security">
        <P>
          Container security starts with the image and extends through the runtime. A misconfigured container running as root with host networking is often more dangerous than a vulnerable dependency inside it.
        </P>

        <H>Secure Dockerfile Practices</H>
        <Block>{`# Insecure Dockerfile — 5 problems
FROM ubuntu:latest              # mutable tag — breaks reproducibility
RUN apt-get install python3 -y  # installs without pinning versions
COPY . /app
RUN pip install -r requirements.txt
EXPOSE 22                       # SSH in a container — always wrong
USER root                       # explicitly running as root
CMD ["python", "app.py"]

# Secure Dockerfile — all problems fixed
FROM python:3.11.9-slim         # pinned version, minimal base
WORKDIR /app

# Install dependencies as root (required), then drop privileges
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY --chown=appuser:appuser . .

# Create non-root user (before COPY if possible)
RUN groupadd -r appuser && useradd -r -g appuser appuser
USER appuser                    # run as non-root

EXPOSE 8080                     # document the port used, not SSH
HEALTHCHECK --interval=30s --timeout=5s CMD curl -f http://localhost:8080/health || exit 1
CMD ["python", "-u", "app.py"]`}
        </Block>

        <H>Kubernetes Security — Pod Security Standards</H>
        <Block>{`# Kubernetes Pod Security Standards (PSS) — built-in policy framework
# Three profiles: Privileged, Baseline, Restricted

# Apply Restricted profile to a namespace (denies privilege escalation)
kubectl label namespace production pod-security.kubernetes.io/enforce=restricted
kubectl label namespace production pod-security.kubernetes.io/warn=restricted

# Secure Pod spec — enforces all Restricted profile requirements
apiVersion: v1
kind: Pod
metadata:
  name: secure-app
spec:
  securityContext:
    runAsNonRoot: true           # reject if container tries to run as root
    runAsUser: 1000              # specific UID
    runAsGroup: 3000
    fsGroup: 2000
    seccompProfile:
      type: RuntimeDefault       # restrict syscalls to default profile
  containers:
  - name: app
    image: myapp:1.2.3@sha256:abc123...  # pin by digest (immutable)
    securityContext:
      allowPrivilegeEscalation: false   # no sudo/setuid
      readOnlyRootFilesystem: true      # prevent in-container modification
      capabilities:
        drop: ["ALL"]                   # drop all Linux capabilities
    resources:
      limits:
        memory: "256Mi"
        cpu: "500m"
      requests:
        memory: "128Mi"
        cpu: "100m"`}
        </Block>

        <H>Runtime Security with Falco</H>
        <Block>{`# Falco — runtime security monitoring for containers and Linux hosts
# Detects anomalous behaviour at kernel syscall level

# Install Falco (Helm chart — Kubernetes)
helm repo add falcosecurity https://falcosecurity.github.io/charts
helm install falco falcosecurity/falco --namespace falco --create-namespace \
  --set driver.kind=ebpf \
  --set falcosidekick.enabled=true \
  --set falcosidekick.config.slack.webhookurl=https://hooks.slack.com/...

# Example Falco rules (in /etc/falco/falco_rules.yaml):

# Alert: shell spawned in a container
- rule: Shell Spawned in Container
  desc: A shell was spawned in a container
  condition: >
    spawned_process and container and
    proc.name in (shell_binaries) and
    not proc.pname in (shell_binaries) and
    not container.image.repository in (allowed_shell_images)
  output: >
    Shell spawned in container (container=%container.name
    image=%container.image.repository cmd=%proc.cmdline
    user=%user.name)
  priority: WARNING
  tags: [container, shell, T1059]

# Alert: sensitive file read in container
- rule: Read sensitive file in container
  desc: Attempt to read sensitive host file in container
  condition: >
    open_read and container and
    fd.name in (/etc/shadow, /etc/passwd, /root/.ssh/authorized_keys)
  output: "Sensitive file read (container=%container.name file=%fd.name)"
  priority: ERROR`}
        </Block>

        <H>OPA/Gatekeeper — Policy as Code</H>
        <Block>{`# Open Policy Agent (OPA) + Gatekeeper enforce Kubernetes admission policies
# Gatekeeper intercepts every resource creation and runs OPA policy

# ConstraintTemplate — define the policy rule
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8srequiredlabels
spec:
  crd:
    spec:
      names:
        kind: K8sRequiredLabels
      validation:
        openAPIV3Schema:
          properties:
            labels:
              type: array
              items: {type: string}
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8srequiredlabels
        violation[{"msg": msg}] {
          provided := {label | input.review.object.metadata.labels[label]}
          required := {label | label := input.parameters.labels[_]}
          missing := required - provided
          count(missing) > 0
          msg := sprintf("Missing required labels: %v", [missing])
        }

# Constraint — apply the policy
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRequiredLabels
metadata:
  name: require-owner-label
spec:
  match:
    kinds:
      - apiGroups: ["apps"]
        kinds: ["Deployment"]
  parameters:
    labels: ["owner", "env", "team"]`}
        </Block>

        <IQ
          q="How do you handle the tension between security gates and developer velocity in a DevSecOps programme?"
          a="The key principle is: security gates should be fast, actionable, and have a low false positive rate — or developers will route around them. Four specific practices. First, run fast gates in the pull request (SAST, secret scanning, dependency check) and keep them under 5 minutes — anything slower gets disabled. Second, baseline existing findings and only gate on new findings; blocking a PR for 3-year-old issues creates resentment without safety benefit. Third, fix false positives aggressively — every acknowledged false positive that a developer has to suppress erodes trust in the tool. Fourth, make the fix easy: link directly from the failing gate to remediation guidance. A gate that says 'SQL injection found in file.py:42 — here is how to fix it' gets fixed; a gate that says 'critical vulnerability detected' gets bypassed. The goal is not zero deployment failures from security — it is developers learning to write secure code because the feedback is fast and useful."
        />
      </Part>

      <HR />

      <Part title="Infrastructure as Code Security">
        <P>
          IaC (Terraform, CloudFormation, Kubernetes YAML, Helm) defines infrastructure programmatically — which means infrastructure misconfigurations can be caught in code review before they are deployed. IaC scanning applies the same shift-left principle to infrastructure that SAST applies to application code.
        </P>

        <H>Checkov — Multi-Framework IaC Scanner</H>
        <Block>{`# Checkov scans Terraform, CloudFormation, Kubernetes, Dockerfiles, ARM, Bicep
pip install checkov

# Scan a Terraform directory
checkov -d ./terraform/ --framework terraform

# Scan with specific checks only
checkov -d ./terraform/ --check CKV_AWS_18,CKV_AWS_21

# Scan Kubernetes manifests
checkov -d ./kubernetes/ --framework kubernetes

# Example findings Checkov catches:
# CKV_AWS_18: S3 bucket should have access logging enabled
# CKV_AWS_21: S3 bucket should have versioning enabled
# CKV_AWS_78: EKS cluster should have secrets encryption enabled
# CKV_K8S_14: Container should not run with allowPrivilegeEscalation = true
# CKV_K8S_28: Container should not run in privileged mode

# GitHub Actions — Checkov in CI
- name: Run Checkov IaC scan
  uses: bridgecrewio/checkov-action@master
  with:
    directory: terraform/
    framework: terraform
    output_format: sarif
    output_file_path: results.sarif
    soft_fail: false    # fail the build on HIGH+ findings`}
        </Block>

        <H>Terraform Security Patterns</H>
        <Block>{`# Insecure S3 bucket (common misconfiguration)
resource "aws_s3_bucket" "data" {
  bucket = "company-data"
}
# Missing: public access block, versioning, encryption, logging

# Secure S3 bucket (all controls applied)
resource "aws_s3_bucket" "data" {
  bucket = "company-data-prod"
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket = aws_s3_bucket.data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "data" {
  bucket = aws_s3_bucket.data.id
  versioning_configuration { status = "Enabled" }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "data" {
  bucket = aws_s3_bucket.data.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.s3_key.arn
    }
  }
}

resource "aws_s3_bucket_logging" "data" {
  bucket        = aws_s3_bucket.data.id
  target_bucket = aws_s3_bucket.logs.id
  target_prefix = "s3-access-logs/"
}`}
        </Block>

        <H>Cloud Security Posture Management (CSPM)</H>
        <Block>{`CSPM tools continuously scan cloud infrastructure for misconfigurations:

Commercial (widely used in enterprise):
  - Wiz: agentless, visualises entire cloud attack surface + blast radius
  - Orca Security: similar agentless approach, strong compliance reporting
  - Prisma Cloud: Palo Alto product, broad compliance framework coverage

AWS-native (free with AWS):
  - AWS Security Hub: aggregates findings from GuardDuty, Inspector, Config, Macie
  - AWS Config: tracks resource configuration changes, runs conformance packs
  - Amazon GuardDuty: ML-based threat detection on CloudTrail, VPC Flow, DNS logs
  - Amazon Inspector: EC2 + ECR vulnerability scanning, agentless

Multi-cloud open-source:
  - Prowler: CLI tool, 500+ checks, outputs CSV/JSON/HTML
  - ScoutSuite: multi-cloud security auditing tool
  - CloudSploit: open-source CSPM

# Prowler — run all AWS checks
pip install prowler
prowler aws --output-formats html,json

# AWS Security Hub — enable all standards
aws securityhub enable-security-hub --enable-default-standards
aws securityhub enable-standards \
  --standards-subscription-requests \
    StandardsArn=arn:aws:securityhub:::ruleset/cis-aws-foundations-benchmark/v/1.4.0`}
        </Block>

        <Err
          title="Treating IaC security as a one-time audit"
          bad="Run Checkov once when setting up Terraform, fix the findings, then never run it again. New resources added by any team member are never scanned."
          good="IaC scanning must run in CI on every pull request that modifies infrastructure code. New resources inherit the same scrutiny as existing ones. Set a policy that Terraform plan cannot be applied without a clean Checkov scan — enforce this via a required CI job that gates the merge."
        />

        <Err
          title="Using * (wildcard) in IAM policies"
          bad={`Action: "*", Resource: "*" in IAM — grants full admin access to service accounts "just in case they need it."`}
          good="Apply principle of least privilege: enumerate the exact actions and resources the role needs. Use AWS IAM Access Analyzer to validate policies and identify unused permissions. Start with deny-all and add permissions as needed rather than starting with allow-all and restricting later."
        />

        <Err
          title="Storing secrets in Terraform state"
          bad="Terraform state files (terraform.tfstate) contain the full value of every resource attribute including secrets, database passwords, and initial TLS certs — stored in plaintext in S3 with no encryption."
          good="Enable S3 server-side encryption for your state bucket. Enable versioning. Restrict bucket access to the CI/CD role only. Never store application secrets in Terraform — use AWS Secrets Manager or HashiCorp Vault and reference them by ARN, not by value."
        />

        <Err
          title="No least-privilege for CI/CD pipeline credentials"
          bad="Give the GitHub Actions deployment role AdministratorAccess — it is easier than figuring out exact permissions."
          good="Give CI/CD roles exactly the permissions needed for the specific pipeline job: a deploy-to-S3 job needs s3:PutObject on the specific bucket only, not full admin. Use OIDC federation (GitHub Actions OIDC → AWS IAM role) instead of long-lived access keys — credentials are short-lived tokens that expire after the job."
        />
      </Part>

      <HR />

      <Part title="Complete Secure CI/CD Pipeline">
        <H>Reference Pipeline — GitHub Actions</H>
        <Block>{`# Full DevSecOps pipeline — end to end
name: Secure Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  IMAGE_NAME: myapp
  REGISTRY: ghcr.io/myorg

jobs:
  # ── Phase 1: Code Security ────────────────────────────────────────
  secret-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: gitleaks/gitleaks-action@v2
        env: { GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }} }

  sast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: semgrep/semgrep-action@v1
        with:
          config: "p/owasp-top-ten p/python p/secrets"
          publishResults: true

  codeql:
    runs-on: ubuntu-latest
    permissions: { security-events: write, actions: read, contents: read }
    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v3
        with: { languages: python }
      - uses: github/codeql-action/autobuild@v3
      - uses: github/codeql-action/analyze@v3

  # ── Phase 2: Dependencies ─────────────────────────────────────────
  sca:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Trivy SCA
        run: |
          trivy fs . --scanners vuln --severity CRITICAL,HIGH \
            --exit-code 1 --format sarif --output trivy-sca.sarif
      - uses: github/codeql-action/upload-sarif@v3
        with: { sarif_file: trivy-sca.sarif }
        if: always()

  # ── Phase 3: IaC ─────────────────────────────────────────────────
  iac-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: bridgecrewio/checkov-action@master
        with:
          directory: terraform/
          framework: terraform
          output_format: sarif
          output_file_path: checkov.sarif
      - uses: github/codeql-action/upload-sarif@v3
        with: { sarif_file: checkov.sarif }
        if: always()

  # ── Phase 4: Build and Container Scan ────────────────────────────
  build:
    needs: [secret-scan, sast, sca, iac-scan]
    runs-on: ubuntu-latest
    outputs:
      digest: \${{ steps.push.outputs.digest }}
    steps:
      - uses: actions/checkout@v4
      - uses: docker/build-push-action@v5
        id: build
        with:
          push: false
          tags: \${{ env.IMAGE_NAME }}:ci
          load: true
      - name: Trivy container scan
        run: |
          trivy image \${{ env.IMAGE_NAME }}:ci \
            --severity CRITICAL,HIGH --exit-code 1
      - name: Push to registry (main branch only)
        if: github.ref == 'refs/heads/main'
        id: push
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest

  # ── Phase 5: DAST (staging) ───────────────────────────────────────
  dast:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to staging
        run: kubectl set image deployment/myapp app=\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest
      - name: ZAP API Scan
        uses: zaproxy/action-api-scan@v0.9.0
        with:
          target: https://staging.company.com/api/openapi.json
          fail_action: true`}
        </Block>

        <IQ
          q="How do you measure the success of a DevSecOps programme?"
          a="Five metrics that show whether the programme is working. Mean time to remediate (MTTR) for findings discovered in CI — if developers are fixing SAST issues in hours, the gate is working; if they pile up for weeks, the process is broken. False positive rate per SAST tool — above 20% FP rate signals that developers will suppress alerts rather than fix them. Security debt: count of open critical/high findings in production compared to three months ago — it should be decreasing. Escape rate: what percentage of security issues are found post-production versus in CI/CD — a good programme catches 80%+ before production. Developer NPS (Net Promoter Score) for security tools — if developers actively hate the security tooling, they will route around it. Track these quarterly, and benchmark against the shift-left cost model: every finding caught in CI costs 6x less to fix than one found in production."
        />
      </Part>

      <HR />

      <KeyTakeaways items={[
        'DevSecOps shifts security from an end-of-pipeline gate to a continuous guardrail — catching issues when they are cheapest to fix, not when they are hardest.',
        'SAST finds code-level issues without running the app (runs on every commit), SCA finds vulnerable dependencies (continuous), and DAST tests the running application (pre-production) — all three together provide layered coverage.',
        'Security Champions embed security into engineering teams: they are developers, not security staff, and act as translators between the security team and their engineering team.',
        'SAST false positive rate must be kept below 20% — above that, developers suppress alerts by default and real vulnerabilities get lost in the noise.',
        'A secret committed to a public Git repository is permanently compromised the moment it is pushed — revoke immediately, then clean history and audit for misuse.',
        'Container images should run as non-root, use a pinned minimal base image, drop all Linux capabilities, and have a read-only root filesystem.',
        'IaC scanning (Checkov, tfsec) must run in CI on every PR that modifies infrastructure — misconfigurations caught in code review cost nothing to fix; misconfigurations found post-breach cost millions.',
        'Use OIDC federation for CI/CD cloud access (short-lived tokens) rather than long-lived access keys stored as CI secrets — keys rotate automatically and cannot be leaked or reused.',
        'OPA/Gatekeeper and Falco provide Kubernetes admission control and runtime security respectively — enforce policies at deploy time and detect anomalies at runtime.',
        'DevSecOps succeeds when developers feel that security tools help them, not block them — invest in fast gates, low FP rates, and clear remediation guidance.',
      ]} />

      <Callout type="info">
        <strong>Up Next — Module 36: Compliance Frameworks</strong><br />
        Module 36 demystifies the compliance landscape: SOC 2, PCI-DSS, HIPAA, ISO 27001, GDPR, and NIST frameworks. You will learn what each framework requires, how they overlap, how to build a unified control library that satisfies multiple frameworks simultaneously, and how to prepare for and survive an audit.
      </Callout>

    </LearnLayout>
  )
}
