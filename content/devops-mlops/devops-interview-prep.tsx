import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function DevopsInterviewPrep() {
  return (
    <LearnLayout
      title="DevOps Interview Prep"
      description="Prepare clear, evidence-led answers for Linux, containers, CI/CD, Terraform, Kubernetes, cloud, SRE, troubleshooting, and incident scenarios."
      section="DevOps & Cloud Infrastructure — Lesson 16"
      readTime="45 min"
    >
      <Part n={1} label="Linux and networking" title="Explain the Request Path Before Guessing at a Fix">
        <P>
          Strong DevOps answers start with what the user sees, what the system is expected to do, and where evidence can be
          collected. Avoid reciting commands without explaining the question each command answers. These model answers are
          frameworks: adapt them to tools you have actually used and state clearly when a detail depends on the environment.
        </P>
        <Table
          head={['Answer step', 'What to explain']}
          rows={[
            ['Scope', 'Name the user impact, service, and time window.'],
            ['Evidence', 'Explain what a signal or command tests.'],
            ['Decision', 'Describe a safe next action and how you will verify it.'],
          ]}
        />
        <H3>1. A service is slow. How do you begin investigating on Linux?</H3>
        <P>
          I confirm the affected journey, scope, start time, and recent changes. Then I compare host pressure, service logs, and
          request or dependency latency with a healthy instance. I change one thing at a time and preserve evidence before
          restarting unless an approved mitigation is needed.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          'A user-impact-first approach instead of blindly running commands.',
          'A structured sequence that distinguishes symptoms from causes.',
          'Safe handling of evidence and awareness that a restart can erase context.',
        ]} />

        <H3>2. A domain name resolves but the application is unreachable. What layers do you check?</H3>
        <P>
          I verify the resolved address, then test the client path through firewall rules, load balancer, TLS, proxy, and service.
          I inspect the response and certificate, compare a known-good path, and review recent changes before altering DNS.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          'A layered model from name resolution through application response.',
          'Use of client-side evidence and comparison across paths.',
          'Care with DNS propagation and potentially disruptive changes.',
        ]} />
      </Part>

      <Part n={2} label="Containers" title="Describe What the Image Actually Contains">
        <H3>3. What is the difference between an image and a container?</H3>
        <P>
          An image is a packaged, mostly immutable template of filesystem layers and configuration. A container is a running
          process created from an image with runtime isolation and configuration. Container layers can be shared, while writable
          runtime data is ephemeral unless deliberately mounted or persisted. An image is not a virtual machine: it shares the
          host kernel and needs appropriate isolation and resource controls.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          'Correct distinction between artifact and running process.',
          'Awareness of image layers, ephemeral files, and host-kernel sharing.',
          'A reminder that containers do not automatically provide security.',
        ]} />

        <H3>4. How would you make a container image safer and smaller?</H3>
        <P>
          I start from a suitable maintained base, copy only required application files, avoid build tools in the runtime image
          when a multi-stage build is appropriate, run as a non-root user, and keep secrets out of layers and build arguments.
          I scan the result, update dependencies through a reviewed process, and test the actual image. Image size is one concern;
          provenance, patchability, reproducibility, and a clear runtime contract matter too.
        </P>
        <Code lang="dockerfile" file="interview.Dockerfile" code={`
FROM python:3-slim
WORKDIR /app
COPY app.py ./app.py
ENV PORT=8080
USER 10001
CMD ["python", "app.py"]
`} />
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          'Least privilege and an explanation of what is copied into the image.',
          'No claim that a small image is automatically a secure image.',
          'A practical testing and patching approach.',
        ]} />

        </Part>

      <Part n={3} label="CI/CD and Terraform" title="Separate Repeatable Checks from Approval">
        <H3>5. What should a CI pipeline do for a pull request?</H3>
        <P>
          It should provide fast, repeatable evidence such as linting, tests, static checks, and an image build. A release stage
          can publish a versioned artifact after review, while deployment to a sensitive environment uses protected identity and
          approval controls. I keep permissions scoped to each job, avoid exposing secrets to untrusted code, and make failures
          clear enough that developers can reproduce them locally.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          'A clear distinction among verification, artifact publishing, and deployment.',
          'Least privilege and protection against secret exposure.',
          'Actionable logs, deterministic artifacts, and branch protection.',
        ]} />

        <H3>6. How do you handle a Terraform plan that proposes an unexpected replacement?</H3>
        <P>
          I do not apply it until I understand the cause. I confirm the workspace, account, provider configuration, state, and
          exact resource attributes that changed. I check whether the provider marks the changed field as replacement-only,
          whether configuration or remote infrastructure drifted, and whether another operation changed state. Then I discuss
          the intended behavior, refresh or import only through a reviewed recovery path if needed, and produce a fresh plan.
          State surgery is a last-resort, documented operation, not a way to make a plan look green.
        </P>
        <Code lang="bash" file="terraform-review.sh" code={`
terraform fmt -check -recursive
terraform validate
terraform plan -out=reviewed.tfplan
terraform show reviewed.tfplan
# Stop and investigate any unexpected replacement or deletion.
`} />
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          'Understanding that Terraform state maps configuration to real resources.',
          'Plan review, identity verification, and caution around state recovery.',
          'No blind apply or manual state editing to silence a diff.',
        ]} />

        </Part>

      <Part n={4} label="Kubernetes and cloud" title="Debug the Workload, Not Just the Cluster">
        <H3>7. A pod is Pending. What do you inspect?</H3>
        <P>
          I inspect pod events and scheduling conditions first. Common causes include insufficient requested resources, node
          selectors or affinity with no matching node, taints without tolerations, storage claims that are not bound, or quota
          constraints. I compare requested resources with node capacity and recent cluster changes. I do not lower requests or
          remove scheduling rules until I understand why they were set and what capacity or isolation the workload needs.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          'Use of events and scheduling evidence rather than guesswork.',
          'Understanding requests, capacity, constraints, storage, and quotas.',
          'Safe changes that preserve workload guarantees.',
        ]} />

        <H3>8. A pod is Running but users receive errors. Why?</H3>
        <P>
          Running means the container process exists; it does not mean the application is ready or the user path works. I check
          readiness, service selectors and endpoints, port mappings, ingress or gateway routing, network policies, application
          logs, and dependency health. I test from inside and outside the cluster using an approved path and compare the actual
          response with the expected one. A misleading probe can keep a broken pod in service or restart a healthy one.
        </P>
        <Code lang="bash" file="inspect-workload.sh" code={`
kubectl get pods -l app=learning-api
kubectl describe pods -l app=learning-api
kubectl get endpoints learning-api
`} />
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          'Understanding of pod state versus application health and service routing.',
          'A layered check from the container to the client.',
          'Awareness of probe semantics and failure consequences.',
        ]} />

        </Part>

      <Part n={5} label="Observability and SRE" title="Tie Metrics to User Impact">
        <H3>9. When would you use metrics, logs, or traces?</H3>
        <P>
          Metrics summarize trends and are useful for alerting and capacity views; logs capture individual events and context;
          traces connect spans across a request path. I might use an error-rate metric to detect a broad issue, a trace to find
          which dependency added latency, and a structured log to understand the specific failure. I control label cardinality,
          retention, access, and redaction because telemetry can expose sensitive data and grow costly.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          'Choosing a signal based on the question rather than tool preference.',
          'Connections among metrics, logs, and traces.',
          'Privacy, cost, cardinality, and retention awareness.',
        ]} />

        <H3>10. What makes a useful SLI and SLO?</H3>
        <P>
          The SLI measures an important user outcome with a defined event population, numerator, denominator, and window. The
          SLO is the team&apos;s agreed target for that indicator over that window. I document exclusions and telemetry gaps, choose
          a target with product and engineering based on user expectations and evidence, and review it when service behavior
          changes. I keep internal objectives distinct from external SLA commitments.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          'A measurable user journey, not just a host metric.',
          'Clear window, population, and treatment of exclusions.',
          'Distinction between SLO, SLA, and error budget.',
        ]} />

        <H3>11. How do you design an alert that does not cause fatigue?</H3>
        <P>
          I page when a human needs to act promptly because users are affected or a meaningful objective is burning quickly.
          The alert should state the symptom, affected service or journey, duration and scope, owner, and first safe diagnostic
          step. Lower urgency capacity trends can create tickets. I review noisy alerts after incidents and test the runbook
          rather than adding pages for every metric fluctuation.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          'User impact and urgency as the basis for paging.',
          'An owner, useful context, and actionable next step.',
          'A feedback loop for tuning alerts and runbooks.',
        ]} />
      </Part>

      <Part n={6} label="Troubleshooting scenarios" title="Narrate a Safe Incident Response">
        <H3>12. A release causes a rise in server errors. What do you do?</H3>
        <P>
          I acknowledge the alert, confirm the affected journeys and scope, and compare the timing with the release. I open a
          shared incident channel, assign an incident lead if needed, and preserve a short timeline. If evidence points to the
          change and rollback is safe, I mitigate using the approved release path, then verify the error ratio and representative
          user journey. I communicate confirmed impact and the next update time, and investigate root causes after users are
          protected.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          'Mitigation and coordination before an unbounded investigation.',
          'Evidence-based rollback decision and verification.',
          'Clear updates, timeline, and awareness of rollback risk.',
        ]} />

        <H3>13. A database dependency is timing out. How do you reduce impact?</H3>
        <P>
          I verify whether the timeouts are broad or isolated and check database health, connection pool saturation, query
          latency, and the application&apos;s retry behavior. I look for a recent query, traffic, or configuration change. To limit
          cascading failure, I use the service&apos;s established timeout, concurrency, circuit-breaker, queueing, or degraded-mode
          controls rather than adding unbounded retries. Any mitigation should preserve data correctness and avoid duplicate
          writes; I coordinate with the database owner and keep the user impact visible.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          'Recognition of saturation and cascading failures.',
          'Careful retry and idempotency reasoning.',
          'Coordination across service ownership boundaries.',
        ]} />
      </Part>

      <Part n={7} label="Ownership and collaboration" title="Show How You Learn and Work with Others">
        <H3>14. Tell me about an operational mistake or incident you learned from.</H3>
        <P>
          I use a concise situation, action, and result structure. I explain the system conditions and what evidence I had,
          describe the decision I made and how I communicated it, then share the user impact and concrete follow-up. I take
          responsibility for my actions without turning the answer into blame. If I have not handled a production incident, I
          say so and describe a relevant drill or project honestly rather than inventing experience.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          'Honesty and a specific example with context.',
          'Ownership, communication, and learning without blaming others.',
          'Evidence that follow-up changed a guardrail, test, or runbook.',
        ]} />

        <H3>15. How do you respond when a runbook is missing or outdated?</H3>
        <P>
          During the incident, I use known safe checks, consult the service owner, and record observations rather than guessing
          at destructive commands. I identify the next escalation contact and communicate uncertainty. Afterward, I update the
          runbook with tested steps, expected results, permissions, rollback boundaries, and a review owner. I ask another
          responder to follow it in a drill so the documentation is validated by someone other than its author.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          'Safe escalation when documentation is incomplete.',
          'Clear distinction between known facts and hypotheses.',
          'A tested documentation improvement with ownership.',
        ]} />
        <Callout type="tip">
          If you have not used a named tool, say so plainly, then explain the underlying concept and how you would verify the
          tool-specific behavior from current documentation and a safe test environment.
        </Callout>
      </Part>

      <Part n={8} label="Practice and pitfalls" title="Turn the Questions into Your Own Evidence">
        <Mistakes items={[
          { mistake: 'Reciting a memorized command sequence', cause: 'The answer does not show how the command reduces uncertainty.', fix: 'State the question, evidence, interpretation, and next safe step for each check.' },
          { mistake: 'Claiming production experience you do not have', cause: 'An interviewer may ask for details and trust is lost.', fix: 'Separate hands-on lab work from production ownership and explain what you learned.' },
          { mistake: 'Jumping to restart or rollback before assessing impact', cause: 'Evidence may disappear and the action may worsen a data or dependency issue.', fix: 'Check the runbook, scope, recent changes, and rollback safety; mitigate deliberately.' },
          { mistake: 'Calling a pod healthy because it is Running', cause: 'Process state is confused with readiness and user-visible behavior.', fix: 'Check probes, endpoints, application response, and the user journey.' },
        ]} />
        <Practice
          title="Build concise, evidence-based interview answers"
          tasks={[
            'Choose five questions and answer each aloud in under two minutes using one real lab, project, or work example.',
            'For one troubleshooting scenario, write the first three read-only checks and explain what each result would mean.',
            'Draw the path from DNS to a containerized service and label where TLS, routing, health checks, and logs are observed.',
            'Prepare an honest story about a mistake, the impact, your communication, and one verified follow-up improvement.',
            'Ask a peer to challenge one assumption in each answer; update your explanation without overstating certainty.',
          ]}
          hint="A strong answer does not need every tool name. Make the sequence, evidence, risk, and decision clear, and say when an assumption depends on the environment."
        />
        <P>
          Before an interview, review the target organization&apos;s public engineering context and the job description. Do not
          disclose confidential architecture or customer data from a previous employer. Use generic diagrams and anonymized
          examples, and be prepared to discuss trade-offs rather than claim one tool is right for every team.
        </P>
      </Part>

      <KeyTakeaways items={[
        'Start troubleshooting from user impact and gather evidence before changing the system.',
        'Explain the distinction between an image and a running container, and discuss least privilege and reproducible builds.',
        'Separate CI checks, artifact promotion, infrastructure review, deployment approval, and verification.',
        'For Kubernetes, use events, probes, service routing, and application behavior to locate the failing layer.',
        'Choose observability signals and alerts that answer a clear operational question and protect sensitive data.',
        'Describe incident mitigation, communication, rollback limits, and learning with honest ownership.',
      ]} />

      <H3>Next course</H3>
      <NextLesson
        href="/learn/ai-ml"
        label="Next course · AI & Machine Learning"
        text="Continue into machine learning foundations and its MLOps section to connect infrastructure practices with data pipelines, model serving, and ML lifecycle operations."
      />
    </LearnLayout>
  )
}
