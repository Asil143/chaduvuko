import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Cryptography From Scratch | Chaduvuko',
  description: 'Symmetric, asymmetric, hashing, digital signatures — practical understanding of what protects and what breaks. No math degree required.',
}

const C = '#ff4757'

const Part = ({ n, title }: { n: string; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// Part {n}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
)

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
)

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
)

const Hl = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: C }}>{children}</strong>
)

const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />

const IQ = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ background: `${C}10`, border: `1px solid ${C}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const Err = ({ msg, cause, fix }: { msg: string; cause: string; fix: string }) => (
  <div style={{ marginBottom: 24, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
    <div style={{ background: 'rgba(255,71,87,0.09)', borderBottom: '1px solid var(--border)', padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#ff4757', wordBreak: 'break-all', lineHeight: 1.6 }}>{msg}</div>
    <div style={{ padding: '14px 16px' }}>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 8px' }}><strong style={{ color: 'var(--text)' }}>Cause: </strong>{cause}</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}><strong style={{ color: '#00e676' }}>Fix: </strong>{fix}</p>
    </div>
  </div>
)

const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${C}08`, border: `1px solid ${C}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>🎯 Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)

const Block = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', lineHeight: 1.75, color: 'var(--text)', margin: '0 0 20px' }}>{children}</pre>
)

export default function CryptographyFundamentals() {
  return (
    <LearnLayout
      title="Cryptography From Scratch"
      description="Symmetric, asymmetric, hashing, digital signatures — practical understanding of what protects and what breaks. No math degree required."
      section="Cybersecurity — Module 04"
      readTime="32 min"
      updatedAt="May 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What Cryptography Actually Does" />

      <P>Cryptography is the discipline of transforming information so that only intended parties can read it. The word comes from Greek: <em>kryptos</em> (hidden) + <em>graphein</em> (to write). For security engineers, cryptography is not primarily a mathematical topic — it is a tool. You need to know which tool does what, when each one breaks, and why choosing the wrong one destroys the security guarantee you thought you had.</P>

      <P>Modern cryptography provides four security properties:</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, margin: '4px 0 28px' }}>
        {[
          { prop: 'Confidentiality', color: '#4285f4', icon: '🔒', desc: 'Only the intended recipient can read the message. Encryption provides this. An eavesdropper who intercepts the ciphertext learns nothing about the plaintext.' },
          { prop: 'Integrity', color: '#00e676', icon: '✅', desc: 'The message was not modified in transit. Hash functions and MACs provide this. Any modification to the data changes the hash — the receiver detects tampering.' },
          { prop: 'Authentication', color: '#f97316', icon: '🪪', desc: 'The message came from who it claims to be from. Digital signatures and MACs provide this — the sender proves knowledge of a secret key.' },
          { prop: 'Non-repudiation', color: '#7b61ff', icon: '📋', desc: 'The sender cannot later deny having sent the message. Digital signatures (but not symmetric MACs) provide this — only the holder of the private key could have signed.' },
        ].map((item) => (
          <div key={item.prop} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: item.color, marginBottom: 6 }}>{item.prop}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.65 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <P>No single cryptographic primitive provides all four. This is why real security systems combine multiple primitives — a TLS connection uses symmetric encryption (confidentiality), a MAC (integrity + authentication), and certificates (authentication + non-repudiation). Understanding which primitive provides which property is the foundation of cryptographic engineering.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Symmetric Encryption — One Key for Everything" />

      <P>Symmetric encryption uses the same key for both encryption and decryption. Think of a physical safe with one key: whoever has the key can lock and unlock it. The security guarantee: without the key, the ciphertext is computationally indistinguishable from random noise — an attacker learns nothing.</P>

      <H>How AES Works — Without the Math</H>
      <P><Hl>AES (Advanced Encryption Standard)</Hl> is the gold standard symmetric cipher. It operates on fixed 128-bit blocks of data using a key of 128, 192, or 256 bits. Here is the conceptual model:</P>

      <Block>{`Plaintext (128 bits = 16 bytes)  +  Key (128/192/256 bits)
                   ↓
         [10/12/14 rounds of:]
           1. SubBytes   — replace each byte using a lookup table (S-box)
           2. ShiftRows  — shift rows of the 4×4 byte matrix cyclically
           3. MixColumns — linear transformation across each column
           4. AddRoundKey — XOR with the round key derived from the main key
                   ↓
         Ciphertext (128 bits) — looks like random noise without the key`}</Block>

      <P>AES-256 is considered quantum-resistant to a significant degree — even with a quantum computer using Grover's algorithm, the effective security is reduced from 256 to 128 bits, which remains computationally infeasible to brute force. AES has been the standard since 2001, survived extensive cryptanalysis, and no practical attack against a correctly implemented AES-256 exists today.</P>

      <H>Block Cipher Modes — Where Things Go Wrong</H>
      <P>AES encrypts exactly 128 bits at a time. Real data is longer. The <Hl>mode of operation</Hl> determines how AES is applied repeatedly to longer data. Choosing the wrong mode destroys security even though the underlying cipher is strong.</P>

      <div style={{ display: 'grid', gap: 12, margin: '0 0 24px' }}>
        {[
          {
            mode: 'ECB — Electronic Codebook',
            color: '#ff4757',
            safe: false,
            desc: 'Each 128-bit block is encrypted independently with the same key. Identical plaintext blocks produce identical ciphertext blocks. This means patterns in the plaintext are visible in the ciphertext — the famous "ECB penguin" demonstrates this: encrypting an image with ECB produces a recognisable silhouette despite being "encrypted."',
            verdict: 'Never use ECB. It is textbook insecure.',
          },
          {
            mode: 'CBC — Cipher Block Chaining',
            color: '#f97316',
            safe: false,
            desc: 'Each plaintext block is XORed with the previous ciphertext block before encryption. This eliminates the pattern problem. However, CBC requires a random initialisation vector (IV) that must be unpredictable and unique per encryption. Weak IVs enable the BEAST attack (CVE-2011-3389). CBC is also vulnerable to padding oracle attacks.',
            verdict: 'Avoid for new systems. Legacy systems still use it.',
          },
          {
            mode: 'CTR — Counter Mode',
            color: '#facc15',
            safe: true,
            desc: 'Turns AES into a stream cipher: a counter is encrypted with the key, producing a keystream XORed with the plaintext. Does not require padding. Parallel encryption possible. The critical constraint: the counter + key combination must never be reused — nonce reuse catastrophically breaks CTR and leaks the XOR of two plaintexts.',
            verdict: 'Acceptable but use GCM instead.',
          },
          {
            mode: 'GCM — Galois/Counter Mode',
            color: '#00e676',
            safe: true,
            desc: 'CTR mode + GHASH authentication. GCM provides both encryption (confidentiality) and a Message Authentication Code (integrity + authentication) in one operation. This is AEAD — Authenticated Encryption with Associated Data. The authentication tag detects any tampering with the ciphertext. Used in TLS 1.3, SSH, and modern protocols.',
            verdict: '✓ Use AES-256-GCM. This is the correct choice.',
          },
        ].map((item) => (
          <div key={item.mode} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '14px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: item.color }}>{item.mode}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: item.safe ? '#00e676' : '#ff4757', background: item.safe ? 'rgba(0,230,118,0.1)' : 'rgba(255,71,87,0.1)', padding: '2px 8px', borderRadius: 4, fontFamily: 'var(--font-mono)' }}>{item.safe ? 'SAFE' : 'AVOID'}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 8 }}>{item.desc}</div>
            <div style={{ fontSize: 12, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.verdict}</div>
          </div>
        ))}
      </div>

      <H>The Key Distribution Problem</H>
      <P>Symmetric encryption has a fundamental problem: both parties need the same key, but they have to share it over an insecure channel. If you and a server have never communicated before, how do you agree on a secret key without an eavesdropper learning it? This is the key distribution problem. It is the reason asymmetric cryptography was invented.</P>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Asymmetric Encryption — Two Keys, Different Jobs" />

      <P>Asymmetric (public-key) cryptography uses a mathematically linked key pair: a <Hl>public key</Hl> that can be freely shared, and a <Hl>private key</Hl> that must never leave your possession. The fundamental property: what one key encrypts, only the other key can decrypt.</P>

      <H>How RSA Works — Conceptually</H>
      <P>RSA's security rests on a mathematical asymmetry: it is easy to multiply two large prime numbers together, but computationally hard to factor the result back into the original primes. This is called the integer factorisation problem.</P>

      <Block>{`Key generation:
  1. Choose two large prime numbers p and q (each 1024+ bits)
  2. Compute n = p × q  (the modulus — this is public)
  3. Compute φ(n) = (p-1)(q-1)  (kept secret)
  4. Choose e (public exponent, usually 65537)
  5. Compute d such that e × d ≡ 1 (mod φ(n))  (private exponent)

Public key:  (n, e)  — safe to share with the world
Private key: (n, d)  — never share

Encryption:  ciphertext = plaintext^e mod n   (anyone can do this with public key)
Decryption:  plaintext = ciphertext^d mod n   (only holder of d can do this)

Why it works: recovering d from (n, e) requires factoring n back into p and q
              With a 2048-bit n, this takes longer than the age of the universe
              on classical computers`}</Block>

      <H>RSA in Practice</H>
      <P>RSA is not used to encrypt large data — it is slow and limited to encrypting data smaller than the key size. The standard pattern: use RSA to encrypt a randomly generated AES key (called key encapsulation), then use that AES key to encrypt the actual data. The recipient uses their RSA private key to recover the AES key, then uses AES to decrypt the data. This hybrid approach combines RSA's key distribution capability with AES's speed.</P>

      <H>Elliptic Curve Cryptography (ECC) — The Modern Standard</H>
      <P>ECC achieves the same security as RSA with much shorter keys, by basing security on the elliptic curve discrete logarithm problem. A 256-bit ECC key provides equivalent security to a 3072-bit RSA key. This means smaller keys, faster operations, and less computational overhead — which is why ECC has largely replaced RSA in modern systems.</P>

      <Block>{`Key size equivalents:
RSA 1024 bits  ≈ ECC 160 bits  (now broken — do not use)
RSA 2048 bits  ≈ ECC 224 bits  (minimum acceptable)
RSA 3072 bits  ≈ ECC 256 bits  ← NIST P-256 — current standard
RSA 7680 bits  ≈ ECC 384 bits  ← for highly sensitive applications

Common ECC curves used in practice:
P-256 (NIST)    — TLS, certificates, FIDO2
P-384 (NIST)    — higher security requirements
X25519          — Diffie-Hellman key exchange in TLS 1.3
Ed25519         — SSH keys, code signing`}</Block>

      <H>Diffie-Hellman Key Exchange — Sharing a Secret in Public</H>
      <P>Diffie-Hellman (DH) solves the key distribution problem: two parties can agree on a shared secret over a public channel without ever transmitting the secret itself, even though an eavesdropper can see all their messages.</P>

      <Block>{`Analogy using colours (simplified):
  1. Alice and Bob agree on a public colour: Yellow (visible to Eve)
  2. Alice picks a secret colour: Red. Mixes with Yellow → Orange (sends to Bob)
  3. Bob picks a secret colour: Blue. Mixes with Yellow → Green (sends to Alice)
  4. Alice mixes Bob's Green with her secret Red → Brown
  5. Bob mixes Alice's Orange with his secret Blue → Brown (same!)
  Eve sees: Yellow, Orange, Green — but cannot derive Brown without a secret colour

In math: the "mixing" is modular exponentiation
  The shared secret that Alice and Bob both arrive at is used as a symmetric key
  Eve, who watched everything, cannot compute it without solving the DLP`}</Block>

      <P><Hl>Ephemeral Diffie-Hellman (DHE / ECDHE)</Hl> generates new key pairs for every session. This provides <Hl>Perfect Forward Secrecy (PFS)</Hl>: if a server's private key is compromised in the future, an attacker who recorded past traffic cannot decrypt it, because each session used a different ephemeral key that no longer exists. TLS 1.3 mandates ECDHE — it removed all non-forward-secret cipher suites.</P>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Hash Functions — One-Way Transformations" />

      <P>A cryptographic hash function takes input data of any size and produces a fixed-size output (the hash or digest). The critical properties:</P>

      <div style={{ display: 'grid', gap: 12, margin: '0 0 24px' }}>
        {[
          { prop: 'Deterministic', color: '#4285f4', desc: 'The same input always produces the same output. Hash("hello") always equals the same 256-bit string.' },
          { prop: 'One-way (preimage resistance)', color: '#00e676', desc: 'Given a hash output, it is computationally infeasible to find the input. You cannot reverse a hash function — you can only guess inputs and compare.' },
          { prop: 'Avalanche effect', color: '#f97316', desc: 'A tiny change in input causes a completely different output. Hash("hello") and Hash("hello!") share no recognisable bits in common.' },
          { prop: 'Collision resistance', color: '#7b61ff', desc: 'It is computationally infeasible to find two different inputs that produce the same output. A collision breaks the integrity guarantee.' },
          { prop: 'Fixed output size', color: '#facc15', desc: 'SHA-256 always produces 256 bits. MD5 always produces 128 bits. Input size does not affect output size.' },
        ].map((item) => (
          <div key={item.prop} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: item.color, minWidth: 160 }}>{item.prop}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <H>Hash Algorithm Comparison</H>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Algorithm', 'Output Size', 'Speed', 'Status', 'Use For'].map((h) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['MD5', '128 bits', 'Very fast', 'BROKEN', 'Checksums only — never security', '#ff4757'],
              ['SHA-1', '160 bits', 'Fast', 'BROKEN', 'Legacy compatibility only', '#ff4757'],
              ['SHA-256', '256 bits', 'Fast', 'SAFE', 'File integrity, TLS, HMAC', '#00e676'],
              ['SHA-512', '512 bits', 'Fast (64-bit CPU)', 'SAFE', 'High-security contexts', '#00e676'],
              ['SHA-3', '224-512 bits', 'Moderate', 'SAFE', 'Future-proof alternative', '#00e676'],
              ['bcrypt', '60 chars', 'Deliberately slow', 'SAFE', 'Password hashing only', '#00e676'],
              ['Argon2', '256 bits', 'Deliberately slow', 'SAFE', 'Password hashing — winner of PHC', '#00e676'],
            ].map(([algo, size, speed, status, use, color], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{algo}</td>
                <td style={{ padding: '10px 14px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12, borderBottom: '1px solid var(--border)' }}>{size}</td>
                <td style={{ padding: '10px 14px', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{speed}</td>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: color as string, fontSize: 12, borderBottom: '1px solid var(--border)' }}>{status}</td>
                <td style={{ padding: '10px 14px', color: 'var(--muted)', fontSize: 12, borderBottom: '1px solid var(--border)' }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>Why Password Hashing Is Different</H>
      <P>SHA-256 is designed to be fast — a GPU can compute billions of SHA-256 hashes per second. This is catastrophic for password storage. An attacker with a breached database of SHA-256 password hashes can test every word in a dictionary, every combination of words, and every common password pattern in minutes.</P>

      <P>Password hashing algorithms like <Hl>bcrypt</Hl>, <Hl>scrypt</Hl>, and <Hl>Argon2</Hl> are deliberately slow and memory-intensive. Argon2 is configurable — increasing the cost parameter makes each hash take longer. A hash that takes 100ms on a legitimate login server takes 100ms per guess on an attacker's GPU — turning a database with a million passwords into a years-long cracking job rather than an hours-long one.</P>

      <Block>{`# Password hash formats in the wild
$2y$12$rounds...  → bcrypt with 12 rounds (2^12 = 4096 iterations)
$argon2id$...     → Argon2id — recommended for new systems
$6$rounds=656000$ → SHA-512 crypt (Linux /etc/shadow) — acceptable

# Never store passwords as:
SHA-256(password)  → cracked in seconds (rainbow tables, GPU)
MD5(password)      → cracked in milliseconds
plaintext          → this happens more than you would think`}</Block>

      <H>HMAC — Authentication with Hash Functions</H>
      <P>A hash alone cannot authenticate a message — anyone can compute SHA-256(data). To prove the message came from someone with a specific key, you use HMAC (Hash-based Message Authentication Code):</P>

      <Block>{`HMAC-SHA256(key, message) = SHA256(key ⊕ opad || SHA256(key ⊕ ipad || message))
# The key is mixed into the hash so only the key holder can produce the same output

# Use cases:
# - JWT (JSON Web Tokens) signature verification
# - API authentication (AWS Signature, webhook validation)
# - Cookie integrity (signed cookies)
# - Message integrity in TLS and SSH`}</Block>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Digital Signatures — Proving Authorship" />

      <P>A <Hl>digital signature</Hl> provides authentication and non-repudiation using asymmetric cryptography. It proves two things: the message came from the holder of a specific private key, and the message has not been modified since signing.</P>

      <H>How Signing Works</H>
      <Block>{`Signing (done by sender with PRIVATE key):
  1. Hash the message: h = SHA256(message)
  2. Encrypt the hash with the sender's private key: signature = RSA_decrypt(privateKey, h)
     Note: "encrypt with private key" = signing (counterintuitive naming)
  3. Send (message + signature) to the receiver

Verification (done by receiver with PUBLIC key):
  1. Hash the received message: h' = SHA256(received_message)
  2. Decrypt the signature with the sender's PUBLIC key: h = RSA_encrypt(publicKey, signature)
  3. Compare h and h'
     If h == h': the message was signed by the private key owner and was not modified
     If h != h': the message was tampered with or was not signed by the claimed sender`}</Block>

      <H>Digital Certificates — Binding Public Keys to Identity</H>
      <P>A public key is just a number. Without a way to verify which person or organisation that key belongs to, public key cryptography is vulnerable to impersonation. Digital certificates solve this by binding a public key to an identity (a domain name, an organisation, a person) with a trusted third party's signature.</P>

      <Block>{`X.509 Certificate structure (simplified):
  Subject:        CN=bank.example.com          ← who this certificate is for
  Public Key:     RSA 2048-bit key material    ← the key being certified
  Issuer:         DigiCert TLS RSA SHA256 CA   ← who signed this certificate
  Valid From:     2026-01-01
  Valid Until:    2027-01-01
  Extensions:
    SAN:          bank.example.com, www.bank.example.com  ← additional names
    Key Usage:    Digital Signature, Key Encipherment
  Signature:      [DigiCert's signature over all of the above]`}</Block>

      <H>The Chain of Trust</H>
      <P>A certificate is only trustworthy if the issuer is trustworthy. Certificates form a chain:</P>

      <div style={{ display: 'flex', gap: 0, margin: '0 0 24px', flexDirection: 'column' }}>
        {[
          { name: 'Root CA', desc: 'Self-signed — trusted because your browser/OS ships with its public key built in. About 150 root CAs are trusted by major browsers.', color: '#facc15' },
          { name: 'Intermediate CA', desc: 'Signed by the Root CA. Root CAs issue certificates to intermediate CAs rather than directly to websites, limiting Root CA exposure.', color: '#f97316' },
          { name: 'End-Entity Certificate', desc: 'The certificate for bank.example.com, signed by the Intermediate CA. This is what your browser validates.', color: '#00e676' },
        ].map((item, i) => (
          <div key={i}>
            <div style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '12px 18px', marginLeft: i * 24 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: item.color, marginBottom: 4 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.65 }}>{item.desc}</div>
            </div>
            {i < 2 && <div style={{ marginLeft: i * 24 + 24, fontSize: 16, color: 'var(--muted)', padding: '4px 0', lineHeight: 1 }}>↓ signs</div>}
          </div>
        ))}
      </div>

      <P>Certificate validation: your browser downloads the certificate, checks the signature against the Intermediate CA's public key, checks the Intermediate CA's certificate against the Root CA's public key, and verifies that the Root CA is in its trusted store. Any break in the chain — expired certificate, untrusted issuer, mismatched domain — causes the browser to reject the connection.</P>

      <ProTip>The CA system has a single structural weakness: any of the ~150 trusted root CAs can issue a certificate for any domain. If a CA is compromised or coerced by a government, it can issue fraudulent certificates for google.com, github.com, or any other domain. Certificate Transparency (CT) logs address this partially by making all issued certificates publicly auditable — a fraudulent certificate becomes detectable, even if not preventable.</ProTip>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="How These Primitives Combine in Real Systems" />

      <H>TLS 1.3 — A Real Cryptographic Protocol</H>
      <Block>{`TLS 1.3 Handshake:

Client → Server: ClientHello
  Supported cipher suites: [TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256]
  Key exchange: ECDHE with X25519 (ephemeral key — new for every session)
  Client random: 32 bytes

Server → Server: (Generates ephemeral ECDHE key pair)

Server → Client: ServerHello
  Selected cipher: TLS_AES_256_GCM_SHA384
  Server's ECDHE public key
  Certificate (signed by CA — proves server identity)
  Certificate Verify (signature of the handshake with server's private key)
  Finished (HMAC of all handshake messages)

[Both derive the same shared secret via ECDHE — Diffie-Hellman]

Client → Server: Finished (HMAC confirms client received identical handshake)

[All subsequent traffic encrypted with AES-256-GCM]
[Session keys derived from the ECDHE shared secret — discarded after session]`}</Block>

      <P>What each primitive does here: <Hl>ECDHE</Hl> solves key distribution (both derive the same session key without transmitting it). <Hl>AES-256-GCM</Hl> provides confidentiality and integrity for the session data. <Hl>The certificate + signature</Hl> provides authentication (this is actually the server you intended to reach). <Hl>HMAC-SHA384</Hl> verifies the handshake was not tampered with. Remove any one primitive and the security guarantee collapses.</P>

      <H>SSH Key Authentication</H>
      <Block>{`1. Server sends a random challenge
2. Client signs the challenge with their Ed25519 private key
3. Server verifies the signature against the stored public key
4. Verified = authenticated. No password exchanged.

Why this is secure:
- The private key never leaves the client machine
- A network observer sees only the challenge and signature — cannot derive the private key
- A stolen authorized_keys file is useless without the private key`}</Block>

      <H>JWT — JSON Web Tokens</H>
      <Block>{`JWT format: header.payload.signature
All three parts are Base64url-encoded

Header: {"alg": "HS256", "typ": "JWT"}
Payload: {"sub": "user123", "role": "admin", "exp": 1777777777}
Signature: HMAC-SHA256(secret, base64(header) + "." + base64(payload))

Verification:
  1. Decode header — get algorithm
  2. Recompute signature using the server's secret key
  3. Compare to received signature
  4. If match: payload is authentic — user is who they claim to be
  5. Check exp — is the token expired?

The vulnerability pattern:
  {"alg": "none"} — some libraries accepted this, treating the signature as optional
  {"alg": "HS256"} with the public key as the secret — confusing RSA and HMAC
  Always explicitly specify acceptable algorithms in your JWT library`}</Block>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Quantum Computing and Post-Quantum Cryptography" />

      <P>Quantum computers pose a specific threat to asymmetric cryptography. <Hl>Shor's algorithm</Hl> running on a sufficiently large quantum computer can factor large integers and solve the discrete logarithm problem exponentially faster than classical computers — breaking RSA and ECC. <Hl>Grover's algorithm</Hl> can search an unsorted database quadratically faster, effectively halving the security of symmetric keys (a 256-bit AES key becomes equivalent to 128-bit against a quantum attacker).</P>

      <P>The timeline for cryptographically relevant quantum computers (large enough to break RSA-2048) is genuinely uncertain — estimates from "never" to "within 10-15 years." What is certain is that adversaries are doing "harvest now, decrypt later" — collecting encrypted traffic today to decrypt once quantum computers exist. For data that must remain confidential for 10+ years, the threat is current.</P>

      <P>NIST standardised the first post-quantum cryptography algorithms in 2024:</P>

      <div style={{ display: 'grid', gap: 10, margin: '0 0 24px' }}>
        {[
          { name: 'ML-KEM (CRYSTALS-Kyber)', type: 'Key Encapsulation', color: '#4285f4', desc: 'Based on the Learning With Errors (LWE) problem — believed to be hard even for quantum computers. The recommended post-quantum key exchange algorithm. Already being deployed in TLS by Cloudflare, Google, and others.' },
          { name: 'ML-DSA (CRYSTALS-Dilithium)', type: 'Digital Signature', color: '#7b61ff', desc: 'Lattice-based signature scheme. Replaces RSA/ECDSA for digital signatures in a post-quantum world.' },
          { name: 'SLH-DSA (SPHINCS+)', type: 'Digital Signature', color: '#f97316', desc: 'Hash-based signature scheme. More conservative approach — security based purely on hash function security, which Grover\'s only halves.' },
        ].map((item) => (
          <div key={item.name} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '14px 18px' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: item.color }}>{item.name}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px' }}>{item.type}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <Callout type="info">
        For most applications in 2026, use AES-256-GCM for symmetric encryption, X25519/ECDHE for key exchange, Ed25519 for signatures, and Argon2id for password hashing. Monitor NIST post-quantum standards for migration planning, especially if your system handles data requiring 10+ year confidentiality.
      </Callout>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="What This Looks Like at Work — Investigating a Cryptographic Failure" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C, background: `${C}15`, border: `1px solid ${C}30`, borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
          Scenario — A JWT authentication bypass
        </div>

        {[
          {
            time: '10:00',
            label: 'Bug bounty report arrives',
            body: 'A researcher reports they can access any user\'s account by modifying their JWT token without knowing any secret key. The proof of concept: decode the JWT, change the "sub" claim from their user ID to "admin", re-encode, set the Authorization header — and they have admin access. This should be impossible.',
          },
          {
            time: '10:20',
            label: 'Reproducing the bug',
            body: 'The security team decodes the received token: eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0. This is Base64 — decoded: {"alg":"none","typ":"JWT"}. The application accepted a token with alg:none — a mode where no signature is required. The JWT library has a known vulnerability: it accepts unsigned tokens if the algorithm is explicitly set to "none".',
          },
          {
            time: '10:45',
            label: 'Root cause analysis',
            body: 'The backend uses an older version of a Node.js JWT library. The JWT specification allows alg:none for "unsecured JWTs" — tokens where both parties already established trust through other means. The library implemented this, and the application code never explicitly rejected it. An attacker who knows about this JWT vulnerability class can bypass all token-based authentication by stripping the signature.',
          },
          {
            time: '11:30',
            label: 'Investigating exposure',
            body: 'Server logs are searched for JWTs with alg:none in the Authorization header. Filtering by the Base64 signature of alg:none finds 47 requests over the past 3 weeks — all from the same IP. The attacker accessed billing records, internal API endpoints, and changed two accounts\' email addresses. This is now a data breach.',
          },
          {
            time: '13:00',
            label: 'Remediation',
            body: 'The library is updated and the code is changed to explicitly require HS256 or RS256 — rejecting any token with a different algorithm including "none". Existing sessions are invalidated. Affected users are notified. A WAF rule is added to reject tokens with alg:none at the edge. A regression test is added to the test suite.',
          },
        ].map((block) => (
          <div key={block.time} style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
            <div style={{ flexShrink: 0, width: 60, textAlign: 'right' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)' }}>{block.time}</div>
            </div>
            <div style={{ flex: 1, borderLeft: `2px solid ${C}30`, paddingLeft: 18, paddingBottom: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{block.label}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{block.body}</div>
            </div>
          </div>
        ))}

        <Callout type="tip">
          This is one of the most common JWT vulnerabilities — the alg:none bypass and the RS256/HS256 confusion attack (where an RS256 public key is used as the HMAC secret key, fooling the library into accepting a forged token). Always explicitly specify which algorithms your JWT library should accept. Never accept algorithms from the token header without validating against a server-side allowlist.
        </Callout>
      </div>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between symmetric and asymmetric encryption? When would you use each?">
        Symmetric encryption uses the same key for both encryption and decryption. Both the sender and receiver must have the same key, and this key must be kept secret. AES-256-GCM is the standard. Symmetric encryption is fast — modern hardware can encrypt gigabytes per second using AES hardware acceleration. The limitation is the key distribution problem: how do two parties who have never communicated agree on a shared secret key without an eavesdropper learning it?
        {'\n\n'}
        Asymmetric encryption uses a mathematically linked key pair — a public key that can be freely shared and a private key that is kept secret. What the public key encrypts, only the private key can decrypt, and vice versa. RSA and ECC are the common algorithms. Asymmetric encryption solves the key distribution problem: you can publish your public key to the world; only you can decrypt messages encrypted with it. The limitation is performance: asymmetric operations are 100-1000 times slower than symmetric operations.
        {'\n\n'}
        In practice, the two are combined in a hybrid scheme: asymmetric encryption is used to securely exchange a symmetric key (or to verify identity), and then symmetric encryption handles the bulk data transfer. This is exactly what TLS does: ECDHE establishes a shared session key, and AES-256-GCM encrypts all session traffic.
        {'\n\n'}
        Use symmetric encryption for: encrypting data at rest (files, database fields, disk encryption), encrypting bulk data in transit once a shared key exists.
        {'\n\n'}
        Use asymmetric encryption for: exchanging symmetric keys securely, digital signatures, certificate-based authentication, any scenario where key distribution is a problem.
      </IQ>

      <IQ q="Why can't you use SHA-256 to hash passwords? What should you use instead?">
        SHA-256 is designed to be extremely fast — modern GPUs can compute billions of SHA-256 hashes per second. This property, which makes SHA-256 excellent for file integrity verification, makes it catastrophic for password storage.
        {'\n\n'}
        When a database is breached and an attacker obtains a list of SHA-256 password hashes, they can perform an offline dictionary attack: take every word in a dictionary, every common password, every word with common substitutions (p@ssw0rd), and every combination — hash each one with SHA-256 and compare to the breached hashes. At billions of hashes per second, this process finds most weak passwords in minutes. Even adding a unique salt per user (to prevent rainbow table attacks) does not significantly slow this down — the hash is still computed in microseconds.
        {'\n\n'}
        Password hashing algorithms are specifically designed to be slow. Bcrypt, scrypt, and Argon2 all have a configurable cost factor. Argon2id (the recommended algorithm since it won the Password Hashing Competition) is configurable for both time (iterations) and memory. Setting it to take 100 milliseconds on a legitimate server means an attacker's GPU also takes 100ms per guess — turning a million-entry dictionary attack from seconds to over a year.
        {'\n\n'}
        Argon2id with memory=64MB and 3 iterations is a reasonable current recommendation. bcrypt with work factor 12 is acceptable for legacy systems. Never use unsalted MD5 or SHA-1 — these can be reversed using precomputed rainbow tables that exist for billions of common passwords.
      </IQ>

      <IQ q="What is Perfect Forward Secrecy and why does TLS 1.3 require it?">
        Perfect Forward Secrecy (PFS) is the property that compromise of a server's private key does not compromise past session traffic. Without PFS, if an attacker records all encrypted traffic to a server today, and later obtains the server's private key through a breach, a court order, or cryptanalysis, they can decrypt all that recorded traffic retroactively.
        {'\n\n'}
        PFS is achieved using ephemeral key exchange — specifically, Diffie-Hellman key exchange where the session key is derived from temporary (ephemeral) key pairs that are generated fresh for each session and discarded after the session ends. The session key never appears on the wire (it is derived from the ECDHE exchange), and the ephemeral private keys are deleted immediately after use.
        {'\n\n'}
        Without PFS, in older TLS 1.2 configurations: the client encrypts a pre-master secret using the server's RSA public key from its certificate. The server decrypts it with its private key. The session key is derived from this pre-master secret. If the server's private key is compromised, an attacker who recorded the handshake can decrypt the pre-master secret and derive the session key — decrypting all session traffic.
        {'\n\n'}
        TLS 1.3 removed all cipher suites that do not provide forward secrecy — specifically, all static RSA key exchange cipher suites. TLS 1.3 mandates ECDHE, where fresh ephemeral key pairs are generated for every session. Even a breach of the server's private key cannot decrypt past sessions because the ephemeral keys that protected those sessions no longer exist anywhere.
        {'\n\n'}
        Governments and intelligence agencies that perform traffic interception are known to record TLS traffic with the expectation of future decryption — either through key compromise, legal compulsion, or cryptanalysis. PFS fundamentally limits this by ensuring no future event can retroactively compromise correctly-implemented past sessions.
      </IQ>

      <IQ q="A developer wants to store credit card numbers encrypted in a database. They propose using AES-256-ECB with a hardcoded key in the source code. What is wrong with this approach and how would you fix it?">
        There are two separate critical problems with this proposal.
        {'\n\n'}
        Problem one: ECB mode. Electronic Codebook mode encrypts each 128-bit block independently with the same key. This means identical plaintext blocks produce identical ciphertext blocks. For credit card numbers, this is devastating: cards from the same issuer share the first 6 digits (the BIN/IIN). Two customers with Visa cards will have ciphertexts whose first block is identical — leaking information about the issuer. More importantly, ECB enables frequency analysis: an attacker who obtains the ciphertext can deduce patterns in the data without decrypting anything. The fix: use AES-256-GCM, which generates a random IV per encryption and authenticates the ciphertext to detect tampering.
        {'\n\n'}
        Problem two: hardcoded key in source code. A hardcoded key in source code is a secret in plain sight — visible to every developer with repository access, logged in CI/CD build logs, present in every checkout, and impossible to rotate without a code change. When the source code is accidentally exposed (public repository, contractor access, disgruntled employee), the encryption key is compromised. Rotating it requires re-encrypting every value in the database — a complex migration. The fix: store the encryption key in a secrets manager (HashiCorp Vault, AWS KMS, Azure Key Vault). The application retrieves the key at runtime from the secrets manager, using its own service identity for authentication. The key is never in the source code. Rotation is a secrets manager operation, not a code change.
        {'\n\n'}
        Additionally, for payment card data specifically: consider whether encryption is the right tool at all. PCI-DSS strongly prefers tokenisation — replacing the card number with a random token and storing the actual card number in a separate, isolated, heavily-audited token vault. Most application components only need the token, not the card number. This dramatically reduces the scope of PCI compliance and limits the damage if other components are compromised.
      </IQ>

      <IQ q="What is a digital signature and how is it different from a MAC?">
        A digital signature is a cryptographic proof of authenticity created using asymmetric cryptography. The sender signs a message using their private key. Anyone with the corresponding public key can verify the signature. Two properties make digital signatures distinctive: first, only the holder of the private key can create a valid signature (authentication). Second, because the signer's identity is tied to their private key, they cannot later deny having signed (non-repudiation).
        {'\n\n'}
        A MAC (Message Authentication Code) is a tag computed over a message using a shared secret key — typically HMAC-SHA256. Both the sender and receiver have the same key. The receiver recomputes the MAC and compares — if it matches, the message is authentic and unmodified.
        {'\n\n'}
        The critical difference is the key model: digital signatures are asymmetric (private key signs, public key verifies — verifier does not need the signing key). MACs are symmetric (both parties have the same key — the verifier could have generated the MAC themselves).
        {'\n\n'}
        This difference has significant security implications. MACs provide authentication but not non-repudiation: if Alice and Bob both have the same key, and Bob receives a MAC-authenticated message, he cannot prove to a third party that Alice sent it — Bob could have generated it himself. Digital signatures provide non-repudiation: if Alice's signature on a message verifies against Alice's public key, only Alice could have created it (assuming her private key was not compromised).
        {'\n\n'}
        Use MACs for: API authentication between systems that share a secret (webhook validation, AWS Signature), session cookie integrity, any symmetric scenario where both parties are trusted. Use digital signatures for: code signing (proving software came from a trusted publisher), certificate authorities, document signing, any scenario where the verifier should be able to prove authenticity to a third party without being trusted themselves.
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="10" title="Cryptographic Mistakes That Break Security Guarantees" />

      <Err
        msg="Nonce reused in AES-CTR / AES-GCM — keystream exposed"
        cause="CTR mode (and GCM which uses CTR internally) produces a keystream by encrypting a counter value with the key. The keystream is XORed with the plaintext to produce ciphertext. If the same nonce and key combination is ever used twice, both ciphertexts share the same keystream. XORing the two ciphertexts together cancels the keystream and produces the XOR of the two plaintexts — which is enough for an attacker to recover both messages in many cases. This completely breaks confidentiality. The PlayStation 3 was broken this way in 2010."
        fix="Generate a fresh cryptographically random nonce for every encryption operation. With AES-GCM's 96-bit nonce, the risk of accidental collision with random nonces is negligible up to about 2^32 messages under the same key (the birthday bound). For extremely high-volume encryption, use an extended-nonce variant (XChaCha20-Poly1305) or key rotation. Never use a counter or timestamp as a nonce — these are predictable and reuse is possible under concurrent operation."
      />

      <Err
        msg="Length extension attack on SHA-256 HMAC — forged authentication"
        cause="SHA-2 hash functions (SHA-256, SHA-512) are vulnerable to a length extension attack: given SHA256(secret || message), an attacker can compute SHA256(secret || message || padding || extension) without knowing the secret. A naive HMAC implementation that uses SHA256(secret || message) rather than the proper HMAC construction is vulnerable: an attacker who sees an authenticated message can forge a valid authentication tag for a message extension."
        fix="Never implement HMAC manually. Use the HMAC construction: HMAC(key, message) = SHA256(key XOR opad || SHA256(key XOR ipad || message)). Every serious cryptography library implements this correctly. The nested structure prevents length extension attacks. SHA-3 (Keccak) does not have this vulnerability by design — SHA3-256(key || message) is safe, unlike SHA2."
      />

      <Err
        msg="RSA-1024 bit key — broken and factored in days"
        cause="RSA-1024 was once considered secure but is now within reach of factoring with modern hardware. NIST deprecated RSA-1024 in 2010 and prohibited it for US government use after 2013. The record factored RSA key was 829 bits (RSA-250) in 2020 using a massive distributed computation. While 1024-bit factorisation has not been publicly demonstrated as routine, state-level adversaries with resources are presumed capable. Any data encrypted with RSA-1024 should be treated as potentially compromised."
        fix="Use RSA-2048 as the minimum for all new deployments. RSA-3072 or RSA-4096 for long-lived keys. Better: switch to Ed25519 for signatures (256-bit, faster, more resistant to implementation errors) and X25519 for key exchange. ECC provides equivalent security with much shorter keys and faster operations — there is no reason to use RSA-1024 in any new system."
      />

      <Err
        msg="JWT signed with HS256 using the RSA public key as the secret"
        cause="Some applications support both HS256 (HMAC) and RS256 (RSA) JWT algorithms. In RS256 mode, the server uses its RSA private key to sign and the RSA public key to verify. An attacker who knows the RS256 public key (it may be publicly available at a /.well-known/jwks.json endpoint) can create a JWT claiming to use HS256, and sign it with the RSA public key as the HMAC secret. A vulnerable library that does not distinguish between the algorithms will verify the HS256 signature using the RSA public key as the HMAC key — and accept the forged token."
        fix="Explicitly specify which algorithm is acceptable when verifying JWTs — never accept the algorithm from the token header without checking it against a server-side allowlist. Separate the signing key from the verification key by algorithm. Reject tokens that use unexpected algorithms. This vulnerability class is well-documented; all major JWT libraries have patches, but the application code must use the API correctly to enforce the allowlist."
      />

      <Err
        msg="Passwords stored as MD5(password) — entire database cracked in 3 hours"
        cause="In 2012, LinkedIn had 6.5 million SHA-1 password hashes stolen. By 2016, the full breach was revealed: 117 million hashes, unsalted. Within days of the breach becoming public, crackers had recovered the plaintext for the majority of passwords using precomputed rainbow tables and GPU cracking. MD5 is even faster to crack than SHA-1. Unsalted hashes from the same password always produce the same hash — rainbow tables contain precomputed hashes for billions of common passwords. Even if salted, SHA-256 and MD5 are too fast to resist brute force."
        fix="Use Argon2id (preferred) or bcrypt for password storage. Never use general-purpose hash functions (MD5, SHA-1, SHA-256) for passwords regardless of salting. Use a unique random salt per user to prevent precomputed table attacks — all serious password hashing libraries handle this automatically. Set the cost parameter high enough that each hash takes 100-300 milliseconds on your server hardware — this is imperceptible to users but slows attackers from billions of guesses per second to thousands."
      />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'Cryptography provides four properties: confidentiality (only intended parties can read), integrity (tampering is detected), authentication (proves who sent the message), and non-repudiation (sender cannot deny). Different primitives provide different subsets — know which does what.',
        'Symmetric encryption (AES) uses the same key for encryption and decryption — fast, but requires key distribution. Use AES-256-GCM (authenticated encryption). Never use ECB mode. The mode of operation matters as much as the algorithm.',
        'Asymmetric encryption (RSA, ECC) uses key pairs — what the public key encrypts, only the private key decrypts. Solves key distribution but is 100-1000x slower than symmetric. Used for key exchange and signatures, not bulk data encryption. Prefer ECC over RSA — same security with shorter keys.',
        'Diffie-Hellman key exchange lets two parties derive a shared secret over a public channel without transmitting the secret. Ephemeral DH (ECDHE) provides Perfect Forward Secrecy — past sessions cannot be decrypted even if the server private key is later compromised. TLS 1.3 mandates ECDHE.',
        'Hash functions are one-way — given a hash, you cannot find the input. SHA-256 is fast and suitable for file integrity and HMAC. SHA-256 is NOT suitable for password hashing — it is too fast, allowing billions of guesses per second. Use Argon2id or bcrypt for passwords.',
        'Digital signatures use asymmetric cryptography — the private key signs, the public key verifies. They provide authentication and non-repudiation. MACs use symmetric cryptography — both parties have the same key. MACs provide integrity and authentication but not non-repudiation. Choosing wrong breaks audit requirements.',
        'Password hashing requires intentionally slow algorithms. Argon2id is configurable for time and memory cost. A hash taking 100ms on the server takes 100ms per guess on an attacker\'s GPU — transforming a seconds-long attack into a years-long one. Never store passwords as plain MD5 or SHA-256.',
        'The certificate authority system binds public keys to identities. About 150 root CAs are trusted by browsers. Any compromised CA can issue fraudulent certificates for any domain. Certificate Transparency logs make fraudulent certificates auditable — monitor CT logs for unexpected certificates on your domains.',
        'JWT vulnerabilities cluster around algorithm confusion: the alg:none bypass (accepting unsigned tokens), the RS256/HS256 confusion attack (using the public key as HMAC secret), and algorithm downgrade. Always specify acceptable algorithms in your JWT library rather than trusting the token header.',
        'Post-quantum cryptography is standardised. ML-KEM (Kyber) for key encapsulation and ML-DSA (Dilithium) for signatures are the NIST-standardised post-quantum algorithms. For data requiring 10+ year confidentiality, plan migration now — adversaries collect encrypted traffic today for future quantum decryption.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 05</strong>, you learn the framework that underlies every security decision ever made — the CIA triad. Confidentiality, Integrity, Availability: how they conflict, how every attack targets one of them, and how every security control is a trade-off between them.
        </p>
        <Link href="/learn/cybersecurity/cia-triad-security-models" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 05 → The CIA Triad and Security Models
        </Link>
      </div>

    </LearnLayout>
  )
}
