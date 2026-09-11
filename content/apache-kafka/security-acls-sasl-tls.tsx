import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const K = '#f97316'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: FONT_MONO, marginBottom: 10 }}>{text}</div>
)
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: FONT_DISPLAY, lineHeight: 1.2 }}>{children}</h2>
)
const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 'clamp(17px, 2vw, 22px)', fontWeight: 800, letterSpacing: '-0.4px', color: 'var(--text)', margin: '30px 0 12px', fontFamily: FONT_DISPLAY }}>{children}</h3>
)
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.95, marginBottom: 20 }}>{children}</p>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '54px 0' }} />
const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 26 }}>{children}</div>
)
const Callout = ({ title, children, color = K }: { title: string; children: React.ReactNode; color?: string }) => (
  <div style={{ background: `${color}0d`, border: `1px solid ${color}33`, borderLeft: `4px solid ${color}`, borderRadius: '0 12px 12px 0', padding: '18px 22px', margin: '26px 0' }}>
    <div style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: FONT_MONO, marginBottom: 8 }}>{title}</div>
    <div style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)
const CodeBox = ({ label, children }: { label: string; children: string }) => (
  <div style={{ marginBottom: 26 }}>
    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: FONT_MONO }}>{label}</div>
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: FONT_MONO, margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Output = ({ children }: { children: string }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: FONT_MONO, display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
    </div>
    <pre style={{ background: 'transparent', border: '1px dashed var(--border)', borderRadius: 10, padding: '14px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8, color: 'var(--muted)', fontFamily: FONT_MONO, margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const BulletList = ({ items }: { items: string[] }) => (
  <ul style={{ display: 'grid', gap: 11, margin: '0 0 22px', paddingLeft: 0, listStyle: 'none' }}>
    {items.map(item => (
      <li key={item} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.8 }}>
        <span style={{ color: K, fontWeight: 900, marginTop: 2 }}>✓</span><span>{item}</span>
      </li>
    ))}
  </ul>
)
const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div style={{ overflowX: 'auto', marginBottom: 30 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
      <thead><tr>{headers.map(header => <th key={header} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: K, fontFamily: FONT_MONO, borderBottom: `2px solid ${K}55`, background: `${K}0d`, minWidth: 180 }}>{header}</th>)}</tr></thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.join('|')} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
            {row.map((cell, j) => <td key={j} style={{ padding: '12px 16px', color: j === 0 ? 'var(--text)' : 'var(--muted)', borderBottom: '1px solid var(--border)', verticalAlign: 'top', lineHeight: 1.7, fontWeight: j === 0 ? 700 : 400 }}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function KafkaSecurityACLsSASLTLS() {
  return (
    <LearnLayout
      title="Kafka Security: TLS, SASL, and ACLs"
      description="Why an unsecured Kafka cluster is a real risk, and how to close it: encryption in transit with TLS, authenticating clients with SASL/PLAIN, SCRAM, GSSAPI and mTLS, authorizing access with ACLs, and locking a topic down to specific service accounts."
      section="Apache Kafka — Module 15"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Kafka Security: TLS, SASL, and ACLs', href: '/learn/apache-kafka/security-acls-sasl-tls' },
      ]}
      prev={{ title: 'Stream Processing and Kafka Streams', href: '/learn/apache-kafka/stream-processing-kafka-streams' }}
      next={{ title: 'Monitoring and Observability', href: '/learn/apache-kafka/monitoring-observability' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The default is wide open" />
        <SectionTitle>An Unsecured Kafka Cluster Is Not a Theoretical Risk</SectionTitle>
        <Para>
          A brand new Kafka broker, started with a default <code>server.properties</code>, listens on
          port 9092 with <code>security.protocol=PLAINTEXT</code>. That single line is the whole security
          posture: none. Any process that can open a TCP connection to that port can list every topic on the
          cluster, read every record in every partition from the beginning of its retention window, and
          produce records to any topic it likes, including topics it has never seen before. There is no
          login, no certificate, no permission check of any kind. The broker does not ask who you are
          because it has no concept of identity in this mode.
        </Para>
        <Para>
          This is easy to dismiss as a non-issue on a laptop running a single broker for a tutorial. It stops
          being dismissible the moment that same configuration ships to a shared network — a corporate VPN, a
          cloud VPC with an overly permissive security group, a Kubernetes cluster where the broker's service
          is reachable from every namespace. In every one of those environments, "reachable" quietly becomes
          "readable and writable by anyone on the network," and Kafka topics routinely carry exactly the kind
          of data you would never leave unprotected: order events with customer names and addresses, payment
          confirmations, clickstream data tied to user IDs, internal service-to-service commands.
        </Para>
        <HighlightBox>
          <Para>
            <strong>The two separate problems security has to solve:</strong>
          </Para>
          <Para>
            <strong>Confidentiality of data in transit —</strong> without encryption, every byte a producer
            sends and every byte a broker returns to a consumer crosses the network in plaintext. Anyone
            positioned to observe that traffic — a compromised host on the same subnet, a misconfigured span
            port, a cloud provider's internal network in a multi-tenant setup — can read it.
          </Para>
          <Para>
            <strong>Identity and permission —</strong> even with encryption in place, the broker still needs
            to answer two questions before honoring a request: who is asking, and are they allowed to do
            this specific thing to this specific resource? Encryption alone answers neither. A TLS-encrypted
            connection from an anonymous client is still an anonymous connection — it is just a private one.
          </Para>
        </HighlightBox>
        <Para>
          These two problems are solved by two different, composable layers: TLS solves confidentiality
          (and, used as mTLS, can also solve identity). SASL solves identity through a pluggable
          authentication mechanism that runs independently of, or on top of, TLS. ACLs solve permission, once
          identity is established. This module builds all three up from first principles, in that order,
          because each one only makes sense once the layer before it is understood.
        </Para>
        <Callout title="This is defensive configuration, not offense" color={K}>
          Everything in this module is about correctly configuring encryption and access control on a
          cluster you operate — the same category of work as configuring TLS on a web server or IAM
          policies on a cloud account. None of it is about attacking, bypassing, or extracting data from a
          cluster you do not control.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Encryption in transit with TLS" />
        <SectionTitle>TLS: Encrypting Every Byte Between Client and Broker</SectionTitle>
        <Para>
          Transport Layer Security (TLS) is the same protocol that puts the lock icon in a browser's address
          bar, applied here to the connection between a Kafka client and a Kafka broker, and between brokers
          themselves. When TLS is enabled, the raw bytes of every produce request, fetch response, and
          metadata exchange are encrypted before they leave the sending machine and decrypted only by the
          intended recipient. An observer on the network sees ciphertext, not order IDs and customer emails.
        </Para>
        <SubTitle>Keystores and truststores — the two files every broker needs</SubTitle>
        <Para>
          A broker that wants to speak TLS needs two things: a private key and certificate identifying
          itself, and a way to decide which certificates it trusts from the other side. These live in two
          separate files, almost always in the Java KeyStore (JKS) or PKCS#12 format, because Kafka brokers
          run on the JVM.
        </Para>
        <BulletList
          items={[
            'Keystore — holds the broker\'s own private key and its certificate (signed by a certificate authority, or self-signed for internal/dev use). This is what the broker presents to a connecting client to prove its identity.',
            'Truststore — holds the certificate(s) of the certificate authority the broker is willing to trust. When a client (or another broker, in mTLS setups) presents a certificate, the broker checks whether it was signed by a CA in its truststore.',
          ]}
        />
        <CodeBox label="broker server.properties — enabling TLS">
{`# Broker listens on a TLS port in addition to (or instead of) plaintext
listeners=SSL://broker1.internal:9093
advertised.listeners=SSL://broker1.internal:9093

security.protocol=SSL
ssl.keystore.location=/etc/kafka/secrets/broker1.keystore.jks
ssl.keystore.password=\${KEYSTORE_PASSWORD}
ssl.key.password=\${KEY_PASSWORD}

ssl.truststore.location=/etc/kafka/secrets/broker1.truststore.jks
ssl.truststore.password=\${TRUSTSTORE_PASSWORD}

# Broker-to-broker replication traffic should also run over TLS,
# not just client-facing traffic
inter.broker.listener.name=SSL`}
        </CodeBox>
        <Para>
          A client connecting to this broker needs the mirror image of the truststore piece: it must trust
          the CA that signed the broker's certificate, or the connection is rejected during the TLS
          handshake. This is the same trust-chain model a browser uses when it validates a website's
          certificate — the client is not blindly trusting whatever certificate shows up, it is checking that
          certificate was vouched for by an authority it already trusts.
        </Para>
        <CodeBox label="client configuration — trusting the broker's certificate">
{`# client.properties
security.protocol=SSL
ssl.truststore.location=/etc/kafka/secrets/client.truststore.jks
ssl.truststore.password=\${TRUSTSTORE_PASSWORD}

# By default the client also verifies the broker's hostname matches
# the certificate's Common Name or Subject Alternative Name — this
# check should be left ON in production. Disabling it
# (ssl.endpoint.identification.algorithm=) removes protection against
# a network attacker presenting a valid-but-wrong certificate.`}
        </CodeBox>
        <Callout title="Do not disable hostname verification to make TLS 'just work'" color="#ff4757">
          A common shortcut when a TLS setup is not connecting is to set
          <code>ssl.endpoint.identification.algorithm=</code> (empty), which disables checking that the
          certificate's hostname matches the broker being connected to. This makes TLS errors disappear, but
          it also removes the specific protection that stops a different machine on the network from
          impersonating the broker with a certificate for a different name. Fix the certificate's SAN
          entries instead of turning this check off.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Authentication with SASL" />
        <SectionTitle>SASL: Proving Who You Are, Independently of Encryption</SectionTitle>
        <Para>
          Simple Authentication and Security Layer (SASL) is a framework Kafka uses for pluggable
          authentication — it defines how a client proves its identity to the broker, without dictating
          exactly how that proof works. Kafka supports several SASL mechanisms, each with a very different
          risk profile, and picking the wrong one for the situation is one of the most common real-world
          security misconfigurations.
        </Para>
        <SubTitle>SASL/PLAIN — a username and password, nothing more</SubTitle>
        <Para>
          SASL/PLAIN sends a username and password to the broker, checked against a configured list (or a
          pluggable callback that checks an external store). The mechanism itself does nothing to protect
          that username and password in transit — the credentials are sent essentially as plaintext inside
          the SASL exchange. This makes SASL/PLAIN dangerously insecure on its own: run it over an
          unencrypted connection and you have simply moved the "anyone can read everything" problem from
          "no login at all" to "a login whose password is visible to anyone watching the network."
        </Para>
        <Callout title="SASL/PLAIN requires TLS underneath it, always" color="#ff4757">
          SASL/PLAIN is only acceptable when the connection is already using TLS — the combination is
          written as <code>SASL_SSL</code> with mechanism <code>PLAIN</code>. TLS encrypts the channel the
          SASL exchange travels over, so the plaintext credentials inside it are protected from network
          observation the same way any other bytes on that connection are. SASL/PLAIN over
          <code>SASL_PLAINTEXT</code> should not be used for anything beyond a fully isolated local test.
        </Callout>
        <SubTitle>SASL/SCRAM — salted, challenge-response, safer by design</SubTitle>
        <Para>
          Salted Challenge Response Authentication Mechanism (SCRAM) is a meaningful step up from PLAIN even
          before TLS is considered. Instead of sending the password itself, the client and broker perform a
          challenge-response exchange: the broker never receives the plaintext password over the wire at
          all, and what is stored on the broker side is a salted, hashed form of the credential rather than
          the password itself. This means a leak of the broker's credential store does not directly hand
          over usable passwords, and a passive observer of a single exchange cannot replay it to
          authenticate as that user later. Kafka supports SCRAM-SHA-256 and the stronger SCRAM-SHA-512.
        </Para>
        <CodeBox label="creating a SCRAM credential for a user, via kafka-configs.sh">
{`kafka-configs.sh --bootstrap-server broker1:9093 \\
  --alter --add-config 'SCRAM-SHA-512=[password=change-me-securely]' \\
  --entity-type users --entity-name checkout-service

# The broker stores a salted hash derived from this password in
# the internal __consumer_offsets-adjacent metadata store (ZooKeeper
# in legacy clusters, the KRaft metadata log in current clusters) —
# never the plaintext password itself.`}
        </CodeBox>
        <Para>
          SCRAM is the common default choice for teams that need username/password-style authentication
          without standing up a full Kerberos deployment or issuing individual client certificates to every
          service. It is still run over <code>SASL_SSL</code> in production — SCRAM protects the password
          itself even without TLS, but TLS is still needed to encrypt the actual message payloads flowing
          over the connection afterward.
        </Para>
        <SubTitle>SASL/GSSAPI — Kerberos, for enterprise and on-prem Active Directory environments</SubTitle>
        <Para>
          GSSAPI is Kafka's SASL mechanism for Kerberos authentication — the ticket-based system widely used
          in enterprise, on-premises environments already built around Microsoft Active Directory or an MIT
          Kerberos realm. Instead of a password check per connection, a client obtains a time-limited ticket
          from a central Key Distribution Center (KDC) and presents that ticket to the broker, which
          validates it without ever seeing a password. This fits naturally where an organization already
          runs Kerberos for everything else — file shares, internal web apps, database logins — and wants
          Kafka to plug into that same identity system rather than maintaining a separate credential store.
        </Para>
        <CodeBox label="broker JAAS config for GSSAPI (Kerberos)">
{`# kafka_server_jaas.conf
KafkaServer {
  com.sun.security.auth.module.Krb5LoginModule required
  useKeyTab=true
  storeKey=true
  keyTab="/etc/kafka/kafka_server.keytab"
  principal="kafka/broker1.internal@CORP.EXAMPLE.COM";
};

# server.properties
sasl.enabled.mechanisms=GSSAPI
sasl.kerberos.service.name=kafka`}
        </CodeBox>
        <SubTitle>Mutual TLS (mTLS) — the certificate itself is the identity</SubTitle>
        <Para>
          mTLS extends the TLS handshake from Part 02 in both directions: the broker presents its
          certificate to the client as usual, but the client also presents its own certificate to the
          broker, and the broker validates it against its truststore just as the client validated the
          broker's. The client's identity, for authorization purposes, becomes the Distinguished Name (DN)
          embedded in its certificate — there is no separate username or password at all. This is a strong
          option when an organization already has infrastructure for issuing and rotating short-lived client
          certificates, since certificate-based identity avoids long-lived shared passwords entirely.
        </Para>
        <Table
          headers={['Mechanism', 'What proves identity', 'Needs TLS underneath?', 'Best fit']}
          rows={[
            ['SASL/PLAIN', 'A plaintext username + password sent in the SASL exchange.', 'Yes — mandatory, or credentials are exposed on the wire.', 'Simple setups where SCRAM tooling is unavailable; always paired with SASL_SSL.'],
            ['SASL/SCRAM', 'A salted challenge-response exchange; password never sent directly.', 'Recommended — protects payload confidentiality even though SCRAM itself protects the password.', 'The common default for username/password auth without a Kerberos deployment.'],
            ['SASL/GSSAPI (Kerberos)', 'A ticket issued by a central KDC after the client authenticates once.', 'Often layered with TLS in practice, though Kerberos has its own encryption.', 'Enterprise / on-prem environments already standardized on Active Directory or MIT Kerberos.'],
            ['mTLS (client certificates)', 'The client\'s X.509 certificate itself, validated against the broker\'s truststore.', 'Is TLS — identity is a property of the TLS handshake, not a separate layer.', 'Service-to-service auth where certificate issuance and rotation is already automated.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — security.protocol combinations" />
        <SectionTitle>The Four security.protocol Values, and Why SASL_SSL Is the Production Baseline</SectionTitle>
        <Para>
          Every listener a broker exposes has exactly one <code>security.protocol</code> value, and that
          value is really answering two independent yes/no questions at once: is this connection encrypted,
          and does this connection require an authenticated identity. There are four combinations, and only
          one of them is a reasonable default for a production cluster carrying real data.
        </Para>
        <Table
          headers={['security.protocol', 'Encrypted?', 'Authenticated?', 'Verdict']}
          rows={[
            ['PLAINTEXT', 'No', 'No', 'Local development only. Anyone reaching the port can read and write anything.'],
            ['SSL', 'Yes', 'Only if mTLS (client certs required) is also configured — otherwise no client identity.', 'Encrypts traffic but, without mTLS, still leaves the broker unable to distinguish one client from another.'],
            ['SASL_PLAINTEXT', 'No', 'Yes, via a SASL mechanism.', 'Identity is established, but every subsequent byte — including the SASL credential exchange for PLAIN — crosses the network unencrypted. Rarely appropriate outside an isolated test network.'],
            ['SASL_SSL', 'Yes', 'Yes, via a SASL mechanism on top of TLS.', 'The real production baseline: encrypted channel plus a proven client identity, ready for ACLs to authorize against.'],
          ]}
        />
        <Para>
          <code>SASL_SSL</code> is the combination that actually closes both gaps from Part 01 at once — the
          TLS half stops anyone on the network from reading the data in flight, and the SASL half means the
          broker knows exactly which principal is making each request, which is the prerequisite for
          everything in Part 05. A cluster running plain <code>SSL</code> without mTLS is still meaningfully
          better than <code>PLAINTEXT</code>, because the data is at least private — but "private and
          anonymous" is not the same guarantee as "private and identified," and ACLs cannot authorize a
          request from a client the broker cannot name.
        </Para>
        <CodeBox label="a broker exposing two listeners — internal plaintext is still wrong here">
{`# This is a common but mistaken pattern — do not copy it
listeners=SASL_SSL://broker1.internal:9093,PLAINTEXT://broker1.internal:9094
listener.security.protocol.map=SASL_SSL:SASL_SSL,PLAINTEXT:PLAINTEXT

# The intent is usually "the plaintext listener is only for internal
# trusted traffic" — but "internal network" is rarely as isolated as
# assumed, and the plaintext listener bypasses every ACL check that
# applies to the SASL_SSL listener. If a listener exists, it is a
# door, and every door needs the same lock.`}
        </CodeBox>
        <Callout title="One cluster, one consistent story" color={K}>
          Running a mix of protected and unprotected listeners on the same broker is a common way teams
          believe they are secured while actually leaving a bypass in place. If any listener on the broker
          accepts <code>PLAINTEXT</code>, that listener is the effective security level of the whole broker
          for anyone who discovers it.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Authorization with ACLs" />
        <SectionTitle>ACLs: Deciding What an Authenticated Principal Is Allowed to Do</SectionTitle>
        <Para>
          Authentication (Parts 02-04) answers "who is this?" Authorization answers a different question:
          "is this specific, now-known identity allowed to do this specific thing, to this specific
          resource?" Kafka's access control lists (ACLs) are how that second question gets answered. Once
          <code>authorizer.class.name</code> is configured on the broker (Kafka ships a standard ACL
          authorizer built around the metadata log), every request — produce, fetch, create topic, describe
          consumer group — is checked against the ACL rules before it is allowed to proceed.
        </Para>
        <SubTitle>The shape of an ACL rule</SubTitle>
        <Para>
          An ACL rule names five things: a principal (who), a resource (what topic, consumer group, or
          cluster-level resource), an operation (Read, Write, Describe, Create, Delete, Alter, and others), a
          permission type (Allow or Deny), and the host the rule applies from. Kafka's default behavior with
          an authorizer enabled is deny-by-default — if no ACL explicitly allows an operation, it is
          rejected. This is the correct default for least privilege: nothing is reachable until someone
          deliberately grants it.
        </Para>
        <CodeBox label="granting a producer write access to exactly one topic">
{`kafka-acls.sh --bootstrap-server broker1:9093 \\
  --command-config admin.properties \\
  --add \\
  --allow-principal User:checkout-service \\
  --operation Write \\
  --operation Describe \\
  --topic freshcart.orders

# checkout-service can now produce to freshcart.orders specifically.
# It still cannot read from it, cannot produce to any other topic,
# and cannot create, delete, or alter freshcart.orders' configuration
# — Write and Describe were the only two operations granted.`}
        </CodeBox>
        <CodeBox label="granting a consumer read access to a topic and its consumer group">
{`kafka-acls.sh --bootstrap-server broker1:9093 \\
  --command-config admin.properties \\
  --add \\
  --allow-principal User:fraud-detection-service \\
  --operation Read \\
  --topic freshcart.orders

kafka-acls.sh --bootstrap-server broker1:9093 \\
  --command-config admin.properties \\
  --add \\
  --allow-principal User:fraud-detection-service \\
  --operation Read \\
  --group fraud-detection-consumer-group

# Reading a topic requires TWO grants in Kafka's model:
# Read on the topic itself, AND Read on the consumer group the
# client uses to commit offsets. Granting only the topic-level Read
# still fails — the group resource is checked independently.`}
        </CodeBox>
        <Output>{`Current ACLs for resource \`Topic:LITERAL:freshcart.orders\`:
  (principal=User:checkout-service, host=*, operation=WRITE, permissionType=ALLOW)
  (principal=User:checkout-service, host=*, operation=DESCRIBE, permissionType=ALLOW)
  (principal=User:fraud-detection-service, host=*, operation=READ, permissionType=ALLOW)

Current ACLs for resource \`Group:LITERAL:fraud-detection-consumer-group\`:
  (principal=User:fraud-detection-service, host=*, operation=READ, permissionType=ALLOW)`}</Output>
        <SubTitle>The principle of least privilege, applied to topics</SubTitle>
        <Para>
          The ACL model rewards being specific. A common anti-pattern is granting a service account
          <code>Write</code> on a wildcard resource (<code>--topic '*'</code>) because it is faster to set up
          than listing individual topics — this defeats the purpose of ACLs entirely, since a compromised or
          buggy service with wildcard write access can now corrupt any topic on the cluster, not just the
          ones it legitimately needs. Grant each principal the narrowest set of operations, on the narrowest
          set of resources, that its actual job requires — a producer gets <code>Write</code> and
          <code>Describe</code> on the topics it writes to, nothing more; a consumer gets <code>Read</code>
          on the topics and consumer group it needs, nothing more; almost no application-level service
          account needs <code>Delete</code>, <code>Alter</code>, or cluster-level operations at all.
        </Para>
        <Table
          headers={['Operation', 'What it permits', 'Typical holder']}
          rows={[
            ['Read', 'Fetch records from a topic partition; also required on the consumer group resource to commit offsets.', 'Consumer service accounts.'],
            ['Write', 'Produce records to a topic.', 'Producer service accounts.'],
            ['Describe', 'See a resource\'s existence and basic metadata (partition count, config) without reading its data.', 'Almost every client — usually granted alongside Read or Write.'],
            ['Create', 'Create new topics (if auto-topic-creation or explicit admin calls are in use).', 'CI/CD pipelines, platform-provisioning tooling — rarely application services.'],
            ['Delete', 'Delete a topic or its records.', 'A small, audited set of cluster administrators only.'],
            ['Alter', 'Change topic configuration (retention, partition count, replication factor changes).', 'Platform/infrastructure automation, not application services.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Worked example" />
        <SectionTitle>Worked Example: Locking a Topic to Two Specific Service Accounts</SectionTitle>
        <Para>
          Bringing Parts 02 through 05 together: suppose <code>freshcart.orders</code> should be writable
          only by the <code>checkout-service</code> that creates orders, and readable only by
          <code>fraud-detection-service</code> and <code>fulfillment-service</code>, each in their own
          consumer group. No other principal should be able to touch this topic in any way.
        </Para>
        <CodeBox label="step 1 — each service authenticates with its own SCRAM credential over SASL_SSL">
{`kafka-configs.sh --bootstrap-server broker1:9093 --command-config admin.properties \\
  --alter --add-config 'SCRAM-SHA-512=[password=<generated-secret>]' \\
  --entity-type users --entity-name checkout-service

kafka-configs.sh --bootstrap-server broker1:9093 --command-config admin.properties \\
  --alter --add-config 'SCRAM-SHA-512=[password=<generated-secret>]' \\
  --entity-type users --entity-name fraud-detection-service

kafka-configs.sh --bootstrap-server broker1:9093 --command-config admin.properties \\
  --alter --add-config 'SCRAM-SHA-512=[password=<generated-secret>]' \\
  --entity-type users --entity-name fulfillment-service

# Each of these services connects using security.protocol=SASL_SSL
# and sasl.mechanism=SCRAM-SHA-512, with its own unique credential —
# never a credential shared across services.`}
        </CodeBox>
        <CodeBox label="step 2 — grant exactly the ACLs each service needs, nothing more">
{`# checkout-service: write-only producer
kafka-acls.sh --bootstrap-server broker1:9093 --command-config admin.properties --add \\
  --allow-principal User:checkout-service \\
  --operation Write --operation Describe --topic freshcart.orders

# fraud-detection-service: read-only consumer, its own group
kafka-acls.sh --bootstrap-server broker1:9093 --command-config admin.properties --add \\
  --allow-principal User:fraud-detection-service \\
  --operation Read --topic freshcart.orders
kafka-acls.sh --bootstrap-server broker1:9093 --command-config admin.properties --add \\
  --allow-principal User:fraud-detection-service \\
  --operation Read --group fraud-detection-consumer-group

# fulfillment-service: read-only consumer, a different group
kafka-acls.sh --bootstrap-server broker1:9093 --command-config admin.properties --add \\
  --allow-principal User:fulfillment-service \\
  --operation Read --topic freshcart.orders
kafka-acls.sh --bootstrap-server broker1:9093 --command-config admin.properties --add \\
  --allow-principal User:fulfillment-service \\
  --operation Read --group fulfillment-consumer-group`}
        </CodeBox>
        <Para>
          With the authorizer's deny-by-default behavior, nothing further needs to be written to lock
          everyone else out — the absence of a rule is the lockout. A third service that has never been
          granted any ACL against <code>freshcart.orders</code>, even one running with a perfectly valid
          SASL_SSL connection and credential, gets an authorization error the moment it tries to produce or
          consume against this topic. Authentication proved who it was; authorization is a separate decision
          that was never made in its favor.
        </Para>
        <Output>{`org.apache.kafka.common.errors.TopicAuthorizationException:
  Not authorized to access topics: [freshcart.orders]`}</Output>
        <Para>
          This is the intended failure mode, not a bug to work around by widening the ACL. When this error
          appears for a genuinely new, legitimate consumer, the fix is to add the two specific ACL grants
          (topic Read, group Read) for that service's principal — not to grant it a wildcard, and not to
          disable the authorizer.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Encryption at rest" />
        <SectionTitle>Encryption at Rest — Not a Kafka-Native Feature</SectionTitle>
        <Para>
          Everything so far protects data while it moves across the network. It says nothing about the log
          segment files sitting on a broker's disk. Kafka itself has no built-in feature to encrypt those
          <code>.log</code> segment files at rest — this is deliberately left to the infrastructure layer
          underneath Kafka, the same way most databases treat at-rest encryption as a filesystem or storage
          concern rather than something the database engine implements itself.
        </Para>
        <BulletList
          items={[
            'Disk-level (block or filesystem) encryption — LUKS on Linux, encrypted EBS volumes on AWS, encrypted persistent disks on GCP, BitLocker-style equivalents elsewhere. The broker process is unaware encryption is happening at all; the operating system and storage layer handle it transparently.',
            'Cloud-managed disk encryption — most managed Kafka offerings and most cloud block storage products encrypt volumes by default today, often with customer-managed keys available for organizations with stricter key-custody requirements.',
            'Application-level payload encryption — for specific highly sensitive fields, some teams encrypt the field itself before it is ever serialized into the Kafka record, so the value is ciphertext even to something reading the raw log file directly. This is a deliberate, heavier-weight choice used for specific sensitive fields, not a general substitute for disk encryption.',
          ]}
        />
        <Callout title="At-rest encryption protects a different threat than TLS" color="#38bdf8">
          TLS protects data while it is moving across a network. Disk encryption protects data sitting still
          on a broker's storage if that physical disk, snapshot, or backup is stolen, improperly decommissioned,
          or accessed outside the broker process entirely. A cluster can have excellent TLS and SASL_SSL
          configuration and still expose every record in a stolen, unencrypted disk snapshot — the two
          protections are complementary, not substitutes for each other.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Putting the whole stack together" />
        <SectionTitle>The Full Security Stack, Layer by Layer</SectionTitle>
        <Para>
          A production-grade Kafka deployment stacks every layer covered in this module, each protecting
          against a distinct threat, none of them substituting for the others.
        </Para>
        <Table
          headers={['Layer', 'Protects against', 'Configured via']}
          rows={[
            ['TLS (encryption in transit)', 'Network observation of data while it moves between clients and brokers, and between brokers.', 'ssl.keystore / ssl.truststore on every broker and client; security.protocol including SSL or SASL_SSL.'],
            ['SASL (authentication)', 'An unidentified party connecting and being treated as a trusted client.', 'sasl.mechanism — PLAIN, SCRAM-SHA-256/512, or GSSAPI — plus JAAS configuration; or mTLS client certificates instead of SASL.'],
            ['ACLs (authorization)', 'An authenticated but unauthorized principal performing an operation it was never granted.', 'authorizer.class.name enabled on the broker; kafka-acls.sh grants per principal, resource, and operation.'],
            ['Disk encryption (at rest)', 'Exposure of raw log segment data if physical storage is stolen, leaked, or improperly decommissioned.', 'Operating system / cloud storage layer — outside Kafka\'s own configuration surface.'],
          ]}
        />
        <Para>
          Skipping any one layer leaves a specific, well-understood gap: no TLS means network observers can
          read everything even if ACLs are perfect. No SASL means ACLs have no identity to check against, so
          they cannot be enforced meaningfully. No ACLs means every authenticated principal — including a
          low-trust service that only needed to write to one topic — can read and write everything on the
          cluster. No disk encryption means a stolen backup or decommissioned disk bypasses every network
          protection entirely. The layers are additive, not redundant.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Operating security day-to-day" />
        <SectionTitle>Operating Kafka Security Day-to-Day: Rotation, Prefixed ACLs, and Auditing</SectionTitle>
        <Para>
          Getting TLS, SASL, and ACLs configured correctly on day one is necessary but not sufficient. A
          security posture that is correct at launch and never revisited tends to decay in predictable ways
          — certificates expire, credentials outlive the services that needed them, and ACL grants
          accumulate without anyone regularly checking whether they are still needed. This part covers the
          operational habits that keep the Part 02 through Part 06 configuration correct over time, not just
          on the day it was set up.
        </Para>
        <SubTitle>Certificate and credential rotation</SubTitle>
        <Para>
          Every certificate issued for TLS or mTLS has an expiration date, and every SCRAM credential is, in
          practice, a long-lived secret unless a team deliberately rotates it. Treating rotation as an
          afterthought produces one of the most disruptive and entirely avoidable classes of Kafka incident:
          a certificate quietly expires at 2 AM, every client using it starts failing the TLS handshake
          simultaneously, and the failure looks like a cluster-wide outage even though the brokers themselves
          are completely healthy.
        </Para>
        <Table
          headers={['Credential type', 'Typical rotation cadence', 'What breaks if it lapses']}
          rows={[
            ['Broker TLS certificate', '12 months, or shorter with automated issuance (30-90 days is common with an internal CA and automated renewal).', 'Every client fails the TLS handshake at once — a full outage, not a gradual degradation.'],
            ['Client mTLS certificate', 'Often shorter than broker certificates, especially with automated workload-identity issuance — sometimes hours to days.', 'That specific client can no longer connect; other clients are unaffected, making this easier to miss in monitoring focused on cluster-wide health.'],
            ['SASL/SCRAM credential', 'No hard technical expiration — rotation is a deliberate operational policy, commonly every 60-180 days for service accounts.', 'Nothing breaks automatically, which is exactly the risk — a credential that never rotates is a permanent, unchanging secret that only grows more valuable to compromise the longer it lives.'],
          ]}
        />
        <Callout title="Automate rotation before it becomes an incident, not after one" color="#ff4757">
          A certificate expiring in production is one of the most preventable Kafka outages there is — the
          expiration date is known the moment the certificate is issued. Teams that automate renewal (short-
          lived certificates reissued well before expiry, or calendar-based rotation jobs for SCRAM
          credentials) turn this into a non-event; teams that rotate manually, only when someone remembers,
          eventually miss one.
        </Callout>
        <SubTitle>Prefixed ACLs — granting access by naming convention instead of one topic at a time</SubTitle>
        <Para>
          Part 05 and Part 06 granted ACLs against a single, literal topic name. That is the right level of
          precision for a specific, known topic, but it does not scale cleanly to a team that legitimately
          owns dozens of topics under a shared naming prefix. Kafka's ACL model supports a prefixed resource
          pattern specifically for this case — a single rule that grants an operation on every topic whose
          name starts with a given prefix, rather than one rule per topic.
        </Para>
        <CodeBox label="a prefixed ACL for a team that owns every topic under a naming convention">
{`kafka-acls.sh --bootstrap-server broker1:9093 --command-config admin.properties --add \\
  --allow-principal User:fraud-platform-service \\
  --operation Read --operation Write --operation Describe \\
  --resource-pattern-type PREFIXED \\
  --topic fraud.

# This single rule covers fraud.orders, fraud.disputes,
# fraud.velocity-checks, and any future topic named fraud.anything
# — without needing a new ACL command every time the team adds a
# topic under its own naming convention.
#
# This is still least privilege, not a shortcut around it: the
# scope is bounded by the naming convention the team actually owns,
# not the whole cluster.`}
        </CodeBox>
        <Para>
          Prefixed ACLs are the right tool specifically when a team's topic-naming convention is already
          enforced and meaningful — if <code>fraud.</code> genuinely only ever contains topics that team owns,
          a prefixed grant is precise. If naming conventions are inconsistent or not enforced, a prefixed ACL
          can accidentally grant access to a topic that happens to share a prefix but belongs to a different
          team — which is why this tool is a deliberate trade of some precision for maintainability, not a
          default first choice.
        </Para>
        <SubTitle>Auditing existing ACLs — finding grants nobody remembers making</SubTitle>
        <Para>
          ACLs accumulate. A service that was decommissioned eighteen months ago often still has active
          grants sitting in the cluster's authorizer, because removing an ACL is rarely anyone's explicit
          responsibility the way adding one is. Periodically auditing the full ACL list against a current
          inventory of what services actually exist and what they actually need is the practical way this
          gets caught, since nothing in Kafka itself expires or flags a stale grant automatically.
        </Para>
        <CodeBox label="listing every ACL on the cluster for a periodic audit">
{`kafka-acls.sh --bootstrap-server broker1:9093 --command-config admin.properties --list

# A useful audit habit: cross-reference every principal that
# appears in this output against a current service registry or
# deployment inventory. A principal with active grants that no
# longer corresponds to a running service is exactly the kind of
# forgotten access this audit is meant to catch.`}
        </CodeBox>
        <Table
          headers={['Audit finding', 'Why it matters', 'Typical remediation']}
          rows={[
            ['A principal with grants but no corresponding running service', 'A credential that still works but that nobody is actively using or monitoring — an unnecessary, unwatched attack surface.', 'Revoke the ACL grants and, if the credential still exists, delete it via kafka-configs.sh.'],
            ['A wildcard or overly broad prefixed grant discovered during audit', 'Violates least privilege even if it was never actually misused — the blast radius exists whether or not it was exploited.', 'Narrow the grant to the specific topics actually in use, following the Part 06 pattern.'],
            ['Two services sharing one credential', 'Makes it impossible to attribute a specific action to a specific service, and revoking access for one forces revoking it for both.', 'Issue each service its own credential and its own ACL grants, even if their permissions end up identical.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Securing the wider ecosystem" />
        <SectionTitle>Beyond the Broker: Securing Kafka Connect, Schema Registry, and Admin Tooling</SectionTitle>
        <Para>
          A cluster's brokers are rarely the only pieces of Kafka infrastructure with access to real data.
          Kafka Connect workers move data in and out of external systems, schema registries hold the
          contracts every producer and consumer rely on to deserialize records correctly, and command-line
          admin tooling is often run from whatever laptop or CI runner happens to have credentials configured.
          Every one of these surfaces needs the same TLS, SASL, and least-privilege thinking already applied
          to brokers — a cluster with excellent broker security and an unauthenticated Connect REST API is
          not actually secure, it has simply moved the open door.
        </Para>
        <SubTitle>Kafka Connect — a connector often has more access than a typical producer or consumer</SubTitle>
        <Para>
          A Kafka Connect worker running a sink connector reads from Kafka and writes to an external system —
          a database, a cloud storage bucket, a downstream API. A source connector does the reverse. Because
          a single Connect cluster commonly runs many connectors for many different teams, it is easy for the
          worker's own Kafka client credentials to end up broader than any individual connector actually
          needs — a JDBC sink connector writing customer data to a warehouse and a low-stakes logging
          connector both authenticate through the same worker-level credential unless deliberately separated.
        </Para>
        <Table
          headers={['Connect surface', 'What needs securing', 'Common mistake']}
          rows={[
            ['Worker-to-broker connection', 'The Connect worker itself is a Kafka client — it needs its own SASL_SSL configuration and ACL grants, scoped per Part 05.', 'Running the whole Connect cluster with one broad credential that every connector implicitly shares, regardless of what each connector individually needs.'],
            ['Connect REST API', 'The HTTP API used to create, configure, and manage connectors — this is a separate surface from the Kafka protocol connection and needs its own authentication (basic auth or a proxy in front of it, at minimum).', 'Leaving the REST API open on an internal network with no authentication, reasoning that "internal" is sufficient protection — the same mistaken assumption covered in Part 01.'],
            ['Connector configuration secrets', 'Database passwords, API keys, and similar values a connector\'s configuration needs to reach its external system.', 'Storing these secrets in plaintext connector configuration rather than through Connect\'s config providers, which can pull secrets from a vault or secret manager at runtime instead of persisting them in the configuration itself.'],
          ]}
        />
        <SubTitle>Schema Registry — protecting the contract, not just the data</SubTitle>
        <Para>
          A schema registry is not just metadata storage — write access to it is effectively write access to
          every consumer's ability to correctly interpret every producer's messages. An unauthorized or
          unintended schema change registered against a subject can break every consumer of that topic
          simultaneously, which is a different but equally serious failure mode from a broker-level breach.
          Schema registries generally support their own authentication (often HTTP basic auth or mTLS) and
          their own authorization model for who can register new schema versions versus who can only read
          existing ones.
        </Para>
        <CodeBox label="the same least-privilege split applied to schema registry access">
{`# A producer team needs to REGISTER new schema versions for the
# subjects it owns, following its normal deployment process.
#
# Every consumer team only needs to READ schemas to deserialize
# messages -- almost no consumer should have permission to register
# a new schema version, since an unintended registration from a
# consumer-side credential can silently change what every other
# consumer of that topic receives.`}
        </CodeBox>
        <SubTitle>Admin tooling and CI credentials</SubTitle>
        <Para>
          The <code>kafka-acls.sh</code>, <code>kafka-configs.sh</code>, and <code>kafka-topics.sh</code>
          commands used throughout Parts 05 and 06 require their own <code>admin.properties</code> file with
          a credential — and that credential, by the nature of what these tools do, typically needs broad
          cluster-admin permissions. Where that credential lives matters: a long-lived admin credential
          checked into a CI pipeline's configuration, or left in a shared file on an infrastructure team's
          shared workstation, is a much larger risk than the same credential issued short-lived and pulled
          from a secret manager at the moment a deployment pipeline actually needs it.
        </Para>
        <Callout title="Admin credentials deserve the strictest handling of all" color="#ff4757">
          A compromised producer credential exposes one topic. A compromised broad-scope admin credential
          exposes every ACL, every topic configuration, and potentially every other credential's grants on
          the cluster. Treat admin-level Kafka credentials with at least the same rigor as cloud-provider
          root credentials — short-lived issuance where possible, never committed to source control, and
          used from automated pipelines rather than long-lived personal shells wherever feasible.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Multi-tenant clusters" />
        <SectionTitle>Multi-Tenant Clusters: Isolation Between Teams on Shared Infrastructure</SectionTitle>
        <Para>
          Most organizations running Kafka at any scale do not run one cluster per team. A single shared
          cluster serving many teams is more operationally efficient — fewer clusters to patch, upgrade, and
          monitor — but it introduces a requirement none of the single-team examples earlier in this module
          fully capture: teams on a shared cluster need to be protected from each other, not just from the
          outside world. A misconfigured or misbehaving producer from one team should not be able to read,
          write, or overwhelm another team's topics, even though both are authenticated, legitimate users of
          the same cluster.
        </Para>
        <SubTitle>Naming conventions as the backbone of multi-tenant ACLs</SubTitle>
        <Para>
          Part 10's prefixed ACL pattern is what makes multi-tenant isolation practical at scale. A cluster-
          wide naming convention — every team's topics living under a prefix that matches their team or
          service name — turns "grant this team access to its own topics" into a single prefixed ACL rule
          per team, rather than a manually maintained list that has to be updated every time a team creates a
          new topic. Without an enforced naming convention, this same isolation would require either far more
          ACL management overhead, or accepting broader, less precise grants as a shortcut.
        </Para>
        <CodeBox label="one prefixed ACL per team, on a cluster with an enforced naming convention">
{`# Team: fraud-platform, owns everything under fraud.
kafka-acls.sh --bootstrap-server broker1:9093 --command-config admin.properties --add \\
  --allow-principal User:fraud-platform-service \\
  --operation Read --operation Write --operation Describe \\
  --resource-pattern-type PREFIXED --topic fraud.

# Team: checkout-platform, owns everything under checkout.
kafka-acls.sh --bootstrap-server broker1:9093 --command-config admin.properties --add \\
  --allow-principal User:checkout-platform-service \\
  --operation Read --operation Write --operation Describe \\
  --resource-pattern-type PREFIXED --topic checkout.

# Neither team's principal has any grant, explicit or implicit,
# touching the other's topics -- deny-by-default (Part 05) means
# fraud-platform-service cannot even Describe a checkout.* topic
# unless a separate grant is added deliberately.`}
        </CodeBox>
        <SubTitle>Resource isolation beyond ACLs — quotas</SubTitle>
        <Para>
          ACLs solve who can touch what, but a shared cluster also needs to answer a related, separate
          question: can one team's traffic degrade another team's experience through sheer volume, even
          without touching the other team's topics at all? A producer sending an unexpectedly large burst of
          traffic can saturate broker network or request-handler capacity (Part 03) cluster-wide, affecting
          every tenant, not just the topics that team owns. Kafka's quota mechanism addresses this directly —
          per-principal (or per-client-id) limits on produce and consume byte rates, enforced by the broker
          independently of ACLs.
        </Para>
        <CodeBox label="setting a produce/consume quota for a specific tenant's principal">
{`kafka-configs.sh --bootstrap-server broker1:9093 --command-config admin.properties \\
  --alter --add-config 'producer_byte_rate=10485760,consumer_byte_rate=10485760' \\
  --entity-type users --entity-name checkout-platform-service

# checkout-platform-service is now capped at 10 MB/sec produce and
# 10 MB/sec consume. Exceeding this throttles that principal's
# requests -- it does not fail them outright -- protecting shared
# broker capacity from a single tenant's unexpected traffic spike
# without needing a separate cluster.`}
        </CodeBox>
        <Table
          headers={['Isolation mechanism', 'Protects against', 'Configured via']}
          rows={[
            ['ACLs (Part 05, Part 10, Part 11)', 'One tenant reading or writing another tenant\'s topics.', 'kafka-acls.sh grants, scoped by naming-convention prefix per team.'],
            ['Quotas', 'One tenant\'s traffic volume degrading shared broker capacity (network and request-handler saturation, Part 03) for every other tenant.', 'kafka-configs.sh per-principal producer_byte_rate / consumer_byte_rate.'],
            ['Separate clusters', 'Both of the above, plus noisy-neighbor effects at the level of disk I/O and JVM heap that quotas do not fully isolate.', 'Not a Kafka configuration at all — a deployment-topology decision, usually reserved for tenants with materially different reliability or compliance requirements than the shared cluster\'s baseline.'],
          ]}
        />
        <Para>
          The practical decision most platform teams face is not "ACLs or quotas" — both are needed together
          on any genuinely shared cluster. The decision is when a tenant's requirements (regulatory isolation,
          a fundamentally different availability target, or traffic at a scale that would dominate shared
          capacity regardless of quotas) justify the operational cost of a dedicated cluster instead of a
          shared one with strong ACL and quota boundaries.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — A pre-production security checklist" />
        <SectionTitle>Before a Cluster Goes Live: A Concrete Checklist</SectionTitle>
        <Para>
          Every concept in this module has a corresponding, checkable configuration item. Pulling them
          together into one ordered checklist is useful precisely because security work is easy to leave
          partially done — TLS gets configured, and the ACL step gets deferred as "we'll add that later,"
          and later never quite arrives before the cluster is already carrying production traffic. Treating
          this as a single go/no-go list before a cluster accepts real data closes that gap.
        </Para>
        <Table
          headers={['Checklist item', 'Confirms', 'Reference']}
          rows={[
            ['Every listener uses SASL_SSL — no PLAINTEXT or SASL_PLAINTEXT listener reachable outside an isolated test network', 'The channel is encrypted and every client is authenticated; no bypass listener exists on the same broker.', 'Part 04'],
            ['inter.broker.listener.name points at the TLS listener, and every broker trusts every other broker\'s certificate', 'Replication traffic between brokers is encrypted, not just client-facing traffic.', 'Part 02'],
            ['A SASL mechanism appropriate to the environment is chosen deliberately (SCRAM as the default, GSSAPI only where Kerberos already exists, mTLS where certificate automation already exists)', 'Authentication was a deliberate choice, not whatever was fastest to configure once, without considering the operational cost of the wrong mechanism for the environment.', 'Part 03'],
            ['Deny-by-default authorizer is enabled, and every service principal has explicit, narrowly-scoped ACL grants — no wildcard topic grants', 'No principal has broader access than its actual job requires.', 'Part 05, Part 06'],
            ['Consumer group ACLs are granted alongside topic ACLs for every consumer, not just topic-level Read', 'Consumers can actually commit offsets, not just fetch records — a common gap that only surfaces once a consumer tries to commit.', 'Part 05, Error Library'],
            ['Certificate and credential rotation is automated or scheduled, not manual-only', 'A certificate expiring unnoticed does not become a cluster-wide outage.', 'Part 09'],
            ['Disk-level or cloud-volume encryption is enabled on broker storage', 'Data at rest is protected against a stolen or improperly decommissioned disk, a threat TLS and SASL do not cover.', 'Part 07'],
            ['Kafka Connect, schema registry, and admin tooling each have their own authentication and least-privilege access, not an assumption that broker security covers them', 'The wider ecosystem around the brokers does not become the unprotected door into the same data.', 'Part 10'],
            ['On a shared cluster: naming-convention-based prefixed ACLs per tenant, plus per-principal quotas', 'Tenants are isolated from each other\'s access and from each other\'s traffic volume, not just from the outside world.', 'Part 11'],
            ['An existing ACL audit has been run at least once, with no orphaned grants for decommissioned services', 'The cluster\'s actual access matches its intended access, not an accumulation of forgotten historical grants.', 'Part 09'],
          ]}
        />
        <Callout title="A checklist is a floor, not a substitute for judgment" color={K}>
          Every item here maps to a concrete, verifiable configuration — but the right SASL mechanism, the
          right rotation cadence, and the right choice between a shared cluster with strong isolation versus
          a dedicated cluster are all judgment calls specific to an organization's actual constraints. Use
          this list to confirm nothing was silently skipped, not as a substitute for understanding why each
          item matters, which is what the rest of this module covers.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Responding to a suspected credential compromise" />
        <SectionTitle>Incident Response: What to Do When a Kafka Credential May Be Compromised</SectionTitle>
        <Para>
          Every layer this module has covered — TLS, SASL, ACLs, quotas, rotation — is preventive. It is
          still worth having a clear, rehearsed answer to a question every one of these layers exists to
          make less likely but cannot make impossible: a specific service's Kafka credential is suspected of
          being exposed — leaked in a log line, committed to a public repository, or extracted from a
          compromised host. What actually happens next, and in what order, determines whether this stays a
          contained, minor incident or becomes a much larger one.
        </Para>
        <SubTitle>The immediate response, in order</SubTitle>
        <Table
          headers={['Step', 'Action', 'Why this order']}
          rows={[
            ['1', 'Revoke the specific credential — delete the SCRAM user via kafka-configs.sh, or revoke the specific client certificate if using mTLS.', 'The fastest way to stop further misuse is removing the credential\'s ability to authenticate at all, before investigating scope — every minute a suspected-compromised credential remains valid is additional exposure.'],
            ['2', 'Review the ACL grants that credential held, per the Part 09 audit pattern, to understand exactly what it could have accessed.', 'Because grants were scoped narrowly per Part 06 and Part 11, this step should produce a short, specific list — a clear benefit of least privilege paying off during an actual incident rather than only in theory.'],
            ['3', 'Check broker and application-level logs for actual usage of that credential during the suspected exposure window.', 'Distinguishes "the credential was exposed but there is no evidence of misuse" from "the credential was actively used by someone other than the legitimate service" — these call for very different follow-up.'],
            ['4', 'Issue a new credential to the legitimate service and re-grant the same, narrowly-scoped ACLs it had before.', 'Restores the service to working order with a clean credential, using the same least-privilege grants that were already correct — this step should not be an opportunity to accidentally widen access "while we\'re in here."'],
            ['5', 'If evidence of actual misuse is found, review what topics were touched during the exposure window for data that may now need its own downstream response (customer notification, compliance review) independent of the Kafka-specific remediation.', 'A compromised Kafka credential is a data-access incident, not only an infrastructure incident — the two tracks (fixing the access, and assessing what was actually accessed) run in parallel, not sequentially.'],
          ]}
        />
        <CodeBox label="revoking a suspected-compromised SCRAM credential">
{`kafka-configs.sh --bootstrap-server broker1:9093 --command-config admin.properties \\
  --alter --delete-config 'SCRAM-SHA-512' \\
  --entity-type users --entity-name checkout-service

# The principal can no longer authenticate at all as of this
# command. Any ACL grants for User:checkout-service remain in the
# authorizer's rules but are now unreachable, since nothing can
# authenticate as that principal anymore -- they can be cleaned up
# as part of step 2's review, not urgently in the first moment.`}
        </CodeBox>
        <Callout title="Practicing this before it is needed is the actual point" color="#ff4757">
          The value of this sequence is not the specific commands — it is having them rehearsed and known
          before the 2 AM page, rather than being figured out live under pressure for the first time. A team
          that has actually run a credential-revocation drill once, on a non-production cluster, responds to
          a real suspected compromise measurably faster than a team relying on documentation nobody has ever
          followed end to end.
        </Callout>
        <SubTitle>What to look for in the logs during step 3</SubTitle>
        <Para>
          Step 3 of the sequence above — checking whether a suspected-compromised credential was actually
          used — depends on brokers logging enough detail to answer that question at all. Broker request
          logs, when enabled with sufficient verbosity, record the authenticated principal and the resource
          touched on every request; without this logging in place, step 3 has nothing to check against, and
          the investigation is reduced to "we don't know" for the exact window that matters most.
        </Para>
        <BulletList
          items={[
            'The authenticated principal on each request — confirms which credential was used, not just which IP address connected, since a shared or NAT-ed network can make IP-based attribution misleading on its own.',
            'The specific topic, partition, and operation (Produce, Fetch, Describe) for each request — distinguishes normal, expected traffic for that principal from something outside its usual pattern.',
            'The client host or IP alongside the principal — a credential authenticating from a host or network range it has never used before is a meaningful anomaly even if the operations themselves look otherwise normal.',
          ]}
        />
        <Para>
          This is the practical argument for enabling request-level logging before it is needed, not after —
          the same theme as Part 09's rotation guidance and this Part's rehearsal point. A credential-
          compromise investigation that has to first ask "do we even have the logs to check this" is starting
          from a significantly weaker position than one that can immediately query exactly what a specific
          principal did during a specific window.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Kafka Security</SectionTitle>
        {[
          {
            wrong: '"TLS alone means my Kafka cluster is secure"',
            right: 'Part 02 and Part 04 are explicit that plain SSL without mTLS encrypts the channel but leaves the broker unable to identify who is connecting. A private, anonymous connection is still an anonymous connection — ACLs from Part 05 have nothing to authorize against until SASL or mTLS establishes identity.',
          },
          {
            wrong: '"SASL/PLAIN is fine as long as I have a strong password"',
            right: 'Part 03 covers why the mechanism itself sends the credential essentially as plaintext inside the SASL exchange — password strength is irrelevant if the password crosses an unencrypted network. SASL/PLAIN is only safe layered on top of TLS, as SASL_SSL, regardless of password complexity.',
          },
          {
            wrong: '"Granting Read on a topic is enough for a consumer to work"',
            right: 'Part 05\'s worked ACL example shows the model requires two separate grants — Read on the topic and Read on the consumer group resource used to commit offsets. A consumer with only the topic-level grant still fails authorization the moment it tries to commit.',
          },
          {
            wrong: '"Kafka encrypts data on disk automatically once TLS is on"',
            right: 'Part 07 is direct about this: TLS only covers data in transit. Kafka has no built-in at-rest encryption for log segment files — that protection comes from the operating system or cloud storage layer, configured entirely outside Kafka.',
          },
          {
            wrong: '"ACLs are optional if the network is already private (VPC, internal-only)"',
            right: 'Part 01 frames this directly: "internal network" is rarely as isolated as assumed, and even inside a trusted network, ACLs are what stops one legitimate, authenticated service from reading or writing topics that have nothing to do with its job. Network isolation and ACLs solve different problems — a breach of one service\'s host should not automatically mean access to every topic on the cluster.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: FONT_MONO }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>At Datadog:</strong> a new internal service needs to publish infrastructure alert events
            to a shared Kafka cluster used by dozens of teams. The platform security team does not hand out
            a cluster-wide credential — following Part 05 and Part 06, they issue the service its own SCRAM
            credential and grant it <code>Write</code> and <code>Describe</code> on exactly the
            <code>alerts.raw</code> topic it needs, nothing else. Six months later, when that service has a
            bug that tries to write to an unrelated billing topic by mistake, the write is rejected with a
            <code>TopicAuthorizationException</code> instead of silently corrupting a topic it should never
            have touched — the ACL boundary caught an application bug, not just a malicious actor.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At PagerDuty:</strong> a security review flags that the Kafka cluster handling incident
            and notification events runs <code>SASL_PLAINTEXT</code> — SASL authentication is in place, but
            the connection itself is unencrypted. Per Part 04, this is treated as a real finding, not a
            formality: credentials and incident payloads containing customer contact information are
            crossing the network in the clear. The fix is a coordinated migration to <code>SASL_SSL</code> —
            issuing broker certificates, updating every client's truststore configuration, and cutting over
            listener by listener to avoid downtime.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Snowflake:</strong> an on-prem data pipeline team integrating with an existing
            enterprise Kafka cluster finds the organization already runs Active Directory-based Kerberos
            authentication for every internal system. Rather than introducing a separate SCRAM credential
            store just for this one pipeline, per Part 03 they configure the pipeline's Kafka client with
            SASL/GSSAPI, reusing the organization's existing Kerberos principals and ticket infrastructure —
            one identity system for the whole company, Kafka included, instead of a second credential store
            to manage and rotate separately.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. Explain the difference between authentication and authorization in Kafka, and which mechanisms handle each.',
            a: `Authentication answers "who is this client?" and is handled by SASL mechanisms (PLAIN, SCRAM, GSSAPI) or by mTLS, where the client's certificate itself serves as its identity, per Part 03. Authorization answers a completely separate question — "is this now-known identity allowed to do this specific operation on this specific resource?" — and is handled by ACLs, per Part 05.

These are genuinely independent layers. A client can be perfectly authenticated, with a valid SCRAM credential over SASL_SSL, and still be rejected on every request if no ACL grants it any operations — the broker knows exactly who it is and still says no. Conversely, disabling authentication entirely (PLAINTEXT) makes ACLs meaningless, since there's no reliable identity for the authorizer to check the rules against.

I'd also flag that TLS is a third, separate concern from both — it protects confidentiality of the bytes on the wire, and only becomes an identity mechanism if used as mTLS specifically.`,
          },
          {
            q: 'Q2. Why is SASL_SSL considered the production baseline instead of just SSL or just SASL_PLAINTEXT?',
            a: `Per Part 04, security.protocol is really answering two independent questions — is the channel encrypted, and is the client authenticated — and SASL_SSL is the only one of the four combinations that answers yes to both.

Plain SSL without mTLS encrypts the channel but leaves every client anonymous from the broker's point of view, which means ACLs have nothing meaningful to check against — you can prevent eavesdropping but not distinguish one client's permissions from another's. SASL_PLAINTEXT establishes identity but sends everything, including in some mechanisms the SASL exchange itself, over an unencrypted channel — the credential and payload data are both exposed to network observation.

SASL_SSL closes both gaps at once: TLS protects the data in flight, and the SASL exchange running inside that encrypted channel establishes a real, checkable identity that ACLs can then authorize against. That's why it's the standard production recommendation rather than either half alone.`,
          },
          {
            q: 'Q3. A consumer with a valid SCRAM credential and a Read ACL on the topic still can\'t consume — what\'s the most likely cause?',
            a: `The most likely cause, per Part 05's worked ACL example, is a missing second grant: Kafka's authorization model checks Read on the topic and Read on the consumer group resource as two separate rules. A consumer needs to commit offsets through its consumer group, and that's a distinct resource from the topic itself in the ACL model — granting only the topic-level Read is a very common, easy-to-miss gap.

I'd check the group ACL first with kafka-acls.sh --list scoped to that group name. If that's missing, adding a Read grant on the specific consumer group ID the client uses resolves it.

Secondary things I'd also check: whether the consumer group ID in the client config exactly matches the ACL's group name (a typo here produces the same symptom), and whether the ACL was added with the correct resource pattern type (literal vs prefixed) if the cluster uses prefixed ACLs for naming-convention-based grants.`,
          },
          {
            q: 'Q4. When would you choose SASL/SCRAM over mTLS for service-to-service authentication, or the reverse?',
            a: `This mostly comes down to what identity infrastructure already exists, per Part 03's mechanism comparison. SCRAM is simpler to stand up when there's no existing certificate-issuance pipeline — it's a username and a salted-hash credential managed directly through Kafka's own tooling, with no separate PKI to build.

mTLS makes more sense when an organization already has automated, short-lived certificate issuance for service identity — something like an internal certificate authority integrated with a service mesh or workload identity system. In that world, reusing the same certificates for Kafka authentication avoids maintaining a second, parallel credential system, and short-lived certificates rotate more gracefully than long-lived SCRAM passwords that need manual or scripted rotation.

I would not introduce a brand-new PKI just for Kafka if nothing else in the organization uses one — that's usually more operational overhead than SCRAM, for the same practical security outcome. The right answer is almost always "whichever one the organization already has strong tooling for."`,
          },
          {
            q: 'Q5. Someone proposes granting a new service Write access with --topic \'*\' to save time during onboarding. How would you respond?',
            a: `I'd push back, and explain the specific risk rather than just citing "least privilege" as a rule. Per Part 05, a wildcard Write grant means that if this service has a bug, a compromised dependency, or is simply misconfigured to point at the wrong topic name, it can write to — and corrupt — any topic on the entire cluster, including ones with no relationship to its actual job. That blast radius is completely avoidable.

The fix that doesn't sacrifice onboarding speed: grant Write on the specific topic (or topics) the service actually produces to, which is usually already known at onboarding time since someone had to design what the service does. If the list of topics is genuinely dynamic or large, Kafka's ACLs support prefixed resource patterns — granting Write on all topics matching a naming prefix the team owns — which is still far narrower than a full wildcard across the cluster.

I'd also note that the earlier example in Part 06, where an ACL boundary caught an application bug trying to write to an unrelated topic, only works because the grant was scoped narrowly in the first place — a wildcard grant would have let that bug through silently.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>The Mistakes That Leave Kafka Clusters Exposed</SectionTitle>
        {[
          {
            q: 'Running PLAINTEXT (or SASL_PLAINTEXT) anywhere reachable beyond a fully isolated local test',
            a: 'Part 01 and Part 04 both make the same point from different angles: "internal network" is almost never as isolated as assumed, and any listener without encryption is a real exposure the moment the cluster leaves a single laptop. Default every non-trivial environment to SASL_SSL from the start.',
          },
          {
            q: 'Disabling ssl.endpoint.identification.algorithm to make a TLS connection error go away',
            a: 'Part 02 covers exactly why this shortcut is dangerous — it removes hostname verification, the specific check that prevents a different machine on the network from presenting a valid-but-wrong certificate and impersonating the broker. Fix the certificate\'s SAN entries instead.',
          },
          {
            q: 'Using SASL/PLAIN over SASL_PLAINTEXT instead of SASL_SSL',
            a: 'Part 03 is explicit that PLAIN sends credentials essentially as plaintext inside the SASL exchange — no password strength compensates for an unencrypted channel. PLAIN is only acceptable layered on top of TLS.',
          },
          {
            q: 'Granting wildcard ACLs (--topic \'*\') to speed up onboarding a new service',
            a: 'Interview Prep Q5 and Part 05 both cover the real cost: a wildcard grant means one buggy or compromised service can read or write any topic on the cluster, defeating the entire purpose of having ACLs. Grant the specific topics (or a naming-prefix pattern) the service actually needs.',
          },
          {
            q: 'Assuming TLS plus SASL means data is protected everywhere, including on disk',
            a: 'Part 07 is direct that Kafka has no built-in at-rest encryption — TLS and SASL protect data only while it is moving across the network. A stolen or improperly decommissioned disk still exposes raw log segment data unless the operating system or cloud storage layer encrypts it separately.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>
        {[
          {
            error: `Client fails to connect with "javax.net.ssl.SSLHandshakeException: PKIX path building failed" or similar`,
            cause: 'The client\'s truststore does not contain the certificate authority that signed the broker\'s certificate, so the TLS handshake cannot establish a chain of trust — per Part 02, this is the client refusing to trust a certificate it has no basis to trust, which is the check working correctly, not a bug.',
            fix: 'Import the correct CA certificate (or the broker\'s self-signed certificate, for internal/dev clusters) into the client\'s ssl.truststore.location file, and confirm the truststore password is set correctly. Do not respond by disabling certificate validation entirely — that removes the protection this error exists to enforce.',
          },
          {
            error: `Client authenticates successfully but every produce or fetch request fails with TopicAuthorizationException`,
            cause: 'Per Part 05, authentication and authorization are checked independently — a valid SASL credential or client certificate only proves identity, and this error means no ACL grants that now-known identity permission on the topic it is trying to use. With deny-by-default, the absence of a grant is the same as an explicit denial.',
            fix: 'Run kafka-acls.sh --list --topic <name> to see what is currently granted, and add the specific Read or Write (plus Describe) grant for the exact principal name the client authenticates as. Confirm the principal name matches exactly — a mismatched username or certificate DN produces this same error.',
          },
          {
            error: `A consumer authenticates and has Read on the topic, but still gets GroupAuthorizationException when it tries to poll`,
            cause: 'As covered in Part 05 and Interview Prep Q3, Kafka checks Read on the consumer group resource separately from Read on the topic resource — a grant on one does not imply the other, since committing offsets is treated as a distinct operation on a distinct resource.',
            fix: 'Add a second ACL granting Read on the specific consumer group ID (group.id) the client is configured with, matching the exact string used in the client config.',
          },
          {
            error: `SASL authentication fails with "Authentication failed: Invalid username or password" even though the credential was just created`,
            cause: 'Most commonly, the client\'s sasl.mechanism does not match the mechanism the credential was actually created for — for example, a credential created as SCRAM-SHA-512 but a client configured for SCRAM-SHA-256, or a PLAIN-configured client attempting to authenticate against a user that only has a SCRAM credential set up.',
            fix: 'Confirm sasl.mechanism in the client configuration exactly matches how the credential was provisioned via kafka-configs.sh, and confirm the JAAS configuration references the correct username. Mismatched mechanisms fail with a generic authentication error rather than a specific "wrong mechanism" message, which makes this easy to misdiagnose as a typo\'d password.',
          },
          {
            error: `Two brokers in the same cluster refuse to replicate to each other after enabling TLS`,
            cause: 'inter.broker.listener.name was left pointing at a plaintext listener, or one broker\'s certificate is not trusted by the other broker\'s truststore — per Part 02, broker-to-broker replication traffic is a TLS connection in its own right and needs the same trust configuration as client-facing traffic, which is easy to overlook when focus is on client connectivity first.',
            fix: 'Set inter.broker.listener.name explicitly to the SSL or SASL_SSL listener name on every broker, and confirm every broker\'s truststore includes the CA that signed every other broker\'s certificate — not just the CA for client certificates, if those are issued separately.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: 'var(--red,#ff4757)', marginBottom: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.5 }}>
              {item.error}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: FONT_MONO, letterSpacing: '.1em', textTransform: 'uppercase' }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: FONT_MONO, letterSpacing: '.1em', textTransform: 'uppercase' }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      <KeyTakeaways
        items={[
          'A default, unsecured Kafka broker (PLAINTEXT, no ACLs) lets anyone who can reach the port read and write any topic — this is a real production risk, not a theoretical one, the moment the broker is reachable beyond an isolated single-machine test.',
          'TLS encrypts data in transit using a keystore (the broker\'s own certificate) and a truststore (which CAs are trusted); it protects confidentiality but, without mTLS, does not by itself establish client identity.',
          'SASL/PLAIN sends credentials essentially as plaintext and must always run over TLS (SASL_SSL). SASL/SCRAM is a safer default — a salted challenge-response exchange that never sends the password itself. SASL/GSSAPI integrates with existing Kerberos/Active Directory deployments. mTLS uses the client\'s certificate itself as its identity.',
          'security.protocol has four combinations of encrypted/authenticated; SASL_SSL is the only one that is both, which is why it is the real production baseline — SSL alone leaves clients anonymous, and SASL_PLAINTEXT leaves the channel exposed.',
          'ACLs authorize what an already-authenticated principal can do, at the level of a specific operation (Read, Write, Describe, Create, Delete, Alter) on a specific resource (a topic or consumer group). Kafka is deny-by-default — no grant means no access.',
          'Reading a topic requires two separate ACL grants in Kafka\'s model: Read on the topic and Read on the consumer group used to commit offsets. Missing the group-level grant is one of the most common real-world ACL misconfigurations.',
          'Least privilege means granting each service account only the specific topics and operations its job requires — wildcard grants (--topic \'*\') defeat the purpose of ACLs by giving any bug or compromise in that service a cluster-wide blast radius.',
          'Kafka has no built-in encryption at rest — log segment files on disk are protected, if at all, by the underlying operating system or cloud storage layer (disk/volume encryption), a separate concern from TLS in transit.',
          'A production-grade deployment stacks all four layers — TLS, SASL, ACLs, and disk encryption — because each protects against a distinct threat and none substitutes for the others; skipping any one leaves a specific, well-understood gap.',
        ]}
      />
    </LearnLayout>
  )
}
