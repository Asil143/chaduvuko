import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Introduction to Databases & DBMS | Chaduvuko',
  description:
    'What data is, what a database is, why file systems fail, what a DBMS does, three-schema architecture, data independence, database users, and why every application depends on a database.',
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
    fontSize: 'clamp(22px, 2.8vw, 32px)',
    fontWeight: 900, letterSpacing: '-1.2px',
    color: 'var(--text)', marginBottom: 20,
    fontFamily: 'Syne, sans-serif', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(17px, 2vw, 22px)',
    fontWeight: 800, letterSpacing: '-0.5px',
    color: 'var(--text)', marginBottom: 14,
  
  }}>{children}</h3>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontSize: 15, color: 'var(--text2)',
    lineHeight: 1.95, marginBottom: 20,
    
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

export default function DBMSIntroduction() {
  return (
    <LearnLayout
      title="Introduction to Databases & DBMS"
      description="From raw data to organized information systems — what databases are, why they exist, how they evolved, and why every application in the world depends on one."
      section="DBMS"
      readTime="60–75 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — DATA, INFORMATION, KNOWLEDGE
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — The Foundation" />
        <SectionTitle>Data, Information, and Knowledge — They Are Not the Same Thing</SectionTitle>

        <Para>
          Before we talk about databases, we need to understand what we're even storing. Most people
          use the words <strong style={{ color: 'var(--text)' }}>data</strong>,{' '}
          <strong style={{ color: 'var(--text)' }}>information</strong>, and{' '}
          <strong style={{ color: 'var(--text)' }}>knowledge</strong> interchangeably.
          In computer science — and especially in database theory — they mean very different things.
          Confusing them leads to bad system design.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 28, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          {[
            {
              word: 'Data',
              color: '#0078d4',
              definition: 'Raw, unprocessed facts without context. Data alone means nothing — it has no interpretation, no meaning, no story.',
              example: '"28", "Bengaluru", "98765-43210", "2024-03-15"',
              realWorld: 'A row in a database table: just numbers and strings. The number 28 could be age, temperature, or a product ID.',
            },
            {
              word: 'Information',
              color: 'var(--accent)',
              definition: 'Data that has been processed, organized, and given context so it becomes meaningful to a human being.',
              example: '"Rahul Sharma, age 28, from Bengaluru, phone 98765-43210, joined on 2024-03-15"',
              realWorld: 'When you query a database and see a customer record with a name, city, and phone — that\'s information. Context transforms data.',
            },
            {
              word: 'Knowledge',
              color: '#f97316',
              definition: 'Information combined with understanding, experience, and insight to enable decisions and predictions.',
              example: '"Customers aged 25–35 from Bengaluru who joined in Q1 have a 73% reorder rate within 60 days."',
              realWorld: 'This is what business intelligence and analytics extract from databases. It drives decisions — stock levels, marketing, pricing.',
            },
          ].map((item, i) => (
            <div key={item.word} style={{
              display: 'flex', gap: 0,
              borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{
                background: `${item.color}12`,
                borderRight: `1px solid var(--border)`,
                padding: '22px 20px', minWidth: 130,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  fontSize: 18, fontWeight: 900,
                  color: item.color, fontFamily: 'Syne, sans-serif',
                  letterSpacing: '-0.5px',
                }}>{item.word}</span>
              </div>
              <div style={{ padding: '22px 24px', flex: 1 }}>
                <Para>{item.definition}</Para>
                <div style={{
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  borderRadius: 8, padding: '10px 14px', marginBottom: 10,
                  fontFamily: 'var(--font-mono)', fontSize: 12,
                  color: item.color,
                }}>
                  {item.example}
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)',  lineHeight: 1.7 }}>
                  💡 {item.realWorld}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Para>
          A database stores <strong style={{ color: 'var(--text)' }}>data</strong>.
          A well-designed database makes it easy to extract <strong style={{ color: 'var(--text)' }}>information</strong>.
          A well-run business uses that information to build <strong style={{ color: 'var(--text)' }}>knowledge</strong>.
          This chain — data → information → knowledge — is why database design matters so deeply.
          A poorly designed database makes the second and third steps extremely difficult or impossible.
        </Para>

        <SubTitle>What Exactly Is Data?</SubTitle>
        <Para>
          In the context of databases, data is any known fact that can be recorded and has implicit meaning.
          The word "implicit" is important — the meaning exists, but it needs context to surface.
          The number <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 13 }}>500</code> by
          itself is data. In the context of a salary column, it means ₹500. In the context of a distance column,
          it means 500 kilometres. The column name, the table, the schema — these provide the context
          that transforms raw data into meaningful information.
        </Para>
        <Para>
          Data exists in three forms in modern systems: <strong style={{ color: 'var(--text)' }}>structured data</strong> (tables with
          fixed columns — the relational model), <strong style={{ color: 'var(--text)' }}>semi-structured data</strong> (JSON, XML —
          has some structure but flexible), and <strong style={{ color: 'var(--text)' }}>unstructured data</strong> (images, videos,
          PDFs — no inherent organisation). Traditional databases handle structured data. Modern systems increasingly
          need to handle all three — which is one reason NoSQL databases emerged.
        </Para>
      </section>

      {/* ========================================
          PART 2 — HOW WE STORED DATA BEFORE DATABASES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — The Problem" />
        <SectionTitle>How Data Was Stored Before Databases — And Why It Failed</SectionTitle>

        <Para>
          To truly understand why databases were invented, you need to feel the pain of what came before.
          This isn't just history — these problems still exist today in organisations that rely on
          spreadsheets, shared drives, and ad-hoc file systems instead of proper databases.
        </Para>

        <SubTitle>Era 1 — Paper Records (Pre-1950s)</SubTitle>
        <Para>
          Banks kept ledgers. Hospitals kept patient files in metal cabinets. Factories tracked inventory
          in notebooks. Data was physical — paper in folders, folders in filing cabinets, filing cabinets
          in rooms. Finding a specific record meant physically walking to the right cabinet, finding the
          right folder, flipping through papers. Updating a record meant finding every copy and changing
          each one by hand. If a paper was lost or burned — that data was gone permanently.
        </Para>

        <SubTitle>Era 2 — File Systems (1950s–1970s)</SubTitle>
        <Para>
          When computers arrived, the obvious next step was to store data in computer files. Programs
          read data from flat files (text files, CSV files, binary files), processed it, and wrote
          results back. Each application maintained its own files. This worked for small, isolated
          systems — but as organisations grew and multiple applications needed to share data,
          a catastrophic set of problems emerged.
        </Para>

        <Para>
          These problems are not hypothetical. They are the documented, real-world failures that
          motivated Edgar Codd, Charles Bachman, and IBM researchers to develop the relational
          model in the 1960s and 70s. Understanding them is not optional — they are the
          <em> entire reason</em> databases exist.
        </Para>

        {/* THE 6 PROBLEMS — DEEP DIVE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>

          {/* Problem 1 */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderLeft: '4px solid #ff4757', borderRadius: 12, overflow: 'hidden',
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
                  color: '#ff4757', background: 'rgba(255,71,87,0.1)',
                  border: '1px solid rgba(255,71,87,0.25)', borderRadius: 5,
                  padding: '3px 8px', letterSpacing: '.1em', textTransform: 'uppercase',
                }}>Problem 01</span>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>
                  Data Redundancy
                </span>
              </div>
              <Para>
                In file-based systems, each application maintains its own data files. The HR application
                stores employee names and addresses. The Payroll application also stores employee names
                and addresses — because it was built by a different team and needs those details too.
                The IT Assets application stores employee names and departments. The same data is copied
                across three separate files.
              </Para>
              <Para>
                This redundancy wastes storage — but storage is cheap. The real problem is what happens
                next. Rahul Sharma moves from Bengaluru to Hyderabad. Someone updates the HR file.
                Nobody tells Payroll. Nobody tells IT Assets. Now three files have three different
                versions of Rahul's city. The data is not just redundant — it has become contradictory.
                Which version is correct? Nobody knows.
              </Para>
            </div>
            <div style={{ padding: '14px 24px', background: 'rgba(255,71,87,0.04)' }}>
              <div style={{ fontSize: 12, color: '#ff4757', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 6 }}>REAL EXAMPLE AT WORK</div>
              <div style={{ fontSize: 13, color: 'var(--text2)',  lineHeight: 1.75 }}>
                A major Indian bank discovered in 2019 that a customer's KYC address existed in
                11 different systems with 4 different values. When regulators asked for the customer's
                correct address, the bank couldn't answer confidently. Audit failure. ₹2 crore fine.
              </div>
            </div>
          </div>

          {/* Problem 2 */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderLeft: '4px solid #f97316', borderRadius: 12, overflow: 'hidden',
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
                  color: '#f97316', background: 'rgba(249,115,22,0.1)',
                  border: '1px solid rgba(249,115,22,0.25)', borderRadius: 5,
                  padding: '3px 8px', letterSpacing: '.1em', textTransform: 'uppercase',
                }}>Problem 02</span>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>
                  Data Inconsistency
                </span>
              </div>
              <Para>
                Data inconsistency is the direct consequence of redundancy. When the same data exists
                in multiple places and gets updated in some but not all, the database enters an
                inconsistent state — different parts of the system have contradictory facts about
                the same reality.
              </Para>
              <Para>
                In a file system, there is no mechanism to enforce consistency. No rule says "if you
                update the address in File A, the address in File B must also be updated." The system
                has no awareness that the two files even contain related data. Every update is isolated,
                and the risk of creating inconsistency is constant and unmanaged.
              </Para>
              <Para>
                The dangerous part: inconsistency is often silent. The system appears to work normally.
                Reports generate. Emails send. Transactions complete. But the underlying data is wrong —
                and nobody knows until an audit, a customer complaint, or a financial discrepancy
                surfaces the problem months later.
              </Para>
            </div>
            <div style={{ padding: '14px 24px', background: 'rgba(249,115,22,0.04)' }}>
              <div style={{ fontSize: 12, color: '#f97316', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 6 }}>INCONSISTENCY IN PRACTICE</div>
              <CodeBox>
{`HR_System.csv:
  employee_id: E001, name: Rahul Sharma, salary: 85000, city: Bengaluru

Payroll_System.csv:
  employee_id: E001, name: Rahul Sharma, salary: 75000, city: Hyderabad

IT_Assets.csv:
  employee_id: E001, name: Rahul S.,    salary: 85000, city: Bengaluru

// Three files. Three different salaries/cities. Which is truth?
// A database would have ONE source and prevent this entirely.`}
              </CodeBox>
            </div>
          </div>

          {/* Problem 3 */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderLeft: '4px solid #facc15', borderRadius: 12, overflow: 'hidden',
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
                  color: '#facc15', background: 'rgba(250,204,21,0.1)',
                  border: '1px solid rgba(250,204,21,0.25)', borderRadius: 5,
                  padding: '3px 8px', letterSpacing: '.1em', textTransform: 'uppercase',
                }}>Problem 03</span>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>
                  Difficult Data Access
                </span>
              </div>
              <Para>
                In a file-based system, accessing data requires writing a program. If the finance
                manager needs "all employees who joined after January 2023 and earn more than ₹80,000
                and are based in Bengaluru," a developer must write a custom program to read the file,
                parse each line, apply the three conditions, and output the results. This takes hours
                or days of development effort for a question that should take seconds.
              </Para>
              <Para>
                Every new question requires a new program. There is no general-purpose way to ask
                arbitrary questions of a file-based system. In a database with SQL, the same question
                becomes three lines that any analyst can write:
              </Para>
              <CodeBox>
{`SELECT name, salary, city
FROM employees
WHERE join_date > '2023-01-01'
  AND salary > 80000
  AND city = 'Bengaluru';`}
              </CodeBox>
              <Para>
                The difference is not just convenience — it is the difference between a data system
                that supports decision-making and one that merely archives records. A system where
                asking questions requires engineering work is, for practical purposes, inaccessible
                to the business.
              </Para>
            </div>
          </div>

          {/* Problem 4 */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderLeft: '4px solid var(--accent)', borderRadius: 12, overflow: 'hidden',
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
                  color: 'var(--accent)', background: 'rgba(0,230,118,0.1)',
                  border: '1px solid rgba(0,230,118,0.25)', borderRadius: 5,
                  padding: '3px 8px', letterSpacing: '.1em', textTransform: 'uppercase',
                }}>Problem 04</span>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>
                  No Security or Access Control
                </span>
              </div>
              <Para>
                A file is a file. Operating system file permissions allow you to control who can read
                or write a file — but that control is at the entire-file level. You cannot say "the
                billing team can read the salary column but not the medical records column" using
                file system permissions. Access is all-or-nothing.
              </Para>
              <Para>
                In a database, <strong style={{ color: 'var(--text)' }}>access control</strong> can
                be defined at the level of individual tables, individual columns, or even individual
                rows. A manager can see salary ranges for their team but not other teams. A call
                centre agent can see a customer's order history but not their payment card number.
                A read-only analyst can SELECT data but cannot INSERT, UPDATE, or DELETE.
              </Para>
              <Para>
                Without this granularity, organisations face a binary choice: either give everyone
                access to everything (security risk), or restrict the file to a small group and create
                a bottleneck for everyone who legitimately needs some of the data. Neither option
                is workable at scale.
              </Para>
            </div>
            <div style={{ padding: '14px 24px', background: 'rgba(0,230,118,0.04)' }}>
              <div style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 6 }}>HOW A DATABASE SOLVES THIS</div>
              <CodeBox>
{`-- Grant analyst read access to orders table but NOT payments
GRANT SELECT ON orders TO analyst_role;
REVOKE ALL ON payments FROM analyst_role;

-- Grant manager access to see only their team's records
CREATE POLICY team_access ON employees
  USING (manager_id = current_user_id());

-- Result: same database, completely different views per role
-- No file-copying, no separate systems, fully audited`}
              </CodeBox>
            </div>
          </div>

          {/* Problem 5 */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderLeft: '4px solid #8b5cf6', borderRadius: 12, overflow: 'hidden',
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
                  color: '#8b5cf6', background: 'rgba(139,92,246,0.1)',
                  border: '1px solid rgba(139,92,246,0.25)', borderRadius: 5,
                  padding: '3px 8px', letterSpacing: '.1em', textTransform: 'uppercase',
                }}>Problem 05</span>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>
                  No Concurrent Access Control
                </span>
              </div>
              <Para>
                What happens when two people try to update the same file at the same time?
                In most file systems — chaos. One write overwrites the other silently.
                Or the file gets corrupted. Or one person reads stale data while another
                is mid-update.
              </Para>
              <Para>
                Consider a airline seat reservation system built on files. Seat 14A has one seat.
                Two agents are booking it simultaneously. Agent 1 reads the file: "14A available = true."
                Agent 2 reads the file: "14A available = true." Agent 1 writes "14A available = false."
                Agent 2 writes "14A available = false." Both transactions succeed. Two passengers
                are now holding confirmed tickets for one physical seat. The airline is legally liable.
              </Para>
              <Para>
                A database handles concurrent access through <strong style={{ color: 'var(--text)' }}>locks,
                transactions, and isolation levels</strong> — mechanisms specifically designed to ensure
                that concurrent operations produce correct results. These are covered in depth in
                Module 10 (Concurrency Control).
              </Para>
            </div>
          </div>

          {/* Problem 6 */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderLeft: '4px solid #0078d4', borderRadius: 12, overflow: 'hidden',
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
                  color: '#0078d4', background: 'rgba(0,120,212,0.1)',
                  border: '1px solid rgba(0,120,212,0.25)', borderRadius: 5,
                  padding: '3px 8px', letterSpacing: '.1em', textTransform: 'uppercase',
                }}>Problem 06</span>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>
                  No Backup, Recovery, or Crash Resilience
                </span>
              </div>
              <Para>
                File systems have no built-in concept of transaction atomicity. If a program is in
                the middle of updating a file and the power cuts — the file may be half-written,
                corrupted, or simply empty. There is no automatic recovery. There is no rollback.
                Whatever state the file was in at the moment of the crash is the state it stays in.
              </Para>
              <Para>
                For applications handling financial data, healthcare records, or any business-critical
                information, this is completely unacceptable. Databases implement
                <strong style={{ color: 'var(--text)' }}> Write-Ahead Logging (WAL)</strong> — a
                mechanism where every change is first written to a persistent log before being applied
                to the actual data. If the system crashes mid-operation, the database reads the log
                on restart and either completes or reverses every incomplete transaction. No data is
                lost. No corruption occurs. This is the D in ACID — Durability.
              </Para>
            </div>
          </div>

          {/* Problem 7 - Data Dependency */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderLeft: '4px solid #e879f9', borderRadius: 12, overflow: 'hidden',
          }}>
            <div style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
                  color: '#e879f9', background: 'rgba(232,121,249,0.1)',
                  border: '1px solid rgba(232,121,249,0.25)', borderRadius: 5,
                  padding: '3px 8px', letterSpacing: '.1em', textTransform: 'uppercase',
                }}>Problem 07</span>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>
                  Data and Program Dependency
                </span>
              </div>
              <Para>
                In file-based systems, the structure of the file is hardcoded into every program that
                reads it. The program knows that bytes 0–9 are the employee ID, bytes 10–59 are the
                name, bytes 60–69 are the salary. If the company decides to add a middle name field
                between first name and last name — every single program that reads that file must be
                rewritten. Every. Single. One.
              </Para>
              <Para>
                This is called <strong style={{ color: 'var(--text)' }}>data dependency</strong> or
                <strong style={{ color: 'var(--text)' }}> lack of data independence</strong>.
                The data and the programs that access it are tightly coupled. Changing one requires
                changing the other. In a large organisation with dozens of applications reading
                shared files, a single structural change can trigger months of engineering work.
              </Para>
              <Para>
                Databases solve this with <strong style={{ color: 'var(--text)' }}>data abstraction</strong>.
                Programs interact with the database through a well-defined interface (SQL). The physical
                storage structure can change entirely — the DBMS can reorganise how data is stored on
                disk, add new indexes, change file formats — without any application code needing modification.
                Applications remain stable while the underlying storage evolves. This concept is called
                <strong style={{ color: 'var(--text)' }}> data independence</strong>, and it is one of
                the most important architectural advantages of the database approach.
              </Para>
            </div>
          </div>
        </div>

        <Callout type="tip">
          These seven problems — redundancy, inconsistency, difficult access, no security,
          no concurrency control, no recovery, and data dependency — are not just exam topics.
          They are the <strong>complete and precise answer</strong> to "Why do we need databases?"
          Every feature of every DBMS exists to solve one or more of these exact problems.
        </Callout>
      </section>

      {/* ========================================
          PART 3 — WHAT IS A DBMS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — The Solution" />
        <SectionTitle>What Is a DBMS? — Every Function It Performs</SectionTitle>

        <Para>
          A <strong style={{ color: 'var(--text)' }}>Database Management System (DBMS)</strong> is
          software that enables users to define, create, maintain, and control access to a database.
          But that definition is almost too simple. Let's be precise about what a DBMS actually does —
          because it does a remarkable number of things simultaneously, and understanding each function
          explains why databases are engineered the way they are.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, marginBottom: 28 }}>
          {[
            {
              function: 'Data Storage Management',
              icon: '🗄️', color: '#0078d4',
              desc: 'The DBMS decides how data is physically stored on disk — which file formats, how rows are organised, how pages are allocated. Applications never deal with raw storage. They describe what they want; the DBMS handles the physical reality.',
              howItHelps: 'Hides all physical complexity. You write "INSERT INTO customers" — the DBMS handles disk writes, page allocation, and file management.',
            },
            {
              function: 'Data Definition',
              icon: '📐', color: 'var(--accent)',
              desc: 'The DBMS processes Data Definition Language (DDL) commands that define the structure of data — tables, columns, data types, constraints, indexes. It maintains a data dictionary (also called a system catalog) — a database about the database itself.',
              howItHelps: 'The system catalog stores metadata: table names, column types, constraints, who has access. The DBMS queries this catalog to process every operation.',
            },
            {
              function: 'Data Manipulation',
              icon: '✏️', color: '#f97316',
              desc: 'The DBMS processes Data Manipulation Language (DML) commands — SELECT, INSERT, UPDATE, DELETE. It parses the query, optimises it, creates an execution plan, executes it, and returns results. All of this happens transparently.',
              howItHelps: 'You write declarative SQL describing what you want. The DBMS decides HOW to retrieve it — whether to use an index, which join algorithm to use, in what order to apply filters.',
            },
            {
              function: 'Transaction Management',
              icon: '🔄', color: '#8b5cf6',
              desc: 'The DBMS groups operations into transactions, enforces ACID properties, manages commits and rollbacks, and ensures the database remains in a consistent state even when multiple transactions execute simultaneously or when failures occur.',
              howItHelps: 'The bank transfer problem is solved. Either both debit AND credit happen, or neither does. Partial updates are physically impossible for committed transactions.',
            },
            {
              function: 'Concurrency Control',
              icon: '⚡', color: '#facc15',
              desc: 'The DBMS manages simultaneous access from thousands of concurrent users. It uses locking protocols, timestamp ordering, or multi-version concurrency control (MVCC) to ensure that concurrent transactions produce correct results.',
              howItHelps: 'The airline seat double-booking problem is solved. Two concurrent reservations for the same seat result in exactly one succeeding — the DBMS serialises the conflict correctly.',
            },
            {
              function: 'Recovery Management',
              icon: '🔧', color: '#0078d4',
              desc: 'The DBMS maintains a transaction log (write-ahead log). In case of failure, it uses the log to recover the database to its last consistent state — redoing committed transactions and undoing uncommitted ones.',
              howItHelps: 'A server crash at 3:47am leaves the database exactly as it was after the last committed transaction. No corruption, no partial writes, no lost data.',
            },
            {
              function: 'Security & Authorization',
              icon: '🔐', color: '#ff4757',
              desc: 'The DBMS controls who can access what data and what operations they can perform. Security is enforced at the table level, column level, and row level. Every operation is checked against the user\'s permissions before execution.',
              howItHelps: 'A call centre agent can look up a customer\'s order history but cannot see their payment details. A manager can update team salaries but cannot delete employee records.',
            },
            {
              function: 'Data Integrity Enforcement',
              icon: '✓', color: 'var(--accent)',
              desc: 'The DBMS enforces integrity constraints automatically. NOT NULL prevents missing values. UNIQUE prevents duplicates. CHECK constraints prevent invalid values. FOREIGN KEY constraints prevent orphaned records. These rules are enforced at the storage layer — applications cannot bypass them.',
              howItHelps: 'An order cannot reference a customer_id that doesn\'t exist in the customers table. An age value cannot be -50. A product price cannot be negative. The DBMS rejects these before they reach storage.',
            },
            {
              function: 'Query Optimisation',
              icon: '📊', color: '#8b5cf6',
              desc: 'The DBMS includes a query optimiser — a sophisticated component that analyses SQL queries and determines the most efficient execution plan. It considers available indexes, table statistics, join ordering, and execution costs to find the fastest path.',
              howItHelps: 'The same SQL query might be executed using a full table scan today and an index scan tomorrow after the optimiser notices statistics changed. Developers write the same SQL; the DBMS adapts to get the best performance.',
            },
          ].map((item) => (
            <div key={item.function} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 12, overflow: 'hidden',
            }}>
              <div style={{ height: 3, background: item.color }} />
              <div style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{item.function}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 12, fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
                <div style={{ fontSize: 12, color: item.color, background: `${item.color}0e`, border: `1px solid ${item.color}25`, borderRadius: 7, padding: '8px 12px',  lineHeight: 1.7 }}>
                  <strong>In practice:</strong> {item.howItHelps}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 4 — DATABASE vs DBMS vs DATABASE SYSTEM
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — The Vocabulary" />
        <SectionTitle>Database vs DBMS vs Database System — Precise Definitions</SectionTitle>

        <Para>
          These three terms are used interchangeably in casual conversation, but in technical contexts —
          and especially in exams and interviews — they have distinct meanings. Get them right.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
          {[
            {
              term: 'Database',
              symbol: 'DB',
              color: '#0078d4',
              definition: 'A database is a logically coherent, organised collection of related data, stored in a structured format, and designed to serve a specific purpose. The key word is "logically coherent" — the data represents some aspect of the real world (called the miniworld or universe of discourse). It is not just any pile of files.',
              example: 'A collection of tables representing FreshCart\'s customers, orders, inventory, and stores — with defined relationships between them — is a database. The raw CSV files on a hard drive before they are organised and related are NOT a database.',
              whatItIsNot: 'A database is not the DBMS software. If PostgreSQL is deleted from the server, the data files still exist on disk. Those files are the database.',
            },
            {
              term: 'DBMS',
              symbol: 'DBMS',
              color: 'var(--accent)',
              definition: 'The DBMS is the software system that manages the database. It provides the interface for all database operations — defining structure, storing data, retrieving data, enforcing integrity, managing transactions, controlling access, and recovering from failures. The DBMS is the engine; the database is the data it manages.',
              example: 'PostgreSQL, MySQL, Oracle Database, Microsoft SQL Server, MongoDB, SQLite — these are all DBMS products. They are the software you install, configure, and run.',
              whatItIsNot: 'The DBMS is not the data itself. Uninstalling MySQL does not delete the database files. The DBMS and the database are separate.',
            },
            {
              term: 'Database System',
              symbol: 'DBS',
              color: '#f97316',
              definition: 'The complete, integrated system: the database (the data), the DBMS (the software managing it), the application programs (the code querying and presenting it), and the hardware (the servers storing and running everything). This is what the end user ultimately interacts with.',
              example: 'The Swiggy ordering system: the PostgreSQL database (data) + PostgreSQL software (DBMS) + Swiggy\'s backend APIs (application) + Swiggy\'s cloud servers (hardware) = the complete database system.',
              whatItIsNot: 'Not just the database. Not just the DBMS. The term refers to the entire stack working together.',
            },
          ].map((item) => (
            <div key={item.term} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '24px 28px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 900,
                  color: item.color, background: `${item.color}12`,
                  border: `1px solid ${item.color}30`, borderRadius: 6,
                  padding: '4px 12px',
                }}>{item.symbol}</span>
                <span style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px' }}>{item.term}</span>
              </div>
              <Para>{item.definition}</Para>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: item.color, marginBottom: 6, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Example</div>
                <div style={{ fontSize: 13, color: 'var(--text2)',  lineHeight: 1.75 }}>{item.example}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)',  fontStyle: 'italic' }}>
                ⚠ {item.whatItIsNot}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 5 — THREE SCHEMA ARCHITECTURE
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — The Architecture" />
        <SectionTitle>Three-Schema Architecture — The Most Important Concept Nobody Teaches</SectionTitle>

        <Para>
          The three-schema architecture (also called the ANSI/SPARC architecture, proposed in 1975)
          is the structural framework that every modern DBMS is built on. It describes how a database
          system separates concerns across three distinct levels — and understanding it explains
          nearly every major design decision in database engineering.
        </Para>
        <Para>
          The central idea: different users of a database have different concerns and different views
          of the same data. A database architect is concerned with logical design. An application
          developer is concerned with the view relevant to their application. A storage engineer is
          concerned with physical performance. The three-schema architecture creates formal separation
          between these concerns so that changes at one level do not cascade to other levels.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 28, border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
          {[
            {
              level: 'Level 3 — External Schema',
              also: 'View Level',
              color: '#8b5cf6',
              who: 'End users, application developers',
              desc: 'The highest level. Each user or application sees a customised, partial view of the database relevant to their needs. Multiple external schemas can exist simultaneously for the same database — each presenting a different perspective of the same underlying data.',
              example: 'The sales team\'s application sees customer names, order amounts, and delivery status. The HR application sees employee names, departments, and salaries. The accounting application sees invoice totals and payment dates. All three are views of the same database — none of them see the full picture.',
              keyInsight: 'External schemas provide data independence from the user\'s perspective. They also provide security — users can only see what their external schema exposes. Sensitive columns (salary, medical history, card numbers) are invisible to applications that don\'t need them.',
            },
            {
              level: 'Level 2 — Conceptual Schema',
              also: 'Logical Level',
              color: 'var(--accent)',
              who: 'Database administrators, architects',
              desc: 'The middle level. The conceptual schema describes the logical structure of the entire database — all entities, attributes, relationships, integrity constraints, and security rules — without any concern for physical storage. This is what entity-relationship diagrams and relational schemas represent.',
              example: 'The customers table has columns customer_id (PK), name, email, city, phone. The orders table has order_id (PK), customer_id (FK), amount, status, created_at. There is a one-to-many relationship between customers and orders. The customer_id column is NOT NULL and UNIQUE. These are conceptual-level facts.',
              keyInsight: 'The conceptual schema is the "truth" of the database — the authoritative definition of what exists and how it relates. All external schemas are derived from it. All physical implementations serve it.',
            },
            {
              level: 'Level 1 — Internal Schema',
              also: 'Physical Level',
              color: '#0078d4',
              who: 'Storage engineers, DBMS internals',
              desc: 'The lowest level. The internal schema describes how data is physically stored on disk — file formats, page sizes, record formats, index structures, hashing schemes, access paths, and storage allocation strategies. This level is managed almost entirely by the DBMS and is largely invisible to developers.',
              example: 'The customers table is stored as a B+ tree indexed on customer_id. Each page is 8KB. Records are stored in a heap file format. A secondary non-clustered index exists on email. The buffer pool caches the 100 most recently accessed pages in RAM. These are internal-level facts.',
              keyInsight: 'The internal schema is where performance is determined. A DBA can completely change the internal schema — reorganise storage, rebuild indexes, change page sizes — without touching the conceptual or external schemas. Applications see no difference.',
            },
          ].map((item, i) => (
            <div key={item.level} style={{ borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ height: 3, background: item.color }} />
              <div style={{ padding: '24px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif', marginBottom: 4 }}>{item.level}</div>
                    <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' }}>aka {item.also}</div>
                  </div>
                  <div style={{
                    fontSize: 11, color: 'var(--muted)', 
                    background: 'var(--bg2)', border: '1px solid var(--border)',
                    borderRadius: 6, padding: '5px 12px',
                  }}>Users: {item.who}</div>
                </div>
                <Para>{item.desc}</Para>
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Example</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)',  lineHeight: 1.8 }}>{item.example}</div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic',  lineHeight: 1.75 }}>
                  💡 {item.keyInsight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 6 — DATA INDEPENDENCE
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — The Key Benefit" />
        <SectionTitle>Data Independence — Why the Three Levels Matter</SectionTitle>

        <Para>
          The three-schema architecture delivers one major practical benefit: <strong style={{ color: 'var(--text)' }}>data independence</strong>.
          Data independence means that changes at a lower level do not force changes at a higher level.
          There are two types, and both are critically important.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 16, marginBottom: 28 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid var(--accent)', borderRadius: 12, padding: '24px' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>Physical Data Independence</div>
            <Para>The ability to change the internal (physical) schema without affecting the conceptual schema or any external schemas. Applications continue to work without modification after physical storage changes.</Para>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Real scenario</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8, fontFamily: 'Inter, sans-serif' }}>
                The DBA migrates the customers table from a heap file organisation to a B+ tree clustered index. The conceptual schema is unchanged: customers still has customer_id, name, city, phone. Every application continues to run SELECT * FROM customers WHERE city = 'Bengaluru' exactly as before. Zero application changes needed.
              </div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic', fontFamily: 'Inter, sans-serif' }}>
              Physical independence is relatively easy to achieve and most modern DBMS systems provide it well.
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #0078d4', borderRadius: 12, padding: '24px' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>Logical Data Independence</div>
            <Para>The ability to change the conceptual schema without affecting external schemas or applications. This is much harder to achieve because it means adding new tables or columns without breaking existing views and queries.</Para>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#0078d4', marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Real scenario</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8, fontFamily: 'Inter, sans-serif' }}>
                The architect adds a new column middle_name to the customers table and splits the address column into street, city, and pincode. Applications that use external schemas (views) referencing only name and city are completely unaffected. Only views that specifically referenced the full address column need updating.
              </div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic', fontFamily: 'Inter, sans-serif' }}>
              Logical independence is harder. Adding columns is easy. Splitting or merging columns often requires updating views and may affect some applications.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          PART 7 — TYPES OF DATABASE USERS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — The People" />
        <SectionTitle>Types of Database Users — Who Uses a Database and How</SectionTitle>

        <Para>
          A database system serves many different categories of users simultaneously, each with
          completely different interaction styles, needs, and levels of technical depth. Understanding
          these user types is important because the DBMS is designed to serve all of them — and good
          database design means making the system work well for each one.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
          {[
            {
              type: 'Naive / Parametric End Users',
              color: '#0078d4', icon: '👤',
              howTheyInteract: 'Through application interfaces — forms, buttons, mobile apps. They have no knowledge of SQL or database internals.',
              example: 'A customer placing an order on Flipkart. A bank teller entering a deposit. A hospital receptionist scheduling an appointment.',
              whatTheyNeed: 'A fast, reliable, intuitive interface. They should never need to think about the database — it should be invisible.',
              dbmsDesignImplication: 'The DBMS must handle high volumes of simple, repetitive transactions (parametric transactions) with consistent performance. OLTP optimization.',
            },
            {
              type: 'Sophisticated / Casual End Users',
              color: 'var(--accent)', icon: '📊',
              howTheyInteract: 'Through query tools, BI dashboards, or SQL directly. They understand data and can form complex queries but are not database professionals.',
              example: 'A marketing analyst writing SQL queries to find customer segments. A finance manager building Power BI reports from database data. A product manager exploring user behavior data.',
              whatTheyNeed: 'Expressive query capabilities, good performance on analytical queries, readable error messages, and documentation.',
              dbmsDesignImplication: 'The DBMS needs a powerful query language (SQL), good query optimisation for complex analytical queries, and clear execution plans for performance debugging.',
            },
            {
              type: 'Application Programmers',
              color: '#f97316', icon: '💻',
              howTheyInteract: 'Through programming language database APIs — JDBC, psycopg2, SQLAlchemy, Prisma. They write application code that interacts with the DBMS programmatically.',
              example: 'A backend developer at Swiggy writing Python code that queries the orders database. A mobile developer writing Android code that syncs local SQLite data with the server.',
              whatTheyNeed: 'Reliable drivers, transaction support, prepared statements (for security), connection pooling, clear error codes.',
              dbmsDesignImplication: 'The DBMS must support standard programming interfaces, provide good connection management, and return structured error information that applications can handle programmatically.',
            },
            {
              type: 'Database Administrators (DBA)',
              color: '#8b5cf6', icon: '⚙️',
              howTheyInteract: 'Through administrative tools, direct SQL, and system-level configuration. Full access to all DBMS functions.',
              example: 'A DBA at Razorpay managing PostgreSQL clusters, creating indexes for slow queries, setting up replication, monitoring performance, and managing user permissions.',
              whatTheyNeed: 'Full control over all DBMS functions — schema definition, performance tuning, user management, backup/recovery, replication configuration, monitoring.',
              dbmsDesignImplication: 'The DBMS must provide rich administrative interfaces, detailed performance metrics, fine-grained security controls, and tools for backup, recovery, and replication management.',
            },
            {
              type: 'Database Designers',
              color: '#facc15', icon: '📐',
              howTheyInteract: 'Through design tools (ER diagram tools, schema design software) and DDL commands. They define the logical and physical schema.',
              example: 'A senior engineer at a startup designing the initial database schema for a new product. A data architect at a bank redesigning the core transaction database.',
              whatTheyNeed: 'Deep knowledge of the data model, normalization theory, performance implications of design choices, and the specific features of the DBMS being used.',
              dbmsDesignImplication: 'The DBMS must support rich constraint capabilities, provide good defaults, and make schema migration manageable as designs evolve.',
            },
            {
              type: 'System Analysts and Administrators',
              color: '#e879f9', icon: '🔧',
              howTheyInteract: 'At the operating system and hardware level. They manage the servers running the DBMS.',
              example: 'A systems administrator at an e-commerce company provisioning new PostgreSQL servers, configuring storage, managing network connections, and handling OS-level performance tuning.',
              whatTheyNeed: 'Documentation on hardware requirements, configuration parameters, OS-level tuning options, and network configuration.',
              dbmsDesignImplication: 'The DBMS must be configurable at the system level and provide clear guidance on hardware requirements and system configuration.',
            },
          ].map((user) => (
            <div key={user.type} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderLeft: `4px solid ${user.color}`, borderRadius: 12, padding: '22px 26px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 24 }}>{user.icon}</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{user.type}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 14 }}>
                {[
                  { label: 'How they interact', value: user.howTheyInteract, c: user.color },
                  { label: 'Real example', value: user.example, c: user.color },
                  { label: 'What they need', value: user.whatTheyNeed, c: user.color },
                  { label: 'DBMS design implication', value: user.dbmsDesignImplication, c: user.color },
                ].map((detail) => (
                  <div key={detail.label} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: detail.c, marginBottom: 6, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{detail.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>{detail.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 8 — THE DBA ROLE IN DEPTH
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — The Guardian" />
        <SectionTitle>The Database Administrator — The Most Critical Role in Data Systems</SectionTitle>

        <Para>
          The <strong style={{ color: 'var(--text)' }}>Database Administrator (DBA)</strong> is the
          person (or team) responsible for everything related to the database — its design, operation,
          security, performance, and recovery. In large organisations, this is a dedicated role with
          a specialised career path. In startups, this responsibility often falls on a senior backend
          engineer.
        </Para>
        <Para>
          Understanding the DBA role matters for two reasons: first, it shows you the full scope of
          what database management actually involves (it is far more than just writing SQL). Second,
          many database design decisions that seem arbitrary only make sense when you understand that
          they exist to make the DBA's job tractable.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
          {[
            { responsibility: 'Schema Definition', desc: 'Creates and modifies the conceptual and physical schemas using DDL. Decides table structures, column types, constraints, and relationships. Balances normalization against query performance.' },
            { responsibility: 'Storage Structure Decisions', desc: 'Decides how data is physically organised — heap files, clustered indexes, tablespaces, storage quotas. Determines page sizes and buffer pool configuration for optimal performance.' },
            { responsibility: 'Authorization & Security', desc: 'Creates and manages user accounts. Grants and revokes permissions at the table, column, and row level. Implements row-level security policies. Manages database roles and role hierarchies.' },
            { responsibility: 'Performance Monitoring', desc: 'Continuously monitors query performance, identifies slow queries using execution plans and EXPLAIN output, adds or removes indexes, and adjusts DBMS configuration parameters.' },
            { responsibility: 'Backup & Recovery Planning', desc: 'Designs and tests backup strategies (full, incremental, continuous WAL archiving). Maintains recovery time objectives (RTO) and recovery point objectives (RPO). Tests restore procedures regularly.' },
            { responsibility: 'Capacity Planning', desc: 'Monitors storage growth, predicts when storage or compute will be insufficient, and plans hardware upgrades before systems reach capacity limits.' },
            { responsibility: 'Replication & High Availability', desc: 'Sets up primary-replica replication, configures automatic failover, and ensures the database remains available even during hardware failures or maintenance windows.' },
            { responsibility: 'Upgrade Management', desc: 'Plans and executes DBMS version upgrades with zero downtime. Tests application compatibility. Manages migration from old to new schema versions.' },
          ].map((item) => (
            <div key={item.responsibility} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>→</span>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{item.responsibility}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8, fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <Callout type="example">
          <strong>A real DBA day at a payment company:</strong><br /><br />
          9:00am — An alert fires: payment confirmation queries spiking to 3 seconds (SLA is 200ms).
          DBA runs EXPLAIN ANALYZE and finds a missing index on transactions.merchant_id.
          Creates it with CREATE INDEX CONCURRENTLY — no table lock, safe on live production.
          Query time drops to 18ms in 4 minutes.<br /><br />
          11:30am — Reviews last night's backup log. Full backup completed in 47 minutes.
          Tests point-in-time restore to yesterday at 14:23 in the staging environment.
          Restore succeeds. Documents the test.<br /><br />
          2:00pm — New feature requires adding a nullable JSON column for metadata.
          Reviews the migration plan from engineering, approves it, executes ALTER TABLE
          on the replica first, verifies, then on primary during low-traffic window.<br /><br />
          4:30pm — Creates a new database role for the new data science team.
          Grants SELECT on anonymised views of customer data. Explicitly denies access to
          payment_methods, card_numbers, and cvv tables.
        </Callout>
      </section>

      {/* ========================================
          PART 9 — TYPES OF DATABASES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 09 — The Landscape" />
        <SectionTitle>Types of Databases — The Full Landscape</SectionTitle>

        <Para>
          The database landscape in 2026 is richer and more diverse than at any point in history.
          Understanding each type — not just what it is, but why it exists and what specific problem
          it solves — is essential for both engineering decisions and system design interviews.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {[
            {
              type: 'Relational Databases (RDBMS)',
              color: 'var(--accent)',
              era: '1970s – present',
              tag: '★ The Foundation of This Entire Track',
              examples: 'PostgreSQL · MySQL · Oracle · SQL Server · SQLite',
              usedAt: 'Swiggy, Razorpay, Flipkart, banks, hospitals, every enterprise',
              structure: 'Tables with rows and columns. Tables are connected via shared column values (keys). Data is normalised to eliminate redundancy.',
              queryLanguage: 'SQL — the universal declarative query language.',
              bestFor: 'Structured, related data with well-defined relationships. Any use case where data integrity, consistency, and complex queries matter. Financial systems, order management, user accounts, inventory.',
              limitations: 'Schema changes are expensive at scale. Horizontal scaling (sharding across multiple servers) is complex. Struggles with deeply nested or unstructured data.',
              deepDive: 'The relational model is built on set theory and predicate logic — which means every SQL operation is mathematically defined. This formal foundation is why SQL has remained the standard query language for over 50 years while everything else has changed.',
            },
            {
              type: 'Document Databases',
              color: '#4285f4',
              era: '2007 – present',
              tag: 'NoSQL Revolution Leader',
              examples: 'MongoDB · CouchDB · Firestore · Amazon DocumentDB',
              usedAt: 'Zomato (menus), content management systems, e-commerce product catalogs',
              structure: 'Self-contained JSON-like documents. Each document can have a completely different structure. Documents are grouped into collections (like tables, but without enforced schema).',
              queryLanguage: 'MongoDB Query Language (MQL), or platform-specific query APIs.',
              bestFor: 'Flexible, nested, document-shaped data. Product catalogs (each product type has different attributes). Blog posts. User profiles with varying fields. Rapid prototyping where the schema is still evolving.',
              limitations: 'No join support (by design). Data duplication is expected and managed manually. Complex multi-document transactions are more difficult than in RDBMS.',
              deepDive: 'The document model\'s power comes from collocating all related data in one document. A Zomato restaurant document contains the restaurant name, location, opening hours, cuisine types, menu categories, menu items, and prices — all in one read. In a relational model, this requires 5 joins. For read-heavy use cases, this is transformative.',
            },
            {
              type: 'Key-Value Stores',
              color: '#ff4757',
              era: '2003 – present',
              tag: 'Speed Above All',
              examples: 'Redis · Memcached · DynamoDB (also document) · Etcd',
              usedAt: 'Every large application for caching — Paytm, CRED, Swiggy, Netflix India',
              structure: 'The simplest possible structure: a key maps to a value. The key is a string. The value can be a string, number, list, set, hash, or sorted set (in Redis).',
              queryLanguage: 'GET key, SET key value, DEL key — and type-specific commands.',
              bestFor: 'Caching (database query results, session data, computed values). Real-time counters (page views, likes, inventory counts). Session storage. Rate limiting. Leaderboards. OTP storage.',
              limitations: 'No relationships. No complex queries. Limited to key-based lookups. Data in memory (Redis) is lost on restart unless persisted separately.',
              deepDive: 'Redis operations are atomic and execute in microseconds because all data lives in RAM. A typical Redis GET takes 50–200 microseconds. A PostgreSQL query hitting disk takes 1–100 milliseconds. For high-traffic applications, this 100-1000x speed difference for frequently accessed data is the difference between a fast app and a slow one.',
            },
            {
              type: 'Column-Family Databases',
              color: '#f97316',
              era: '2008 – present',
              tag: 'Write-Heavy Scale',
              examples: 'Apache Cassandra · HBase · Google Bigtable',
              usedAt: 'Netflix watch history, Flipkart time-series data, IoT sensor data',
              structure: 'Data is stored by column family rather than by row. Rows can have different columns. Designed for massive write throughput across multiple servers with no single point of failure.',
              queryLanguage: 'CQL (Cassandra Query Language, SQL-like) or HBase API.',
              bestFor: 'Time-series data (IoT, metrics, logs). Write-heavy workloads where you write far more than you read. Data that needs to be spread across many servers for scale. Use cases where you can design queries at schema time.',
              limitations: 'Very limited query flexibility — you must design your data model around your queries at design time. No joins. Complex aggregations are expensive. Not suitable for ad-hoc queries.',
              deepDive: 'Cassandra\'s architecture has no master node — every node is equal. This means no single point of failure and linear write scalability: 10 nodes = 10x write throughput of 1 node. Netflix uses Cassandra to store viewing history for 250+ million subscribers. The write volume would overwhelm any RDBMS.',
            },
            {
              type: 'Graph Databases',
              color: '#8b5cf6',
              era: '2007 – present',
              tag: 'Relationship-First',
              examples: 'Neo4j · Amazon Neptune · ArangoDB',
              usedAt: 'LinkedIn connections, Facebook friend graph, fraud detection, recommendation engines',
              structure: 'Data is stored as nodes (entities) and edges (relationships). Both nodes and edges can have properties. Relationships are first-class citizens with their own attributes.',
              queryLanguage: 'Cypher (Neo4j), Gremlin, SPARQL.',
              bestFor: 'Highly connected data where the relationships themselves are as important as the entities. Social networks, knowledge graphs, fraud detection (unusual transaction chains), recommendation systems, supply chain analysis.',
              limitations: 'Significantly slower for bulk data operations. Steeper learning curve. Not suitable for simple tabular data. Limited ecosystem compared to RDBMS.',
              deepDive: 'In a relational database, finding all friends-of-friends-of-friends of Rahul requires 3 JOIN operations that grow exponentially with depth. In a graph database, this is a simple graph traversal — the relationship "pointer" is stored directly on the node. As social network depth increases, graph databases maintain constant-time traversal while relational joins become impossibly slow.',
            },
            {
              type: 'In-Memory Databases',
              color: '#facc15',
              era: '2009 – present',
              tag: 'RAM-First Architecture',
              examples: 'Redis · Memcached · VoltDB · SAP HANA',
              usedAt: 'Every high-traffic application for session management and caching',
              structure: 'All data lives in RAM. Some in-memory databases persist to disk asynchronously or on scheduled intervals. Primary access is always from memory.',
              queryLanguage: 'Varies. Redis uses command-based API. VoltDB uses SQL.',
              bestFor: 'Any use case requiring sub-millisecond response times. Session management (user login state). Caching expensive database query results. Real-time leaderboards. Rate limiting counters. OTP codes. Shopping cart contents.',
              limitations: 'Data is lost on restart unless explicitly persisted (Redis has RDB and AOF persistence options). Storage is expensive (RAM costs ~50x more per GB than SSD). Not suitable as a primary database for large, persistent datasets.',
              deepDive: 'The physics are simple: RAM access latency is ~100 nanoseconds. SSD access latency is ~100 microseconds. Disk access latency is ~10 milliseconds. That\'s a 100,000x difference between RAM and disk. For operations performed millions of times per day, this difference defines whether your application feels instant or sluggish.',
            },
            {
              type: 'Time-Series Databases',
              color: '#e879f9',
              era: '2013 – present',
              tag: 'Built for Metrics and Events',
              examples: 'InfluxDB · TimescaleDB · Apache Druid · Prometheus',
              usedAt: 'Server monitoring (CPU/memory over time), stock prices, IoT sensor readings, application metrics',
              structure: 'Data is stored as a sequence of (timestamp, value) pairs, with optional tags for categorisation. Optimised for time-based range queries and aggregations (average over last hour, max over last day).',
              queryLanguage: 'InfluxQL or Flux (InfluxDB), SQL-like extensions (TimescaleDB), PromQL (Prometheus).',
              bestFor: 'Any data that is fundamentally timestamped and time-ordered. Server metrics (Grafana dashboards). Financial tick data. IoT sensor readings. Application performance monitoring. User event streams.',
              limitations: 'Not designed for general-purpose data. Querying by anything other than time is often awkward. Limited relationship support. Not suitable as a transactional database.',
              deepDive: 'A regular RDBMS storing 1 billion rows of timestamped metrics would struggle with a query like "average CPU usage per minute for the last 30 days across 500 servers." A time-series database stores data in time-ordered chunks and pre-calculates aggregations, making this query return in milliseconds instead of minutes.',
            },
          ].map((db) => (
            <div key={db.type} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 12, overflow: 'hidden',
            }}>
              <div style={{ height: 3, background: db.color }} />
              <div style={{ padding: '22px 26px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--text)', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px', marginBottom: 6 }}>{db.type}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: db.color, background: `${db.color}12`, border: `1px solid ${db.color}30`, borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', letterSpacing: '.06em', textTransform: 'uppercase' }}>{db.era}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', letterSpacing: '.06em', textTransform: 'uppercase' }}>{db.tag}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textAlign: 'right', lineHeight: 1.7 }}>{db.examples}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 12, marginBottom: 16 }}>
                  {[
                    { label: 'Structure', value: db.structure },
                    { label: 'Best For', value: db.bestFor },
                    { label: 'Limitations', value: db.limitations },
                    { label: 'Used At', value: db.usedAt },
                  ].map((detail) => (
                    <div key={detail.label} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: db.color, marginBottom: 6, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{detail.label}</div>
                      <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>{detail.value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: `${db.color}08`, border: `1px solid ${db.color}20`, borderRadius: 8, padding: '14px 16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: db.color, marginBottom: 6, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Deep Insight</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8, fontFamily: 'Inter, sans-serif' }}>{db.deepDive}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 10 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 10 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>Day 1 at a Real Company — The Database Question You'll Face</SectionTitle>

        <Para>
          Most engineering teams have their database decisions already made when you join. But in
          fast-growing startups, in greenfield projects, and in senior roles — you will be part of
          these conversations. Here's what they actually sound like, and what knowledge makes you
          valuable in them.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              Architecture Discussion — Early-Stage Fintech Startup
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                role: 'CTO',
                color: '#0078d4',
                message: '"We\'re building a lending platform. We need to store: user profiles, loan applications, credit scores, repayment schedules, daily transaction records, and real-time repayment events. What database setup do you recommend and why?"',
              },
              {
                role: 'Senior Engineer (thoughtful answer)',
                color: 'var(--accent)',
                message: '"I\'d separate this into three layers. PostgreSQL for user profiles, loan applications, and repayment schedules — these are structured, relational, and need strong ACID guarantees for financial accuracy. Redis for session management and real-time repayment event tracking — sub-millisecond access is critical and Redis\'s atomic increment operations handle concurrent updates safely. TimescaleDB or a managed time-series solution for daily transaction metrics — we\'ll need to query \'average repayment latency over last 90 days per loan type\' and a regular RDBMS will struggle at volume. The PostgreSQL cluster gets a read replica immediately because credit score lookups and application status checks vastly outnumber writes."',
              },
              {
                role: 'CTO',
                color: '#0078d4',
                message: '"Why PostgreSQL over MySQL for the core data?"',
              },
              {
                role: 'Senior Engineer',
                color: 'var(--accent)',
                message: '"PostgreSQL\'s MVCC implementation means our reads and writes don\'t block each other — critical for a lending platform where loan officers are reading applications while borrowers are submitting simultaneously. PostgreSQL also has better support for JSON columns (we\'ll need flexible credit bureau data structures), better window functions for the financial calculations we\'ll run, and better row-level security for the role-based access we need. MySQL is fine too, but PostgreSQL\'s feature set is better matched to our use case."',
              },
            ].map((msg) => (
              <div key={msg.role} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: msg.color,
                  background: `${msg.color}15`, border: `1px solid ${msg.color}30`,
                  borderRadius: 5, padding: '3px 8px', fontFamily: 'var(--font-mono)',
                  letterSpacing: '.06em', textTransform: 'uppercase',
                  flexShrink: 0, marginTop: 3, whiteSpace: 'nowrap',
                }}>{msg.role}</span>
                <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.85,  fontStyle: 'italic' }}>{msg.message}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.15)', borderRadius: 8, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.85, fontFamily: 'Inter, sans-serif' }}>
              The senior engineer's answer is informed by everything in this module: understanding
              what different database types are optimised for (RDBMS vs Key-Value vs Time-Series),
              how MVCC works and why it matters for concurrency, what ACID means in a financial context,
              and what operational considerations (read replicas, JSON support, row-level security)
              matter for a real production system. This is what DBMS knowledge unlocks.
            </div>
          </div>
        </div>

        {/* Day 1 Task */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase', display: 'inline-block', marginBottom: 16 }}>
            Real Task — Backend Intern, Day 1 at a Startup
          </div>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', marginBottom: 20, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.8 }}>
            <span style={{ color: 'var(--muted)' }}>Manager (Slack, 10:03 AM):</span>
            <br />
            <span style={{ color: 'var(--text2)' }}>"Welcome to the team! First task — we need to store user notification preferences. Think: email notifications on/off, WhatsApp on/off, language preference (English/Hindi/Telugu), and notification frequency (immediate/daily/weekly). Users already exist in our <span style={{ color: 'var(--accent)' }}>users</span> table. Design where and how to store this. Write the CREATE TABLE if a new table is needed. Explain your decision in a comment."</span>
          </div>
          <Para>
            Before you can write a single line of SQL, this task requires you to answer questions
            that are entirely DBMS theory:
          </Para>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {[
              { q: 'Should this be a separate table or additional columns in users?', answer: 'Separate table — it\'s logically independent data (a user can exist without preferences). Keeps the users table clean. Makes it easy to add/remove preferences later without altering users.' },
              { q: 'What data types?', answer: 'BOOLEAN for on/off flags. VARCHAR or ENUM for language. ENUM or CHECK constraint for frequency.' },
              { q: 'How to link back to users?', answer: 'Foreign key: user_preferences.user_id REFERENCES users(user_id).' },
              { q: 'What happens if a user is deleted?', answer: 'ON DELETE CASCADE — delete their preferences automatically. Prevents orphaned rows.' },
              { q: 'What if a user has no preferences set yet?', answer: 'Two options: (1) no row exists yet, application uses defaults. (2) Insert a row with default values on user creation. The second approach makes reads simpler.' },
              { q: 'Should we add a UNIQUE constraint on user_id?', answer: 'Yes — each user should have exactly one preferences row. UNIQUE(user_id) enforces this.' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 18px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>❓ {item.q}</div>
                <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75,  display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, fontWeight: 700 }}>→</span>
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
          <CodeBox label="The resulting CREATE TABLE — built on DBMS theory">
{`-- User preferences: separate table, linked to users via FK
CREATE TABLE user_preferences (
  preference_id     SERIAL          PRIMARY KEY,
  user_id           INT             NOT NULL UNIQUE,  -- one row per user
  email_enabled     BOOLEAN         NOT NULL DEFAULT true,
  whatsapp_enabled  BOOLEAN         NOT NULL DEFAULT false,
  language          VARCHAR(20)     NOT NULL DEFAULT 'English'
                    CHECK (language IN ('English', 'Hindi', 'Telugu', 'Tamil', 'Kannada')),
  frequency         VARCHAR(20)     NOT NULL DEFAULT 'immediate'
                    CHECK (frequency IN ('immediate', 'daily', 'weekly')),
  updated_at        TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,

  -- Link to users table. If user is deleted, preferences are deleted too.
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);

-- Index on user_id for fast lookups (already has UNIQUE index, but explicit is clear)
-- The UNIQUE constraint already creates an index — no extra index needed here.

-- To retrieve preferences for user 42:
SELECT * FROM user_preferences WHERE user_id = 42;
-- This hits the UNIQUE index — O(log n) lookup, extremely fast.`}
          </CodeBox>
          <Para>
            Every decision in that table definition — the separate table, the UNIQUE constraint,
            the CHECK constraints, the DEFAULT values, the ON DELETE CASCADE, the data types —
            is a direct application of DBMS concepts you're learning in this track. This is
            what it means to go from "knowing SQL syntax" to "thinking like a database engineer."
          </Para>
        </div>
      </section>

      {/* ========================================
          PART 11 — WHY IN EVERY INTERVIEW
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 11 — The Career Angle" />
        <SectionTitle>Why DBMS Appears in Every Technical Interview Regardless of Role</SectionTitle>

        <Para>
          Students often ask: "I want to be a frontend developer — why do I need to know DBMS?"
          or "I'm going into DevOps — do I really need normalization?" The answer is always yes,
          and here's the precise reason why.
        </Para>
        <Para>
          Every application, regardless of how it presents to users, ultimately reads and writes
          persistent data. That data lives in a database. Even if your role is one layer removed
          from directly writing database code, you will make architectural decisions, debug
          performance issues, design APIs, or review code that directly involves database concepts.
          Ignorance of DBMS at any seniority above junior level is a significant career limitation.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
          {[
            {
              role: 'Campus Placements — TCS / Wipro / Infosys / Cognizant',
              color: '#0078d4',
              guaranteed: ['Normalization — 1NF through BCNF with worked examples', 'ACID properties — definitions and real scenarios', 'All SQL join types with examples', 'Primary Key vs Foreign Key vs Candidate Key'],
              likely: ['Transaction isolation levels', 'Indexing basics', 'Basic SQL queries including GROUP BY and HAVING'],
            },
            {
              role: 'Product Companies — Flipkart / Swiggy / CRED / Meesho / PhonePe',
              color: 'var(--accent)',
              guaranteed: ['Schema design — given a scenario, design tables', 'Indexing — why, which type, when not to', 'SQL window functions — ROW_NUMBER, RANK, LAG, LEAD', 'Transaction isolation and concurrency problems'],
              likely: ['Query optimization — EXPLAIN output', 'Sharding and partitioning concepts', 'SQL vs NoSQL trade-offs for specific scenarios'],
            },
            {
              role: 'GATE CS Examination',
              color: '#f97316',
              guaranteed: ['Relational algebra — all operators', 'Functional dependencies and Armstrong\'s Axioms', 'Attribute closure — find candidate keys', 'Normalization — BCNF and 4NF decomposition', 'B+ tree operations — insert, delete, search'],
              likely: ['Concurrency — serializability, 2PL, deadlocks', 'File organization and indexing', 'Recovery — WAL, checkpoints, ARIES algorithm'],
            },
            {
              role: 'Senior / System Design Rounds',
              color: '#8b5cf6',
              guaranteed: ['CAP theorem — what it means, which databases are CA/CP/AP', 'Database sharding strategies — when and how', 'SQL vs NoSQL — contextual decision making', 'Replication — synchronous vs asynchronous'],
              likely: ['MVCC and how PostgreSQL handles concurrency', 'Database connection pooling at scale', 'Read replicas and eventual consistency'],
            },
          ].map((item) => (
            <div key={item.role} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderTop: `3px solid ${item.color}`, borderRadius: 12, padding: '20px',
            }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, fontFamily: 'Syne, sans-serif', lineHeight: 1.4 }}>{item.role}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: item.color, marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Guaranteed to appear</div>
              {item.guaranteed.map((topic) => (
                <div key={topic} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: item.color, flexShrink: 0, fontSize: 12, marginTop: 2 }}>▸</span>
                  <span style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>{topic}</span>
                </div>
              ))}
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', margin: '12px 0 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Frequently appears</div>
              {item.likely.map((topic) => (
                <div key={topic} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: 'var(--muted)', flexShrink: 0, fontSize: 12, marginTop: 2 }}>▸</span>
                  <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>{topic}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 12 — COMPLETE TRACK ROADMAP
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 12 — The Journey Ahead" />
        <SectionTitle>Your Complete Learning Roadmap — 20 Modules, Zero Gaps</SectionTitle>

        <Para>
          Every module in this track is sequenced deliberately. Each one builds on the previous.
          You cannot understand normalization without understanding functional dependencies.
          You cannot understand indexes without understanding B+ trees. You cannot understand
          query optimization without understanding how the storage engine works.
          This sequence is not arbitrary — it is the order that a PhD-level database course
          would teach these concepts.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 28 }}>
          {[
            { num: '01', title: 'Introduction to Databases & DBMS', status: 'current', desc: 'Data vs information, file system problems, DBMS functions, three-schema architecture, data independence, user types.' },
            { num: '02', title: 'Data Models', status: 'done', desc: 'Hierarchical, network, relational, object-oriented, document models — evolution, trade-offs, why relational dominates.' },
            { num: '03', title: 'Entity-Relationship Model', status: 'next', desc: 'Entities, attributes, relationships, cardinality, weak entities, ER diagrams, ER to table conversion.' },
            { num: '04', title: 'Relational Model & Keys', status: 'upcoming', desc: 'Relations, tuples, domains, schema vs instance, all 7 key types, integrity constraints.' },
            { num: '05', title: 'Normalization — 1NF to 5NF', status: 'upcoming', desc: 'Anomalies, 1NF through 5NF with complete worked examples, denormalization decisions.' },
            { num: '06', title: 'Functional Dependencies', status: 'upcoming', desc: "Armstrong's Axioms, attribute closure, canonical cover, finding candidate keys algorithmically." },
            { num: '07', title: 'SQL — Complete Guide', status: 'upcoming', desc: 'DDL, DML, DCL, TCL, all JOIN types, subqueries, window functions, CTEs, recursive CTEs.' },
            { num: '08', title: 'Indexes', status: 'upcoming', desc: 'B+ tree vs hash, clustered vs non-clustered, covering indexes, composite indexes, when NOT to index.' },
            { num: '09', title: 'Transactions & ACID', status: 'upcoming', desc: 'Transaction model, ACID deep dive, transaction states, savepoints, real failure scenarios.' },
            { num: '10', title: 'Concurrency Control', status: 'upcoming', desc: 'Lock types, 2PL, deadlocks, isolation levels, MVCC — how PostgreSQL achieves high concurrency.' },
            { num: '11', title: 'Query Processing & Optimization', status: 'upcoming', desc: 'Parser → planner → optimizer → executor pipeline, EXPLAIN, seq scan vs index scan, real optimization.' },
            { num: '12', title: 'Storage & File Organization', status: 'upcoming', desc: 'Blocks, pages, heap files, sequential files, buffer pool, why physical storage affects query speed.' },
            { num: '13', title: 'Hashing & B+ Trees', status: 'upcoming', desc: 'Static and dynamic hashing, B+ tree structure from scratch, insert/delete/search with worked examples.' },
            { num: '14', title: 'Relational Algebra', status: 'upcoming', desc: 'All 8 operators with SQL mappings, expression trees, query optimisation using algebraic equivalences.' },
            { num: '15', title: 'Views, Stored Procedures & Triggers', status: 'upcoming', desc: 'Virtual tables, materialized views, procedures vs functions, trigger types, cursor internals.' },
            { num: '16', title: 'Crash Recovery', status: 'upcoming', desc: 'WAL in depth, undo vs redo logs, checkpoints, the ARIES algorithm, shadow paging.' },
            { num: '17', title: 'Distributed Databases & CAP Theorem', status: 'upcoming', desc: 'Fragmentation, replication strategies, two-phase commit, CAP theorem, BASE vs ACID.' },
            { num: '18', title: 'NoSQL Databases', status: 'upcoming', desc: 'Document, key-value, column-family, graph — internals, use cases, SQL vs NoSQL decision framework.' },
            { num: '19', title: 'Database Security', status: 'upcoming', desc: 'Authentication, authorization, SQL injection anatomy and prevention, encryption, audit logging.' },
            { num: '20', title: 'Interview Questions — 60 Complete Answers', status: 'upcoming', desc: 'Campus placements, product companies, GATE-level, system design — every question with full explanation.' },
          ].map((item) => (
            <div key={item.num} style={{
              display: 'flex', gap: 16, alignItems: 'flex-start',
              padding: '14px 16px',
              background: item.status === 'current' ? 'var(--accent-glow)' : item.status === 'done' ? 'rgba(0,120,212,0.05)' : 'transparent',
              border: item.status === 'current' ? '1px solid rgba(0,230,118,0.25)' : item.status === 'done' ? '1px solid rgba(0,120,212,0.15)' : '1px solid transparent',
              borderRadius: 8,
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
                color: item.status === 'current' ? 'var(--accent)' : item.status === 'done' ? '#0078d4' : 'var(--muted)',
                flexShrink: 0, marginTop: 2, minWidth: 24,
              }}>{item.num}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                  <span style={{
                    fontSize: 15, fontWeight: 700,
                    color: item.status === 'current' ? 'var(--accent)' : item.status === 'done' ? '#0078d4' : 'var(--text)',
                    fontFamily: 'Syne, sans-serif',
                  }}>{item.title}</span>
                  {item.status === 'current' && (
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>← YOU ARE HERE</span>
                  )}
                  {item.status === 'done' && (
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#0078d4', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>✓ LIVE</span>
                  )}
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── KEY TAKEAWAYS ── */}
      <KeyTakeaways items={[
        'Data is raw facts without context. Information is data given context and meaning. Knowledge is information combined with understanding to enable decisions. Databases store data — good design enables information and knowledge.',
        'File systems fail at scale for 7 fundamental reasons: redundancy, inconsistency, difficult access, no security, no concurrency control, no recovery, and data-program dependency. Every DBMS feature exists to solve one of these.',
        'A DBMS does far more than store data — it manages storage, enforces integrity, optimises queries, controls transactions, manages concurrency, handles recovery, and enforces security. Removing any one of these functions breaks real-world applications.',
        'Three-schema architecture separates external views (user perspective), conceptual schema (logical structure), and internal schema (physical storage). This separation enables data independence — changes at lower levels do not cascade upward.',
        'Physical data independence: change how data is stored without changing applications. Logical data independence: change the logical schema without breaking existing external views. Both are essential for long-lived database systems.',
        'Five major database types serve different problems: Relational (structured, consistent, universal), Document (flexible, nested), Key-Value (speed, caching), Column-Family (write-heavy scale), Graph (highly connected data). No single type solves everything.',
        'The DBA role exists because database management at production scale is a full-time, specialized discipline — covering performance, security, backup, recovery, replication, and capacity planning simultaneously.',
        'DBMS questions appear in every technical interview — campus, product, GATE, system design — because every application needs persistent storage and every engineer eventually has to make decisions about that storage.',
      ]} />

    </LearnLayout>
  )
}