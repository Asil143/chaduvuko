import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function TerraformInfrastructureAsCode() {
  return (
    <LearnLayout
      title="Infrastructure as Code with Terraform"
      description="Model cloud infrastructure with Terraform providers, resources, variables, state, remote backends, plans, and reusable modules."
      section="DevOps & Cloud Infrastructure — Lesson 08"
      readTime="40 min"
    >
      <Part n={1} label="Why code infrastructure?" title="Make Infrastructure Changes Reviewable">
        <P>
          A developer clicks through a cloud console to create a VM, network rules, and a database. Months later, nobody knows
          exactly which settings were chosen or how to recreate them. Infrastructure as Code (IaC) describes those resources in
          files, stores the changes in version control, and lets the team review a proposed change before it is applied.
        </P>
        <P>
          Terraform is a declarative IaC tool: you describe the desired resources, and Terraform compares that description with
          its recorded state and the provider&apos;s observed resources to propose actions. It does not make every change safe by
          itself. Credentials, state storage, resource dependencies, and the review of a plan remain important operational
          responsibilities.
        </P>
        <Table
          head={['Terraform concept', 'Role in a change']}
          rows={[
            ['Provider', 'Connects Terraform to a cloud or other API and supplies resource types.'],
            ['Resource', 'Declares an object Terraform should create or manage.'],
            ['Variable', 'Provides a configurable input such as a region or environment name.'],
            ['State', 'Records the relationship between Terraform addresses and real resources.'],
            ['Plan', 'Previews proposed creates, updates, and deletes before apply.'],
            ['Module', 'Packages related resources and inputs as a reusable unit.'],
          ]}
        />
        <Callout type="info">
          Terraform state is operationally important data. It can contain resource identifiers and sensitive values. Protect its
          access and storage like production configuration, not like a disposable build artifact.
        </Callout>
      </Part>

      <Part n={2} label="Project structure" title="Start with a Small, Understandable Configuration">
        <P>
          Keep a Terraform root module focused on one environment or deployment boundary. A simple project might contain
          <code> main.tf</code>, <code>variables.tf</code>, <code>outputs.tf</code>, and a committed example file such as
          <code> terraform.tfvars.example</code>. Keep actual secrets and environment-specific values out of version control.
          The filenames are conventions; Terraform reads configuration files in the working directory together.
        </P>
        <P>
          The following configuration declares an AWS provider and a VPC with a variable CIDR range and a useful output. It
          creates real infrastructure when applied, so use an approved learning account and inspect the plan first. Provider
          authentication comes from the environment or a configured profile; do not paste access keys into these files.
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
  region = var.aws_region
}

resource "aws_vpc" "learning" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name        = "learning-\${var.environment}"
    Environment = var.environment
  }
}

output "vpc_id" {
  description = "ID of the VPC managed by this configuration."
  value       = aws_vpc.learning.id
}
`} />
        <P>
          In the <code>Name</code> tag, Terraform interpolation combines a fixed label and the environment value. In a real
          configuration, choose a naming convention that avoids collisions, assign ownership tags, and check provider-specific
          resource arguments against the current provider documentation.
        </P>
        <Code lang="hcl" file="variables.tf" code={`
variable "aws_region" {
  description = "AWS region for this learning environment."
  type        = string
  default     = "ap-south-1"
}

variable "vpc_cidr" {
  description = "Non-overlapping private address range for this VPC."
  type        = string
  default     = "10.40.0.0/16"
}

variable "environment" {
  description = "Short environment name used for resource tags."
  type        = string
  default     = "sandbox"
}
`} />
        <Callout type="warning">
          This example provisions a VPC if applied, and cloud resources may incur charges. Use a sandbox account with a budget,
          read the plan, and destroy only resources that this configuration owns and that are safe to remove.
        </Callout>
      </Part>

      <Part n={3} label="Inputs and outputs" title="Use Variables to Make Intent Explicit">
        <P>
          Variables turn a hard-coded configuration into a reusable interface. Use types and descriptions so the caller knows
          what an input means. Defaults are appropriate for safe, broadly reusable values, but avoid defaulting credentials or
          production-only decisions. A separate <code>.tfvars</code> file can supply values for a particular environment; treat
          that file as sensitive if it includes secrets, and keep it out of Git.
        </P>
        <P>
          Outputs expose values that another module or operator may need, such as a VPC identifier. Do not output passwords or
          tokens just because they are convenient. Marking an output sensitive hides it in some CLI displays, but does not
          remove it from state or make the underlying value safe to store.
        </P>
        <Code lang="hcl" file="terraform.tfvars.example" code={`
aws_region  = "ap-south-1"
vpc_cidr    = "10.40.0.0/16"
environment = "sandbox"
`} />
        <P>
          The variable file above is an example of non-secret configuration and can be copied to a local environment-specific
          file if the team&apos;s workflow calls for it. Keep the sample current as variables change, and validate inputs during
          review rather than silently accepting an accidental production target.
        </P>
      </Part>

      <Part n={4} label="State" title="State Connects Terraform to Real Resources">
        <P>
          A Terraform resource address such as <code>aws_vpc.learning</code> is Terraform&apos;s name for a real object. State
          records the mapping, attributes, and metadata Terraform needs to compare declared configuration with the managed
          infrastructure. If state is lost, Terraform can no longer reliably know which existing resource a declaration
          represents. If two people apply from unrelated local state copies, they can make conflicting changes or create
          duplicates.
        </P>
        <P>
          A local state file is convenient for a solo sandbox, but teams normally use a remote backend that supports controlled
          access, encryption, durability, and coordination/locking for concurrent operations. The exact backend configuration
          depends on the provider and platform. For AWS, a remote S3 backend is a common option; configure access separately,
          limit the bucket and object permissions, enable appropriate encryption and recovery, and follow the locking guidance
          for the Terraform release your team uses. Never put backend credentials in source files.
        </P>
        <Code lang="hcl" file="backend.tf" code={`
terraform {
  backend "s3" {
    bucket  = "company-terraform-state"
    key     = "orders/sandbox/terraform.tfstate"
    region  = "ap-south-1"
    encrypt = true
  }
}
`} />
        <P>
          Create and secure the state bucket through an approved bootstrap process before initialization. Configure state locking
          using the current S3 backend guidance for the Terraform release your team operates; keep backend credentials out of
          this file and give the role access only to the required state objects.
        </P>
        <Table
          head={['State practice', 'Why it matters']}
          rows={[
            ['Restrict read and write access', 'State may contain sensitive attributes and controls real infrastructure.'],
            ['Use a team remote backend', 'Everyone plans against one shared state rather than diverging local copies.'],
            ['Enable locking or equivalent coordination', 'Prevents overlapping applies from corrupting shared state.'],
            ['Back up and test recovery', 'A broken or deleted state object can block safe operations.'],
            ['Avoid hand-editing state', 'Use documented Terraform state commands and a reviewed recovery procedure.'],
          ]}
        />
        <Callout type="tip">
          State is not a backup of your application data and it is not the desired configuration. Keep configuration in Git,
          protect state separately, and plan a recovery path for both.
        </Callout>
      </Part>

      <Part n={5} label="Plan and apply" title="Review the Plan Before Changing Anything">
        <P>
          The core workflow is initialize, format, validate, plan, review, then apply. Initialization downloads provider plugins
          and prepares the backend. Formatting makes diffs consistent. Validation checks configuration structure. Planning
          refreshes Terraform&apos;s view as needed and calculates a proposed change; it is the moment to catch the wrong region,
          unexpected deletes, or a resource replacement before it happens.
        </P>
        <Code lang="bash" file="terraform-review.sh" code={`
# Run these commands from the Terraform root module.
terraform init
terraform fmt -check -recursive
terraform validate

# Save a plan file so the reviewed plan can be applied deliberately.
terraform plan -out=reviewed.tfplan
terraform show reviewed.tfplan

# Apply only after a teammate has reviewed the plan and target environment.
terraform apply reviewed.tfplan
`} />
        <P>
          A plan is a snapshot of a proposed operation, not a guarantee that nothing changes between review and apply. Store a
          plan file only in an access-controlled location because it may contain sensitive values. If the configuration or
          environment changes, create and review a fresh plan. Never use automation to apply an unreviewed plan to production.
        </P>
        <Steps items={[
          'Confirm the working directory, account, role, region, and workspace/environment.',
          'Inspect the plan summary and each replacement or deletion; ask why it is necessary.',
          'Check cost, ownership, access-control impact, and rollback or recovery expectations.',
          'Apply the exact reviewed plan through the team&apos;s protected workflow.',
          'Verify the resulting service and record the change for future operators.',
        ]} />
      </Part>

      <Part n={6} label="Dependencies and modules" title="Compose Resources Without Hiding Their Behavior">
        <P>
          Terraform infers many dependencies from references. For example, an instance that refers to a subnet ID will be
          created after that subnet. Use an explicit dependency only when a real ordering requirement is not expressed by a
          value reference. Unnecessary ordering makes a graph harder to understand and may slow changes.
        </P>
        <P>
          A module is a collection of Terraform files with inputs and outputs. The root module is the directory where you run
          Terraform; child modules can encapsulate a network, service, or database pattern. A good module exposes the decisions
          callers need to make, documents defaults, and avoids hiding important security or cost behavior. Keep the first
          version small; extract a module when there is a repeatable pattern or clear ownership boundary, not just to reduce
          the line count of one file.
        </P>
        <Code lang="hcl" file="modules/network/main.tf" code={`
variable "cidr_block" {
  description = "Address range assigned to this VPC."
  type        = string
}

variable "name" {
  description = "Name tag for the network."
  type        = string
}

resource "aws_vpc" "this" {
  cidr_block           = var.cidr_block
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = var.name
  }
}

output "vpc_id" {
  value = aws_vpc.this.id
}
`} />
        <Code lang="hcl" file="root-network.tf" code={`
module "network" {
  source     = "./modules/network"
  cidr_block = var.vpc_cidr
  name       = "orders-\${var.environment}"
}

output "network_id" {
  value = module.network.vpc_id
}
`} />
        <P>
          For shared modules, pin a reviewed source revision according to your team&apos;s dependency policy and upgrade deliberately.
          Check the plan after upgrades; a module version change can alter resource arguments or trigger replacements.
        </P>
      </Part>

      <Part n={7} label="Team workflow" title="Treat Terraform Changes Like Application Changes">
        <P>
          Put infrastructure code through pull requests with formatting, validation, and plan output visible to reviewers. Keep
          state access restricted and production applies behind an authorized environment or operator. Separate environments
          deliberately so a developer cannot accidentally send a sandbox change to production by changing one local variable.
          For larger systems, the team may use separate root modules, accounts, or state boundaries; choose boundaries that
          match ownership and blast radius.
        </P>
        <P>
          Drift occurs when real resources change outside Terraform. A plan can reveal some drift, but not every operational
          change should be overwritten automatically. Investigate who changed the resource and why, then reconcile configuration
          and actual state through an approved process. Importing an existing resource is also a controlled operation: write
          the matching configuration and review the plan before Terraform manages it.
        </P>
        <Callout type="example">
          A Mumbai sandbox VPC and a production VPC should not share a casually copied local state file. Use explicit
          environment boundaries, separate access, and a reviewed deployment workflow so a learner&apos;s experiment cannot alter
          a customer network.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Applying immediately after writing a resource', cause: 'The configuration can target the wrong account or propose a replacement the author did not notice.', fix: 'Confirm identity and environment, then inspect and review the complete plan before apply.' },
          { mistake: 'Committing local state or secrets to Git', cause: 'State and variable files can reveal sensitive values and resource details.', fix: 'Use a protected remote backend, ignore local state and secret files, and audit repository history if a leak occurs.' },
          { mistake: 'Running production applies from several laptops', cause: 'Local state and concurrent actions can diverge or race.', fix: 'Use one shared backend with locking/coordination and a protected, auditable apply path.' },
          { mistake: 'Building a generic module before understanding the resource', cause: 'Abstraction can conceal security-critical defaults and make changes difficult to review.', fix: 'Start with direct, readable resources; extract a small module once the pattern is understood.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Manage a Sandbox Network Change">
        <Practice
          title="Review a VPC configuration without rushing to apply"
          tasks={[
            'Create the provider, VPC resource, typed region/CIDR/environment variables, and a VPC ID output shown above.',
            'Run format, validation, and plan; describe each planned action in plain language before applying anything.',
            'Add a child module for the VPC and update the root configuration to call it.',
            'Explain how you would store shared state, control access, coordinate concurrent applies, and recover a deleted state object.',
            'Change a resource attribute and inspect whether the plan updates or replaces the resource; explain the operational impact.',
          ]}
          hint="Use a sandbox account only if you choose to apply. A careful written plan review is a valid completion when no cloud account is available."
        />
      </Part>

      <KeyTakeaways items={[
        'Providers connect Terraform to APIs; resources declare infrastructure; variables and outputs define a module interface.',
        'State maps Terraform addresses to real resources and must be protected, backed up, and coordinated for team use.',
        'Use a remote backend for shared work with restricted access and locking or equivalent coordination.',
        'The safe workflow is init, format, validate, plan, review, and apply the exact reviewed plan.',
        'Modules package a repeatable boundary; keep them small and make security, cost, and replacement behavior visible.',
        'Treat drift, imports, and production changes as deliberate reviewed operations, not automatic cleanup.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/devops-mlops/secrets-management"
        label="Lesson 09 · Secrets Management — Vault and Cloud Secret Stores"
        text="Keep credentials out of code and images: environment variables, cloud secret managers, HashiCorp Vault, rotation and access policies."
      />
    </LearnLayout>
  )
}
