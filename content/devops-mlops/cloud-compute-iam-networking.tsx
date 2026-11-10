import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function CloudComputeIamNetworking() {
  return (
    <LearnLayout
      title="Cloud Core — Compute, IAM and VPC Networking"
      description="Choose a cloud compute model, grant access with least privilege, and design a private network boundary using AWS as the main example, with Azure and Google Cloud equivalents."
      section="DevOps & Cloud Infrastructure — Lesson 06"
      readTime="45 min"
    >
      <Part n={1} label="The mental model" title="A Cloud App Is Compute, Identity and Network Boundaries">
        <P>
          Imagine a delivery-tracking API used by customers in Mumbai and Hyderabad. It needs somewhere to run, permission to read
          only the data it needs, and a network path that lets customers reach the API without exposing the database. Those are
          three separate design questions: <strong>compute</strong>, <strong>identity</strong>, and <strong>networking</strong>.
        </P>
        <P>
          A cloud provider supplies data centres and managed services through an account or subscription. You select a region,
          create resources there, and connect them with policies and network rules. Your cloud account is not a single computer;
          it is a boundary for billing, identity, quotas, and governance. Start by drawing the request path and marking which
          component is public, which is private, and which identity acts at each hop.
        </P>
        <Table
          head={['Question', 'AWS example', 'What to decide']}
          rows={[
            ['Where does the code run?', 'EC2, ECS, Lambda', 'How much control, scaling, and operational work do we need?'],
            ['Who may call a service?', 'IAM role and policy', 'Which identity needs which action on which resource?'],
            ['Which network path is allowed?', 'VPC, subnet, security group', 'Which sources and destinations need to communicate?'],
            ['Where should it run?', 'AWS Region such as Mumbai', 'User latency, data location, service availability, and recovery plan'],
          ]}
        />
        <Callout type="info">
          <strong>Cloud does not remove operations.</strong> It gives you APIs and managed building blocks. You still own access
          control, safe configuration, data protection, and the application&apos;s reliability.
        </Callout>
      </Part>

      <Part n={2} label="Compute choices" title="Match the Compute Model to the Workload">
        <P>
          A virtual machine (VM) gives you an operating system and broad control. You patch it, configure its runtime, and decide
          how to scale it. Containers package an application and its dependencies; a managed container service schedules those
          containers while you still decide how they are deployed. Serverless functions run a handler in response to events or
          requests; the provider manages the underlying hosts, while you manage code, permissions, timeouts, and limits.
        </P>
        <Table
          head={['Model', 'Good fit', 'You still operate']}
          rows={[
            ['Virtual machine', 'Legacy app, custom OS needs, or a long-running process', 'Patching, capacity, process health, and scaling policy'],
            ['Managed containers', 'Web API or worker already packaged as an image', 'Image security, task sizing, health checks, rollout, and service config'],
            ['Serverless function', 'Short event-driven task with variable demand', 'Handler correctness, permissions, retries, timeout, and observability'],
          ]}
        />
        <P>
          For a small order-status service, a container behind a managed load balancer may be an easy step from Docker Compose.
          A scheduled cleanup may fit a function. A VM may be appropriate when the application depends on a specific OS setup. Do
          not pick a service because it sounds modern: estimate its operating burden, traffic pattern, recovery needs, and team
          familiarity first.
        </P>
        <Callout type="tip">
          Choose the simplest model that meets the workload&apos;s needs. A managed service can reduce host maintenance, but it does
          not automatically make the application secure or highly available.
        </Callout>
      </Part>

      <Part n={3} label="Regions and networks" title="Place Resources, Then Draw the Network">
        <P>
          A region is a provider&apos;s geographic deployment area. AWS has a Mumbai region identified as <code>ap-south-1</code> and
          a Hyderabad region identified as <code>ap-south-2</code>. Region choice affects latency, service availability, data
          placement obligations, and recovery design. Verify that every required service is available in your chosen region
          before committing to it; do not assume two regions have identical offerings.
        </P>
        <P>
          A Virtual Private Cloud (VPC) is a logically isolated network in AWS. A subnet is an address range within a VPC,
          associated with a particular availability zone. A public subnet has a route to an internet gateway; a private subnet
          does not expose a route that makes its workloads directly reachable from the public internet. A security group is a
          stateful traffic filter attached to network interfaces or resources. It allows explicitly configured inbound and
          outbound traffic; it is not a replacement for application authentication.
        </P>
        <Table
          head={['Cloud concept', 'AWS', 'Microsoft Azure', 'Google Cloud']}
          rows={[
            ['Identity and permissions', 'IAM users, roles, policies', 'Microsoft Entra identities and Azure role-based access control', 'Cloud Identity principals and IAM roles/policies'],
            ['Virtual network', 'VPC', 'Virtual Network (VNet)', 'Virtual Private Cloud network'],
            ['Network segment', 'Subnet', 'Subnet', 'Subnet'],
            ['Traffic rule', 'Security group; network ACL', 'Network Security Group', 'VPC firewall rule'],
            ['Virtual machine', 'Amazon EC2', 'Azure Virtual Machines', 'Compute Engine'],
            ['Serverless function', 'AWS Lambda', 'Azure Functions', 'Cloud Run functions'],
          ]}
        />
        <P>
          These names are conceptual equivalents, not proof that each provider has identical defaults or behavior. Read the
          provider&apos;s documentation before translating a security design. In a common three-tier layout, an internet-facing
          load balancer sits at the edge, application containers run in private subnets, and the data store has no public
          endpoint. The app can connect to the data store on its required port; the internet cannot.
        </P>
      </Part>

      <Part n={4} label="Identity" title="Use Roles and Policies, Not Shared Administrator Keys">
        <P>
          An IAM user represents a person or long-lived identity; a role is an identity that a trusted person, workload, or
          service can assume for a limited purpose. Prefer individual human identities through your organization&apos;s identity
          system, and give an application a role rather than copying a person&apos;s access key into its environment. A policy
          describes allowed or denied actions on resources, sometimes with conditions. The principle of least privilege means
          granting only the actions and resources needed for a specific job, then reviewing that access as the job changes.
        </P>
        <P>
          Here is a deliberately narrow policy shape for an application that reads one named object from one named S3 bucket.
          Replace the example account and bucket values in a controlled environment; do not attach this sample as a broad
          administrator policy. A real application may need additional actions, which should be identified from its behavior and
          tested in a non-production account.
        </P>
        <Code lang="json" file="read-one-object-policy.json" code={`
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ReadOneApplicationObject",
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::example-orders-data/config/runtime.json"
    }
  ]
}
`} />
        <P>
          The policy grants one action on one object path. It does not allow listing the bucket, changing data, or reading other
          objects. In AWS, an identity policy is only one part of the authorization decision: the identity must also be allowed
          to act by the applicable trust relationship, organization controls, resource policies, and other boundaries. A role
          trust policy answers <em>who may assume this role</em>; its permissions policy answers <em>what the role may do</em>.
        </P>
        <Callout type="warning">
          Never commit cloud credentials, private keys, or production tokens. Use your provider&apos;s workload identity mechanism
          where possible, short-lived credentials, and a protected secrets store for values that cannot be federated.
        </Callout>
      </Part>

      <Part n={5} label="Traffic flow" title="Allow Only the Network Paths the App Uses">
        <P>
          For a web API, write down each required connection before opening a port. A typical path is browser → HTTPS load
          balancer → application → database. The application does not need to accept inbound traffic directly from every
          internet address if a load balancer is its only caller. The database should accept connections only from the
          application&apos;s security group or equivalent identity-aware network boundary, on the one database port it actually
          uses.
        </P>
        <Steps items={[
          'Create an address plan for the VPC and its subnets that does not overlap networks you need to connect later.',
          'Place public entry points separately from application and data workloads.',
          'Allow inbound HTTPS at the public entry point; do not make a database publicly reachable for convenience.',
          'Allow the app-to-data connection only from the application security group and required port.',
          'Review outbound access too; add a controlled egress path when workloads need external services.',
          'Test both the intended path and a denied path, then record the expected behavior.',
        ]} />
        <P>
          Security groups are stateful: return traffic for an allowed connection is handled as part of that connection. Network
          ACLs operate at the subnet boundary and are stateless, so return traffic needs its own rule. Start with security groups
          for workload-level boundaries and add subnet-level controls when the network design calls for them. Exact defaults and
          rule semantics differ by provider.
        </P>
        <P>
          Before changing a rule, inspect the current configuration with a read-only query. This inventory command summarizes
          security-group ingress ports in the configured region; review the full details in the AWS console or documentation
          before deciding whether any rule is needed.
        </P>
        <Code lang="bash" file="inspect-security-groups.sh" code={`
aws ec2 describe-security-groups \
  --query 'SecurityGroups[].{Id:GroupId,Name:GroupName,Ingress:IpPermissions[].{Protocol:IpProtocol,From:FromPort,To:ToPort}}' \
  --output table
`} />
      </Part>

      <Part n={6} label="Hands-on" title="Inspect an AWS Region Without Creating Resources">
        <P>
          The safest first cloud exercise is read-only. With AWS CLI configured for a training account, inspect the identity
          associated with the current credentials and ask for the region configuration. These commands do not create or change
          cloud resources. If you do not have an account, read them as examples and use your provider&apos;s equivalent console or
          documentation instead.
        </P>
        <Code lang="bash" file="inspect-cloud-context.sh" code={`
# Confirm which AWS identity your current credentials represent.
aws sts get-caller-identity

# Show the configured default region for this CLI profile.
aws configure get region

# List VPCs in the configured region; this is a read-only inventory call.
aws ec2 describe-vpcs \\
  --query 'Vpcs[].{VpcId:VpcId,Cidr:CidrBlock,State:State}' \\
  --output table

# Explicitly select a region for a read-only availability-zone query.
aws ec2 describe-availability-zones \\
  --region ap-south-1 \\
  --query 'AvailabilityZones[].{Name:ZoneName,State:State}' \\
  --output table
`} />
        <P>
          The identity call is a useful guard before any later change: verify the account and role are the ones you intended.
          Region names can be selected explicitly, as in the final command. Do not copy commands that create resources into a
          production account without a reviewed plan, budget controls, and a cleanup plan.
        </P>
        <Callout type="example">
          A practical design review for an Indian commerce app might compare Mumbai and Hyderabad for user latency and recovery.
          The right answer depends on the system&apos;s data-residency obligations, service availability, dependencies, and tested
          recovery objectives—not on geography alone.
        </Callout>
      </Part>

      <Part n={7} label="Production thinking" title="Design for Access, Availability and Cost Together">
        <P>
          A secure network can still be unavailable if it has a single failure point. Consider whether the service should span
          more than one availability zone, how health checks remove an unhealthy instance, and what happens if a region is
          unavailable. A multi-region design adds operational and data-consistency complexity; it is a deliberate recovery
          choice, not a checkbox. Measure the business impact and rehearse the recovery process.
        </P>
        <P>
          Cloud cost follows the resources and data paths you operate. VMs incur charges while provisioned, and data transfer,
          managed services, storage, and logs can all contribute. Use budgets and alerts, tag resources with owner and purpose,
          shut down lab resources when finished, and inspect bills regularly. Avoid claiming a design is free or assigning a
          fixed monthly price without checking current provider pricing and actual usage.
        </P>
        <Table
          head={['Review area', 'Questions to ask']}
          rows={[
            ['Identity', 'Can each person and workload use a separate, auditable identity? Can unused permissions be removed?'],
            ['Network', 'Is every public endpoint intentional? Can the database be reached only by its app?'],
            ['Reliability', 'What fails if one instance, zone, or region is unavailable? Has recovery been tested?'],
            ['Operations', 'Who patches, observes, and owns the service? Are logs and change history available?'],
            ['Cost', 'Which resources and data transfers drive cost? Is there an owner, budget, and cleanup policy?'],
          ]}
        />
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Choosing the most powerful VM before understanding the workload', cause: 'Extra capacity feels like safety but increases cost and can hide scaling problems.', fix: 'Start with demand, latency, and availability requirements; size conservatively and measure.' },
          { mistake: 'Giving every developer administrator access', cause: 'Broad access makes early setup easy but magnifies mistakes and credential theft.', fix: 'Use individual identities, task-specific roles, least-privilege policies, and periodic reviews.' },
          { mistake: 'Putting the database in a public subnet with a strong password', cause: 'Authentication does not remove the large attack surface of public reachability.', fix: 'Keep data private and allow only the app boundary to connect on the required port.' },
          { mistake: 'Assuming an AWS rule translates exactly to Azure or Google Cloud', cause: 'Provider concepts have similar names but can differ in defaults and evaluation.', fix: 'Map the intent, then verify the target provider’s documented behavior and test it.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Sketch a Safe Order-Status Service">
        <Practice
          title="A cloud design with a private data path"
          tasks={[
            'Draw a request path for a customer-facing order-status API and mark each public and private component.',
            'Choose VM, managed container, or serverless compute for the API and explain the operational trade-off.',
            'Write an IAM permission requirement in plain language: principal, action, resource, and any useful condition.',
            'Describe the inbound and outbound traffic rules for the load balancer, app, and database.',
            'Compare Mumbai and Hyderabad for a hypothetical Indian service; list the facts you would verify before choosing.',
          ]}
          hint="Start with the three identities and paths: customer to entry point, entry point to app, and app to data. Avoid starting from provider product names."
        />
      </Part>

      <KeyTakeaways items={[
        'Cloud architecture combines compute, identity, and network boundaries; reason about each separately and then trace the request path.',
        'VMs, managed containers, and serverless functions trade control for operational work in different ways.',
        'IAM roles are preferable for workloads; grant narrowly scoped actions and resources, and distinguish role trust from permissions.',
        'Keep data private, expose only intentional entry points, and allow workload-to-workload traffic on required paths only.',
        'AWS Mumbai and Hyderabad are ap-south-1 and ap-south-2; verify service availability and recovery requirements before selecting a region.',
        'Azure and Google Cloud have comparable concepts, but their behavior and defaults must be checked in their own documentation.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/devops-mlops/terraform-infrastructure-as-code"
        label="Lesson 07 · Infrastructure as Code with Terraform"
        text="You can now describe the pieces of a cloud design. Next, encode those resources and changes in Terraform so your infrastructure is reviewable and repeatable."
      />
    </LearnLayout>
  )
}
