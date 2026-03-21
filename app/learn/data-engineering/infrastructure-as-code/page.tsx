import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Infrastructure as Code for Data Engineering — Terraform | Chaduvuko',
  description:
    'Infrastructure as Code for data engineers — Terraform fundamentals, provisioning Snowflake warehouses, S3 buckets, Airflow environments, IAM roles, and managing data infrastructure like software with state, modules, and CI/CD.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
)
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
)
const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 'clamp(16px,1.8vw,20px)', fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12, fontFamily: 'var(--font-display)' }}>{children}</h3>
)
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)
const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>{children}</div>
)

interface TableRow { [key: string]: string }
interface CompareTableProps { headers: { label: string; color?: string }[]; rows: TableRow[]; keys: string[] }
const CompareTable = ({ headers, rows, keys }: CompareTableProps) => (
  <div style={{ overflowX: 'auto', marginBottom: 28 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}>
      <thead><tr>{headers.map((h, i) => (
        <th key={h.label} style={{ padding: '10px 16px', textAlign: 'left', fontSize: i === 0 ? 10 : 11, fontWeight: 700, letterSpacing: i === 0 ? '.12em' : '.06em', textTransform: 'uppercase', color: h.color ?? 'var(--muted)', fontFamily: 'var(--font-mono)', borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)', background: h.color ? `${h.color}08` : 'var(--bg2)', minWidth: i === 0 ? 130 : 150 }}>{h.label}</th>
      ))}</tr></thead>
      <tbody>{rows.map((row, i) => (
        <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>{keys.map((k, ki) => (
          <td key={k} style={{ padding: '10px 16px', color: ki === 0 ? 'var(--muted)' : 'var(--text)', fontSize: ki === 0 ? 11 : 13, fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit', fontWeight: ki === 0 ? 700 : 400, textTransform: ki === 0 ? 'uppercase' : 'none', letterSpacing: ki === 0 ? '.06em' : 'normal', borderBottom: '1px solid var(--border)', borderLeft: ki > 0 && headers[ki]?.color ? `2px solid ${headers[ki].color}40` : ki > 0 ? '1px solid var(--border)' : 'none', verticalAlign: 'top' }}>{row[k]}</td>
        ))}</tr>
      ))}</tbody>
    </table>
  </div>
)

export default function InfrastructureAsCodeModule() {
  return (
    <LearnLayout
      title="Infrastructure as Code for Data Engineering"
      description="Terraform fundamentals, provisioning Snowflake warehouses, S3 buckets, Airflow environments, IAM roles, and managing data infrastructure with state, modules, and CI/CD."
      section="Data Engineering"
      readTime="60 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — Why Data Engineers Need IaC ─────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why Data Engineers Need IaC" />
        <SectionTitle>Infrastructure as Code — Why It Matters for Data Platforms</SectionTitle>

        <Para>
          A data platform is built on infrastructure: S3 buckets, Snowflake
          warehouses, IAM roles, Airflow environments, VPCs, security groups,
          and dozens of other cloud resources. When this infrastructure is created
          manually through cloud consoles, it becomes invisible — nobody knows
          exactly what exists, who created it, or why. The dev environment
          drifts from production. A new environment takes a week to set up.
          A misconfigured IAM role exposes PII to the wrong team.
        </Para>

        <Para>
          Infrastructure as Code treats cloud resources like software: defined
          in version-controlled files, reviewed through pull requests, tested
          in CI, and deployed through an automated pipeline. A data engineer
          who can write Terraform to provision a complete data platform environment
          in one command has a significant operational advantage over one who
          creates resources manually.
        </Para>

        <HighlightBox>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
            What IaC gives a data engineering team
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { benefit: 'Reproducibility', color: '#00e676', desc: 'Spin up an identical dev/staging environment in minutes. New engineer onboards in one command.' },
              { benefit: 'Auditability', color: '#7b61ff', desc: 'Every infrastructure change is a git commit with an author, timestamp, and reason. Who added that S3 bucket?' },
              { benefit: 'Drift prevention', color: '#f97316', desc: 'CI/CD prevents unapproved manual changes. terraform plan in CI shows what will change before it changes.' },
              { benefit: 'Cost visibility', color: '#4285f4', desc: 'IaC makes it obvious which resources exist. Easy to find and destroy unused dev environments burning money.' },
              { benefit: 'Security by default', color: '#ffd700', desc: 'IAM roles, bucket policies, and encryption configured in code and reviewed in PRs — not forgotten in console.' },
              { benefit: 'Environment parity', color: '#ff4757', desc: 'Dev and prod use the same Terraform modules with different variable values — no environment drift.' },
            ].map((item) => (
              <div key={item.benefit} style={{ background: 'var(--bg2)', border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 4 }}>{item.benefit}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 02 — Terraform Fundamentals ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Terraform Fundamentals" />
        <SectionTitle>Terraform Fundamentals — The Core Concepts Every Data Engineer Needs</SectionTitle>

        <Para>
          Terraform is the dominant IaC tool in 2026. It has providers for every
          major cloud (AWS, Azure, GCP) and for data tools like Snowflake,
          Databricks, and Confluent. Understanding the core concepts — providers,
          resources, state, plan, and apply — is sufficient to manage most data
          platform infrastructure.
        </Para>

        <CodeBox label="Terraform core concepts — providers, resources, state, plan, apply">{`TERRAFORM WORKFLOW:

  terraform init     ← download provider plugins, initialise backend
  terraform plan     ← show what will change (no actual changes made)
  terraform apply    ← apply the changes (creates/updates/destroys resources)
  terraform destroy  ← tear down all resources in the configuration

PROVIDER: the plugin that talks to a cloud or service API
  # providers.tf
  terraform {
    required_providers {
      aws = {
        source  = "hashicorp/aws"
        version = "~> 5.0"
      }
      snowflake = {
        source  = "Snowflake-Labs/snowflake"
        version = "~> 0.87"
      }
    }
    # Remote state backend (required for team use):
    backend "s3" {
      bucket         = "freshmart-terraform-state"
      key            = "data-platform/terraform.tfstate"
      region         = "ap-south-1"
      encrypt        = true
      dynamodb_table = "freshmart-terraform-locks"  # prevents concurrent applies
    }
  }

  provider "aws" {
    region = var.aws_region
  }

  provider "snowflake" {
    account  = var.snowflake_account
    username = var.snowflake_user
    password = var.snowflake_password
    role     = "SYSADMIN"
  }

RESOURCE: a single infrastructure object (S3 bucket, Snowflake warehouse, etc.)
  # Each resource block = one real cloud resource
  resource "aws_s3_bucket" "data_lake" {
    bucket = "freshmart-data-lake-\${var.environment}"  # freshmart-data-lake-prod
    tags   = local.common_tags
  }

STATE: Terraform's record of what it has created
  Stored in: S3 (remote, for teams) or locally (.terraform/terraform.tfstate)
  Contains:  mapping from resource blocks → actual cloud resource IDs
  Critical:  never edit manually. Never delete. If lost: expensive to recover.
  Remote state: use S3 + DynamoDB lock (prevents two engineers applying simultaneously)

PLAN OUTPUT (what to read before every apply):
  terraform plan
  # Terraform will perform the following actions:

  # aws_s3_bucket.data_lake will be created (+)
  + resource "aws_s3_bucket" "data_lake" {
    + bucket = "freshmart-data-lake-prod"
    + id     = (known after apply)
  }

  # aws_s3_bucket.staging will be destroyed (-)
  - resource "aws_s3_bucket" "staging" {
    - bucket = "freshmart-staging-old"
    - id     = "freshmart-staging-old"
  }

  # aws_snowflake_warehouse.analytics will be updated in-place (~)
  ~ resource "snowflake_warehouse" "analytics" {
    ~ warehouse_size = "SMALL" → "MEDIUM"
  }

  Plan: 1 to add, 1 to change, 1 to destroy.

  READ THE PLAN CAREFULLY before apply.
  (-) destroy: something will be permanently deleted. Understand why.
  (~) update: in-place change. Usually safe.
  (+) create: new resource. Check the configuration.
  -/+ replace: resource must be destroyed and recreated (data loss risk).`}</CodeBox>

        <SubTitle>Variables, outputs, and locals — making Terraform reusable</SubTitle>

        <CodeBox label="Variables and outputs — parameterising Terraform for multiple environments">{`# variables.tf — declare inputs
variable "environment" {
  description = "Deployment environment: dev, staging, or prod"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "ap-south-1"
}

variable "snowflake_account" {
  description = "Snowflake account identifier"
  type        = string
  sensitive   = true   # marked sensitive: not shown in plan output
}

variable "data_retention_days" {
  description = "Number of days to retain data in S3 Standard before transition"
  type        = number
  default     = 90
}

# locals.tf — computed values used throughout the configuration
locals {
  name_prefix = "freshmart-\${var.environment}"
  common_tags = {
    Environment = var.environment
    Project     = "freshmart-data-platform"
    ManagedBy   = "terraform"
    Team        = "data-engineering"
  }
  # Size overrides per environment:
  snowflake_warehouse_size = {
    dev     = "X-SMALL"
    staging = "SMALL"
    prod    = "MEDIUM"
  }
}

# outputs.tf — values to expose after apply (useful for other modules)
output "data_lake_bucket_name" {
  description = "Name of the S3 data lake bucket"
  value       = aws_s3_bucket.data_lake.id
}

output "data_lake_bucket_arn" {
  description = "ARN of the S3 data lake bucket"
  value       = aws_s3_bucket.data_lake.arn
}

output "snowflake_pipeline_role" {
  description = "Name of the Snowflake role for pipeline service accounts"
  value       = snowflake_role.pipeline.name
}

# ENVIRONMENT-SPECIFIC VARIABLE FILES:
# terraform/environments/prod.tfvars
environment          = "prod"
aws_region           = "ap-south-1"
data_retention_days  = 365

# terraform/environments/dev.tfvars
environment          = "dev"
aws_region           = "ap-south-1"
data_retention_days  = 30

# Deploy to prod:   terraform apply -var-file=environments/prod.tfvars
# Deploy to dev:    terraform apply -var-file=environments/dev.tfvars`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — S3 Data Lake Infrastructure ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — S3 Data Lake Infrastructure" />
        <SectionTitle>Provisioning an S3 Data Lake — Complete Terraform Configuration</SectionTitle>

        <Para>
          The S3 data lake is the foundation of the Medallion Architecture. Its
          Terraform configuration covers the bucket, encryption, versioning,
          lifecycle policies, access logging, and the bucket policies that
          implement zone-based access control — all in version-controlled code.
        </Para>

        <CodeBox label="S3 data lake — complete Terraform configuration">{`# s3.tf — data lake bucket with all production settings

resource "aws_s3_bucket" "data_lake" {
  bucket        = "\${local.name_prefix}-data-lake"
  force_destroy = var.environment == "dev"   # only allow destroy in dev
  tags          = local.common_tags
}

# Encryption: all objects encrypted with KMS key
resource "aws_s3_bucket_server_side_encryption_configuration" "data_lake" {
  bucket = aws_s3_bucket.data_lake.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.data_lake.arn
    }
    bucket_key_enabled = true   # reduces KMS API calls and cost
  }
}

# Block all public access (critical for data lakes)
resource "aws_s3_bucket_public_access_block" "data_lake" {
  bucket                  = aws_s3_bucket.data_lake.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Versioning: enables recovery from accidental deletion
resource "aws_s3_bucket_versioning" "data_lake" {
  bucket = aws_s3_bucket.data_lake.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Lifecycle: transition objects through storage tiers automatically
resource "aws_s3_bucket_lifecycle_configuration" "data_lake" {
  bucket = aws_s3_bucket.data_lake.id
  depends_on = [aws_s3_bucket_versioning.data_lake]

  # Landing zone: short-lived raw files
  rule {
    id     = "landing-zone-expiry"
    status = "Enabled"
    filter { prefix = "landing/" }
    expiration { days = 30 }
    # Files older than 30 days deleted automatically
  }

  # Bronze: transition to cheaper storage after 90 days
  rule {
    id     = "bronze-tiering"
    status = "Enabled"
    filter { prefix = "bronze/" }
    transition {
      days          = 90
      storage_class = "STANDARD_IA"
    }
    transition {
      days          = 365
      storage_class = "GLACIER"
    }
    noncurrent_version_expiration {
      noncurrent_days = 30   # delete old versions after 30 days
    }
  }

  # Silver/Gold: standard IA after 180 days
  rule {
    id     = "silver-gold-tiering"
    status = "Enabled"
    filter {
      or {
        prefix = "silver/"
        prefix = "gold/"
      }
    }
    transition {
      days          = 180
      storage_class = "STANDARD_IA"
    }
  }
}

# Access logging: who accessed what, for GDPR audit
resource "aws_s3_bucket" "access_logs" {
  bucket = "\${local.name_prefix}-data-lake-logs"
  tags   = local.common_tags
}

resource "aws_s3_bucket_logging" "data_lake" {
  bucket        = aws_s3_bucket.data_lake.id
  target_bucket = aws_s3_bucket.access_logs.id
  target_prefix = "s3-access-logs/"
}

# Bucket notification: trigger Lambda on new landing files
resource "aws_s3_bucket_notification" "data_lake" {
  bucket = aws_s3_bucket.data_lake.id
  lambda_function {
    lambda_function_arn = aws_lambda_function.bronze_ingestion_trigger.arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "landing/"
  }
}

# KMS key for encryption
resource "aws_kms_key" "data_lake" {
  description             = "FreshMart data lake encryption key"
  deletion_window_in_days = 30
  enable_key_rotation     = true
  tags                    = local.common_tags
}

resource "aws_kms_alias" "data_lake" {
  name          = "alias/\${local.name_prefix}-data-lake"
  target_key_id = aws_kms_key.data_lake.key_id
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — IAM for Data Platforms ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — IAM Roles and Policies" />
        <SectionTitle>IAM for Data Platforms — Least Privilege as Code</SectionTitle>

        <Para>
          IAM is the access control layer for all AWS resources. For a data
          platform, four IAM roles cover the primary access patterns: ingestion
          pipelines (write to landing/bronze), transformation pipelines (read
          bronze, write silver/gold), analyst access (read silver/gold only),
          and the CI service account (read all, create/delete staging environments).
          Defining these in Terraform ensures the principle of least privilege
          is enforced consistently and reviewable.
        </Para>

        <CodeBox label="IAM roles and policies for a data platform — complete example">{`# iam.tf — roles for the data platform access patterns

# ── INGESTION PIPELINE ROLE ────────────────────────────────────────────────────
resource "aws_iam_role" "pipeline_ingestion" {
  name               = "\${local.name_prefix}-pipeline-ingestion"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
  tags               = local.common_tags
}

resource "aws_iam_policy" "pipeline_ingestion" {
  name = "\${local.name_prefix}-pipeline-ingestion-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "WriteLanding"
        Effect = "Allow"
        Action = ["s3:PutObject", "s3:GetObject"]
        Resource = [
          "\${aws_s3_bucket.data_lake.arn}/landing/*",
          "\${aws_s3_bucket.data_lake.arn}/bronze/*",
        ]
      },
      {
        Sid      = "ListBucket"
        Effect   = "Allow"
        Action   = ["s3:ListBucket", "s3:GetBucketLocation"]
        Resource = aws_s3_bucket.data_lake.arn
        Condition = {
          StringLike = { "s3:prefix" = ["landing/*", "bronze/*"] }
        }
      },
      {
        Sid    = "UseKMS"
        Effect = "Allow"
        Action = ["kms:GenerateDataKey", "kms:Decrypt"]
        Resource = aws_kms_key.data_lake.arn
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ingestion_policy" {
  role       = aws_iam_role.pipeline_ingestion.name
  policy_arn = aws_iam_policy.pipeline_ingestion.arn
}


# ── TRANSFORMATION PIPELINE ROLE (dbt, Spark) ─────────────────────────────────
resource "aws_iam_role" "pipeline_transform" {
  name               = "\${local.name_prefix}-pipeline-transform"
  assume_role_policy = data.aws_iam_policy_document.ec2_assume.json
  tags               = local.common_tags
}

resource "aws_iam_policy" "pipeline_transform" {
  name = "\${local.name_prefix}-pipeline-transform-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "ReadBronze"
        Effect = "Allow"
        Action = ["s3:GetObject", "s3:ListBucket"]
        Resource = [
          "\${aws_s3_bucket.data_lake.arn}/bronze/*",
          aws_s3_bucket.data_lake.arn,
        ]
      },
      {
        Sid    = "WriteTransformed"
        Effect = "Allow"
        Action = ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"]
        Resource = [
          "\${aws_s3_bucket.data_lake.arn}/silver/*",
          "\${aws_s3_bucket.data_lake.arn}/gold/*",
        ]
      },
      # NO access to: landing/ (raw PII, ingestion only)
    ]
  })
}


# ── ANALYST ROLE (read silver and gold, no raw PII) ───────────────────────────
resource "aws_iam_role" "analyst" {
  name               = "\${local.name_prefix}-analyst"
  assume_role_policy = data.aws_iam_policy_document.federated_assume.json
  tags               = local.common_tags
}

resource "aws_iam_policy" "analyst" {
  name = "\${local.name_prefix}-analyst-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "ReadAnalyticsLayers"
        Effect = "Allow"
        Action = ["s3:GetObject"]
        Resource = [
          "\${aws_s3_bucket.data_lake.arn}/silver/*",
          "\${aws_s3_bucket.data_lake.arn}/gold/*",
        ]
        # Explicit deny for PII columns handled at Athena/LakeFormation level
      },
      {
        Sid    = "ListForAnalytics"
        Effect = "Allow"
        Action = ["s3:ListBucket"]
        Resource = aws_s3_bucket.data_lake.arn
        Condition = {
          StringLike = {
            "s3:prefix" = ["silver/*", "gold/*"]
          }
        }
      }
    ]
  })
}

# Assume role policy documents:
data "aws_iam_policy_document" "lambda_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals { type = "Service"; identifiers = ["lambda.amazonaws.com"] }
  }
}

data "aws_iam_policy_document" "ec2_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals { type = "Service"; identifiers = ["ec2.amazonaws.com"] }
  }
}

data "aws_iam_policy_document" "federated_assume" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    principals {
      type        = "Federated"
      identifiers = ["arn:aws:iam::\${data.aws_caller_identity.current.account_id}:oidc-provider/accounts.google.com"]
    }
  }
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Snowflake Infrastructure ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Snowflake Infrastructure as Code" />
        <SectionTitle>Snowflake Infrastructure — Warehouses, Roles, and Databases in Terraform</SectionTitle>

        <Para>
          Snowflake has a first-class Terraform provider maintained by Snowflake
          Labs. This allows the complete Snowflake account configuration —
          warehouses, databases, schemas, roles, grants, users, and resource
          monitors — to be managed as code. When a new analyst joins, adding
          them to the Snowflake platform is a one-line PR rather than a
          console click sequence.
        </Para>

        <CodeBox label="Snowflake Terraform — warehouses, databases, roles, and grants">{`# snowflake.tf — complete Snowflake infrastructure

# ── WAREHOUSES ────────────────────────────────────────────────────────────────
resource "snowflake_warehouse" "dbt_pipeline" {
  name           = "\${upper(var.environment)}_DBT_PIPELINE_WH"
  warehouse_size = lookup(local.snowflake_warehouse_size, var.environment, "SMALL")
  auto_suspend   = 300       # 5 min idle → suspend
  auto_resume    = true
  max_cluster_count = 1
  comment        = "dbt transformation pipeline warehouse - \${var.environment}"
}

resource "snowflake_warehouse" "analyst" {
  name              = "\${upper(var.environment)}_ANALYST_WH"
  warehouse_size    = "SMALL"
  auto_suspend      = 600    # 10 min idle
  auto_resume       = true
  max_cluster_count = var.environment == "prod" ? 3 : 1
  scaling_policy    = var.environment == "prod" ? "ECONOMY" : "STANDARD"
  comment           = "Analyst self-service queries - \${var.environment}"
}

resource "snowflake_warehouse" "dashboard" {
  name           = "\${upper(var.environment)}_DASHBOARD_WH"
  warehouse_size = "X-SMALL"
  auto_suspend   = 60
  auto_resume    = true
  comment        = "BI tool service account warehouse - \${var.environment}"
}


# ── RESOURCE MONITOR — prevent runaway cost ───────────────────────────────────
resource "snowflake_resource_monitor" "monthly_limit" {
  name         = "\${upper(var.environment)}_MONTHLY_MONITOR"
  credit_quota = var.environment == "prod" ? 1000 : 100

  notify_triggers     = [75, 90]   # alert at 75% and 90% of quota
  suspend_triggers    = [100]       # suspend warehouses at 100%
  suspend_immediately_triggers = [110]  # hard stop at 110%

  notify_users = ["data-team-lead@freshmart.com"]
}

resource "snowflake_warehouse" "dbt_pipeline_monitor" {
  name             = "\${upper(var.environment)}_DBT_PIPELINE_WH"
  resource_monitor = snowflake_resource_monitor.monthly_limit.name
  # ... other settings from above
}


# ── DATABASES AND SCHEMAS ─────────────────────────────────────────────────────
resource "snowflake_database" "freshmart" {
  name                        = "FRESHMART_\${upper(var.environment)}"
  data_retention_time_in_days = var.environment == "prod" ? 30 : 1
  comment                     = "FreshMart data platform - \${var.environment}"
}

resource "snowflake_schema" "bronze" {
  database = snowflake_database.freshmart.name
  name     = "BRONZE"
  data_retention_time_in_days = var.environment == "prod" ? 30 : 1
}

resource "snowflake_schema" "silver" {
  database = snowflake_database.freshmart.name
  name     = "SILVER"
}

resource "snowflake_schema" "gold" {
  database = snowflake_database.freshmart.name
  name     = "GOLD"
}

resource "snowflake_schema" "monitoring" {
  database = snowflake_database.freshmart.name
  name     = "MONITORING"
}


# ── ROLES ─────────────────────────────────────────────────────────────────────
resource "snowflake_role" "pipeline" {
  name    = "\${upper(var.environment)}_PIPELINE_ROLE"
  comment = "dbt and Spark pipeline service accounts"
}

resource "snowflake_role" "analyst" {
  name    = "\${upper(var.environment)}_ANALYST_ROLE"
  comment = "Analyst read access to silver and gold"
}

resource "snowflake_role" "bi_service" {
  name    = "\${upper(var.environment)}_BI_SERVICE_ROLE"
  comment = "Metabase/Tableau service account - read gold only"
}


# ── GRANTS ────────────────────────────────────────────────────────────────────
# Pipeline role: read bronze, write silver + gold
resource "snowflake_schema_grant" "pipeline_bronze_read" {
  database_name = snowflake_database.freshmart.name
  schema_name   = snowflake_schema.bronze.name
  privilege     = "USAGE"
  roles         = [snowflake_role.pipeline.name]
}

resource "snowflake_schema_grant" "pipeline_silver_write" {
  database_name = snowflake_database.freshmart.name
  schema_name   = snowflake_schema.silver.name
  privilege     = "CREATE TABLE"
  roles         = [snowflake_role.pipeline.name]
}

# Analyst role: read silver + gold, NOT bronze
resource "snowflake_schema_grant" "analyst_silver" {
  database_name = snowflake_database.freshmart.name
  schema_name   = snowflake_schema.silver.name
  privilege     = "USAGE"
  roles         = [snowflake_role.analyst.name]
}

resource "snowflake_table_grant" "analyst_silver_select" {
  database_name = snowflake_database.freshmart.name
  schema_name   = snowflake_schema.silver.name
  privilege     = "SELECT"
  roles         = [snowflake_role.analyst.name]
  on_future     = true   # applies to all future tables automatically
}

resource "snowflake_warehouse_grant" "analyst_warehouse" {
  warehouse_name = snowflake_warehouse.analyst.name
  privilege      = "USAGE"
  roles          = [snowflake_role.analyst.name]
}


# ── USERS ─────────────────────────────────────────────────────────────────────
# Manage Snowflake users from a variable-driven config:
variable "snowflake_analysts" {
  description = "List of analyst email addresses"
  type        = list(string)
  default     = []
}

resource "snowflake_user" "analysts" {
  for_each      = toset(var.snowflake_analysts)
  name          = replace(each.value, "@freshmart.com", "")
  email         = each.value
  login_name    = each.value
  default_role  = snowflake_role.analyst.name
  default_warehouse = snowflake_warehouse.analyst.name
  must_change_password = true
}

resource "snowflake_role_grants" "analysts" {
  for_each  = toset(var.snowflake_analysts)
  role_name = snowflake_role.analyst.name
  users     = [replace(each.value, "@freshmart.com", "")]
  depends_on = [snowflake_user.analysts]
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — Terraform Modules ──────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Terraform Modules" />
        <SectionTitle>Terraform Modules — Reusable Infrastructure Components</SectionTitle>

        <Para>
          A Terraform module is a reusable, parameterised configuration for
          a set of related resources. For a data platform, common modules
          include: data_lake (S3 bucket with all production settings),
          snowflake_env (one Snowflake database + schemas + roles per environment),
          and airflow_env (MWAA or self-hosted Airflow deployment). Using
          modules means dev and prod use the same tested configuration with
          different variable values — no environment drift.
        </Para>

        <CodeBox label="Terraform module structure — the data lake module">{`# MODULE STRUCTURE:
# modules/
#   data_lake/
#     main.tf       ← resource definitions
#     variables.tf  ← input variables
#     outputs.tf    ← output values
#   snowflake_env/
#     main.tf
#     variables.tf
#     outputs.tf
#   airflow_mwaa/
#     main.tf
#     variables.tf
#     outputs.tf

# modules/data_lake/variables.tf
variable "environment"          { type = string }
variable "aws_region"           { type = string }
variable "retention_days_landing"  { type = number; default = 30  }
variable "retention_days_bronze"   { type = number; default = 365 }
variable "enable_versioning"    { type = bool;   default = true  }
variable "tags"                 { type = map(string); default = {} }

# modules/data_lake/main.tf — all S3 resources from Part 03
resource "aws_s3_bucket" "data_lake" {
  bucket = "freshmart-\${var.environment}-data-lake"
  tags   = merge(var.tags, { Environment = var.environment })
}
# ... (all the lifecycle, encryption, versioning resources)

# modules/data_lake/outputs.tf
output "bucket_id"  { value = aws_s3_bucket.data_lake.id  }
output "bucket_arn" { value = aws_s3_bucket.data_lake.arn }
output "kms_key_id" { value = aws_kms_key.data_lake.id    }


# ROOT MODULE — uses modules for each environment:
# environments/prod/main.tf

module "data_lake_prod" {
  source = "../../modules/data_lake"

  environment              = "prod"
  aws_region               = "ap-south-1"
  retention_days_landing   = 30
  retention_days_bronze    = 730    # 2 years for prod
  enable_versioning        = true
  tags = {
    Environment = "prod"
    CostCenter  = "data-platform"
  }
}

module "snowflake_prod" {
  source = "../../modules/snowflake_env"

  environment             = "prod"
  snowflake_account       = var.snowflake_account
  warehouse_size_pipeline = "MEDIUM"
  warehouse_size_analyst  = "SMALL"
  analyst_cluster_count   = 3
  data_retention_days     = 30
  analysts = [
    "priya@freshmart.com",
    "rahul@freshmart.com",
    "ananya@freshmart.com",
  ]
}

# environments/dev/main.tf — SAME MODULES, different variables:
module "data_lake_dev" {
  source = "../../modules/data_lake"

  environment              = "dev"
  aws_region               = "ap-south-1"
  retention_days_landing   = 7      # shorter retention in dev
  retention_days_bronze    = 30
  enable_versioning        = false  # cheaper: no versioning in dev
  tags = { Environment = "dev" }
}

module "snowflake_dev" {
  source = "../../modules/snowflake_env"

  environment             = "dev"
  snowflake_account       = var.snowflake_account
  warehouse_size_pipeline = "X-SMALL"  # smaller for dev
  warehouse_size_analyst  = "X-SMALL"
  analyst_cluster_count   = 1
  data_retention_days     = 1
  analysts = []  # dev uses personal credentials
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Terraform CI/CD ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Terraform CI/CD" />
        <SectionTitle>CI/CD for Terraform — Safe Infrastructure Changes</SectionTitle>

        <Para>
          Infrastructure changes carry higher risk than code changes — a wrong
          Terraform apply can delete a production S3 bucket or an IAM role that
          pipelines depend on. The CI/CD pipeline for Terraform must require
          a human review of the plan before any apply, and must apply in a
          controlled way that prevents concurrent runs.
        </Para>

        <CodeBox label="GitHub Actions Terraform CI/CD — plan on PR, apply on merge">{`# .github/workflows/terraform.yml
name: Terraform

on:
  pull_request:
    paths: ['terraform/**']
  push:
    branches: [main]
    paths: ['terraform/**']

env:
  AWS_REGION:        ap-south-1
  TF_WORKING_DIR:    terraform/environments/prod

jobs:
  terraform-plan:
    name: "Terraform Plan"
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'

    steps:
      - uses: actions/checkout@v4

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: "1.7.0"

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume:   \${{ secrets.AWS_TERRAFORM_ROLE_ARN }}
          aws-region:       ap-south-1

      - name: Terraform Init
        working-directory: \${{ env.TF_WORKING_DIR }}
        run: terraform init

      - name: Terraform Format Check
        run: terraform fmt -check -recursive terraform/

      - name: Terraform Validate
        working-directory: \${{ env.TF_WORKING_DIR }}
        run: terraform validate

      - name: Terraform Plan
        id: plan
        working-directory: \${{ env.TF_WORKING_DIR }}
        run: |
          terraform plan \\
            -var-file=../../environments/prod.tfvars \\
            -out=tfplan \\
            -detailed-exitcode \\
            2>&1 | tee plan_output.txt
        continue-on-error: true

      - name: Post Plan to PR
        uses: actions/github-script@v7
        with:
          script: |
            const fs   = require('fs');
            const plan = fs.readFileSync('terraform/environments/prod/plan_output.txt', 'utf8');
            const truncated = plan.length > 60000 ? plan.slice(-60000) : plan;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo:  context.repo.repo,
              body:  \`## Terraform Plan\n\n<details><summary>Show Plan</summary>\n\n\\\`\\\`\\\`\n\${truncated}\n\\\`\\\`\\\`\n</details>\`,
            });

      - name: Fail if plan errored
        if: steps.plan.outputs.exitcode == '1'
        run: exit 1


  terraform-apply:
    name: "Terraform Apply"
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment: production    # requires manual approval in GitHub Environments

    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
        with: { terraform_version: "1.7.0" }

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ secrets.AWS_TERRAFORM_ROLE_ARN }}
          aws-region:     ap-south-1

      - name: Terraform Init
        working-directory: \${{ env.TF_WORKING_DIR }}
        run: terraform init

      - name: Terraform Apply
        working-directory: \${{ env.TF_WORKING_DIR }}
        run: |
          terraform apply \\
            -var-file=../../environments/prod.tfvars \\
            -auto-approve \\
            -input=false


# KEY SAFETY FEATURES:
# 1. Plan on PR:         shows what will change BEFORE merge
# 2. Human approval:    GitHub Environments 'production' requires approval
# 3. DynamoDB locking:  only one apply can run at a time (state locking)
# 4. Role assumption:   CI uses a restricted IAM role, not admin keys
# 5. exit code check:   plan exit code 1 = error, exit code 2 = changes (expected)


# PREVENTING ACCIDENTAL DESTROYS:
# lifecycle block prevents Terraform from destroying critical resources:
resource "aws_s3_bucket" "data_lake_prod" {
  # ... bucket config ...
  lifecycle {
    prevent_destroy = true   # terraform destroy will fail with an error
    # To actually destroy: remove this block, plan, review, apply
  }
}

# Same for production Snowflake database:
resource "snowflake_database" "freshmart_prod" {
  name = "FRESHMART_PROD"
  lifecycle {
    prevent_destroy = true
  }
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Onboarding a New Data Engineer in 30 Minutes With IaC</SectionTitle>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Scenario — FreshMart · New engineer joins the data team
          </div>

          <Para>
            Rahul Sharma joins FreshMart as a data engineer. Before IaC, onboarding
            took 3-5 days: manually creating an S3 prefix, requesting Snowflake access
            from IT, waiting for IAM role creation, configuring dbt profiles with
            manual credential lookup. With IaC, the entire environment is ready in
            30 minutes with one PR.
          </Para>

          <CodeBox label="IaC-driven onboarding — one PR to provision a complete developer environment">{`# PR TITLE: feat(infra): add dev environment for rahul.sharma

# Step 1: Add new analyst to Snowflake users list
# terraform/environments/dev/main.tf — update analysts variable:
module "snowflake_dev" {
  source  = "../../modules/snowflake_env"
  environment = "dev"
  analysts = [
    "priya@freshmart.com",
    "rahul.sharma@freshmart.com",   # ← ADD THIS LINE
  ]
}

# Step 2: Add developer S3 access prefix
# modules/s3_developer_access/main.tf:
resource "aws_iam_policy" "dev_s3_access" {
  for_each = toset(var.developer_emails)
  name = "freshmart-dev-\${replace(each.value, "@freshmart.com", "")}-s3"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["s3:GetObject", "s3:PutObject", "s3:ListBucket"]
      Resource = [
        "arn:aws:s3:::freshmart-dev-data-lake/dev/\${replace(each.value, "@freshmart.com", "")}/*",
        "arn:aws:s3:::freshmart-dev-data-lake",
      ]
    }]
  })
}

# Step 3: Open PR → CI runs terraform plan → plan shows:
# + snowflake_user.analysts["rahul.sharma@freshmart.com"] will be created
# + snowflake_role_grants.analysts["rahul.sharma@freshmart.com"] will be created
# + aws_iam_policy.dev_s3_access["rahul.sharma@freshmart.com"] will be created
# Plan: 3 to add, 0 to change, 0 to destroy.

# Step 4: PR reviewed and merged → terraform apply runs
# → Snowflake user created with analyst role, temp password, MUST_CHANGE_PASSWORD=true
# → IAM policy created and attached to Rahul's AWS identity

# RAHUL'S ONBOARDING CHECKLIST (30 minutes total):
# [x] Data engineering lead opens PR with Rahul's email
# [x] PR reviewed, merged — Snowflake access provisioned automatically
# [x] Rahul receives email with temp Snowflake password (changes on first login)
# [x] Rahul clones the dbt repository
# [x] Rahul runs: export DBT_DEV_SCHEMA=dev_rahul_first_task
# [x] Rahul runs: dbt run --target dev --select +silver.orders (first dbt run)
# [x] Rahul queries his dev schema in Snowflake — data there immediately

# CONTRAST WITH MANUAL ONBOARDING (before IaC):
# Day 1:  Submit Jira ticket for Snowflake access to IT helpdesk
# Day 2:  Follow up on Jira ticket
# Day 3:  IT creates Snowflake user (wrong role — analyst not pipeline)
# Day 3:  Email IT to change role
# Day 4:  Submit AWS access request form to security team
# Day 4:  dbt setup fails — no Snowflake credentials documentation
# Day 5:  Everything finally working — 5 days of frustration
# Manual: 5 days, 6 Slack messages, 2 Jira tickets, 1 frustrated engineer

# WITH IaC: 30 minutes, 1 PR, zero tickets, zero Slack messages.`}</CodeBox>

          <Para>
            The IaC approach also means Rahul's offboarding is equally simple:
            a PR removing his email from the analysts list. Terraform applies,
            the Snowflake user is destroyed, the IAM policy is deleted, and all
            access is revoked in one automated step. No forgotten accounts,
            no manual cleanup, no security audit findings.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is Infrastructure as Code and why does a data engineering team need it?',
            a: `Infrastructure as Code is the practice of defining and managing cloud resources — S3 buckets, Snowflake warehouses, IAM roles, Airflow environments — in version-controlled configuration files rather than creating them manually through cloud consoles. Tools like Terraform read these files and provision or update the infrastructure to match the declared state.

A data engineering team needs IaC for the same reasons a software team needs version control — to prevent the problems that emerge when infrastructure is managed manually. The most common problems are: environment drift (dev has different bucket policies than prod, causing code that works in dev to fail in prod), invisible resources (nobody knows who created a particular S3 bucket six months ago or why it exists), lack of review (IAM roles are created with excessive permissions because there is no review step), and slow onboarding (setting up a new developer's environment takes days of manual steps and Jira tickets).

With IaC, every infrastructure change is a pull request with a plan showing exactly what will change. The plan is reviewed before the change is applied — catching a permission that is too broad or a lifecycle policy that would delete production data. Dev and prod environments use the same Terraform modules with different variable values, guaranteeing structural parity. Onboarding a new engineer is a one-line PR that provisions Snowflake access, IAM permissions, and developer S3 prefix in minutes.

Specifically for data engineering: the security configuration is critical. IAM roles must implement least privilege (analysts cannot read Bronze PII, pipelines cannot delete production tables). Bucket lifecycle policies must be configured correctly or data will be deleted too early or never. Snowflake resource monitors must exist or a runaway query will exhaust the monthly compute budget. With IaC, all of these are configured in code, reviewed in PRs, and applied consistently across environments.`,
          },
          {
            q: 'Q2. Explain Terraform state. Why is remote state important for a team?',
            a: `Terraform state is a JSON file that records the mapping between the resources defined in Terraform configuration files and the real infrastructure objects that Terraform has created. It stores the resource IDs, attributes, and dependencies for every managed resource. Terraform uses this state file to determine what currently exists, what needs to be created or updated, and what should be destroyed.

Without state, Terraform cannot know what already exists. Every terraform plan would show all resources as "to be created" because Terraform would have no record of previously applied changes. State is the memory of what Terraform has done.

Remote state — stored in S3 rather than locally — is essential for a team for three reasons. First, sharing: when an engineer runs terraform apply locally and the state file is on their laptop, no other team member can see what infrastructure exists or run Terraform without conflicts. Remote state in S3 means every team member and every CI run reads and writes the same authoritative state.

Second, locking: without locking, two engineers can run terraform apply simultaneously, both reading the same state, both making changes, and overwriting each other's state file with inconsistent results. DynamoDB locking (combined with S3 state storage) ensures only one apply can run at a time — the second engineer's apply waits until the first completes.

Third, durability: a state file on a laptop can be lost or accidentally deleted. S3 provides 11-nines durability and versioning so state history is preserved. If state is accidentally corrupted, previous versions can be recovered.

The backend configuration in Terraform specifies where state is stored: an S3 bucket, a DynamoDB table for locking, and encryption for the state file (which may contain sensitive values like database passwords). This is typically set up once per environment as the first infrastructure resource created — before any other Terraform can be applied.`,
          },
          {
            q: 'Q3. What is a Terraform module and when would you create one for a data platform?',
            a: `A Terraform module is a reusable, parameterised collection of resource definitions that can be called multiple times with different input variables. It encapsulates a set of related resources as a single logical unit with defined inputs and outputs.

For a data platform, I would create modules for infrastructure components that are provisioned multiple times — once per environment — with the same structure but different configuration. Three modules cover most data platform infrastructure needs.

A data_lake module provisions an S3 bucket with all production settings: KMS encryption, versioning, public access blocking, lifecycle policies for each zone (landing, bronze, silver, gold), access logging, and bucket notifications. The module inputs are environment, retention periods per zone, and tags. The outputs are the bucket ARN and KMS key ID for use by IAM policies. Both prod and dev use the same module — prod keeps bronze data for 365 days, dev for 30 days.

A snowflake_env module provisions a Snowflake database with schemas, roles, warehouse configurations, and FUTURE GRANTs for each access pattern. Inputs include environment, warehouse sizes, analyst email list, and data retention days. This module is called with different warehouse sizes for prod versus dev.

An airflow_mwaa module (or similar for self-hosted) provisions the Airflow environment including the VPC, security groups, S3 bucket for DAG files, IAM roles, and the MWAA environment itself. Input variables control instance class, the maximum number of workers, and the DAG S3 path.

Using modules means adding a new environment requires changing variable values, not duplicating dozens of resource blocks. When the S3 lifecycle policy needs updating, the module is updated once and all environments that use it get the update on next apply. Consistency across environments is structural, not manual.`,
          },
          {
            q: 'Q4. How do you safely handle Terraform changes to production infrastructure that might cause downtime?',
            a: `The core safety mechanism is reviewing the terraform plan before applying — and understanding what each change type means. Terraform has three change types in the plan output: create (new resource, safe), update in-place (modifies the resource without destroying it, usually safe), and replace (destroy and recreate, causes downtime for dependent resources).

Replace operations are the most dangerous. They appear in the plan as minus-then-plus operations (resource type will be replaced). A replaced S3 bucket is deleted and recreated — losing all data. A replaced Snowflake warehouse causes a brief service interruption. Before any apply that contains a replace, the engineer must understand why the replace is needed and whether there is a way to avoid it. Some resource attributes trigger replacement when changed (immutable attributes). Moving to update-in-place requires restructuring the change.

The prevent_destroy lifecycle block on critical resources adds a hard safety net. Terraform will refuse to destroy any resource with prevent_destroy = true, even if instructed to by a configuration change that would otherwise result in replacement. To actually destroy such a resource requires explicitly removing the lifecycle block in a separate PR first, which forces a deliberate review step.

For high-risk changes to production Snowflake configuration — like changing a warehouse to a larger size that might need brief suspension — I use a maintenance window: pause the affected pipelines in Airflow, apply the Terraform change during a low-activity period, verify the resources are healthy, then resume pipelines.

For S3 bucket policy changes that affect analyst access, I use feature flags in Terraform: add the new policy as an additional policy document alongside the existing one (so both the old and new access work simultaneously), deploy to prod, verify analysts can still access data, then remove the old policy in a follow-up PR.

Finally, the CI pipeline requires manual approval for production applies via GitHub Environments. An engineer cannot accidentally apply to production by merging a PR — a second deliberate step of clicking "Approve" on the GitHub Environments deployment is required.`,
          },
          {
            q: 'Q5. A Snowflake warehouse was accidentally deleted by a Terraform apply. What happened and how do you prevent it?',
            a: `A Snowflake warehouse was deleted because Terraform's state showed the warehouse as a managed resource, a configuration change triggered Terraform to determine the warehouse needed to be replaced (not just updated in place), and the apply ran without a human reviewing the plan output that showed the minus operation.

The most common cause is renaming a Terraform resource block. When a resource is renamed from snowflake_warehouse.analytics to snowflake_warehouse.analyst, Terraform does not know this is the same resource — it sees the old name to be destroyed and the new name to be created. This produces a replace operation in the plan that deletes the existing warehouse.

Three measures prevent this. First, the prevent_destroy lifecycle block: adding lifecycle { prevent_destroy = true } to all production Snowflake warehouses, databases, and schemas means terraform apply will fail with an error if it tries to destroy any of them. The engineer must deliberately remove the lifecycle block, open a PR to review that specific intent to destroy, and only then is the destroy possible.

Second, plan review in CI: the CI pipeline on every PR runs terraform plan and posts the full plan output as a PR comment. Any minus operation on a production resource must be explicitly reviewed and approved by a second engineer before the PR can merge. This review step catches accidental destroys before they reach production.

Third, the moved block (Terraform 1.1+): when renaming a resource block, use a moved block to tell Terraform that the old resource and the new resource are the same: moved { from = snowflake_warehouse.analytics; to = snowflake_warehouse.analyst }. This instructs Terraform to update the state record (rename it) rather than destroy and recreate.

For the immediate recovery after an accidental delete: a Snowflake warehouse holds no data — it is a compute resource. Recreate it with terraform apply and pipelines resume using the restored warehouse. The much more dangerous case is an accidentally deleted database or schema — recover from Snowflake's time travel (if within the retention window) or from a backup.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `terraform apply fails with "Error: state lock is already held by another process" — no other apply is running`,
            cause: 'A previous terraform apply was interrupted (process killed, network loss, laptop closed) without properly releasing the DynamoDB state lock. The lock entry remains in DynamoDB pointing to a stale apply that no longer exists. Terraform cannot acquire the lock because it sees the existing entry, even though no process actually holds it.',
            fix: 'Verify that no apply is genuinely running (check CI, check teammates). Then force-unlock: terraform force-unlock <LOCK_ID>. The lock ID is shown in the error message. Run terraform plan after unlocking to confirm the state is consistent — the interrupted apply may have partially applied changes. If the plan shows the expected state, you are safe to continue. Add a CI step that runs terraform force-unlock on stale locks that are older than 2 hours (with human approval), since CI job cancellations are a common source of stale locks.',
          },
          {
            error: `terraform plan shows "-/+ resource 'snowflake_warehouse.analytics' must be replaced" — the warehouse will be destroyed and recreated`,
            cause: 'The snowflake_warehouse resource block was renamed in the Terraform configuration from analytics to analyst_wh. Terraform does not automatically understand that these refer to the same warehouse — it sees the old resource block gone (destroy it) and a new resource block added (create it). Alternatively, a field was changed that is marked as ForceNew in the Snowflake provider, meaning it cannot be updated in place and requires replacement.',
            fix: 'For a rename: use a moved block to tell Terraform the resources are the same: moved { from = snowflake_warehouse.analytics; to = snowflake_warehouse.analyst_wh }. This updates the state without destroying anything. For a ForceNew field change: check if the change is truly necessary. If so, schedule it during a maintenance window, ensure no pipelines are actively using the warehouse, and apply with awareness of the brief interruption. Add lifecycle { prevent_destroy = true } to all production warehouses so that future accidental replacement attempts fail safely before applying.',
          },
          {
            error: `S3 bucket lifecycle policy deletes production Gold data after 30 days — the lifecycle rule was configured for landing/ but accidentally applied to all prefixes`,
            cause: 'The lifecycle rule was defined without a filter block specifying the prefix. An S3 lifecycle rule without a filter applies to ALL objects in the bucket. The rule was intended only for the landing/ prefix (30-day deletion) but was applied to every key in the bucket, including gold/ Silver/ and bronze/ objects.',
            fix: 'Immediately update the lifecycle configuration to add a filter: filter { prefix = "landing/" }. Run terraform apply to correct the lifecycle rules. Check which Gold and Silver objects have already been deleted using S3 versioning (if enabled) or S3 Glacier (if objects were transitioned). Restore deleted objects from versioned previous versions: aws s3api list-object-versions and restore as needed. Going forward: in Terraform code review, explicitly check that every lifecycle rule has a filter block. Add a Terraform lint rule (using tflint or OPA) that fails CI if any lifecycle rule targets the bucket root without a prefix filter.',
          },
          {
            error: `terraform import is needed because a production S3 bucket was created manually and is now out of sync with the Terraform configuration`,
            cause: 'A developer created an S3 bucket manually in the AWS console months ago for a quick experiment. The bucket grew into a production resource. Now the team wants to manage it with Terraform but cannot simply add a resource block — Terraform would try to create a new bucket with the same name, which fails because the bucket already exists.',
            fix: 'Use terraform import to bring the existing resource under Terraform management: terraform import aws_s3_bucket.data_lake_manual freshmart-manual-bucket. This adds the existing bucket to Terraform state without creating a new resource. After import: run terraform plan to see what configuration drift exists between the Terraform code and the actual bucket settings. Update the Terraform code to match the current state, re-run terraform plan to confirm zero changes, then commit. Going forward: enforce IaC discipline — all new production resources must be created via Terraform PR, not console. Use AWS Config rules to detect resources created outside Terraform and alert the team.',
          },
          {
            error: `Sensitive Snowflake credentials appear in the terraform plan output in CI logs — password is visible in GitHub Actions logs`,
            cause: 'The Snowflake password variable was defined as type = string without the sensitive = true flag. When terraform plan runs and shows changes to Snowflake resources, the provider includes the connection attributes in the plan output — including the password. GitHub Actions stores workflow logs and the password is now in the log history.',
            fix: 'Immediately rotate the Snowflake password (assume it is compromised). Add sensitive = true to all credential variables in variables.tf: variable "snowflake_password" { type = string; sensitive = true }. Sensitive variables are redacted as (sensitive value) in plan output. Also mark Terraform outputs that include credentials as sensitive: output "db_password" { value = var.snowflake_password; sensitive = true }. For CI: use GitHub Actions secret masking — store credentials as GitHub Secrets and reference via \${{ secrets.SNOWFLAKE_PASSWORD }}. GitHub automatically masks values of secrets in logs. Use environment variables for credential passing, not variable files checked into the repository.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)', marginBottom: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.5 }}>{item.error}</div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'Infrastructure as Code treats cloud resources — S3 buckets, Snowflake warehouses, IAM roles — like software: defined in version-controlled files, reviewed in PRs, deployed through CI/CD. The benefits: reproducibility, auditability, drift prevention, cost visibility, security by default, and environment parity between dev and prod.',
        'Terraform core workflow: init (download providers, initialise backend) → plan (show what will change, no changes made) → apply (make the changes). Always read the plan before apply. The three change types: + (create), ~ (update in-place), - (destroy). Any destroy operation requires deliberate review.',
        'Terraform state maps resource blocks to real cloud resource IDs. Remote state (S3 + DynamoDB) is mandatory for teams: S3 provides durability and sharing, DynamoDB prevents concurrent applies from corrupting state. Never edit state manually. If state is lost: expensive to recover via terraform import.',
        'Variables make Terraform reusable across environments. Use sensitive = true on credential variables — they are redacted in plan output. Use validation blocks to enforce valid values. Use locals for computed values used throughout the configuration. Use .tfvars files per environment (prod.tfvars, dev.tfvars) to separate configuration from code.',
        'Terraform modules encapsulate related resources as reusable components. A data_lake module wraps the S3 bucket, encryption, versioning, lifecycle policies, and access logging. A snowflake_env module wraps databases, schemas, roles, warehouses, and grants. Both prod and dev call the same module with different variable values — guaranteeing structural consistency.',
        'S3 lifecycle policies must always specify a filter prefix. A lifecycle rule without a filter applies to ALL objects in the bucket. A 30-day deletion rule intended for landing/ applied without a prefix filter will delete all Silver and Gold data. Review every lifecycle rule in CI for a mandatory filter block.',
        'The prevent_destroy lifecycle block prevents Terraform from destroying a critical resource. Terraform refuses to apply any plan that would destroy a resource with this flag. To remove a resource intentionally: remove the lifecycle block in a separate PR, review that intent explicitly, then delete. Apply this to all production databases, schemas, and S3 buckets.',
        'IAM roles for data platforms follow least privilege: ingestion pipeline (write landing/bronze only), transformation pipeline (read bronze, write silver/gold), analyst (read silver/gold only, no bronze PII), BI service account (read gold only). Define every FUTURE GRANT in Terraform so new tables automatically inherit the correct permissions without manual grants.',
        'Snowflake resource monitors set credit quotas per warehouse per month. Notify at 75% and 90%, suspend at 100%. Without a resource monitor, a runaway analyst query or a misconfigured pipeline can exhaust the entire monthly Snowflake compute budget in one day. Define resource monitors in Terraform so they are always present in all environments.',
        'Onboarding a new engineer with IaC: add their email to the analysts variable list, open a PR, CI runs terraform plan showing the user creation, merge after review, Terraform provisions the Snowflake user with correct roles, IAM policies, and dev S3 access in minutes. Offboarding is the reverse: remove the email, PR, merge, access revoked automatically. Zero tickets, zero forgotten accounts.',
      ]} />

    </LearnLayout>
  )
}