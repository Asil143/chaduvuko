import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'
import { LearnLayout } from '@/components/content/LearnLayout'

export default function SecretsManagement() {
  return (
    <LearnLayout
      title="Secrets Management — Vault and Cloud Secret Stores"
      description="Keep credentials out of code and images with environment variables, secret managers, access policies, rotation, and safe operational workflows."
      section="DevOps & Cloud Infrastructure — Lesson 09"
      readTime="30 min"
    >
      <Part n={1} label="The problem" title="A Secret Is a Credential with a Lifecycle">
        <P>
          A delivery API needs a database password, a payment integration token, and a signing key. Each value grants access to
          something valuable, so it must be protected from source control, build logs, container images, untrusted users, and
          unnecessary copies. Hiding a string in a different file is not enough: a secret needs an owner, a reason to exist, an
          access policy, a rotation plan, and a retirement step.
        </P>
        <P>
          Secret management is the process of creating, storing, granting, delivering, auditing, rotating, and revoking sensitive
          values. A password in a managed secret store still needs least-privilege access. A secret injected into a process can
          still leak through debug output, crash reports, or a compromised host. Design the full lifecycle, not only the storage
          location.
        </P>
        <Table
          head={['Value', 'Example', 'First question']}
          rows={[
            ['Credential', 'Database password or API token', 'Which identity needs it, and for which operation?'],
            ['Private key', 'Signing or client-authentication key', 'Can the platform keep it in a managed key service instead?'],
            ['Configuration', 'Public API base URL or log level', 'Is it actually confidential, or just environment-specific?'],
            ['Personal data', 'Customer address or payment detail', 'Is it being incorrectly treated as application configuration?'],
          ]}
        />
        <Callout type="info">
          Not every configuration value is a secret. Classify data deliberately: encrypting and restricting all settings can make
          operations harder, while treating credentials as ordinary config creates avoidable exposure.
        </Callout>
      </Part>

      <Part n={2} label="Local development" title="Use Environment Variables Without Committing Values">
        <P>
          Environment variables are a convenient interface for local tools and processes, but they are not a secret store by
          themselves. A local <code>.env</code> file can help a developer run an app if it is excluded from version control and
          protected by the workstation. Do not commit populated files, paste credentials into shell history, or assume a variable
          is hidden from every process on the same host.
        </P>
        <Code lang="bash" file=".env.example" code={`
DATABASE_URL=
PAYMENTS_API_TOKEN=
`} />
        <P>
          Commit a blank template that documents required names, and keep actual values in a protected local file or approved
          developer secret tool. Add the real filename to the repository ignore rules before placing credentials in it. The
          application should fail clearly when a required value is missing; it should not silently connect to a production service
          with an empty or fallback credential.
        </P>
        <Code file="settings.py" code={`
import os


def required_secret(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise RuntimeError(f"Required secret {name} is not configured")
    return value


def load_settings() -> dict[str, str]:
    return {
        "database_url": required_secret("DATABASE_URL"),
        "payments_api_token": required_secret("PAYMENTS_API_TOKEN"),
    }


if __name__ == "__main__":
    settings = load_settings()
    print("Required settings are present; values were not printed.")
`} />
        <Callout type="warning">
          Never print a settings object containing credentials to debug a deployment. Logs, screenshots, CI output, and support
          tickets can outlive the terminal session and have a much wider audience.
        </Callout>
      </Part>

      <Part n={3} label="Choose a store" title="Use a Secret Manager for Shared and Production Workloads">
        <P>
          A cloud secret manager or HashiCorp Vault provides controlled storage, identity-based access, audit events, and often
          versioning or rotation integrations. Exact features and policy syntax vary by provider and deployment; follow the
          official documentation for the store your organization operates. Keep the application contract small: the workload
          authenticates using its assigned identity, requests only the named secret it needs, and receives the value at runtime.
        </P>
        <Table
          head={['Approach', 'Useful for', 'Important limitation']}
          rows={[
            ['Developer environment variable', 'Local run or a small process boundary', 'Can be exposed to local processes, shell tooling, or diagnostics'],
            ['CI/CD protected secret', 'A deployment job that needs a narrowly scoped credential', 'Forks, pull requests, logs, and job permissions need careful controls'],
            ['Cloud secret manager', 'Production workload needing central policy and audit', 'The workload identity and network path still need protection'],
            ['HashiCorp Vault', 'Organizations requiring centralized dynamic or leased credentials', 'Operators must configure, secure, upgrade, and recover the Vault service'],
            ['Kubernetes Secret', 'Passing a value through the Kubernetes API to a workload', 'Base64 representation is not encryption; cluster access and at-rest controls matter'],
          ]}
        />
        <P>
          Prefer workload identity or short-lived credentials over a long-lived access key stored in an image or manifest. Scope
          access to the exact secret and environment, separate staging from production, and audit reads. If a cloud provider or
          Vault is unavailable, the application should fail safely and surface a useful operational error without logging the
          requested value.
        </P>
      </Part>

      <Part n={4} label="Access design" title="Grant Access to Workloads, Not to Every Engineer">
        <P>
          Start from the action: which service needs which credential, in which environment, and for how long? Give that service
          identity read access to a specific secret rather than broad access to an entire account or namespace. Human access should
          be individually attributable and time-bounded where the platform supports it. Remove permissions when a workload or
          person no longer needs them.
        </P>
        <Steps items={[
          'Name the workload identity and its owner; do not share one administrator credential across applications.',
          'Grant only the read or use operation required on the specific secret and environment.',
          'Keep production access separate from development and staging access.',
          'Enable audit events and alert on unexpected access patterns without recording secret values.',
          'Review access when owners, deployment paths, or application dependencies change.',
        ]} />
        <P>
          A secret store is one layer in the access design, not a way to repair a compromised application. If a web handler can
          read the payment token, an attacker who takes over that handler may be able to use it. Limit what the token itself can
          do, use provider-side restrictions where available, and monitor the operations performed with it.
        </P>
        <Callout type="tip">
          Store a non-secret identifier such as <code>PAYMENTS_TOKEN_SECRET_NAME</code> in deployment configuration, then let the
          workload identity retrieve that named secret. Avoid turning the identifier into an excuse for broad store permissions.
        </Callout>
      </Part>

      <Part n={5} label="Delivery" title="Inject Secrets at Runtime, Not While Building the Image">
        <P>
          A container image is a reusable artifact that may be pushed to a registry, cached, scanned, and shared across
          environments. Do not bake environment credentials into a Dockerfile, build argument, source layer, or image filesystem.
          The deployment platform should provide the runtime value through an approved secret integration, a mounted file, or
          another controlled mechanism that fits the application.
        </P>
        <Code lang="yaml" file="deployment-secret-reference.yaml" code={`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: orders-api
  template:
    metadata:
      labels:
        app: orders-api
    spec:
      serviceAccountName: orders-api
      containers:
        - name: api
          image: ghcr.io/example-org/orders-api:replace-with-commit-sha
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: orders-api-runtime
                  key: DATABASE_URL
`} />
        <P>
          This manifest references a Kubernetes Secret object; it does not fetch a cloud secret by itself. In a real cluster,
          create or synchronize that object through an approved secret manager integration, enable the cluster&apos;s appropriate
          encryption and access controls, and limit which service accounts can read it. Never commit the secret value in the
          manifest. The image tag is illustrative: use an immutable, reviewed release artifact.
        </P>
        <Callout type="warning">
          A secret mounted as an environment variable or file may still be visible to the application, diagnostics, or users who
          can inspect the process or pod. Restrict workload inspection access and choose the delivery mode with those boundaries
          in mind.
        </Callout>
      </Part>

      <Part n={6} label="Rotation and response" title="Plan Rotation Before a Credential Is Leaked">
        <P>
          Rotation replaces a credential with a new one and removes the old one after dependent workloads have moved over. Some
          backends support overlapping credentials: create a replacement, update consumers, verify success, then revoke the old
          value. Other systems have a short interruption or require coordinated changes. Test the actual dependency and define a
          rollback that does not re-enable a compromised credential.
        </P>
        <Steps items={[
          'Identify every consumer and owner of the credential before changing it.',
          'Create or request a replacement using the approved provider workflow.',
          'Update the secret store and roll out consumers using a controlled deployment.',
          'Verify authentication and business health, then revoke the previous credential.',
          'Record completion and update the next rotation or review checkpoint.',
        ]} />
        <P>
          If exposure is suspected, revoke or disable the credential at its issuer first, then investigate where it appeared, what
          it could access, and which actions used it. Rotate dependent credentials if they were reachable from the compromised
          context. Remove the value from exposed locations where possible, but do not assume deleting a Git commit or log entry
          makes a leaked credential safe again.
        </P>
        <Callout type="example">
          For a database used by a busy order service, coordinate a credential change with connection pools and background workers.
          Confirm the new credential works on all replicas before removing the old one, and watch authentication failures during
          the rollout.
        </Callout>
      </Part>

      <Part n={7} label="Delivery pipelines" title="Protect Secrets in CI and Deployment Workflows">
        <P>
          A CI job should receive only the credentials required for that job and only from trusted workflow contexts. A pull
          request from an external contributor must not be able to run arbitrary code with production credentials. Prefer
          short-lived deployment identity where supported; otherwise scope a protected secret to the smallest environment and
          require review for the deployment stage.
        </P>
        <P>
          Masking a value in logs is a useful safeguard, not a guarantee: transformed or encoded values may not be redacted. Avoid
          commands that echo secrets, do not pass them as command-line arguments when they may appear in process listings, and
          never put credentials in artifact contents. Keep deployment logs useful by reporting identity, environment, version, and
          outcome without printing the secret itself.
        </P>
        <Table
          head={['Pipeline boundary', 'Safer practice', 'Review question']}
          rows={[
            ['Pull request tests', 'Run without production credentials', 'Can untrusted code reach a privileged job?'],
            ['Build image', 'Build from source without runtime credentials', 'Could a layer or build log retain a secret?'],
            ['Deploy to staging', 'Use staging-only identity and secrets', 'Does the job have access beyond this environment?'],
            ['Production release', 'Require approved, traceable promotion', 'Who authorized the change and which artifact was deployed?'],
          ]}
        />
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Committing a populated .env file', cause: 'Local convenience is mistaken for repository privacy, and clones or history retain the value.', fix: 'Commit a blank example only, ignore the real file, and rotate any credential that was exposed.' },
          { mistake: 'Embedding a credential in a container image', cause: 'Image layers and registries preserve build-time contents across deployments.', fix: 'Inject a runtime secret from an approved store and rebuild clean images after exposure.' },
          { mistake: 'Giving every workload broad secret-store access', cause: 'One identity is reused for ease of setup.', fix: 'Use separate workload identities and grant per-secret, per-environment permissions.' },
          { mistake: 'Treating Kubernetes Secret data as encrypted automatically', cause: 'Base64 encoding looks opaque but does not provide confidentiality.', fix: 'Configure and verify cluster encryption, RBAC, and an approved external secrets workflow.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Design a Secret Lifecycle for an Orders Service">
        <Practice
          title="Remove static credentials from a deployment path"
          tasks={[
            'List the database and payment credentials used by a sample orders API; identify their owners, scopes, and consumers.',
            'Create a blank environment template and an application settings loader that fails when a required value is absent without printing values.',
            'Draw a production access path from workload identity to one named secret, including the audit and network boundaries.',
            'Write a rotation checklist that covers a replacement, rollout verification, old credential revocation, and failure rollback.',
            'Review a CI workflow design and mark which jobs can run untrusted code and which jobs may access deployment credentials.',
          ]}
          hint="Keep every exercise credential fictional. The goal is to reason about scope and lifecycle, not to create a real cloud key or store it in the repository."
        />
      </Part>

      <KeyTakeaways items={[
        'A secret has a lifecycle: create, scope, deliver, audit, rotate, and revoke it.',
        'Environment variables are a delivery interface, not a secret manager; protect local files and avoid exposing values in logs.',
        'Use workload identity and least privilege so each service can retrieve only the credentials it needs.',
        'Do not bake runtime credentials into source code, container images, build logs, or deployment manifests.',
        'Kubernetes Secret objects require appropriate encryption, access controls, and an approved provisioning path.',
        'Plan rotation in advance and revoke exposed credentials at their issuer; deleting a copy does not make it safe again.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/devops-mlops/ci-cd-github-actions"
        label="Lesson 10 · CI/CD with GitHub Actions"
        text="You have designed how applications receive sensitive values. Next, build a delivery pipeline that tests, packages, and deploys changes without leaking those credentials."
      />
    </LearnLayout>
  )
}
