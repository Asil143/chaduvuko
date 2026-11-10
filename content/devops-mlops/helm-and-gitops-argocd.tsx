import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'
import { LearnLayout } from '@/components/content/LearnLayout'

export default function HelmAndGitopsArgocd() {
  return (
    <LearnLayout
      title="Helm and GitOps with Argo CD"
      description="Package Kubernetes apps with Helm charts and deploy them declaratively from Git with Argo CD, including rollbacks and environment promotion."
      section="DevOps & Cloud Infrastructure — Lesson 12"
      readTime="40 min"
    >
      <Part n={1} label="Two complementary tools" title="Helm Packages Manifests; GitOps Reconciles Them">
        <P>
          A team running an orders API in development, staging, and production needs repeatable Kubernetes resources without
          copying slightly different YAML files by hand. Helm packages related manifests into a chart and lets an operator provide
          environment-specific values. Argo CD watches a Git source, compares its desired resources with the cluster, and can
          reconcile differences according to its configured policy.
        </P>
        <P>
          Helm answers, &quot;How do I parameterize and render this application&apos;s Kubernetes resources?&quot; GitOps answers, &quot;Which
          reviewed source describes the desired state, and how do we keep the cluster aligned with it?&quot; Argo CD can render Helm
          charts from a repository; it does not need Helm to act as a separate release operator for the same application. Pick
          one clear owner for each deployment path.
        </P>
        <Table
          head={['Concern', 'Helm', 'Argo CD / GitOps']}
          rows={[
            ['Primary job', 'Package and template Kubernetes manifests', 'Observe Git and reconcile desired cluster state'],
            ['Inputs', 'Chart templates and values', 'Repository, revision, path, destination, sync policy'],
            ['Change review', 'Rendered output can be reviewed before install', 'Git review records the desired-state change'],
            ['Drift', 'A manual command applies a release when run', 'Controller can report or correct live differences'],
          ]}
        />
        <Callout type="info">
          GitOps does not mean &quot;deploy every commit without review.&quot; Branch protection, promotion rules, secret handling, and
          sync policy determine which changes reach a cluster and whether they are applied automatically.
        </Callout>
      </Part>

      <Part n={2} label="Chart anatomy" title="Create a Small Chart with Explicit Defaults">
        <P>
          A Helm chart is a directory containing chart metadata, default values, and templates. Keep the chart focused on one
          deployable unit, use meaningful values, and make safe defaults visible. The example uses a fictional orders API and an
          immutable release tag placeholder. Replace it with a real, reviewed image reference before deployment.
        </P>
        <Code lang="yaml" file="charts/orders-api/Chart.yaml" code={`
apiVersion: v2
name: orders-api
description: Kubernetes deployment for the orders API
type: application
version: 0.1.0
appVersion: "1.0.0"
`} />
        <Code lang="yaml" file="charts/orders-api/values.yaml" code={`
replicaCount: 2

image:
  repository: ghcr.io/example-org/orders-api
  tag: replace-with-commit-sha
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80
  targetPort: 8080

resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi
`} />
        <P>
          The chart version tracks packaging changes, while <code>appVersion</code> is descriptive metadata for the application; do
          not treat either value as a guarantee that the image was built from reviewed source. Pin the container image to a
          release artifact and tune replicas and resources from workload requirements. Values files should contain non-secret
          configuration only.
        </P>
        <Callout type="warning">
          Never place passwords, API keys, or private certificates in chart defaults or committed environment values. Rendered
          manifests and release metadata may be stored or displayed by deployment tooling.
        </Callout>
      </Part>

      <Part n={3} label="Templates" title="Render a Deployment and Stable Service">
        <P>
          Templates are Kubernetes manifests with placeholders for chart values and release metadata. A helper template keeps the
          application label consistent between the Deployment and Service. Labels connect resources; if selectors differ, the
          Service may have no endpoints even though the Deployment has ready pods.
        </P>
        <Code lang="yaml" file="charts/orders-api/templates/_helpers.tpl" code={`
{{- define "orders-api.name" -}}
{{- .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "orders-api.labels" -}}
app.kubernetes.io/name: {{ include "orders-api.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
`} />
        <Code lang="yaml" file="charts/orders-api/templates/deployment.yaml" code={`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "orders-api.name" . }}
  labels:
    {{- include "orders-api.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app.kubernetes.io/name: {{ include "orders-api.name" . }}
      app.kubernetes.io/instance: {{ .Release.Name }}
  template:
    metadata:
      labels:
        app.kubernetes.io/name: {{ include "orders-api.name" . }}
        app.kubernetes.io/instance: {{ .Release.Name }}
    spec:
      containers:
        - name: api
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: {{ .Values.service.targetPort }}
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
          readinessProbe:
            httpGet:
              path: /health
              port: http
            periodSeconds: 10
`} />
        <P>
          A chart helper should generate valid DNS-compatible resource names and stable selectors. The readiness probe example
          assumes the app has a suitable <code>/health</code> endpoint; configure startup and liveness checks based on actual
          behavior rather than copying timings blindly. Values that affect identity or selectors need extra care because changing
          them can cause resource replacement or disconnect a Service from its pods.
        </P>
      </Part>

      <Part n={4} label="Render and validate" title="Inspect Manifests Before Applying Them">
        <P>
          Rendering locally makes templates concrete so reviewers can inspect the Kubernetes output. Run linting, render with the
          same values intended for the target environment, and check the rendered selectors, image reference, ports, resource
          requests, and probes. A successful template render proves syntax and substitution, not that the image exists or the
          cluster can run it.
        </P>
        <Code lang="bash" code={`
# Validate chart structure and template syntax
helm lint ./charts/orders-api

# Render the desired manifests for review without applying them
helm template orders-api ./charts/orders-api \\
  --namespace staging \\
  -f ./charts/orders-api/values-staging.yaml

# In an authorized sandbox only, create or update a release from this chart
helm upgrade --install orders-api ./charts/orders-api \\
  --namespace staging \\
  --create-namespace \\
  -f ./charts/orders-api/values-staging.yaml
`} />
        <P>
          The installation command is a direct Helm workflow for a sandbox. If Argo CD owns the application, use Git changes and
          the Argo CD sync process instead of running this command against that same release; two controllers issuing changes
          create confusing ownership and drift. Keep namespace selection explicit and confirm your current cluster context before
          any command that changes resources.
        </P>
        <Callout type="tip">
          Treat rendered manifests as review material. If your chart later adds generated credentials, inspect where the rendered
          value goes and ensure it is not exposed in terminals, CI logs, or stored release data.
        </Callout>
      </Part>

      <Part n={5} label="GitOps source" title="Put Desired State in a Reviewed Repository">
        <P>
          With GitOps, a commit changes the desired state. Keep the chart and its non-secret environment values in a repository
          with protected branches and review. A useful layout keeps the chart reusable and environment differences explicit, for
          example separate values files for staging and production. Avoid copying the entire chart per environment; duplication
          makes fixes and security updates easy to miss.
        </P>
        <Code lang="yaml" file="charts/orders-api/values-staging.yaml" code={`
replicaCount: 1

image:
  tag: replace-with-reviewed-staging-commit

resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 300m
    memory: 384Mi
`} />
        <P>
          This staging override changes capacity and image selection without putting a credential in Git. A production override
          should be reviewed against expected traffic, availability, and cost. Promote the same tested artifact between
          environments where possible; rebuilds from different source states make it harder to know what was validated.
        </P>
        <Steps items={[
          'Open a change that updates the chart or environment values and describes the operational effect.',
          'Render and inspect the resulting resources in CI or a controlled review environment.',
          'Require the appropriate review before merging to the deployment branch.',
          'Observe Argo CD status and application health after the desired revision is reconciled.',
        ]} />
      </Part>

      <Part n={6} label="Argo CD application" title="Declare the Repository, Destination, and Sync Policy">
        <P>
          An Argo CD Application names the repository location, the desired revision and chart path, the destination cluster and
          namespace, and the Helm values to apply. This example assumes Argo CD is already installed and authorized to manage the
          destination namespace. Repository and namespace names are illustrative; configure credentials through an approved Argo
          CD repository integration, not in this YAML.
        </P>
        <Code lang="yaml" file="apps/orders-staging.yaml" code={`
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: orders-staging
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/example-org/platform-config.git
    targetRevision: main
    path: charts/orders-api
    helm:
      valueFiles:
        - values-staging.yaml
  destination:
    server: https://kubernetes.default.svc
    namespace: orders-staging
  syncPolicy:
    automated:
      prune: false
      selfHeal: true
`} />
        <P>
          With automated sync enabled, Argo CD can apply a desired revision without a manual sync action; <code>selfHeal</code> asks
          it to correct certain live drift back to Git. This sample leaves <code>prune</code> disabled so deleting a resource from
          Git does not automatically delete it from the cluster. Enabling pruning is a consequential policy decision: review
          resource ownership and deletion behavior before using it, especially for stateful resources.
        </P>
        <Callout type="warning">
          An automated reconciler can make a wrong change repeatedly. Protect the source branch, validate changes before merge,
          understand prune behavior, and ensure the sync identity has only the required cluster permissions.
        </Callout>
      </Part>

      <Part n={7} label="Drift and rollback" title="Fix the Source of Truth, Then Reconcile">
        <P>
          Drift is a difference between the Git-declared resources and the live cluster. Someone may patch a Deployment directly,
          or a controller may update fields that the chart does not own. Argo CD shows application health and sync status so the
          team can investigate. With self-healing enabled, some manual changes will be reverted; do not use a cluster edit as an
          undocumented permanent fix.
        </P>
        <P>
          A GitOps rollback is normally a reviewed revert or follow-up commit that restores a known-good desired state, followed by
          reconciliation. This makes the change auditable and avoids having an out-of-band Helm rollback immediately overwritten
          by Argo CD. Before reverting, consider database migrations, persistent data changes, and whether the older application
          can safely consume the current schema.
        </P>
        <Table
          head={['Situation', 'First response', 'Avoid']}
          rows={[
            ['Out-of-sync after a manual patch', 'Compare live and Git state; decide whether the patch should be codified or discarded', 'Repeated untracked edits'],
            ['Bad chart change merged', 'Revert or commit a corrected desired state and observe reconciliation', 'Changing the cluster outside the owner controller'],
            ['Application unhealthy after sync', 'Check rollout status, events, probes, logs, and dependencies', 'Blindly increasing replicas or disabling health checks'],
            ['Resource removed from Git', 'Confirm ownership and data impact before enabling deletion', 'Pruning stateful or shared resources without a recovery plan'],
          ]}
        />
        <P>
          Argo CD application history and Git history are useful evidence, but they do not replace backups or application-level
          recovery procedures. For a database migration, test both forward and rollback behavior and protect persistent data
          separately from a chart rollback.
        </P>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Running Helm upgrades and Argo CD sync against the same app', cause: 'Two actors both believe they own desired state and can overwrite one another.', fix: 'Choose one deployment controller and make its ownership clear to the team.' },
          { mistake: 'Committing credentials in a values file', cause: 'Rendered manifests and repository history can expose values beyond the intended workload.', fix: 'Use an approved external secret workflow and keep secret values out of the chart repository.' },
          { mistake: 'Enabling automatic pruning without reviewing deletion impact', cause: 'Resources removed from Git may be deleted from the cluster.', fix: 'Understand ownership and data retention first; start with conservative policy and backups.' },
          { mistake: 'Treating a successful helm template as proof of deployment health', cause: 'Rendering does not verify image availability, cluster permissions, probes, or dependencies.', fix: 'Validate rendered output, sync to a controlled environment, and observe rollout and application signals.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Package and Promote an Orders API">
        <Practice
          title="A reviewed Helm chart reconciled by Argo CD"
          tasks={[
            'Create a small chart containing a Deployment and ClusterIP Service with shared labels, a readiness probe, and resource requests.',
            'Add a staging values file that changes replica count and an immutable sample image tag without introducing secrets.',
            'Run helm lint and render the chart; inspect selector matching, namespace assumptions, ports, and the final image reference.',
            'Write an Argo CD Application that points to the chart and staging values, then choose a sync and prune policy with a written reason.',
            'Simulate a bad change in a sandbox, describe the Git revert, and list the health checks you would verify before promoting the correction.',
          ]}
          hint="Do not apply manifests to a shared or production cluster for this exercise. Rendering and policy review are enough unless you have an authorized sandbox."
        />
      </Part>

      <KeyTakeaways items={[
        'Helm templates and packages Kubernetes resources; Argo CD watches Git and reconciles the desired state.',
        'Keep charts reusable, environment values explicit, image references immutable, and credentials out of Git.',
        'Render and inspect manifests before applying; template success does not prove runtime health.',
        'Choose a single owner for application changes rather than mixing direct Helm operations with Argo CD reconciliation.',
        'Automated sync and self-healing improve consistency, while pruning can delete resources and requires deliberate policy.',
        'Use reviewed Git changes for rollback and account for database and persistent-data compatibility.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/devops-mlops/monitoring-logging-alerting"
        label="Lesson 13 · Monitoring, Logging and Alerting"
        text="Your application now has a repeatable deployment path. Next, instrument it so you can detect user-impacting failures and respond with useful signals."
      />
    </LearnLayout>
  )
}
