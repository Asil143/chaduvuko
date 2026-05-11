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

export default function Module19() {
  return (
    <LearnLayout
      title="API Security and Container Security"
      description="REST and GraphQL API vulnerabilities, JWT attacks, OAuth misconfigurations, Docker container escape, Kubernetes RBAC, and supply chain security."
      section="Cybersecurity — Module 19"
      readTime="44 min"
      updatedAt="May 2026"
    >
      <Part>
        <P>
          Modern applications are built from APIs and containers. A REST API that exposes user data is just as valuable a target as an HTTPS web page. A container with a misconfigured security context is just as dangerous as a misconfigured server. The attack surface has changed; the attacker's objectives haven't.
        </P>
        <P>
          This module covers the OWASP API Security Top 10, the specific mechanics of <Hl>JWT attacks</Hl> and <Hl>OAuth misconfiguration</Hl>, how <Hl>Docker containers can be escaped</Hl> via privileged mode or volume mounts, <Hl>Kubernetes RBAC</Hl> and how its misconfigurations become privilege escalation paths, and <Hl>supply chain security</Hl> for container images — because an attacker who poisons your base image owns everything built on top of it.
        </P>
      </Part>

      <HR />

      <Part>
        <H>OWASP API Security Top 10</H>
        <P>
          The OWASP API Security Top 10 (2023) covers the most common and impactful API-specific vulnerabilities. Many overlap with the Web Application Top 10 but have API-specific nuances in how they manifest and how they're detected.
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>ID</th>
              <th style={s.th}>Name</th>
              <th style={s.th}>Core Issue</th>
              <th style={s.th}>Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['API1', 'Broken Object Level Authorization', 'Access other users\' objects by changing ID', 'GET /api/orders/1042 → returns another user\'s order'],
              ['API2', 'Broken Authentication', 'Weak or missing authentication mechanisms', 'API keys in URL, no token rotation, weak JWTs'],
              ['API3', 'Broken Object Property Level Authorization', 'Read/write sensitive fields not intended for caller', 'PATCH /users/me returns/sets isAdmin field'],
              ['API4', 'Unrestricted Resource Consumption', 'No rate limiting, quotas, or size limits', 'Upload 10GB files, call expensive endpoint 10K times/sec'],
              ['API5', 'Broken Function Level Authorization', 'Access admin-only functions as regular user', 'GET /admin/users works without admin role'],
              ['API6', 'Unrestricted Access to Sensitive Business Flows', 'Abuse legitimate API flows at scale', 'Bot buys limited inventory in milliseconds'],
              ['API7', 'Server Side Request Forgery', 'Server fetches attacker-controlled URLs', 'webhook URL → 169.254.169.254 → cloud metadata'],
              ['API8', 'Security Misconfiguration', 'Exposed debug endpoints, verbose errors, CORS *', 'GET /api/debug/config returns env vars with secrets'],
              ['API9', 'Improper Inventory Management', 'Forgotten old API versions, shadow APIs', 'v1 API still accessible, bypasses v2 security controls'],
              ['API10', 'Unsafe Consumption of APIs', 'Trust third-party API responses blindly', 'Parse third-party data → SQL injection via trusted data'],
            ].map(([id, name, core, ex]) => (
              <tr key={id}>
                <td style={{ ...s.td, color: C, fontWeight: 700 }}>{id}</td>
                <td style={{ ...s.td, fontWeight: 600 }}>{name}</td>
                <td style={s.td}>{core}</td>
                <td style={s.td}>{ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Block>{`API security testing checklist:

Authentication:
  [ ] Can I access the API without a token?
  [ ] Does the token expire? What happens with an expired token?
  [ ] Can I reuse a token after logout?
  [ ] Is the token in the URL (visible in logs)? Should be in Authorization header.

Authorization (BOLA / IDOR):
  [ ] Create two test accounts (A and B)
  [ ] Log in as A, capture resource IDs (invoice IDs, order IDs, document IDs)
  [ ] Log in as B, try to access A's resource IDs
  [ ] Succeeds? → IDOR/BOLA

Mass Assignment (API3):
  [ ] PATCH or PUT your own resource
  [ ] Add extra fields in the body: role, isAdmin, accountBalance, verifiedEmail
  [ ] Check if any extra fields are accepted or reflected in response

Rate Limiting (API4):
  [ ] Call the same endpoint 100 times in 10 seconds
  [ ] Does it return 429 (Too Many Requests)? No → missing rate limiting
  [ ] Check: POST /auth/login (brute force path), POST /api/search (resource exhaustion)

Function Level Authorization (API5):
  [ ] Find admin endpoints in API docs, mobile app, JS source
  [ ] Call them as a regular user
  [ ] Common: /api/admin/*, /api/internal/*, /api/v1/debug/*

CORS:
  [ ] Check: Origin: https://evil.com header
  [ ] If response includes Access-Control-Allow-Origin: https://evil.com → CORS misconfiguration
  [ ] If Access-Control-Allow-Origin: * + credentials → critical finding`}</Block>
      </Part>

      <HR />

      <Part>
        <H>JWT Attacks — Exploiting Token Vulnerabilities</H>
        <P>
          <Hl>JSON Web Tokens (JWTs)</Hl> are the dominant authentication mechanism for REST APIs. A JWT consists of three base64-encoded parts: header (algorithm + type), payload (claims), and signature. The server verifies the signature; if valid, it trusts the claims. Several well-known attacks exploit weaknesses in JWT implementation.
        </P>
        <Block>{`JWT structure:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwicm9sZSI6InVzZXIiLCJleHAiOjE3MDA1ODUwMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Decoded:
  Header:  {"alg": "HS256", "typ": "JWT"}
  Payload: {"sub": "1234567890", "name": "Alice", "role": "user", "exp": 1700585000}
  Signature: HMAC-SHA256(base64(header) + "." + base64(payload), secret_key)

Attack 1: Algorithm None (CVE-2015-9235)
  Modify header: {"alg": "none", "typ": "JWT"}
  Modify payload: {"sub": "1", "name": "Admin", "role": "admin", "exp": 9999999999}
  Remove signature (just keep the trailing dot)

  Some libraries accept alg:none as valid and skip signature verification!
  Result: Forged token accepted as admin
  Fix: Explicitly whitelist allowed algorithms; reject "none" and "None"

Attack 2: Algorithm Confusion (RS256 → HS256)
  Server signs with RSA private key (RS256 algorithm)
  Server public key is often accessible (e.g., /api/auth/keys.json)

  Attack: Change alg from RS256 to HS256
          Sign the token using the PUBLIC KEY as the HMAC secret

  Vulnerable libraries: When verifying, they check "alg in token is HS256"
                        → use the configured "key" (which is the RSA public key)
                        → verify as HMAC-SHA256 with public key as secret
                        → Attacker also computed the same HMAC → verification passes!

  Fix: Verify algorithm matches what the server expects, not what the token claims

Attack 3: Weak Secret (brute force)
  HS256/HS384/HS512 JWTs signed with a weak secret can be cracked offline

  hashcat -a 0 -m 16500 jwt.txt wordlist.txt
  # jwt.txt format: eyJhbG...(full JWT)
  # Common weak secrets: "secret", "password", "key", "jwt-secret", app name

  Fix: Use secrets.token_hex(32) (256 bits) minimum for HMAC key

Attack 4: JWK Injection
  JWT header can include "jku" (JWK URL) or "jwk" (inline JWK)
  Attacker hosts their own JWK Set at a controlled URL
  If library fetches and trusts this URL without validation:
    → Attacker's own public key is used to verify
    → Attacker signs token with their private key → verification passes

  Fix: Never use "jku" or "jwk" from the token header; use server-configured key only`}</Block>
      </Part>

      <HR />

      <Part>
        <H>OAuth 2.0 Misconfigurations</H>
        <P>
          OAuth 2.0 is the standard for delegated authorisation — allowing a third-party application to access a user's resources on another service without sharing the user's password. The complexity of the protocol creates multiple misconfigurations that attackers exploit.
        </P>
        <Block>{`OAuth Authorization Code Flow (correct usage):

1. App redirects: https://auth.example.com/authorize?
     response_type=code
     &client_id=app123
     &redirect_uri=https://myapp.com/callback
     &state=random_csrf_token   ← Anti-CSRF
     &scope=email,profile

2. User authenticates at auth server

3. Auth server redirects to: https://myapp.com/callback?
     code=AUTH_CODE_HERE
     &state=random_csrf_token   ← Verify this matches what you sent

4. App exchanges code for tokens (server-side, not in browser):
   POST /token
   {code: "AUTH_CODE_HERE", client_id: "app123", client_secret: "SECRET"}
   → {access_token: "...", refresh_token: "..."}

5. App uses access_token to call APIs on behalf of user

Common OAuth attacks:

Attack 1: Redirect URI manipulation
  Legitimate redirect_uri: https://myapp.com/callback
  Attacker-controlled redirect_uri: https://evil.com/callback

  Victim authorises → auth code sent to https://evil.com/callback
  Attacker exchanges code → gets access token → accesses victim's account

  Fix: Exact string matching for redirect_uri (no wildcards, no regex)
       Register allowed redirect URIs server-side; reject any mismatch

Attack 2: Missing state parameter (CSRF)
  State: random value generated per-request, verified on callback
  Without state:
    Attacker starts OAuth flow for their own account
    Pauses before step 3 — has a valid auth code for their account
    Tricks victim into visiting the callback URL with attacker's code
    App associates attacker's account with victim's session
    Attacker now controls victim's app account

  Fix: Always generate and verify state parameter

Attack 3: Token leakage via Referer header
  Implicit flow (deprecated) returns token in URL fragment: #access_token=...
  If page includes any third-party resources (analytics, CDN, fonts)
  The Referer header includes the full URL — token leaked to third party

  Fix: Use Authorization Code flow (not implicit); never put tokens in URLs

Attack 4: Open redirect on redirect_uri
  redirect_uri=https://myapp.com/logout?next=https://evil.com
  Auth code in URL → next= redirects to evil.com → code captured

  Fix: Validate redirect_uri against exact allowlist; no open redirects in app`}</Block>
      </Part>

      <HR />

      <Part>
        <H>GraphQL Security</H>
        <P>
          <Hl>GraphQL</Hl> APIs present security challenges not found in REST: introspection exposes the full schema (a map of every type, field, and operation), query depth is unlimited by default (deeply nested queries can exhaust resources), and batching allows multiple operations in a single request (amplifying brute force attacks).
        </P>
        <Block>{`GraphQL-specific attack vectors:

1. Introspection — Schema discovery
   All GraphQL implementations enable introspection by default
   Query: {__schema{types{name fields{name type{name}}}}}
   Returns: complete schema of every type, field, and mutation

   Attacker uses introspection to:
   - Discover hidden fields (isAdmin, internalId, creditCardNumber)
   - Find mutations that modify sensitive data
   - Build targeted queries without documentation

   Fix: Disable introspection in production
   # Apollo Server:
   new ApolloServer({ introspection: process.env.NODE_ENV !== 'production' })

2. Query depth attacks
   Deeply nested query exhausts server resources:
   { users { friends { friends { friends { friends { id email } } } } } }
   100 levels deep → exponential database queries

   Fix: Depth limiting middleware
   # graphql-depth-limit (npm):
   const depthLimit = require('graphql-depth-limit')
   createYoga({ validationRules: [depthLimit(5)] })

3. Batching / brute force via aliases
   GraphQL allows multiple operations with aliases in one request:
   mutation {
     a1: login(username: "admin", password: "password1") { token }
     a2: login(username: "admin", password: "password2") { token }
     a3: login(username: "admin", password: "password3") { token }
     ... (100 variations in one HTTP request)
   }
   Bypasses rate limiting that counts HTTP requests, not GraphQL operations

   Fix: Rate limit at operation level, not HTTP request level
        Limit number of operations per request (max 10)

4. Information disclosure via error messages
   Invalid query returns detailed error:
   "Cannot query field 'secret' on type 'User'. Did you mean 'secretToken'?"
   → Reveals internal field name

   Fix: Custom error handler that masks internal details in production

5. Authorization bypass via field-level access
   Query: { users { id email internalNotes creditBalance } }
   Application checks: "Can user access /users?" → Yes
   Doesn't check: "Can user access internalNotes or creditBalance?" → No

   Fix: Field-level authorization; every resolver checks authorization
        (not just the root query resolver)`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Docker Container Security</H>
        <P>
          Containers provide isolation via Linux namespaces and cgroups — but this isolation has limits. Several common Docker configurations weaken or eliminate container isolation, allowing a compromised container process to escape to the host system.
        </P>
        <Block>{`Container escape techniques:

1. Privileged container (--privileged flag)
   Container has all Linux capabilities + access to all devices
   Effectively root on the host with namespace separation only

   Escape technique:
   # Inside privileged container:
   ls /dev/sda  # Host disk visible
   mkdir /mnt/host
   mount /dev/sda1 /mnt/host     # Mount host filesystem
   chroot /mnt/host              # chroot into host OS
   # Now have full root filesystem access to host

   Detection: docker inspect <id> | jq '.[].HostConfig.Privileged'
   Fix: Never use --privileged in production; use specific capabilities instead

2. Docker socket mount (-v /var/run/docker.sock:/var/run/docker.sock)
   Docker socket = administrative API to Docker daemon
   Process inside container can control the Docker daemon

   Escape:
   # Inside container with socket mounted:
   docker run -v /:/host --rm -it ubuntu chroot /host bash
   # Launched a NEW container mounting the HOST filesystem
   # chroot into it → root on host

   Fix: Never mount Docker socket in containers
        Use Docker-in-Docker (DinD) for CI/CD that needs Docker access

3. Sensitive host directory mounts
   -v /:/host         # Entire host filesystem
   -v /etc:/etc       # Host /etc (modify shadow, crontab, sudoers)
   -v /proc:/host-proc # Host /proc (process info)

   Fix: Mount only specific directories needed; use read-only where possible
        -v /app/data:/data:ro  (read-only mount)

4. Capability abuse (CAP_SYS_ADMIN, CAP_NET_ADMIN)
   CAP_SYS_ADMIN: Near-root capability; allows mounting, namespaces, syscalls
   CAP_NET_ADMIN: Change network interfaces, routing, raw packets

   CAP_SYS_ADMIN escape:
   # Mount a new tmpfs with cgroup release_agent
   unshare -UrmC bash
   mount -t cgroup -o rdma cgroup /tmp/cgroup
   echo 1 > /tmp/cgroup/notify_on_release
   echo /cmd > /tmp/cgroup/release_agent  # /cmd will execute on host
   echo "#!/bin/sh; id > /output" > /cmd  # Host-side command
   # Trigger cgroup release → host executes /cmd as root

   Fix: Drop all capabilities, add only what's needed:
        docker run --cap-drop ALL --cap-add NET_BIND_SERVICE nginx`}</Block>
        <Block>{`Minimal-privilege Dockerfile:

# BAD — runs as root by default
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]

# GOOD — minimal privilege, non-root user, read-only filesystem
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-slim
# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app
# Copy only built artifacts
COPY --from=builder --chown=appuser:appuser /app/node_modules ./node_modules
COPY --chown=appuser:appuser src/ ./src

# Drop all root privileges
USER appuser

# Read-only root filesystem (mount writable volumes for needed paths)
# docker run --read-only -v /tmp:/tmp app

EXPOSE 3000
CMD ["node", "src/server.js"]

# Run with additional Docker security flags:
docker run \\
  --read-only \\                    # Immutable filesystem
  --tmpfs /tmp \\                   # Writable /tmp in RAM
  --cap-drop ALL \\                 # No Linux capabilities
  --cap-add NET_BIND_SERVICE \\     # Only if binding port < 1024
  --no-new-privileges \\            # Prevent privilege escalation via SUID
  --security-opt=no-new-privileges \\
  -u 1001:1001 \\                   # Non-root UID:GID
  myapp:latest`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Kubernetes RBAC and Security</H>
        <P>
          <Hl>Kubernetes RBAC</Hl> (Role-Based Access Control) controls what identities (Service Accounts, users, groups) can do in the cluster. Misconfigured RBAC is one of the most common Kubernetes security findings because the default service account has too many permissions, and "quick fix" role bindings often grant cluster-admin.
        </P>
        <Block>{`Kubernetes RBAC concepts:

Role vs ClusterRole:
  Role:         Namespaced — grants permissions within one namespace
  ClusterRole:  Cluster-wide — grants permissions across all namespaces

RoleBinding vs ClusterRoleBinding:
  RoleBinding:        Binds a Role/ClusterRole to principals in one namespace
  ClusterRoleBinding: Binds a ClusterRole to principals cluster-wide

Dangerous RBAC configurations:

1. cluster-admin bound to default service account:
   ClusterRoleBinding that binds cluster-admin to:
     system:serviceaccounts (all service accounts in all namespaces)
     system:authenticated (any authenticated user)
   → Any compromised pod has full cluster control

2. Wildcard permissions:
   rules:
   - apiGroups: ["*"]    ← all API groups
     resources: ["*"]    ← all resources
     verbs: ["*"]        ← all verbs (get, list, create, delete, update)
   → Effectively cluster-admin

3. pods/exec permission:
   rules:
   - apiGroups: [""]
     resources: ["pods/exec"]
     verbs: ["create"]
   → Can exec into any pod in namespace → steal other pods' secrets/service account tokens

4. secrets verb:
   rules:
   - apiGroups: [""]
     resources: ["secrets"]
     verbs: ["get", "list"]
   → Can read ALL secrets in namespace, including other services' credentials

5. Role escalation via bind/escalate:
   verb "bind" on ClusterRole/Role objects → can grant yourself any role
   verb "escalate" → can create roles with permissions you don't currently have`}</Block>
        <Block>{`# Kubernetes RBAC audit commands

# List all ClusterRoleBindings — who has cluster-wide access?
kubectl get clusterrolebindings -o json | \\
  jq '.items[] | {name: .metadata.name, subjects: .subjects, role: .roleRef.name}'

# Find all roles with dangerous permissions:
kubectl get roles,clusterroles -A -o json | \\
  jq '[.items[] | select(.rules[]?.resources[]? == "*" or .rules[]?.verbs[]? == "*")]'

# What can the default service account do?
kubectl auth can-i --list --as=system:serviceaccount:default:default

# What can a specific service account do?
kubectl auth can-i --list --as=system:serviceaccount:prod:backend-sa -n prod

# Check if we can exec into pods (lateral movement vector):
kubectl auth can-i create pods/exec -n production

# Use Kube-Bench to run CIS Kubernetes Benchmark:
# docker run --rm -v $(pwd):/host aquasec/kube-bench:latest --json > results.json

# Audit default service account tokens (should be auto-mounted=false):
kubectl get pods -A -o json | \\
  jq '.items[] | select(.spec.automountServiceAccountToken != false) |
      {name: .metadata.name, namespace: .metadata.namespace}'`}</Block>
        <Block>{`# Kubernetes Pod Security Standards

Privileged policy (least secure — avoid):
  Allows all container capabilities; essentially unrestricted

Baseline policy (default for most workloads):
  Disallows: privileged containers, host PID/IPC/network namespaces, hostPath volumes
  Allows: most capabilities needed for normal applications

Restricted policy (most secure):
  Everything in Baseline PLUS:
  - Non-root user required (runAsNonRoot: true)
  - Seccomp profile required (RuntimeDefault or Localhost)
  - All capabilities dropped (ALL)
  - No privilege escalation (allowPrivilegeEscalation: false)

Apply PSA labels to namespaces:
  kubectl label namespace production \\
    pod-security.kubernetes.io/enforce=restricted \\
    pod-security.kubernetes.io/audit=restricted \\
    pod-security.kubernetes.io/warn=restricted

Example secure Pod spec:
  spec:
    securityContext:
      runAsNonRoot: true
      runAsUser: 1001
      seccompProfile:
        type: RuntimeDefault
    containers:
    - name: app
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop: ["ALL"]
      resources:
        limits:
          memory: "128Mi"
          cpu: "100m"`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Container Image Supply Chain Security</H>
        <P>
          The container image supply chain is the sequence of steps that produces a container image: base image selection, dependency installation, build steps, and registry storage. A compromise at any step affects every deployment built from that image. <Hl>SolarWinds-style supply chain attacks</Hl> now target container build pipelines because they provide leverage over thousands of deployed instances from a single compromise.
        </P>
        <Block>{`Supply chain attack vectors:

1. Malicious base image:
   FROM someuser/node-alpine:latest
   Base image from untrusted registry contains backdoor
   All builds inherit the backdoor

   Real example: typosquatting (node-alepin, nod-alpine) on Docker Hub

   Fix:
   - Use official images (docker.io/library/node, not third-party)
   - Pin to digest, not tag: FROM node@sha256:abc123...
     (tag is mutable; digest is cryptographic hash of image layers)
   - Use distroless images (Google): minimal OS, reduced attack surface
     FROM gcr.io/distroless/nodejs20-debian12

2. Dependency confusion / typosquatting:
   npm install left-pad → attacker publishes malicious left-pad
   pip install requets  → typosquat of requests

   Fix:
   - Use package-lock.json / poetry.lock / requirements.txt with pinned hashes
   - Private registry mirror for critical dependencies
   - Verify checksums: pip install --require-hashes

3. Compromised build pipeline:
   CI/CD system with access to registry credentials
   Attacker injects malicious build step

   Fix:
   - Isolated build environments (no persistent credentials)
   - OIDC-based registry auth (short-lived tokens)
   - Build provenance: SLSA framework

4. Outdated base images with CVEs:
   Most breaches don't need supply chain attacks
   Simply use old base image with known CVE

   Fix:
   - Scan images: trivy, Grype, Snyk, Amazon ECR scanning
   - Rebuild base images weekly
   - Alert on critical CVEs in deployed images

Image signing with Cosign (sigstore):
   # Sign image after build:
   cosign sign --key cosign.key registry.io/myapp:v1.0.0

   # Verify before pulling:
   cosign verify --key cosign.pub registry.io/myapp:v1.0.0

   # Kubernetes policy enforcement (Kyverno or OPA Gatekeeper):
   # Reject unsigned images from running in production namespace`}</Block>
        <Block>{`# Trivy — container image vulnerability scanning

# Scan a local image:
trivy image myapp:latest

# Output:
2024-01-15T10:30:00.000Z INFO  Scanning image...
2024-01-15T10:30:02.000Z INFO  Detected OS: debian 12.4
2024-01-15T10:30:02.000Z INFO  Detecting Debian vulnerabilities...

myapp:latest (debian 12.4)
=====================================================
Total: 47 (UNKNOWN: 0, LOW: 28, MEDIUM: 12, HIGH: 5, CRITICAL: 2)

CRITICAL:
CVE-2023-4911  libglibc     Glibc 2.37 buffer overflow (Looney Tunables)
CVE-2023-44487 nghttp2      HTTP/2 Rapid Reset DoS

HIGH:
CVE-2023-5156  libssl3      OpenSSL use-after-free
...

# Scan and fail build on CRITICAL findings (CI/CD integration):
trivy image --exit-code 1 --severity CRITICAL,HIGH myapp:latest

# Scan a Dockerfile for misconfigurations:
trivy config ./Dockerfile

# Scan running Kubernetes cluster:
trivy k8s --report all cluster`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Interview Questions</H>

        <IQ q="What is a JWT algorithm confusion attack and how does it work?">
          Algorithm confusion (also called key confusion) exploits the fact that some JWT libraries use a single key parameter for both asymmetric and symmetric algorithms. When an API uses RS256 (RSA signature), it signs tokens with an RSA private key and verifies with the RSA public key. The public key is often accessible — published at a JWKS endpoint like /api/.well-known/jwks.json.
          <br /><br />
          The attack: the attacker modifies the token header to change "alg": "RS256" to "alg": "HS256". Then they sign the modified payload using the RSA public key as the HMAC-SHA256 secret. When a vulnerable library verifies this token, it reads "alg": "HS256" from the header, takes its configured verification key (which is the RSA public key), and computes HMAC-SHA256 with that key as the secret. Since the attacker used the same public key to create their signature, the verification passes. The attacker has effectively forged a token — they can set any claims they want (role: admin, user_id: 1).
          <br /><br />
          The fix is to verify that the algorithm in the incoming token matches the algorithm the server expects, rather than accepting the algorithm from the token itself. Libraries should be configured with: "this endpoint only accepts RS256, reject anything else." Never let the token dictate what algorithm is used for verification.
        </IQ>

        <IQ q="Explain how a Docker privileged container can be used to escape to the host. What's the fix?">
          A privileged container runs with --privileged, which grants all Linux capabilities and provides full access to all host devices (/dev/*). The container has its own filesystem namespace but can interact with the host's hardware directly. The escape path: the attacker identifies a block device (e.g., /dev/sda1) in the container's /dev directory — this is the host's actual disk partition. They create a mount point, mount the host partition, and use chroot to switch their root to the mounted host filesystem. At that point they have full read/write access to the host OS as root — they can add SSH keys, create new users, install backdoors, or read any file on the host.
          <br /><br />
          The fix: never use --privileged in production containers. Instead, identify the specific Linux capabilities the container actually needs (e.g., NET_BIND_SERVICE to bind to port 80, or AUDIT_WRITE for audit logging) and grant only those with --cap-drop ALL --cap-add NET_BIND_SERVICE. No application should need --privileged. For containers that legitimately need more host access (monitoring agents, security tools), use a stricter alternative like userns-remap to map the container's root to a non-root UID on the host, or use pod security policies/standards to enforce restrictions at the Kubernetes level.
        </IQ>

        <IQ q="What is the difference between a Kubernetes Role and a ClusterRole? Which is more dangerous if misconfigured?">
          A Role is namespaced — its permissions apply only within the namespace it's created in. If you give a service account a Role with get/list access to secrets in the "staging" namespace, it can only list secrets in staging, not in production or any other namespace. A ClusterRole is cluster-scoped — when bound via a ClusterRoleBinding, its permissions apply across all namespaces and cluster-scoped resources (nodes, persistent volumes, namespaces themselves).
          <br /><br />
          ClusterRoleBindings are far more dangerous when misconfigured. If a ClusterRole with wildcard permissions (resources: ["*"], verbs: ["*"]) is bound via a ClusterRoleBinding, the bound principal has full control of the entire Kubernetes cluster — equivalent to cluster-admin. If that same role were bound via a RoleBinding in a single namespace, the blast radius is limited to that namespace.
          <br /><br />
          The most dangerous misconfiguration in practice: binding cluster-admin to system:serviceaccounts (all service accounts in all namespaces) or to system:authenticated (any authenticated user). This means any compromised pod — regardless of what it's supposed to do — has cluster-admin access and can read all secrets, exec into any pod, create privileged pods to escape to nodes, or delete all workloads.
        </IQ>

        <IQ q="How do you secure container images in a CI/CD pipeline?">
          Container image security in CI/CD requires controls at multiple stages. In the build stage: start from official base images pinned to a specific digest (not a floating tag like :latest), run vulnerability scanning as a build step that fails on Critical/High CVEs (trivy image --exit-code 1 --severity CRITICAL,HIGH), use multi-stage builds to separate build dependencies from the runtime image (the final image contains only what the application needs to run), and ensure the Dockerfile follows security best practices (non-root user, read-only filesystem, dropped capabilities).
          <br /><br />
          In the registry stage: sign images with Cosign so you can verify provenance at deploy time. Store images in a private registry, not Docker Hub public. Enable automatic vulnerability scanning on push (AWS ECR, GCR, and Azure ACR all offer this). Set registry policies that reject images with Critical CVEs. In the deploy stage: use a policy engine (Kyverno or OPA Gatekeeper) in Kubernetes that rejects unsigned images or images with recent high-severity CVEs. Enforce pod security standards (restricted profile) to prevent privileged containers from running. Regularly rebuild base images to incorporate security patches — a weekly automated rebuild pipeline ensures you're not running with months-old base images.
        </IQ>

        <IQ q="An API endpoint returns user data. How do you test for BOLA (Broken Object Level Authorization)?">
          BOLA testing requires two distinct test accounts and methodical ID substitution. Step one: create two accounts — Account A and Account B — that represent different users with data of the same type (orders, invoices, documents, profile data). Log in as Account A and perform normal actions: place an order, upload a document, update a profile. Note all the object identifiers returned in responses — order IDs, document IDs, user IDs, account numbers. Step two: log in as Account B, obtain Account B's authentication token. Step three: using Account B's token, attempt to access Account A's objects using the IDs collected in step one. Test all HTTP methods: GET (read), PUT/PATCH (modify), DELETE (delete). Also test combinations: can you access the object via a different endpoint that exposes the same underlying data?
          <br /><br />
          Look for: HTTP 200 responses returning Account A's data when authenticated as Account B (confirmed IDOR), or HTTP 500 errors (suggests the request reached the object but caused an error — still worth investigating). HTTP 403 or 404 is the correct response. Also test with IDs that shouldn't exist — some applications leak information by returning different error messages for "object exists but you can't access it" versus "object doesn't exist." Finally, test with enumerable IDs: if IDs are sequential integers (1, 2, 3...), try IDs near your own to find recent records from other users. If IDs are UUIDs, the attack surface is smaller but still test edge cases.
        </IQ>
      </Part>

      <HR />

      <Part>
        <H>Error Library — Common Mistakes</H>

        <Err
          title="Trusting 'alg' claim in JWT header for verification"
          cause="The JWT header's 'alg' field tells the library what algorithm was used to sign the token. Some libraries use this to select the verification algorithm, meaning the token issuer controls the verification method. An attacker can change 'alg' to 'none' (skip verification entirely) or to HS256 (enabling algorithm confusion attacks against RS256 endpoints)."
          fix="Configure the JWT library with the expected algorithm explicitly. When verifying tokens, specify the expected algorithm in code — never derive it from the token. Most modern libraries provide a verify function that accepts an explicit algorithm parameter: jwt.verify(token, publicKey, {algorithms: ['RS256']}). This rejects any token claiming a different algorithm."
        />

        <Err
          title="Mounting the Docker socket into containers for CI/CD"
          cause="CI/CD pipelines that need to build Docker images often mount /var/run/docker.sock into the CI runner container to give it access to the Docker daemon. This effectively gives that container full control of the host's Docker daemon — including the ability to launch new containers that mount the host filesystem, which is a trivially exploitable container escape."
          fix="For CI/CD Docker builds, use Docker-in-Docker (DinD) with a separate privileged container for the Docker daemon (isolated from other workloads), kaniko (builds images inside a container without requiring Docker daemon access), or buildah/podman (rootless container builds). If you must use the socket, isolate the CI runners on dedicated nodes, never on production cluster nodes."
        />

        <Err
          title="Using the Kubernetes default service account without restriction"
          cause="Every pod in Kubernetes receives a service account token automatically — the default service account token for the namespace — and it's mounted into the pod at /var/run/secrets/kubernetes.io/serviceaccount/token. By default, this token may have more permissions than the pod needs. If the pod is compromised, the attacker has these permissions. Many applications don't need any Kubernetes API access at all."
          fix="For pods that don't need Kubernetes API access (most applications), set automountServiceAccountToken: false in the pod spec. For pods that do need API access, create a dedicated service account with a minimal Role (not ClusterRole), bind it with a RoleBinding (not ClusterRoleBinding), and set automountServiceAccountToken: true only for that account. Audit quarterly: kubectl auth can-i --list --as=system:serviceaccount:namespace:serviceaccountname."
        />

        <Err
          title="Missing rate limiting on GraphQL operations (not just HTTP requests)"
          cause="Traditional rate limiting counts HTTP requests. A single GraphQL request can contain multiple operations via aliases or batching. An attacker can include 100 login attempts in a single HTTP request, bypassing an HTTP-level rate limiter that counts one request per batch. This enables brute force attacks at scale through a single HTTP connection."
          fix="Rate limit at the GraphQL operation level, not just the HTTP level. Count each GraphQL query/mutation as a separate operation for rate limiting purposes. Limit the number of operations per request (e.g., max 10 batched operations). Use graphql-rate-limit or implement a custom complexity analysis that assigns costs to operations based on their resource usage. Also implement depth limiting and query complexity analysis to prevent resource exhaustion."
        />

        <Err
          title="Building container images with secrets hardcoded as ENV variables or RUN steps"
          cause="Developers add API keys or credentials during build: ENV DATABASE_URL=postgres://prod-user:secret@db:5432/prod or RUN curl -H 'Authorization: Bearer secret-token' .... Even if the final image doesn't expose these through docker inspect, the values are baked into the image layers and visible to anyone who can pull the image or access the registry."
          fix="Never put secrets in Dockerfiles (ENV, ARG, RUN commands). At runtime, inject secrets via environment variables from a secrets manager (AWS Secrets Manager, HashiCorp Vault, Kubernetes Secrets with external secrets operator). For build-time secrets (downloading private packages), use Docker BuildKit's --secret flag which provides the secret only during the specific RUN step and doesn't persist in the image layers."
        />
      </Part>

      <HR />

      <KeyTakeaways
        items={[
          'BOLA (API1) — Broken Object Level Authorization — is the most common and impactful API vulnerability. Test with two accounts: can Account B access Account A\'s resources by substituting object IDs?',
          'JWT algorithm confusion attacks change "alg": "RS256" to "alg": "HS256" in the header, then sign with the public key as the HMAC secret. Fix: specify expected algorithm explicitly in the verification call; never derive it from the token.',
          'OAuth redirect_uri must be validated with exact string matching. Any mismatch should reject the authorization. Wildcards or substring matching enable authorization code theft to attacker-controlled redirect URIs.',
          'Docker --privileged containers can mount host block devices and chroot into the host filesystem. Never use --privileged; grant specific capabilities with --cap-drop ALL --cap-add [specific capability].',
          'Mounting the Docker socket (/var/run/docker.sock) into a container grants it full control of the host\'s Docker daemon — equivalent to root on the host. Use kaniko or BuildKit for CI/CD image builds instead.',
          'Kubernetes ClusterRoleBindings with wildcard permissions or binding to system:serviceaccounts are the most dangerous RBAC misconfigurations — they give every compromised pod cluster-admin access.',
          'Most pods don\'t need Kubernetes API access. Set automountServiceAccountToken: false and use pod security standards (restricted profile) by default. Add permissions only when explicitly needed.',
          'GraphQL introspection should be disabled in production — it provides attackers a complete map of every type, field, and mutation. Rate limit at the operation level, not just HTTP request level.',
          'Container image supply chain security: pin base images to SHA256 digests (not floating tags), scan with Trivy on every build, sign with Cosign, and enforce signature verification at deploy time via Kyverno.',
          'Kubernetes pod security standards (restricted profile) enforce non-root user, dropped capabilities, no privilege escalation, seccomp profile, and read-only root filesystem. Apply to all namespaces; exceptions require explicit justification.',
        ]}
      />

      <HR />

      <div style={{ background: 'var(--code-bg)', borderRadius: 12, padding: '28px 32px', marginTop: 40 }}>
        <div style={{ fontSize: 13, color: C, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
          Up Next — Module 20
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--heading)', marginBottom: 12 }}>
          Secure Coding Practices
        </div>
        <p style={{ ...s.p, marginBottom: 20 }}>
          In Module 20, you learn to write code that is secure by design: input validation patterns, output encoding, parameterised queries, secrets management in code, dependency management, security testing in CI/CD, and threat modelling as a development practice. This module bridges development and security — making security the developer's job, not an afterthought.
        </p>
        <Link
          href="/learn/cybersecurity/secure-coding"
          style={{
            display: 'inline-block',
            background: C,
            color: '#fff',
            padding: '12px 28px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
          }}
        >
          Continue to Module 20 →
        </Link>
      </div>
    </LearnLayout>
  )
}
