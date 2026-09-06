// app/learn/data-engineering/security-compliance/page.tsx

import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security and Compliance for Data Engineers | Chaduvuko',
  description:
    'GDPR and the CCPA — what they mean for your pipelines and how to build systems that are compliant by design.',
}

/* ─── Local components ───────────────────────────────────────────────────── */

function CodeBlock({ code, lang = 'python' }: { code: string; lang?: string }) {
  return (
    <pre style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 10,
      padding: '20px 24px',
      overflowX: 'auto',
      fontSize: 13.5,
      lineHeight: 1.75,
      fontFamily: 'var(--font-mono)',
      color: 'var(--text)',
      margin: '20px 0',
    }}>
      <code>{code}</code>
    </pre>
  )
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--muted)',
      fontFamily: 'var(--font-mono)',
      marginBottom: 10,
    }}>
      {children}
    </div>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: 'clamp(20px, 2.5vw, 28px)',
      fontWeight: 900,
      letterSpacing: '-1px',
      fontFamily: 'Syne, sans-serif',
      color: 'var(--text)',
      margin: '52px 0 16px',
    }}>
      {children}
    </h2>
  )
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontSize: 17,
      fontWeight: 700,
      color: 'var(--text)',
      margin: '32px 0 10px',
      letterSpacing: '-0.3px',
    }}>
      {children}
    </h3>
  )
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 15,
      color: 'var(--muted)',
      lineHeight: 1.85,
      margin: '0 0 18px',
    }}>
      {children}
    </p>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: 'auto', margin: '20px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} style={{
                textAlign: 'left',
                padding: '10px 14px',
                borderBottom: '1px solid var(--border)',
                color: 'var(--text)',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: '10px 14px',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--muted)',
                  lineHeight: 1.6,
                  verticalAlign: 'top',
                }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Card({ title, children, accent }: { title: string; children: React.ReactNode; accent?: string }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${accent ? accent + '33' : 'var(--border)'}`,
      borderLeft: `3px solid ${accent ?? 'var(--accent)'}`,
      borderRadius: 10,
      padding: '20px 24px',
      margin: '18px 0',
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: accent ?? 'var(--accent)', marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  )
}

function ErrorBlock({ error, cause, fix }: { error: string; cause: string; fix: string }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid rgba(255,71,87,0.25)',
      borderLeft: '3px solid #ff4757',
      borderRadius: 10,
      padding: '18px 22px',
      margin: '18px 0',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: '#ff4757',
        marginBottom: 10,
        wordBreak: 'break-word',
      }}>
        {error}
      </div>
      <div style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 6 }}>
        <strong style={{ color: 'var(--text)' }}>Why it happens:</strong> {cause}
      </div>
      <div style={{ fontSize: 13.5, color: 'var(--muted)' }}>
        <strong style={{ color: 'var(--green)' }}>Fix:</strong> {fix}
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function SecurityCompliancePage() {
  return (
    <LearnLayout
      title="Security and Compliance for Data Engineers"
      description="GDPR and the CCPA — what they mean for your pipelines and how to build systems that are compliant by design."
      section="Data Engineering — Module 39"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Last Verified ──────────────────────────────────────────────── */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        background: 'rgba(0,230,118,0.07)',
        border: '1px solid rgba(0,230,118,0.18)',
        borderRadius: 8,
        padding: '6px 12px',
        fontSize: 12,
        color: 'var(--green)',
        fontFamily: 'var(--font-mono)',
        marginBottom: 36,
      }}>
        <span style={{ fontSize: 9, opacity: 0.9 }}>✦</span>
        Last verified August 2026 — GDPR (2018), CCPA/CPRA (2023)
      </div>

      {/* ── Why This Matters ───────────────────────────────────────────── */}
      <Para>
        Most data engineering tutorials teach you how to build pipelines that work.
        Almost none teach you how to build pipelines that are <em>legal</em>. That gap
        will cost you at some point — either in production when your company faces a GDPR
        audit, or in an interview when a hiring manager at Stripe or Venmo asks how
        you handle PII in your Kafka topics.
      </Para>
      <Para>
        This module covers what you actually need to know as a data engineer: encryption,
        PII handling, access control, GDPR, and the CCPA (California Consumer Privacy
        Act). Not legal theory — practical decisions your pipelines must make.
      </Para>

      <Callout type="tip">
        You don't need a law degree. You need to understand the rules well enough to ask
        the right questions and build systems that don't create problems for your company.
        Legal advice comes from lawyers. Pipeline design comes from you.
      </Callout>

      {/* ── 1. The threat model ────────────────────────────────────────── */}
      <H2>1. What You Are Actually Protecting Against</H2>

      <Para>
        Security is not abstract. As a data engineer you have three concrete threats to
        think about:
      </Para>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, margin: '20px 0 30px' }}>
        {[
          {
            icon: '👤',
            title: 'Insider access',
            body: 'A junior analyst can SELECT * from the customer table and export 2 million email addresses to a CSV. Most breaches come from inside, not outside.',
          },
          {
            icon: '🌐',
            title: 'External breach',
            body: 'An attacker who gets into your Kafka broker or S3 bucket reads every event your system has ever produced. Data at rest must be encrypted.',
          },
          {
            icon: '📋',
            title: 'Regulatory audit',
            body: 'A regulator asks you to prove that user X\'s data was deleted within 30 days of their deletion request. Can you? Can you prove it?',
          },
        ].map((item) => (
          <div key={item.title} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '18px 20px',
          }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{item.title}</div>
            <div style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.7 }}>{item.body}</div>
          </div>
        ))}
      </div>

      {/* ── 2. Encryption ──────────────────────────────────────────────── */}
      <H2>2. Encryption — At Rest and In Transit</H2>

      <Para>
        Encryption is the first line of defence. There are two distinct problems: data
        being intercepted while it moves (in transit), and data being read from disk if
        storage is compromised (at rest). They require different solutions.
      </Para>

      <H3>Encryption in transit</H3>
      <Para>
        Any time data moves across a network — from your pipeline to a database, from Kafka
        producer to broker, from your API client to S3 — it must be encrypted using TLS
        (Transport Layer Security). Without TLS, anyone on the network path can read your
        data in plain text.
      </Para>

      <Table
        headers={['Component', 'How to enforce TLS']}
        rows={[
          ['PostgreSQL / any DB', 'Set sslmode=require in the connection string. Never use disable.'],
          ['Kafka', 'Configure listeners with SSL protocol. Set security.protocol=SSL on producers and consumers.'],
          ['HTTP APIs', 'Always use https://. Reject http:// connections at load balancer level.'],
          ['Azure Blob / ADLS', 'Enforce HTTPS-only traffic on storage account. Enabled by default — do not disable it.'],
          ['S3 (AWS)', 'Bucket policy with aws:SecureTransport = false → Deny. This blocks HTTP access.'],
          ['Cloud SQL / RDS', 'Enable require_ssl in DB flags. Provide CA certificate to application.'],
        ]}
      />

      <Callout type="warning">
        TLS only protects data while it is moving. Once data lands in your database or
        object storage, transit encryption does nothing. You need separate encryption at
        rest for that.
      </Callout>

      <H3>Encryption at rest</H3>
      <Para>
        Encryption at rest means data stored on disk is encrypted. If someone steals the
        physical disk or gets unauthorized access to raw storage, they see ciphertext, not
        your customer records.
      </Para>
      <Para>
        On all major cloud platforms, encryption at rest is enabled by default for object
        storage (S3, Azure Blob, GCS) and managed databases. Your job is to make sure you
        are using the right key type and haven't accidentally disabled it.
      </Para>

      <Table
        headers={['Key type', 'What it means', 'When to use it']}
        rows={[
          ['SSE-S3 / SSM managed', 'Cloud provider manages the keys. Easy, free, zero ops.', 'Default for most data. Use unless compliance requires customer-managed keys.'],
          ['Customer-Managed Keys (CMK)', 'You create and control keys in KMS / Azure Key Vault. You can rotate and revoke.', 'PII, financial data, healthcare. Required by PCI-DSS and many enterprise customers.'],
          ['Client-side encryption', 'You encrypt before sending to the cloud. Cloud never sees plaintext.', 'Highest sensitivity. Significant operational overhead. Rare in practice.'],
        ]}
      />

      <H3>Column-level encryption for sensitive fields</H3>
      <Para>
        Full-disk encryption protects you if storage is stolen. It does not protect you
        from a legitimate database user running <code>SELECT email, phone FROM users</code>.
        For fields like SSN numbers, phone numbers, and payment card data, you need
        column-level encryption — the field is stored as ciphertext in the database, and
        only systems with the decryption key can read the real value.
      </Para>

      <CodeBlock lang="python" code={`# Column-level encryption with Python (Fernet symmetric encryption)
# Use this pattern when storing sensitive fields in your data warehouse

from cryptography.fernet import Fernet
import os

# Key should come from your secrets manager (AWS Secrets Manager, Azure Key Vault)
# NEVER hardcode keys in source code
ENCRYPTION_KEY = os.environ['COLUMN_ENCRYPTION_KEY']
fernet = Fernet(ENCRYPTION_KEY.encode())

def encrypt_field(value: str) -> str:
    """Encrypt a sensitive field before writing to the database."""
    if value is None:
        return None
    return fernet.encrypt(value.encode()).decode()

def decrypt_field(encrypted_value: str) -> str:
    """Decrypt a field when it needs to be read."""
    if encrypted_value is None:
        return None
    return fernet.decrypt(encrypted_value.encode()).decode()`} />

      <CodeBlock lang="python" code={`# In your pipeline:
row = {
    'user_id': 'U1234',
    'name': 'Jordan Lee',             # Not sensitive — store as is
    'email': encrypt_field('jordan@example.com'),   # Sensitive — encrypt
    'phone': encrypt_field('+1 512-555-0142'),       # Sensitive — encrypt
    'ssn_last4': encrypt_field('5678'),             # Sensitive — encrypt
    'city': 'Austin',             # Not sensitive — store as is
}

# Key rotation: generate new key, decrypt with old, re-encrypt with new
# This is an operational concern — document your key rotation schedule`} />

      <Callout type="info">
        In a lakehouse (Delta Lake, Iceberg), column-level encryption is often handled by
        the query engine (Databricks Unity Catalog, Apache Ranger) rather than application
        code. Understand the tool your company uses. The concept is the same.
      </Callout>

      {/* ── 3. PII handling ────────────────────────────────────────────── */}
      <H2>3. PII — Identifying and Handling Personal Data</H2>

      <Para>
        PII stands for Personally Identifiable Information — any data that can directly
        identify a person or, in combination with other data, identify a person. As a data
        engineer, your job is to know what PII your pipelines touch, where it goes, and
        how it is protected at every step.
      </Para>

      <H3>What counts as PII</H3>

      <Table
        headers={['Type', 'Examples', 'Risk level']}
        rows={[
          ['Direct identifiers', 'Full name, SSN number, driver\'s license number, passport, phone, email', 'High — identifies person directly'],
          ['Quasi-identifiers', 'Zip Code + birthdate + gender (can re-identify when combined)', 'Medium — risky in combination'],
          ['Sensitive personal data (CCPA / GDPR)', 'Health data, financial data, biometrics, precise geolocation, race, religion, sexual orientation', 'Very high — stricter rules apply'],
          ['Derived data', 'Credit score, location history, behaviour profile built from raw data', 'High — still personal data even if derived'],
          ['Pseudonymous data', 'user_id replacing email (mapping table exists separately)', 'Medium — still PII if re-identification is possible'],
          ['Anonymous data', 'Aggregated stats with no re-identification path', 'Not PII — regulations do not apply'],
        ]}
      />

      <H3>The four things you must do with PII in pipelines</H3>

      <Card title="1 — Minimise" accent="#7b61ff">
        <Para>
          Only collect and store PII that you actually need. If your analytics pipeline
          only needs city-level location data, don't ingest lat/lon coordinates. If you
          need to count active users, use a hashed user_id, not the email address.
        </Para>
      </Card>

      <Card title="2 — Classify and tag" accent="#0078d4">
        <Para>
          Every table and column containing PII should be tagged in your data catalogue.
          This is how you answer "where is our PII stored?" in 30 seconds instead of
          30 days when an audit arrives.
        </Para>
        <CodeBlock lang="sql" code={`-- Example: tagging in dbt schema.yml
models:
  - name: orders
    columns:
      - name: customer_email
        meta:
          pii: true
          pii_type: direct_identifier
          gdpr_relevant: true
          ccpa_relevant: true
      - name: customer_phone
        meta:
          pii: true
          pii_type: direct_identifier`} />
      </Card>

      <Card title="3 — Mask or pseudonymise in non-production" accent="#ff9900">
        <Para>
          Production data must never be used in development or testing environments without
          masking. Developers don't need real email addresses to debug a pipeline — they
          need data in the right format with the right shape.
        </Para>
        <CodeBlock lang="python" code={`# Data masking for dev/test environments
import hashlib
import re

def mask_email(email: str) -> str:
    """Replace real email with consistent but fake email."""
    if not email:
        return email
    hashed = hashlib.sha256(email.encode()).hexdigest()[:8]
    return f"user_{hashed}@masked.dev"

def mask_phone(phone: str) -> str:
    """Keep format, replace digits with X except last 4."""
    digits = re.sub(r'\D', '', phone)
    return 'XXXXXX' + digits[-4:] if len(digits) >= 4 else 'XXXXXXXXXX'

def mask_ssn(ssn: str) -> str:
    """Standard SSN masking — show only last 4."""
    digits = re.sub(r'\D', '', ssn)
    return 'XXX-XX-' + digits[-4:] if len(digits) >= 4 else 'XXX-XX-XXXX'

# Apply during the staging → dev copy process, not in production pipelines`} />
      </Card>

      <Card title="4 — Control access" accent="#00e676">
        <Para>
          Analysts should not have raw access to the PII columns in your production tables.
          Use column masking policies (Databricks, Snowflake, BigQuery support this natively)
          so analysts see the masked value by default, and only privileged roles see the
          real value.
        </Para>
        <CodeBlock lang="sql" code={`-- Snowflake: column masking policy
CREATE OR REPLACE MASKING POLICY email_mask AS (val STRING)
RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('DATA_ENGINEER', 'PRIVACY_ADMIN') THEN val
    ELSE CONCAT(LEFT(val, 2), '****@****.com')
  END;

-- Apply to the column
ALTER TABLE customers
  MODIFY COLUMN email
  SET MASKING POLICY email_mask;

-- Analyst sees: jo****@****.com
-- Engineer sees: jordan@freshcart.com`} />
      </Card>

      {/* ── 4. Access control ──────────────────────────────────────────── */}
      <H2>4. Access Control — RBAC and Least Privilege</H2>

      <Para>
        Access control is the answer to the insider threat. The principle is simple:
        every user and every system gets the minimum permissions they need to do their
        job — nothing more. This is called <strong>least privilege</strong>.
      </Para>

      <H3>Role-Based Access Control (RBAC)</H3>
      <Para>
        Instead of granting permissions to individual users, you define roles (Data
        Engineer, Analyst, Pipeline Service Account, Admin) and assign permissions to
        roles. Users are assigned to roles. When someone changes jobs, you change their
        role — not 47 individual permissions.
      </Para>

      <Table
        headers={['Role', 'Typical permissions']}
        rows={[
          ['Data Engineer', 'Read/write to raw, silver, gold layers. Create and modify pipelines. No access to prod secrets.'],
          ['Analyst', 'Read-only on gold/reporting layer. Masked PII columns. No access to raw or silver.'],
          ['Pipeline Service Account', 'Read source systems. Write to specific target tables only. No login access to database.'],
          ['Privacy Admin', 'Read unmasked PII. Execute deletion jobs. Access to audit logs.'],
          ['Admin', 'Full access. Requires approval workflow. Every action logged.'],
        ]}
      />

      <H3>Attribute-Based Access Control (ABAC)</H3>
      <Para>
        RBAC works well when roles are stable. ABAC is more fine-grained — access is
        granted based on attributes of the user, the data, and the context. For example:
        "an analyst can read customer data only if the customer's region matches the
        analyst's assigned region." BigQuery, Databricks Unity Catalog, and Apache Ranger
        all support ABAC-style row-level and column-level security.
      </Para>

      <CodeBlock lang="sql" code={`-- Row-level security in PostgreSQL
-- Each analyst can only see rows for their assigned region

CREATE POLICY region_isolation ON customers
  USING (region = current_setting('app.user_region'));

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- In your application / pipeline connection:
-- SET app.user_region = 'northeast';
-- Now queries on customers only return northeast rows`} />

      {/* ── 5. GDPR ────────────────────────────────────────────────────── */}
      <H2>5. GDPR — What Data Engineers Need to Know</H2>

      <Para>
        GDPR (General Data Protection Regulation) is a European Union law that came into
        force in 2018. It applies to any company that processes personal data of EU
        residents — including US companies that have EU customers. Fines go up to 4%
        of global annual revenue. Meta was fined €1.2 billion in 2023.
      </Para>
      <Para>
        You don't need to read all 99 articles. As a data engineer, these are the 5 GDPR
        requirements that directly affect how you build pipelines.
      </Para>

      <div style={{ display: 'grid', gap: 14, margin: '20px 0' }}>
        {[
          {
            article: 'Right to Erasure (Art. 17)',
            what: 'A user can request deletion of all their personal data.',
            de_action: 'Your pipeline must be able to find and delete (or crypto-erase) all records for a given user across every table, every layer (raw, silver, gold), and every backup within 30 days.',
          },
          {
            article: 'Right to Access (Art. 15)',
            what: 'A user can request a copy of all data you hold about them.',
            de_action: 'You must be able to extract all records for user_id = X from your data warehouse and deliver them in a readable format. Your data catalogue must tell you every table that contains user data.',
          },
          {
            article: 'Data Minimisation (Art. 5)',
            what: 'Only collect data that is necessary for the stated purpose.',
            de_action: 'Before ingesting a new field, confirm it has a documented business purpose. Remove unused columns from your pipelines. Don\'t land "everything" in the raw layer and decide later.',
          },
          {
            article: 'Purpose Limitation (Art. 5)',
            what: 'Data collected for one purpose cannot be used for a different purpose without new consent.',
            de_action: 'If customers gave consent for order notifications, you cannot use their data to train an ML model without separate consent. Tag data with the consent purpose in your catalogue.',
          },
          {
            article: 'Data Breach Notification (Art. 33)',
            what: 'If a data breach occurs, the regulator must be notified within 72 hours.',
            de_action: 'Maintain audit logs. Know exactly what data was accessed, when, and by whom. Without logs, you cannot scope a breach.',
          },
        ].map((item) => (
          <div key={item.article} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '18px 22px',
          }}>
            <div style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#4285f4',
              fontFamily: 'var(--font-mono)',
              marginBottom: 6,
            }}>
              {item.article}
            </div>
            <div style={{ fontSize: 14, color: 'var(--text)', marginBottom: 6 }}>{item.what}</div>
            <div style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--muted)' }}>Your pipeline responsibility:</strong> {item.de_action}
            </div>
          </div>
        ))}
      </div>

      <H3>Crypto-erasure — the practical way to handle deletion in data lakes</H3>
      <Para>
        Deleting a record from a data warehouse is easy. Deleting it from an immutable
        data lake (S3/ADLS with versioning) is hard. The practical solution is
        crypto-erasure: encrypt the user's PII with a user-specific key stored in a key
        management service. To "delete" the user, delete their encryption key. All their
        encrypted data becomes permanently unreadable without modifying any files.
      </Para>

      <CodeBlock lang="python" code={`# Crypto-erasure pattern
# Each user's PII is encrypted with a unique per-user key
# Deletion = deleting the key from KMS

import boto3
kms = boto3.client('kms', region_name='us-east-1')

def get_or_create_user_key(user_id: str) -> str:
    """Return KMS key ARN for this user, creating if needed."""
    # In practice, store key ARN in a mapping table
    response = kms.create_key(
        Description=f'PII encryption key for user {user_id}',
        Tags=[{'TagKey': 'user_id', 'TagValue': user_id}]
    )
    return response['KeyMetadata']['KeyId']

def erase_user(user_id: str, key_id: str):
    """
    GDPR right to erasure via crypto-erasure.
    Schedules key deletion — AWS KMS minimum waiting period is 7 days.
    After deletion, all PII encrypted with this key is permanently unreadable.
    """
    kms.schedule_key_deletion(
        KeyId=key_id,
        PendingWindowInDays=7  # Minimum allowed by AWS KMS
    )
    print(f"Key for user {user_id} scheduled for deletion. PII will be unreadable in 7 days.")
    # Log this action to your audit trail
    log_audit_event('ERASURE_REQUESTED', user_id=user_id, key_id=key_id)`} />

      {/* ── 6. CCPA ──────────────────────────────────────────────── */}
      <H2>6. California Consumer Privacy Act (CCPA/CPRA)</H2>

      <Para>
        The California Consumer Privacy Act took effect January 1, 2020, and was
        substantially expanded by the California Privacy Rights Act (CPRA), effective
        January 1, 2023, with enforcement beginning July 1, 2023. It is the most
        comprehensive US state privacy law and the de facto standard most companies build
        to, since a growing list of other states — Virginia, Colorado, Connecticut, Utah,
        and more — have passed similar laws largely modeled on it.
      </Para>

      <Callout type="info">
        CCPA applies to any for-profit business that does business in California and meets
        at least one threshold: more than $25 million in annual gross revenue, buys/sells/
        shares personal information of 100,000+ California consumers or households
        annually, or derives 50%+ of annual revenue from selling or sharing personal
        information. If your company has California users and meets these thresholds,
        this law applies to you.
      </Callout>

      <H3>Key concepts in CCPA for data engineers</H3>

      <Table
        headers={['CCPA Term', 'Plain meaning', 'Your pipeline implication']}
        rows={[
          ['Consumer', 'The California resident whose data is being processed (your user)', 'You must be able to identify all data for a given user_id across your systems'],
          ['Business', 'The company that decides what data to collect and how to use it (your employer)', 'Your company must maintain a privacy policy and a process for honouring consumer rights requests'],
          ['Right to opt-out of sale/share', 'Consumers can opt out of having their data sold or shared for cross-context advertising', 'Pipelines must respect opt-out signals (e.g. Global Privacy Control) and stop sharing that user\'s data downstream'],
          ['Purpose limitation', 'Data used only for the disclosed purpose at collection', 'Same as GDPR — documented business purpose required per field'],
          ['Right to delete', 'Consumer can request deletion. Business must delete, with some exceptions.', 'Same deletion capability as GDPR — locate and delete/anonymise across every table and layer'],
          ['Sensitive personal information', 'SSN, precise geolocation, health data, biometric data, and more get stricter handling rules', 'Extra access controls, plus a consumer right to limit use of this category'],
          ['Right to correct', 'Consumer can request correction of inaccurate personal information', 'Pipeline must support upserts/corrections that propagate to all downstream tables, not just appends'],
        ]}
      />

      <H3>GDPR vs CCPA — similarities and differences</H3>

      <Table
        headers={['Area', 'GDPR', 'CCPA/CPRA']}
        rows={[
          ['Scope', 'EU residents\' data', 'California residents\' data (for qualifying businesses)'],
          ['Legal basis', 'Consent, legitimate interest, contract, legal obligation, vital interest, public task', 'Notice-and-opt-out model — collection generally does not require consent, but sale/sharing requires an opt-out'],
          ['Right to erasure', 'Yes — 30 days', 'Yes — 45 days (extendable to 90)'],
          ['Right to access', 'Yes — detailed Subject Access Request', 'Yes — right to know what categories and specific pieces of data are collected'],
          ['Data breach notification', '72 hours to regulator', 'No fixed statutory deadline under CCPA itself; state breach-notification statutes apply separately'],
          ['Fines', 'Up to €20M or 4% global revenue', 'Up to $2,500 per violation, $7,500 per intentional violation (enforced by the CPPA)'],
          ['DPO requirement', 'Required for certain organisations', 'No formal DPO requirement, but CPRA requires a cybersecurity audit and risk assessment for high-risk processing'],
          ['Cross-border transfer', 'Adequacy decisions or standard clauses', 'No CCPA-specific cross-border transfer restrictions'],
        ]}
      />

      <Callout type="tip">
        The practical pipeline architecture that satisfies GDPR also satisfies CCPA/CPRA
        for most requirements. Build for GDPR-level rigour and you will be compliant with
        both — plus most of the other US state privacy laws, which are largely modeled on
        CCPA. The differences are mainly in legal terminology and specific thresholds.
      </Callout>

      {/* ── 7. Compliance by design ────────────────────────────────────── */}
      <H2>7. Compliance by Design — A Practical Checklist</H2>

      <Para>
        Compliance bolted on after a pipeline is live is expensive and incomplete.
        Compliance built into the pipeline from the start is cheap and reliable. Here is
        the checklist you run when designing any pipeline that touches personal data.
      </Para>

      <div style={{ display: 'grid', gap: 12, margin: '20px 0' }}>
        {[
          {
            phase: 'Before you build',
            checks: [
              'What personal data does this pipeline touch? List every field.',
              'What is the documented business purpose for each field?',
              'Do we have valid consent (or a legitimate interest) for each use?',
              'Is there a simpler version of this data that achieves the same goal (minimisation)?',
              'Where will data be stored? Which region? Who has access?',
              'What is the retention period? How will it be enforced?',
            ],
          },
          {
            phase: 'When you build',
            checks: [
              'TLS enforced on all connections — no plaintext data in transit.',
              'Encryption at rest enabled — using CMK if data is sensitive.',
              'PII columns tagged in the data catalogue.',
              'PII masked or pseudonymised in dev/test environments.',
              'Column masking policies applied in the warehouse — analysts see masked data by default.',
              'Access is role-based — no direct grants to individual users.',
              'Audit logging enabled — who read what, when.',
              'Deletion logic exists and is tested — can delete all records for user_id = X.',
            ],
          },
          {
            phase: 'When you go live',
            checks: [
              'Retention job scheduled — old data deleted automatically after retention period.',
              'Breach response runbook exists — know who to call and what to do.',
              'Data location documented — regulator can ask "where is this data stored?"',
              '"Right to access" query documented — can export all data for one user on request.',
            ],
          },
        ].map((group) => (
          <div key={group.phase} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '20px 24px',
          }}>
            <div style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--green)',
              fontFamily: 'var(--font-mono)',
              marginBottom: 14,
            }}>
              {group.phase}
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {group.checks.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--green)', marginTop: 2, flexShrink: 0, fontSize: 13 }}>□</span>
                  <span style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6 }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── 8. Audit logging ───────────────────────────────────────────── */}
      <H2>8. Audit Logging</H2>

      <Para>
        Audit logs answer "who did what, to which data, and when." They are your proof of
        compliance, your first tool in a breach investigation, and your defence in a
        regulatory audit. They are also one of the most commonly skipped pieces of data
        infrastructure.
      </Para>

      <CodeBlock lang="python" code={`# Minimal audit log event — write this to an immutable audit log table
# or a WORM (Write Once Read Many) log bucket

from datetime import datetime, timezone
import json

def log_audit_event(
    action: str,            # READ_PII, DELETE_RECORD, EXPORT_DATA, SCHEMA_CHANGE
    actor: str,             # user_id or service_account_name of who did it
    resource: str,          # table name, pipeline name, file path
    record_id: str = None,  # user_id or record_id affected (if applicable)
    metadata: dict = None,  # any additional context
):
    event = {
        'timestamp': datetime.now(timezone.utc).isoformat(),
        'action': action,
        'actor': actor,
        'resource': resource,
        'record_id': record_id,
        'metadata': metadata or {},
    }
    # Write to immutable audit log — append only, no updates, no deletes
    # Options: Cloud Storage with object lock, dedicated audit table, CloudTrail, Azure Monitor
    print(json.dumps(event))  # Replace with your log sink

# Examples
log_audit_event('READ_PII', 'analyst_jordan', 'customers', metadata={'purpose': 'support_ticket_123'})
log_audit_event('DELETE_RECORD', 'privacy_admin', 'customers', record_id='U98765', metadata={'reason': 'GDPR_erasure_request'})
log_audit_event('EXPORT_DATA', 'data_engineer', 'orders', record_id='U12345', metadata={'reason': 'CCPA_access_request'})`} />

      <Callout type="warning">
        Audit logs must be stored in a separate, append-only location that pipeline
        engineers cannot modify. If the person who could delete records can also delete
        the audit trail, your audit log is worthless.
      </Callout>

      {/* ── 9. Secrets management ──────────────────────────────────────── */}
      <H2>9. Secrets Management — Never Hardcode Credentials</H2>

      <Para>
        This is one of the most common mistakes made by junior data engineers: database
        passwords, API keys, and storage account keys hardcoded in Python scripts or
        committed to Git. A secret in your Git history is a secret that was leaked — even
        if you delete the commit later, it may already be in a fork or a scan.
      </Para>

      <Table
        headers={['What not to do', 'What to do instead']}
        rows={[
          ['password = "Freshm@rt123!"', 'password = os.environ["DB_PASSWORD"]'],
          ['connection_string = "Server=...;Password=abc;"', 'Fetch from Azure Key Vault / AWS Secrets Manager at runtime'],
          ['API key hardcoded in Airflow DAG file', 'Airflow Variables or Connections (encrypted in Airflow metadata DB)'],
          ['Storage account key in ADF linked service definition', 'Use Managed Identity — no key at all. ADF authenticates via Azure AD.'],
          ['Credentials in Docker environment file committed to Git', '.env in .gitignore — inject via CI/CD secrets or Kubernetes secrets'],
        ]}
      />

      <CodeBlock lang="python" code={`# Fetching secrets from AWS Secrets Manager at runtime
import boto3
import json

def get_secret(secret_name: str, region: str = 'us-east-1') -> dict:
    """Fetch a secret by name. Returns dict of key-value pairs."""
    client = boto3.client('secretsmanager', region_name=region)
    response = client.get_secret_value(SecretId=secret_name)
    return json.loads(response['SecretString'])

# In your pipeline
db_secret = get_secret('freshcart/prod/postgres')
connection_string = (
    f"postgresql://{db_secret['username']}:{db_secret['password']}"
    f"@{db_secret['host']}:{db_secret['port']}/{db_secret['dbname']}"
)

# Azure equivalent: use DefaultAzureCredential + Key Vault
# from azure.keyvault.secrets import SecretClient
# from azure.identity import DefaultAzureCredential
# client = SecretClient(vault_url="https://kv-freshcart.vault.azure.net/", credential=DefaultAzureCredential())
# secret = client.get_secret("postgres-password").value`} />

      {/* ── Misconceptions ────────────────────────────────────────────── */}
      <section data-toc-kind="myth">
        <SectionTag>// Misconceptions</SectionTag>
        <H2>Five Misconceptions About Security and Compliance</H2>

        {[
          {
            wrong: '"Encryption at rest, which cloud providers enable by default, means our data is protected"',
            right: 'Section 2 is explicit that default encryption at rest only protects you if the physical storage is stolen — it does nothing against a legitimate database user running SELECT email, phone FROM users. That gap is exactly why column-level encryption exists for genuinely sensitive fields.',
          },
          {
            wrong: '"GDPR only applies to companies based in Europe"',
            right: 'Section 5 states this directly: GDPR applies to any company that processes personal data of EU residents, including US companies with EU customers — location of the company is irrelevant, whose data you process is what matters.',
          },
          {
            wrong: '"Deleting a user\'s rows from the database satisfies a GDPR or CCPA deletion request"',
            right: 'Section 5\'s Right to Erasure row and the crypto-erasure section both make clear that deletion must reach every layer — raw, silver, gold — and every backup, not just the queryable warehouse tables. Section 5\'s crypto-erasure pattern exists specifically because a data lake\'s immutable, versioned storage makes true deletion much harder than a single DELETE statement.',
          },
          {
            wrong: '"If GDPR and CCPA seem similar, building for one automatically covers the other"',
            right: 'Section 6\'s GDPR-vs-CCPA comparison table shows real differences — different erasure deadlines (30 days vs 45, extendable to 90), different legal bases, different fine structures. The Callout closing that section is precise: building for GDPR-level rigor covers most CCPA requirements, but "most" is not "all," and the specific thresholds and terminology still need separate verification.',
          },
          {
            wrong: '"Audit logging is a nice-to-have that can be added once the pipeline is stable"',
            right: 'Section 8 frames audit logs as your proof of compliance and your first tool in a breach investigation — not an optional addition. Section 5\'s Data Breach Notification requirement (72-hour regulator notice under GDPR) is structurally impossible to meet without logs that already exist before the breach happens.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#ff4757', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      {/* ── 10. What this looks like at work ───────────────────────────── */}
      <section data-toc-kind="story">
        <H2>10. What This Looks Like at Work</H2>

        <Card title="Day 1 at a fintech (Stripe / Venmo / Brex)" accent="#00e676">
          <Para>
            Your first task might be: "We have a new CCPA compliance requirement — audit the
            raw layer and flag every column that contains personal data." You open the data
            catalogue, run a query across column names and sample values, and produce a
            spreadsheet with every PII field, its table, and its current protection status.
            That's a real day-one task, and it requires knowing what PII is.
          </Para>
        </Card>

        <Card title="At a healthcare company (Oscar Health / Teladoc)" accent="#0078d4">
          <Para>
            Health data is "sensitive personal information" under CCPA and protected health
            information under HIPAA. Your pipeline that ingests patient records into the data
            warehouse must use customer-managed encryption keys, full audit logging on every
            SELECT, and row-level security so only the assigned doctor's team can see their
            patients' records. A senior engineer will review your pipeline and specifically
            check these controls before approving.
          </Para>
        </Card>

        <Card title="In an interview" accent="#7b61ff">
          <Para>
            "How would you handle a GDPR deletion request in your current architecture?"
            is a common senior DE interview question. The right answer covers: locating all
            records for the user_id across all layers, the deletion mechanism (hard delete
            vs crypto-erasure for the lake), updating aggregates if the user contributed to
            pre-computed tables, and logging the deletion with a timestamp and actor.
          </Para>
        </Card>
      </section>

      {/* ── Interview Prep ───────────────────────────────────────────── */}
      <section data-toc-kind="prep">
        <SectionTag>// Interview Prep</SectionTag>
        <H2>5 Interview Questions — With Complete Answers</H2>

        {[
          {
            q: 'Q1. Walk through how you would handle a GDPR right-to-erasure request in a pipeline that spans raw, silver, and gold layers plus backups.',
            a: `I'd start by identifying every location that could hold this user's data: the data catalogue (Section 3) should already tag every table containing PII, so that's my starting checklist rather than a manual search. For each layer, the deletion mechanism differs — a warehouse table supports a straightforward DELETE, but the raw layer in an immutable data lake (S3/ADLS with versioning) is much harder to truly delete from.

For the lake, I'd use crypto-erasure (Section 5): if the user's PII was encrypted with a per-user key at ingestion, deletion becomes deleting that key from the key management service rather than rewriting files. Every encrypted record for that user becomes permanently unreadable without touching a single file.

I'd also check whether the user contributed to any pre-computed aggregates — a daily revenue rollup that included their transactions needs to be recomputed, not just have their row deleted, or the aggregate becomes silently wrong. Finally, I'd log the entire deletion action to the audit trail (Section 8) with a timestamp and actor, since "prove you deleted it" is itself a compliance requirement.`,
          },
          {
            q: 'Q2. Why is TLS (encryption in transit) not sufficient on its own to protect sensitive data?',
            a: `TLS protects data only while it's moving across a network — from a producer to a Kafka broker, from an API client to S3, from an application to a database. Section 2's Callout is direct about this: once data lands in storage, transit encryption does nothing for it anymore.

Two separate problems need two separate solutions. Encryption at rest protects data if the physical storage medium is compromised — someone gets unauthorized access to the disk or the storage account. But even encryption at rest doesn't stop a legitimate, authenticated database user from running a plain SELECT on sensitive columns — that's what column-level encryption is for, encrypting specific fields so only systems holding the decryption key can read the real value.

In a mature architecture, all three layers exist together: TLS for data in motion, storage-level encryption at rest as a baseline, and column-level encryption on the specific fields (SSNs, payment data) where even authenticated access should be restricted.`,
          },
          {
            q: 'Q3. What is the difference between RBAC and ABAC, and when would you reach for each?',
            a: `RBAC (Role-Based Access Control) assigns permissions to roles — Data Engineer, Analyst, Pipeline Service Account — and users inherit permissions by being assigned to a role, per Section 4. It's simple to reason about and works well when access patterns are stable: an analyst either can or can't see a given table, full stop.

ABAC (Attribute-Based Access Control) is more fine-grained — access decisions incorporate attributes of the user, the data, and the context. Section 4's example is a regional restriction: an analyst can read customer data only when the customer's region matches the analyst's assigned region. RBAC alone can't express that condition without creating a separate role per region, which doesn't scale.

I'd default to RBAC for most of a data platform's access model since it's easier to audit and reason about, and reach for ABAC specifically where row-level or column-level conditions depend on data attributes rather than just the user's job function — regional data residency requirements are the most common real case I'd expect to hit.`,
          },
          {
            q: 'Q4. A regulator asks you to prove a specific user\'s data was deleted within the required window. What evidence do you actually need?',
            a: `This is exactly the scenario Section 1 names as one of the three concrete threats a data engineer has to think about, and it's a good test of whether "we deleted it" is a real claim or just an assumption.

I need an audit log entry (Section 8) recording the deletion action itself — timestamp, actor, what was deleted or what key was scheduled for deletion, and why (the specific erasure request). For crypto-erasure specifically, I need the KMS key deletion event with its own timestamp, since that's the actual moment the data became unreadable, not the moment someone clicked a button in an internal tool.

I also need to show the deletion actually reached every layer — not just the warehouse table, but raw storage and any aggregates the user's data contributed to. Without a data catalogue mapping which tables contain this user's data (Section 3), I can't even enumerate what needed deleting in the first place, let alone prove I covered all of it. The proof isn't the deletion — it's the audit trail around the deletion.`,
          },
          {
            q: 'Q5. Why is crypto-erasure the standard approach for GDPR deletion in a data lake instead of just rewriting the files?',
            a: `Rewriting files in an object store to remove one user's records sounds simple but usually isn't, at scale. Data lake files (Parquet, often in Delta Lake or Iceberg tables) are frequently large and partitioned by something like date, not by user — a single user's records could be scattered across thousands of files. Rewriting all of them to physically remove specific rows is expensive, slow, and risky to get exactly right, especially with versioned storage where "deleted" versions may still be recoverable.

Section 5's crypto-erasure pattern sidesteps this entirely: encrypt each user's PII with a unique, per-user key at write time, and store that key in a key management service. "Deleting" the user becomes deleting their key — a single, fast, auditable operation. Every record encrypted with that key becomes permanently unreadable without touching a single file in the lake.

The trade-off is architectural commitment upfront — you need per-user encryption designed into the pipeline from the start, not bolted on later, which is the same "compliance by design beats compliance retrofitted" principle Section 7 makes as its central point.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      {/* ── Common Mistakes ───────────────────────────────────────────── */}
      <section data-toc-kind="plain">
        <SectionTag>// Common Mistakes</SectionTag>
        <H2>Mistakes Beginners Make Constantly</H2>

        {[
          {
            q: 'Assuming default cloud encryption at rest means sensitive fields don\'t need column-level encryption',
            a: 'Section 2 and this module\'s Misconceptions section both cover this — encryption at rest protects against physical storage theft, not against a legitimate but overly broad SELECT query. SSNs, payment data, and similar fields need column-level encryption on top of the default, not instead of thinking about it further.',
          },
          {
            q: 'Treating "the data was deleted from the warehouse table" as equivalent to a completed GDPR erasure request',
            a: 'Section 5\'s Right to Erasure row and Interview Prep Q1 both make the same point: a real erasure has to reach raw, silver, gold, and backups — and any aggregate the user contributed to needs recomputing, not just their source row deleted.',
          },
          {
            q: 'Hardcoding a credential "just for now" during development with a plan to move it to a secrets manager later',
            a: 'Section 9 is explicit that a secret committed to Git is a secret that was leaked, even after the commit is deleted — it may already be in a fork or an automated scan. There is no safe "temporary" hardcoded credential; use environment variables or a secrets manager from the first commit.',
          },
          {
            q: 'Building a pipeline that touches personal data first, and only thinking about compliance requirements once it\'s in production',
            a: 'Section 7\'s entire framing — and its closing Key Takeaway — is that compliance retrofitted after the fact is roughly 10× harder than compliance designed in from the start. The "Before you build" checklist exists specifically to front-load these questions.',
          },
          {
            q: 'Assuming GDPR-level compliance automatically satisfies CCPA, or vice versa, without checking the specific differences',
            a: 'Section 6\'s comparison table and this module\'s Misconceptions section both show real gaps — different deadlines, different legal bases, different fine structures. Section 6\'s own Callout is careful to say GDPR-level rigor covers "most" CCPA requirements, not all of them.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      {/* ── Errors you'll hit ──────────────────────────────────────────── */}
      <section data-toc-kind="plain">
        <H2>Errors You'll Hit</H2>

        <ErrorBlock
          error="SSL connection has been closed unexpectedly / SSL SYSCALL error"
          cause="The database requires an SSL connection (sslmode=require) but the client tried to connect without SSL, or the certificate validation failed."
          fix="Add ?sslmode=require to the connection string. If using a self-signed certificate, provide the CA cert path with sslrootcert=/path/to/ca.pem. Never set sslmode=disable in production."
        />

        <ErrorBlock
          error="botocore.exceptions.ClientError: An error occurred (AccessDeniedException) when calling the GetSecretValue operation"
          cause="Your pipeline's IAM role does not have secretsmanager:GetSecretValue permission for this secret. Or the resource policy on the secret excludes your role."
          fix="Attach a policy granting secretsmanager:GetSecretValue on the specific secret ARN to your pipeline's execution role. Check both the role policy and the secret's resource-based policy."
        />

        <ErrorBlock
          error="cryptography.fernet.InvalidToken"
          cause="Trying to decrypt data with a different key than the one used to encrypt it. Commonly happens after key rotation if old encrypted data is not re-encrypted before switching keys."
          fix="During key rotation, decrypt all existing data with the old key and re-encrypt with the new key before retiring the old key. Keep old key active until migration is complete."
        />

        <ErrorBlock
          error="OperationalError: SSL error: certificate verify failed"
          cause="The SSL certificate presented by the server does not match the CA certificate your client is using to verify it. Common when moving between environments (dev uses self-signed, prod uses a proper CA)."
          fix="Provide the correct CA certificate bundle. In cloud databases (RDS, Cloud SQL), download the CA cert from the cloud provider's documentation page and reference it in the connection config."
        />

        <ErrorBlock
          error="Policy evaluation denied access — explicit deny in a bucket policy (S3)"
          cause="A bucket policy contains a Deny statement for aws:SecureTransport = false (HTTP requests). Your pipeline or tool is sending an HTTP request to the bucket instead of HTTPS."
          fix="Ensure your S3 client is configured to use HTTPS (the default in modern SDKs). If using a third-party tool, check for an http:// prefix in the bucket endpoint configuration."
        />
      </section>

      {/* ── Key takeaways ──────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'Encryption in transit (TLS) and at rest are separate problems — you need both.',
        'PII is any data that can identify a person, directly or in combination. Tag it, minimise it, mask it in dev, and control access to it in prod.',
        'GDPR and CCPA both require: purpose limitation, right to erasure, right to access, and breach-relevant audit trails. Build deletion and access-export capability into every pipeline that touches personal data.',
        'Crypto-erasure is the practical solution for GDPR deletion in immutable data lakes — encrypt per user with a unique key, then delete the key.',
        'Audit logs must be immutable, append-only, and stored separately from the systems being audited.',
        'Never hardcode credentials. Use environment variables in dev, secrets managers in production, and managed identities where the cloud supports them.',
        'Compliance is cheapest when built in at design time. Retrofitting a non-compliant pipeline is 10× harder.',
      ]} />

    
      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 40 covers streaming data — event-driven architecture, producers and consumers, offsets, consumer groups, and replay — the core concepts behind every streaming system, without locking you to a specific tool.
        </p>
        <Link href="/learn/data-engineering/streaming-data" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 40 → Streaming Data — What It Is and How It Works
        </Link>
      </div>
    </LearnLayout>
  )
}