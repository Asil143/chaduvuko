import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'
import { LearnLayout } from '@/components/content/LearnLayout'

export default function KubernetesFundamentals() {
  return (
    <LearnLayout
      title="Kubernetes Fundamentals — Pods, Deployments and Services"
      description="Run and operate container workloads with Kubernetes pods, deployments, services, configuration, secrets, probes, kubectl, and scaling."
      section="DevOps & Cloud Infrastructure — Lesson 11"
      readTime="45 min"
    >
      <Part n={1} label="The orchestration problem" title="Kubernetes Keeps the Desired Workload Running">
        <P>
          A container can run well on one laptop and still fail when a host restarts or demand changes. Kubernetes is a system for
          managing containerized workloads across a cluster. You describe a desired state in API objects; controllers
          continually compare that desired state with what is running and try to reconcile the difference. Kubernetes does not
          make an application stateless, secure, or observable by default—you still design those properties.
        </P>
        <P>
          A cluster is made of a control plane and worker nodes. The control plane stores and coordinates cluster objects. Nodes
          run pods, usually through a container runtime. In managed Kubernetes, the provider operates part of the control plane,
          but your team remains responsible for application configuration, identity, network policy, cluster upgrade planning, and
          workload health.
        </P>
        <Table
          head={['Object', 'Purpose', 'Think of it as']}
          rows={[
            ['Pod', 'Smallest schedulable unit; one or more tightly coupled containers', 'A workload instance with shared networking'],
            ['Deployment', 'Declares and updates a replicated set of pods', 'A controller for stateless application replicas'],
            ['Service', 'Provides a stable network endpoint for selected pods', 'A name and traffic-distribution boundary'],
            ['ConfigMap', 'Stores non-secret configuration data', 'Runtime settings separated from an image'],
            ['Secret', 'Stores sensitive configuration in the Kubernetes API', 'A sensitive value with access controls—not automatic encryption everywhere'],
          ]}
        />
        <Callout type="info">
          A Pod is replaceable. Do not rely on its IP address or local filesystem as permanent storage. Use a Service for stable
          access and an appropriate persistent storage system for data that must survive replacement.
        </Callout>
      </Part>

      <Part n={2} label="Workload manifest" title="Declare a Deployment, Not a Hand-Managed Pod">
        <P>
          A Deployment describes a desired replica count and a pod template. The controller creates and replaces pods as needed.
          The selector must match the template labels; labels connect this Deployment to the pods it manages. The sample below
          assumes an application image listens on port 8080 and exposes a <code>/health</code> endpoint. Use an image that your
          team owns and has tested—this lesson does not publish a real application image.
        </P>
        <Code lang="yaml" file="deployment.yaml" code={`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-api
  labels:
    app: orders-api
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
      containers:
        - name: api
          image: ghcr.io/example-org/orders-api:replace-with-commit-sha
          ports:
            - name: http
              containerPort: 8080
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 512Mi
          readinessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 15
            periodSeconds: 20
`} />
        <P>
          Resource requests help the scheduler find a node with enough capacity. Limits constrain resource consumption but can
          also affect latency and availability when set poorly. The values above are teaching placeholders, not sizing guidance;
          load-test the actual application and tune them from observed use. Use an immutable image reference from the release
          pipeline instead of leaving the illustrative tag in a real deployment.
        </P>
        <Callout type="warning">
          A liveness probe that fails too aggressively can repeatedly restart a slow but recoverable app. Match probe paths and
          timing to real startup and health behavior, and use a startup probe when an app legitimately needs longer to start.
        </Callout>
      </Part>

      <Part n={3} label="Expose the pods" title="Use a Service for a Stable Endpoint">
        <P>
          Pod addresses change as pods are rescheduled. A Service selects pods by labels and provides a stable virtual endpoint
          for clients. A <code>ClusterIP</code> Service is reachable inside the cluster. External access normally uses a
          controlled ingress or load balancer configured for the cluster; do not make a service public simply to test an
          application.
        </P>
        <Code lang="yaml" file="service.yaml" code={`
apiVersion: v1
kind: Service
metadata:
  name: orders-api
spec:
  type: ClusterIP
  selector:
    app: orders-api
  ports:
    - name: http
      port: 80
      targetPort: http
`} />
        <P>
          The Service selector uses the same <code>app: orders-api</code> label as the Deployment&apos;s pod template. The Service
          accepts traffic on port 80 and sends it to the named container port. If the labels do not match, the Service has no
          endpoints. If the app binds only to localhost inside the container, other pods cannot reach it through the Pod network.
        </P>
        <Table
          head={['Service type', 'Typical use', 'Exposure']}
          rows={[
            ['ClusterIP', 'Internal API or database endpoint', 'Inside the cluster'],
            ['NodePort', 'Specialized access or simple test environments', 'Node address and allocated port; protect carefully'],
            ['LoadBalancer', 'Provider-managed external entry point', 'May provision a public or private load balancer'],
          ]}
        />
      </Part>

      <Part n={4} label="Configuration" title="Keep Settings Outside the Container Image">
        <P>
          A ConfigMap carries non-sensitive settings such as a log level or a service name. A Secret holds sensitive values such
          as a database password, but creating a Secret object does not by itself guarantee encryption at rest or safe access.
          Configure the cluster&apos;s secret encryption and access controls, or use an approved external secrets manager. Never
          commit real secret values to a manifest or expose them in a public lesson repository.
        </P>
        <Code lang="yaml" file="app-config.yaml" code={`
apiVersion: v1
kind: ConfigMap
metadata:
  name: orders-api-config
data:
  LOG_LEVEL: "info"
  UPSTREAM_TIMEOUT_SECONDS: "3"
---
apiVersion: v1
kind: Secret
metadata:
  name: orders-api-runtime
type: Opaque
stringData:
  DATABASE_URL: REPLACE_WITH_SECRET_FROM_APPROVED_SECRET_STORE
`} />
        <P>
          The Secret value shown is a placeholder, not a credential. In a real system, sync or inject runtime secrets from the
          organization&apos;s approved secret manager and protect access with workload identity and RBAC. Kubernetes stores Secret
          values as encoded data in its API representation; encoding is not encryption. If applying a manifest from a file, keep
          real values in a protected source that is never committed or uploaded as a lesson artifact.
        </P>
        <P>
          Reference configuration using environment variables or mounted files in the pod template. The container image stays
          the same across environments; the environment supplies the settings. Avoid printing secret environment variables in
          application logs or diagnostic output.
        </P>
        <Code lang="yaml" file="deployment-config-fragment.yaml" code={`
spec:
  containers:
    - name: api
      image: ghcr.io/example-org/orders-api:replace-with-commit-sha
      envFrom:
        - configMapRef:
            name: orders-api-config
        - secretRef:
            name: orders-api-runtime
`} />
      </Part>

      <Part n={5} label="Apply and inspect" title="Use kubectl to Observe Before You Change">
        <P>
          <code>kubectl</code> is the command-line client for the Kubernetes API. Confirm the current context and namespace
          before applying manifests; a familiar command can still target the wrong cluster. In a local training cluster, the
          following commands apply the workload, inspect its rollout, and show pod state. In a shared or production cluster,
          use the team&apos;s authorized context and reviewed change process.
        </P>
        <Code lang="bash" file="inspect-workload.sh" code={`
# Check the selected cluster context before making changes.
kubectl config current-context
kubectl config view --minify

# Apply only the reviewed manifests in the current namespace.
kubectl apply -f app-config.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Observe readiness and recent events.
kubectl rollout status deployment/orders-api
kubectl get deployments,pods,services -l app=orders-api
kubectl describe deployment/orders-api
kubectl logs -l app=orders-api --all-containers=true --tail=100
`} />
        <P>
          When a pod is not ready, inspect the Deployment and pod events, then read the container logs. Check for image pull
          failures, wrong ports, missing configuration, insufficient resources, and a probe path that does not exist. Avoid
          repeatedly deleting pods before finding the cause; the controller may simply create the same failing pod again.
        </P>
        <Callout type="tip">
          Treat <code>kubectl config current-context</code> as a pre-flight check. Keep production credentials and contexts
          separate from local learning clusters, and use namespace-scoped permissions where practical.
        </Callout>
      </Part>

      <Part n={6} label="Health and updates" title="Probes Tell Kubernetes When to Route or Restart">
        <P>
          A readiness probe answers whether the container should receive traffic now. A liveness probe answers whether it should
          be restarted. A startup probe can give slow-starting applications time before liveness checks begin. These signals
          must match application behavior: readiness can depend on required startup initialization, while liveness should detect
          a process that cannot recover without a restart. A dependency outage is not always a reason to restart every app pod.
        </P>
        <P>
          A Deployment performs rolling updates according to its rollout strategy. Watch the rollout and define what happens if
          the new version is not ready. Keep a stable Service selector, test backward-compatible configuration changes, and
          remember that rolling back code does not automatically undo a database migration. Use staged migration patterns so
          old and new app versions can safely overlap.
        </P>
        <Steps items={[
          'Set readiness to reflect whether the pod can safely serve requests.',
          'Use liveness only for failures that a process restart can plausibly fix.',
          'Set resource requests based on observed workload behavior and cluster capacity.',
          'Watch rollout status and application metrics during an update.',
          'If the release harms users, use a reviewed rollback or forward-fix procedure and verify the outcome.',
        ]} />
      </Part>

      <Part n={7} label="Scale and operate" title="Scale Replicas Without Hiding Bottlenecks">
        <P>
          A Deployment can scale to a desired number of replicas. More replicas may help when requests can be handled in
          parallel, but they do not fix a saturated database, a shared lock, or a downstream rate limit. Horizontal autoscaling
          needs resource requests and metrics; set scaling boundaries and understand how added replicas affect dependencies.
          Stateful systems need storage and scheduling design beyond simply increasing a replica count.
        </P>
        <Code lang="bash" file="scale-and-update.sh" code={`
# Set a replica count for a controlled training deployment.
kubectl scale deployment/orders-api --replicas=3
kubectl rollout status deployment/orders-api

# Inspect the Service and its selected endpoints.
kubectl get service orders-api
kubectl get endpoints orders-api

# Revert the Deployment to its previous revision if the rollout is unhealthy.
kubectl rollout undo deployment/orders-api
kubectl rollout status deployment/orders-api
`} />
        <P>
          An imperative scale command changes live desired state. If manifests are the source of truth, update the declared
          replica count too, or the next apply can revert your manual change. In production, make the change through the reviewed
          deployment process so it is recorded and reproducible.
        </P>
        <Callout type="example">
          A delivery app may need more API replicas during a promotion, but first check whether the database connection pool and
          order queue can handle the extra concurrency. Scale the whole request path, not just the front-end pods.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Creating a bare Pod as the production workload', cause: 'A deleted or failed pod has no higher-level controller to recreate the desired replicas.', fix: 'Use a Deployment for stateless services and let it manage pods and rollouts.' },
          { mistake: 'Putting real credentials in a ConfigMap or committed Secret manifest', cause: 'ConfigMaps are not secret stores, and encoded Secret data is not encryption.', fix: 'Use an approved secret manager, cluster encryption and RBAC, and keep real values out of Git.' },
          { mistake: 'Using liveness to check every downstream dependency', cause: 'A dependency outage can trigger a restart storm that makes recovery worse.', fix: 'Separate process health from readiness and dependency health; alert on the dependency itself.' },
          { mistake: 'Scaling pods without checking downstream capacity', cause: 'More callers can overload a database or API that is already the bottleneck.', fix: 'Observe end-to-end capacity and rate limits, then scale with tested bounds.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Deploy and Troubleshoot an Order API">
        <Practice
          title="Run a small workload in a local or sandbox cluster"
          tasks={[
            'Write a Deployment manifest with two replicas, matching labels, a tested image, and resource requests.',
            'Create a ClusterIP Service and explain how its selector finds the Deployment pods.',
            'Add a ConfigMap for a non-sensitive setting and describe the safe source for a real runtime secret.',
            'Apply the manifests in a local cluster; inspect rollout status, events, and logs with kubectl.',
            'Change the replica count, verify the result, and explain why the declarative manifest must also be updated.',
          ]}
          hint="Use a local learning cluster or review the manifests without applying them. Always verify kubectl context before changing a shared cluster."
        />
      </Part>

      <KeyTakeaways items={[
        'Kubernetes controllers reconcile declared desired state; use Deployments for replaceable stateless application pods.',
        'Pods are ephemeral; Services provide stable in-cluster access by selecting matching pod labels.',
        'ConfigMaps hold non-secret settings; Secrets require encryption, access controls, and safe sourcing beyond simple encoding.',
        'Readiness, liveness, and startup probes have different jobs; configure them around actual application health behavior.',
        'Use kubectl context checks, rollout status, events, and logs to troubleshoot methodically.',
        'Scale with awareness of databases, queues, and other dependencies; keep declarative configuration aligned with live changes.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/devops-mlops/helm-and-gitops-argocd"
        label="Lesson 12 · Helm and GitOps with Argo CD"
        text="Package Kubernetes apps with Helm charts and deploy them declaratively from Git with Argo CD, including rollbacks and environment promotion."
      />
    </LearnLayout>
  )
}
