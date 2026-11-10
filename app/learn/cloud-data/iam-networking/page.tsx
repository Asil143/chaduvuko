import { WithLessonNav } from '@/components/content/WithLessonNav'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'IAM and Networking for Data Platforms' }

const comparison = `Provider       Identity / authorization building blocks
AWS            IAM users, roles, identity policies, resource policies
Azure          Microsoft Entra identities, Azure RBAC, managed identities
Google Cloud   Cloud IAM principals, roles, service accounts

Network ideas shared across providers
VPC / virtual network -> subnets -> routes -> firewall rules
Private service access / endpoints -> private path to supported services
DNS + TLS -> name resolution and encrypted application traffic`

const accessPlan = `Pipeline job: orders-cleaner
  Identity: dedicated non-human runtime identity
  Read:     gs://company-lake/bronze/orders/*
  Write:    gs://company-lake/silver/orders/*
  Deny by default: unrelated buckets, IAM administration, public exposure

Analyst group
  Read:     approved curated tables / query results
  No access: raw payment payloads, job credentials, network administration`

const validation = `For each data flow, record:
  source principal -> destination resource -> required action
  name resolution -> route -> firewall / endpoint -> TLS
  audit event -> alert owner -> revocation and recovery procedure`

export default function IamNetworkingPage() {
  return (
    <WithLessonNav href="/learn/cloud-data/iam-networking">
      <LearnLayout
        title="IAM and Networking for Data Platforms"
        description="Apply least privilege and secure network paths to data-platform identities, storage, processing jobs, and analytics consumers across Azure, AWS, and Google Cloud."
        section="Cloud Data Platforms · Cross-cloud Foundations"
        readTime="17 min"
        breadcrumbs={[
          { label: 'Cloud Data Platforms', href: '/learn/cloud-data' },
          { label: 'IAM and Networking', href: '/learn/cloud-data/iam-networking' },
        ]}
      >
        <h2>Prerequisites and objective</h2>
        <p>Know what a principal, role, subnet, route, and firewall rule do. This lesson does not assume a particular provider. You will be able to map those concepts to cloud services and trace a data job's permissions and network path.</p>

        <h2>Identity concepts across providers</h2>
        <p>Every data request has an actor, an action, a resource, and a context. A scheduled pipeline should run as an application identity, not an engineer's personal login. Cloud providers express authorization differently, but the design goals are familiar: establish a trusted principal, grant the smallest needed actions, and keep a reviewable audit trail.</p>
        <CodeBlock language="text" filename="provider-building-blocks.txt" code={comparison} />
        <p>Prefer short-lived or platform-managed credentials where supported. Separate human identities from workload identities, use groups for people, and assign ownership for each permission set. Never place service account keys, access keys, or passwords in notebook source, container images, or logs.</p>
        <Callout type="info">A data catalog permission and a cloud resource permission may both apply. A user allowed to query a table still needs an authorized query path and any required storage access through the platform.</Callout>

        <h2>Design a least-privilege access plan</h2>
        <p>Start from operations, not a broad role name. A cleaner job needs to read a specific raw prefix and write a specific cleaned prefix. It does not need to administer the project, create users, or read unrelated datasets.</p>
        <CodeBlock language="text" filename="access-plan.txt" code={accessPlan} />
        <p>Apply the same reasoning to a warehouse: a transformation identity may write one schema, while analysts read approved views. Keep sensitive source fields out of general-purpose outputs. Review inherited permissions and resource policies, not just direct grants.</p>
        <Callout type="warning">Do not troubleshoot by temporarily granting owner/admin to a service identity and forgetting to remove it. Use a controlled test, inspect the denied action/resource, and narrow the change.</Callout>

        <h2>Trace the network path</h2>
        <p>A pipeline may connect to an object store, a managed database, a message broker, and a warehouse. Map its DNS lookup, route, firewall or security policy, service endpoint, TLS, and response path. “Private subnet” alone does not prove that a dependency is private or reachable.</p>
        <p>Virtual networks, subnets, route tables, firewalls, private service endpoints, and DNS integrations appear under different product names. Confirm which path each managed service actually uses, whether the endpoint is supported in the chosen region, and how the service's control plane differs from its data plane.</p>
        <CodeBlock language="text" filename="connectivity-review.txt" code={validation} />
        <p>For a private data platform, use approved private connectivity features where supported, limit outbound paths, and verify DNS from the workload environment. Encrypt data in transit, keep storage public access disabled when the architecture allows it, and monitor changes to network and identity policies.</p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Using one all-powerful identity:</strong> compromise then affects every workload. Assign identities by job and data boundary.</li>
          <li><strong>Thinking a private IP is a complete security plan:</strong> authorization, DNS, routes, firewalls, and service configuration still matter. Test the actual path.</li>
          <li><strong>Confusing role names across clouds:</strong> similarly named roles can grant different actions. Inspect permissions and scope, not labels alone.</li>
          <li><strong>Leaving credentials in code or logs:</strong> source control and logs persist. Use managed identity or a secret service and rotate exposed credentials.</li>
        </ul>

        <h2>Practice</h2>
        <ol>
          <li>Create a permission matrix for a job that reads bronze and writes silver, plus an analyst who queries a gold view.</li>
          <li>Map AWS IAM roles, Azure managed identities/RBAC, and Google Cloud service accounts/IAM to actor, policy, and resource.</li>
          <li>Draw the network path from a private Spark worker to object storage and a warehouse, including DNS and TLS.</li>
          <li>Describe a safe procedure for investigating a permission-denied error without expanding privileges broadly.</li>
        </ol>
        <p><strong>Hint:</strong> For each request, write the principal, exact action, target resource, network path, and expected audit event.</p>

        <KeyTakeaways items={[
          'Use separate human and workload identities and grant only the operations a job needs.',
          'Azure, AWS, and Google Cloud use different IAM products but share principal, policy, scope, and audit concepts.',
          'Catalog authorization and cloud resource authorization may both be required.',
          'A secure connection requires correct identity, DNS, routing, firewall rules, endpoints, and TLS.',
          'Investigate the exact denied action and resource instead of applying broad temporary access.',
        ]} />
      </LearnLayout>
    </WithLessonNav>
  )
}
