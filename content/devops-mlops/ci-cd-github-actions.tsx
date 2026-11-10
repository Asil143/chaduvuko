import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'
import { LearnLayout } from '@/components/content/LearnLayout'

export default function CiCdGithubActions() {
  return (
    <LearnLayout
      title="CI/CD with GitHub Actions"
      description="Build a controlled delivery pipeline that tests a change, builds and publishes a Docker image, and deploys through a protected environment."
      section="DevOps & Cloud Infrastructure — Lesson 10"
      readTime="35 min"
    >
      <Part n={1} label="From commit to release" title="Automate the Checks You Already Trust">
        <P>
          Continuous Integration (CI) runs repeatable checks when code changes. Continuous Delivery (CD) prepares a tested change
          so it can be deployed through a controlled release process; continuous deployment goes further and automatically
          releases qualifying changes. A GitHub Actions workflow is a YAML file in <code>.github/workflows</code>. Events start
          workflows, jobs run on runners, and steps use actions or shell commands.
        </P>
        <P>
          For a small order API, the path might be: pull request → tests → merge to the default branch → build an immutable
          Docker image tagged with the commit ID → publish it → deploy to a protected environment → verify health. Pull requests
          should run safe checks without production credentials. Deploy only after the code review and checks required by your
          team have passed.
        </P>
        <Table
          head={['Workflow term', 'Meaning', 'Example']}
          rows={[
            ['Event', 'What triggers a workflow', 'Pull request or push to the default branch'],
            ['Job', 'A set of steps with a runner and permissions', 'Unit tests or image build'],
            ['Step', 'A shell command or reusable action', 'Run a test script or check out source'],
            ['Artifact / image', 'A versioned output of a build', 'Container tagged with a commit SHA'],
            ['Environment', 'A deployment boundary with protection rules', 'Staging or production with required reviewers'],
          ]}
        />
        <Callout type="info">
          CI makes a bad change fail earlier; it cannot guarantee correctness. Keep tests meaningful, make deployments
          observable, and have a rollback or forward-fix plan.
        </Callout>
      </Part>

      <Part n={2} label="Workflow file" title="A Test, Build and Deploy Pipeline">
        <P>
          This example runs the project&apos;s test script on pull requests and on pushes to <code>main</code>. Only a push to
          <code> main</code> can publish an image and enter the production deployment job. It uses GitHub&apos;s short-lived
          <code> GITHUB_TOKEN</code> to publish to GitHub Container Registry and OpenID Connect (OIDC) to obtain cloud
          credentials without storing a long-lived cloud key. Configure the repository, cloud role, and protected environment
          for your own provider before using it.
        </P>
        <Code lang="yaml" file=".github/workflows/release.yml" code={`
name: test-build-deploy

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out source
        uses: actions/checkout@v4
      - name: Run project tests
        run: ./scripts/test.sh

  build-and-deploy:
    needs: test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    permissions:
      contents: read
      packages: write
      id-token: write
    steps:
      - name: Check out source
        uses: actions/checkout@v4

      - name: Set image name
        id: image
        shell: bash
        run: |
          echo "uri=ghcr.io/\${GITHUB_REPOSITORY,,}:\${GITHUB_SHA}" >> "$GITHUB_OUTPUT"

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build and publish immutable image
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: \${{ steps.image.outputs.uri }}

      - name: Configure cloud credentials with OIDC
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ vars.AWS_DEPLOY_ROLE_ARN }}
          aws-region: \${{ vars.AWS_REGION }}

      - name: Deploy the exact image
        env:
          IMAGE_URI: \${{ steps.image.outputs.uri }}
        run: ./scripts/deploy.sh "$IMAGE_URI"
`} />
        <P>
          The deploy script is intentionally owned by the application repository: it should update the selected platform with
          that exact image, wait for the deployment to become healthy, and fail if health checks do not pass. This workflow
          assumes an AWS OIDC role; replace that authentication step if the application runs on another cloud. Do not copy the
          role ARN or other environment-specific identifiers into an unreviewed shared example.
        </P>
        <Callout type="warning">
          The example uses established GitHub Action major tags as readable references. Before adopting it, verify current action
          releases and your organization&apos;s policy; pin actions to immutable commit SHAs when your supply-chain policy requires it.
        </Callout>
      </Part>

      <Part n={3} label="Tests first" title="Make the Test Job Safe for Pull Requests">
        <P>
          The test job needs source code and test dependencies, not production cloud credentials. The example uses a repository
          script so each project can choose its own test runner. For a Python API, it could create an isolated environment, install
          locked dependencies, and run unit tests. For a Node app, it might run lint, type-checking, and unit tests. Keep checks
          deterministic and give failures enough output to diagnose the problem.
        </P>
        <Code lang="bash" file="scripts/test.sh" code={`
#!/usr/bin/env bash
set -euo pipefail

# Replace these with the project's committed, reproducible test commands.
python -m pip install -r requirements.txt
python -m pytest
`} />
        <P>
          In a real repository, avoid unpinned dependency installation in the release workflow when the project already has a
          lockfile or reproducible build process. Cache downloads only as an optimization; the cache must not be a source of
          trusted secrets. Separate unit tests, integration tests, and checks that require external services, and document which
          checks are required to merge.
        </P>
        <Steps items={[
          'Run the same core checks locally and in CI where practical.',
          'Make a failing test cause a non-zero job result so dependent jobs stop.',
          'Keep untrusted pull-request code away from deployment secrets and privileged runners.',
          'Require the intended checks before merge using repository branch protection rules.',
        ]} />
      </Part>

      <Part n={4} label="Build artifacts" title="Tag Images So You Can Identify What Is Running">
        <P>
          The image build runs only after tests pass. A commit SHA is a useful immutable identifier: the team can connect a
          running image back to the source change that produced it. A moving tag such as <code>latest</code> is convenient for
          a quick demo but ambiguous for auditing and rollback. Keep image access restricted, scan images using your approved
          process, and retain only what your recovery and compliance needs require.
        </P>
        <P>
          Docker build context matters: exclude local secrets, caches, and irrelevant files with a suitable
          <code> .dockerignore</code>. Use a non-root runtime user where appropriate, keep base images maintained, and avoid
          baking credentials into image layers. If the registry is private, configure the deployment platform to pull images
          using a narrowly scoped identity.
        </P>
        <Code lang="bash" file=".dockerignore" code={`
.git
.venv
node_modules
.env
.env.*
!.env.example
__pycache__
coverage
`} />
        <P>
          Never assume an ignore file protects secrets that are already tracked by Git. Check the build context and repository
          history, and rotate any credential that has been exposed.
        </P>
      </Part>

      <Part n={5} label="Credentials" title="Prefer OIDC and Narrow Permissions">
        <P>
          Repository secrets are encrypted values exposed only to authorized workflow contexts, but a workflow can still leak
          them through logs or malicious dependencies. Keep secrets at the narrowest useful scope and do not expose production
          values to untrusted pull requests. For cloud deployment, OIDC lets GitHub request short-lived credentials by proving
          the workflow identity to the cloud provider. The trust policy should restrict which repository, branch, environment,
          and workflow identity may assume the role.
        </P>
        <P>
          Use GitHub Actions variables for non-secret configuration such as a region or cluster name when appropriate. Keep
          sensitive data in a secret store and pass it only to the step that needs it. Never echo a token to the log, place it in
          a command-line argument that process inspection may reveal, or write it into a generated artifact.
        </P>
        <Table
          head={['Value', 'Typical storage', 'Example']}
          rows={[
            ['Non-sensitive deployment setting', 'Environment variable or GitHub variable', 'AWS region or application name'],
            ['Cloud authentication', 'OIDC federation with a restricted trust policy', 'Short-lived role credentials for one deployment job'],
            ['External API credential', 'Environment or repository secret with narrow access', 'A token needed by one controlled integration step'],
            ['Application runtime secret', 'Managed cloud secret store or platform secret facility', 'Database password injected at runtime'],
          ]}
        />
        <Callout type="tip">
          Use a protected GitHub environment for production. Environment reviewers and deployment branch restrictions add a
          deliberate approval boundary before the job can access environment-scoped values.
        </Callout>
      </Part>

      <Part n={6} label="Environments" title="Separate Staging from Production">
        <P>
          A deployment environment represents more than a label. It can hold environment-scoped variables and secrets, restrict
          allowed branches, and require reviewers before a job proceeds. A useful release path deploys an image to staging,
          verifies the health and critical flows, and then promotes the same immutable image to production. Rebuilding separately
          for production could create a different artifact from the one already tested.
        </P>
        <P>
          Treat rollback as a deployment of a known-good image or a forward fix—not a blind reversal of database changes. Plan
          schema migrations so old and new application versions can coexist during a rollout. Keep a release record with the
          commit, image digest, environment, approval, and health-check result.
        </P>
        <Callout type="example">
          A Swiggy-style delivery service might first test its order-status API in staging using synthetic orders. Before
          production, the on-call owner checks that the new image is healthy, that no credentials appear in logs, and that the
          previous image remains available for rollback.
        </Callout>
      </Part>

      <Part n={7} label="Reliability" title="Make a Deployment Fail Clearly and Recover Safely">
        <P>
          A green workflow only tells you the configured checks succeeded. The deploy step should verify that the platform
          reports a completed rollout and that the application responds to its health check. Monitor errors and latency after
          release; if the service regresses, stop further promotion and follow the tested rollback or forward-fix procedure.
          Deploy smaller changes so the cause of a regression is easier to identify.
        </P>
        <P>
          Keep permissions minimal at each level: repository settings, workflow token, action permissions, cloud role, and
          runtime identity. Pin dependencies and actions according to your supply-chain policy, review third-party actions, and
          use protected branches and environments. A powerful workflow is production code: changes to it deserve review too.
        </P>
        <Steps items={[
          'Test the code and build one image identified by the commit.',
          'Publish it to a registry with permissions limited to the required package.',
          'Authenticate with a short-lived, narrowly trusted deployment identity.',
          'Deploy to a protected environment and wait for platform health checks.',
          'Record the result, watch service signals, and stop promotion if user impact appears.',
        ]} />
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Deploying on every pull request', cause: 'Unreviewed or untrusted code can reach production controls.', fix: 'Run safe tests on pull requests; deploy only from a reviewed branch through a protected environment.' },
          { mistake: 'Using a floating image tag as the only release identifier', cause: 'It is difficult to know which source revision a running container represents.', fix: 'Tag and record an immutable commit identifier or digest, and promote the same artifact.' },
          { mistake: 'Saving a long-lived cloud administrator key in repository secrets', cause: 'The credential can be reused outside the workflow and has a large blast radius.', fix: 'Use OIDC federation with a narrowly scoped role and short-lived credentials where supported.' },
          { mistake: 'Treating a successful deploy command as proof of health', cause: 'The platform may accept a request while the service is failing startup or user requests.', fix: 'Wait for rollout health, run a smoke check, and monitor errors and latency after release.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Build a Release Workflow for a Small API">
        <Practice
          title="Test, build, publish and safely deploy"
          tasks={[
            'Create a pull-request workflow job that checks out the source and runs your project test command.',
            'Add a dependent main-branch job that builds a container image tagged by the commit SHA.',
            'Publish the image with a narrowly scoped registry token or GitHub token permissions.',
            'Configure a protected staging or production environment and describe its branch and reviewer rules.',
            'Write down how the deploy step verifies health, how you find the running image, and how you roll back.',
          ]}
          hint="Keep tests free of deployment credentials. Treat the deploy command as a provider-specific adapter, and pass it the exact immutable image that passed the earlier checks."
        />
      </Part>

      <KeyTakeaways items={[
        'A workflow reacts to events and runs jobs made of actions and shell steps; CI and CD are a controlled path, not just YAML syntax.',
        'Run tests on pull requests without production credentials, then gate image publication and deployment on trusted branches.',
        'Build and promote an immutable container image so operators can identify the exact source revision in production.',
        'Use OIDC and short-lived, narrowly scoped cloud roles where supported; protect secrets and deployment environments.',
        'Verify the rollout and application health, record the release, and maintain a tested rollback or forward-fix procedure.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/devops-mlops/kubernetes-fundamentals"
        label="Lesson 11 · Kubernetes Fundamentals — Pods, Deployments and Services"
        text="Your workflow can produce and deploy an image. Next, learn the Kubernetes objects that keep container workloads running and reachable."
      />
    </LearnLayout>
  )
}
