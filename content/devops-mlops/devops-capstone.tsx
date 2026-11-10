import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function DevopsCapstone() {
  return (
    <LearnLayout
      title="DevOps Capstone — Containerised App with CI/CD, Terraform and Monitoring"
      description="Plan and ship a small API through a container build, automated checks, reviewed Terraform, Kubernetes deployment, and operational verification."
      section="DevOps & Cloud Infrastructure — Lesson 15"
      readTime="60 min"
    >
      <Part n={1} label="Project brief" title="Ship a Small Service with a Safe Delivery Path">
        <P>
          In this capstone, you will take a tiny HTTP service from a repository to a repeatable deployment workflow. The goal
          is not to imitate a large production platform in one sitting. It is to show that you can define requirements, package
          a service, automate repeatable checks, review infrastructure changes, deploy a known image, and verify that users can
          reach a healthy endpoint.
        </P>
        <P>
          Use a disposable local environment or an approved sandbox account. Do not apply cloud infrastructure from a tutorial
          without checking ownership, permissions, possible charges, and cleanup. Production credentials and real customer data
          do not belong in this exercise. Keep the service intentionally small so the delivery and operational decisions stay
          visible.
        </P>
        <Table
          head={['Requirement', 'Evidence of completion']}
          rows={[
            ['Runnable service', 'A documented health endpoint and a small user-facing response.'],
            ['Reproducible image', 'A Dockerfile builds the same application artifact from a clean checkout.'],
            ['Automated checks', 'A pull-request workflow runs tests and builds the image.'],
            ['Reviewed infrastructure', 'Terraform is formatted, validated, planned, and applied only in an approved sandbox.'],
            ['Observable deployment', 'A rollout can be checked and safely reverted; service health is verified after release.'],
          ]}
        />
        <Callout type="info">
          A capstone is a learning artifact, not proof that the sample is production-ready. Real services also need security review, capacity planning, identity controls, backups, SLOs, and service-specific operations.
        </Callout>
      </Part>

      <Part n={2} label="Architecture" title="Make the Boundaries and Deployment Path Explicit">
        <P>
          A Python HTTP process exposes a health route; a container image packages it; CI tests and builds the image; Terraform declares a sandbox network; and Kubernetes runs it behind a Service. Keep infrastructure changes separate from ordinary build checks so review and failures remain clear.
        </P>
        <Steps items={[
          'Developer opens a pull request; automated tests and image build provide review evidence.',
          'A reviewed change is merged; the image is tagged with an immutable commit identifier by the release process.',
          'An authorized operator reviews a Terraform plan before applying an infrastructure change.',
          'The deployment updates the Kubernetes workload to the approved image and waits for readiness.',
          'A smoke check and service signals verify the change; the operator rolls back if the new version is unhealthy.',
        ]} />
        <Table
          head={['Boundary', 'Owns', 'Must not contain']}
          rows={[
            ['Application', 'HTTP behavior and safe responses.', 'Cloud credentials or deployment policy.'],
            ['CI', 'Repeatable tests, build, and release evidence.', 'Unreviewed production access.'],
            ['Terraform', 'Declared infrastructure and change plan.', 'Application secrets in source or state outputs.'],
            ['Runtime', 'Scheduling, service discovery, health, and rollout.', 'A guarantee that application logic is correct.'],
          ]}
        />
        <Callout type="tip">
          Write down the exact image tag and commit that are deployed. A mutable tag such as <code>latest</code> makes incident
          diagnosis and rollback less reliable.
        </Callout>
      </Part>

      <Part n={3} label="Application and image" title="Create a Health Route and Package the Process">
        <P>
          Keep the application deliberately dependency-light. This standard-library example returns a response for the root path
          and a distinct health response. The health endpoint only confirms that the process can respond; a real readiness check
          might also verify critical dependencies, while avoiding a fragile check that makes every temporary downstream issue
          restart all application instances.
        </P>
        <Code lang="python" file="app.py" code={`
from http.server import BaseHTTPRequestHandler, HTTPServer
import os

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/health":
            body = b"ok\\n"
            self.send_response(200)
        elif self.path == "/":
            body = b"DevOps capstone service\\n"
            self.send_response(200)
        else:
            body = b"not found\\n"
            self.send_response(404)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        print("request:", format % args)

port = int(os.environ.get("PORT", "8080"))
HTTPServer(("0.0.0.0", port), Handler).serve_forever()
`} />
        <P>
          This example is for a controlled learning environment, not an internet-facing application server. A production service
          needs a hardened server stack, structured and privacy-conscious logs, graceful shutdown, timeouts, authentication as
          required, and tests for its supported routes.
        </P>
        <Code lang="dockerfile" file="Dockerfile" code={`
FROM python:3-slim
WORKDIR /app
COPY app.py ./app.py
ENV PORT=8080
EXPOSE 8080
USER 10001
CMD ["python", "app.py"]
`} />
        <P>
          Build from the repository root and run the image with a local port mapping. Do not put credentials in the Dockerfile,
          build arguments, image layers, or container environment values committed to Git. In a team build, scan and publish
          images using the organization&apos;s approved registry and image provenance controls.
        </P>
        <Code lang="bash" file="build-local.sh" code={`
docker build -t learning-api:local .
docker run --rm --name learning-api -p 8080:8080 learning-api:local
`} />
      </Part>

      <Part n={4} label="Continuous integration" title="Run the Same Checks on Every Pull Request">
        <P>
          A CI workflow gives reviewers repeatable evidence. Keep pull-request checks read-only where possible: test the code,
          build the image, and report results. A successful build does not prove the image is secure or the service works under
          load, but it catches syntax and packaging mistakes early. Keep third-party action permissions narrow and review action
          sources and updates under your team&apos;s policy.
        </P>
        <Code lang="yaml" file=".github/workflows/ci.yml" code={`
name: service-ci
on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check Python syntax
        run: python -m py_compile app.py
      - name: Build container image
        run: docker build -t learning-api:\${{ github.sha }} .
`} />
        <P>
          The tag above is derived from the workflow commit context so versions can be distinguished. The YAML is a starting
          point: add tests, pinned and reviewed actions, dependency controls, and an approved registry publish step before using
          it as a release workflow. Protect the main branch so required checks cannot be bypassed casually.
        </P>
        <Callout type="warning">
          CI credentials are powerful. Never expose a deployment token to untrusted pull-request code, and do not give a test
          job write access to cloud resources just because deployment happens later in the workflow.
        </Callout>
      </Part>

      <Part n={5} label="Infrastructure" title="Declare a Sandbox Network and Review the Plan">
        <P>
          Terraform makes infrastructure intent reviewable. This small HCL example declares a virtual network with a variable
          address range and an ownership tag. The example uses AWS authentication configured outside source control. It creates no compute or public ingress. Before use, confirm the account, region, permissions, team backend, and cleanup owner.
        </P>
        <Code lang="hcl" file="main.tf" code={`
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = var.region
}

variable "region" {
  description = "Approved region for the sandbox."
  type        = string
}

variable "network_cidr" {
  description = "Non-overlapping private range for this sandbox."
  type        = string
}

resource "aws_vpc" "capstone" {
  cidr_block           = var.network_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name        = "devops-capstone"
    Environment = "sandbox"
  }
}

output "network_id" {
  description = "Identifier of the sandbox VPC."
  value       = aws_vpc.capstone.id
}
`} />
        <P>
          Use example variable files only for non-secret values. A team backend needs controlled access, encryption, durability, and locking based on current Terraform guidance. State and saved plans can expose sensitive attributes, so protect them.
        </P>
        <Code lang="bash" file="terraform-review.sh" code={`
terraform fmt -check -recursive
terraform init
terraform validate
terraform plan -out=reviewed.tfplan
terraform show reviewed.tfplan
# Apply only after confirming the sandbox and reviewing the exact plan.
terraform apply reviewed.tfplan
`} />
        <Callout type="tip">
          Stop if the plan includes an unexpected deletion, replacement, account, or region. Recheck the selected identity and
          state before applying; do not use an automatic approval flag to bypass review.
        </Callout>
      </Part>

      <Part n={6} label="Kubernetes" title="Run the Image with Clear Health Probes">
        <P>
          A Kubernetes Deployment maintains the requested number of application replicas and rolls out a new pod template.
          A ClusterIP Service provides an internal stable endpoint. Replace the sample image name with an immutable image that
          is available to the target cluster. The probes check the process health endpoint; they do not prove that the complete
          user journey or all dependencies work.
        </P>
        <Code lang="yaml" file="k8s/app.yaml" code={`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: learning-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: learning-api
  template:
    metadata:
      labels:
        app: learning-api
    spec:
      containers:
        - name: api
          image: registry.example.invalid/learning-api:replace-with-commit
          ports:
            - name: http
              containerPort: 8080
          readinessProbe:
            httpGet:
              path: /health
              port: http
          livenessProbe:
            httpGet:
              path: /health
              port: http
          resources:
            requests:
              cpu: 100m
              memory: 64Mi
            limits:
              cpu: 500m
              memory: 256Mi
---
apiVersion: v1
kind: Service
metadata:
  name: learning-api
spec:
  selector:
    app: learning-api
  ports:
    - name: http
      port: 80
      targetPort: http
  type: ClusterIP
`} />
        <P>
          The resource values are starter examples that must be measured and adjusted for the real workload. A production
          deployment also needs an ingress or gateway strategy, TLS, identity and network policy, secret integration, disruption
          planning, resource sizing, and monitoring. Keep secrets in an approved secret manager or cluster integration rather
          than plain manifests.
        </P>
      </Part>

      <Part n={7} label="Release and verification" title="Deploy, Observe, and Roll Back Deliberately">
        <P>
          A release is not complete when the command exits successfully. Verify the deployment reached the intended image,
          endpoints are ready, and a smoke check observes expected behavior. Watch the service&apos;s error and latency signals and
          compare them with the pre-release baseline. If the change causes user impact, follow the incident process and choose a
          known-safe rollback or mitigation. A rollback is not always safe for database or data-format changes, so plan those
          separately.
        </P>
        <Code lang="bash" file="verify-release.sh" code={`
kubectl apply -f k8s/app.yaml
kubectl rollout status deployment/learning-api
kubectl get pods -l app=learning-api
kubectl port-forward service/learning-api 8080:80
# In another terminal, confirm the health endpoint responds.
curl --fail http://localhost:8080/health
`} />
        <P>
          The local port-forward is a development check, not an internet exposure pattern. Use an approved shared-test path. Before rollback, confirm the previous image is compatible with stateful changes; record the image tag, commit, operator, and verification result.
        </P>
        <Steps items={[
          'Confirm the target cluster, namespace, image tag, and change approval.',
          'Apply the reviewed manifest through the approved deployment path.',
          'Wait for readiness and inspect pod events if the rollout stalls.',
          'Check health and a representative application request from an allowed network path.',
          'Review metrics, logs, and alerts; stop or roll back if user impact appears.',
          'Record the result and clean up only resources owned by this exercise.',
        ]} />
      </Part>

      <Part n={8} label="Rubric and extensions" title="Assess the Engineering, Then Extend the Project">
        <P>
          Use the rubric to review evidence rather than judging by tool count. A project with fewer services but clear ownership,
          safe defaults, tests, and a repeatable deploy path is stronger than a complex stack that no one can operate.
        </P>
        <Table
          head={['Area', 'Developing', 'Strong evidence']}
          rows={[
            ['Application', 'Runs locally but health and errors are unclear.', 'Routes are tested; readiness has a documented meaning.'],
            ['Container', 'Build works only on the author machine.', 'Clean build is repeatable and contains no credentials.'],
            ['CI/CD', 'Pipeline is manual or broadly privileged.', 'Pull-request checks are repeatable with minimal permissions.'],
            ['Infrastructure', 'Changes are applied without a reviewable plan.', 'State is protected and plan, ownership, and cleanup are explicit.'],
            ['Runtime', 'Pods start but are not verified.', 'Probes, resource assumptions, rollout, and rollback are explained.'],
            ['Operations', 'A dashboard is present but no action is defined.', 'Signals, SLO proposal, runbook, and incident ownership connect.'],
          ]}
        />
        <P>After the core path works, choose extensions that answer a real operational need:</P>
        <Bullets items={[
          'Add unit and integration tests, then test the health contract and failure behavior.',
          'Publish signed or provenance-attested images to an approved registry with controlled promotion.',
          'Add an ingress with TLS and an identity-aware access pattern for a sandbox.',
          'Instrument request rate, error ratio, and latency; document an SLI and proposed SLO.',
          'Practice a failed rollout, write a runbook, and capture a blameless postmortem.',
          'Add dependency scanning and policy checks without exposing secrets to untrusted jobs.',
        ]} />
      </Part>

      <Part n={9} label="Pitfalls and practice" title="Common Mistakes and Your Submission">
        <Mistakes items={[
          { mistake: 'Using a mutable image tag for every release', cause: 'The deployed artifact cannot be identified confidently during an incident.', fix: 'Tag and record the immutable commit or digest, and promote the same artifact between environments.' },
          { mistake: 'Adding credentials to a manifest or workflow file', cause: 'Repository history and logs can retain a leaked secret.', fix: 'Use the approved identity federation or secret manager and limit permissions by job and environment.' },
          { mistake: 'Treating a green pipeline as production approval', cause: 'Build success does not establish security, capacity, or user impact.', fix: 'Keep change review, protected deployment approval, verification, and service ownership explicit.' },
          { mistake: 'Deleting cloud resources without checking state and ownership', cause: 'A shared resource may belong to another team or environment.', fix: 'Confirm ownership and dependency, review the plan, and remove only resources this exercise created.' },
        ]} />
        <Practice
          title="Produce a reviewable capstone handoff"
          tasks={[
            'Create the tiny service and Dockerfile; build and run it locally, then verify both known paths and a missing route.',
            'Add a pull-request CI workflow that checks syntax or tests and builds the image without production credentials.',
            'Write Terraform for an approved sandbox boundary, validate it, inspect the plan, and record who may apply it.',
            'Deploy the image to a learning Kubernetes cluster with readiness and liveness probes; confirm the rollout and health route.',
            'Write a short release runbook covering image identity, verification, alert response, rollback limits, and cleanup ownership.',
            'Submit a diagram, a list of assumptions, test results, and one proposed SLI/SLO with measurement caveats.',
          ]}
          hint="If you do not have a cloud account or Kubernetes cluster, document the infrastructure plan and validate the application and image locally. Never create paid resources just to complete a portfolio exercise."
        />
      </Part>

      <KeyTakeaways items={[
        'A delivery capstone should begin with explicit requirements, trust boundaries, ownership, and cleanup rules.',
        'CI proves repeatable checks and builds; it does not by itself approve a production release.',
        'Terraform plans and state are sensitive operational artifacts that need review and protection.',
        'Kubernetes probes support process health and rollout decisions but do not replace user-journey checks.',
        'Identify each release by an immutable image reference and verify behavior after deployment.',
        'A useful portfolio handoff explains assumptions, operations, rollback limits, and what remains out of scope.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/devops-mlops/devops-interview-prep"
        label="Lesson 16 · DevOps Interview Prep"
        text="Now practise explaining the systems you built: Linux, containers, Kubernetes, cloud infrastructure, CI/CD, troubleshooting, and incident response."
      />
    </LearnLayout>
  )
}
