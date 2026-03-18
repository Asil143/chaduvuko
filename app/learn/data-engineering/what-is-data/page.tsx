import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'What is Data? How Computers Store Information — Data Engineering | Chaduvuko',
  description:
    'The foundation of everything in data engineering. Understand what data actually is — from bits and bytes to files and databases — before you write a single line of code.',
}

// ── Local components ────────────────────────────────────────────────────────

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
    letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18,
    fontFamily: 'var(--font-display)', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700,
    letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12,
    fontFamily: 'var(--font-display)',
  }}>{children}</h3>
)

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{
    fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10,
  }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20,
  }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
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
      fontSize: 13, lineHeight: 1.9, color: 'var(--text)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
)

const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '24px 28px', marginBottom: 24,
  }}>
    {children}
  </div>
)

// ── Page ────────────────────────────────────────────────────────────────────

export default function WhatIsDataModule() {
  return (
    <LearnLayout
      title="What is Data? How Computers Store Information"
      description="The foundation of everything — bits, bytes, files, and why data needs engineers."
      section="Data Engineering"
      readTime="55 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — What Actually Is Data ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Starting Point" />
        <SectionTitle>What Actually Is Data?</SectionTitle>

        <Para>
          Before you build pipelines, before you write Python, before you think about the cloud — you
          need to understand what you are actually working with. And most tutorials skip this entirely.
          They assume you already know. You are going to know it properly.
        </Para>

        <Para>
          Data is a recorded observation. That is the simplest accurate definition. Any time something
          happens in the world and someone or something records it, that recording is data.
        </Para>

        <Para>
          When you tap the Swiggy app and order a biryani, a set of facts gets recorded: what you
          ordered, when you ordered it, from which restaurant, your delivery address, the price, the
          payment method, the device you used, your location coordinates. All of those facts together
          form one order record. Swiggy processes over 3 million orders every single day. Each one
          creates dozens of data points. That is data.
        </Para>

        <Para>
          When a Razorpay payment gateway processes a transaction, it records: the merchant, the
          amount, the currency, the timestamp, the payment instrument used, the success or failure
          status, the response time. Razorpay handles over 500 million transactions every year.
          Every single transaction is data.
        </Para>

        <Para>
          When you read this page, your browser is generating data — which page you loaded, how long
          you spent on it, what device you are using, which country you are in. Even reading is data.
        </Para>

        <Callout type="info">
          <strong>The core insight:</strong> Data is not a tech concept. Data is just recorded facts about the world.
          Technology is simply what we use to record, store, move, and make sense of those facts at a scale
          that humans cannot manage manually.
        </Callout>

        <Para>
          Here is where it gets interesting: a fact that is never recorded is not data. A customer
          who walked into a store, bought something, and left without any system recording that
          transaction — that sale never became data. It happened in the world, but the world has
          no memory of it. This is why data engineering exists: to make sure the right facts get
          captured, stored correctly, and made available when needed.
        </Para>

        <SubTitle>Data is meaningless without context</SubTitle>

        <Para>
          The number 42 is not data. It is just a number. But "₹42 — delivery charge — Swiggy order
          #8734621 — 14 March 2026 — Mumbai" is data. It is a fact about something specific that
          happened. Context is what turns numbers and text into information.
        </Para>

        <Para>
          This distinction matters deeply when you are building data systems. Raw numbers sitting in
          a file with no column names, no timestamps, no source identification — that is not useful
          data. A data engineer's job always involves making sure data carries enough context to be
          trusted and understood.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 — Binary ────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Language Every Computer Speaks" />
        <SectionTitle>Binary — How Computers Actually Think</SectionTitle>

        <Para>
          Every computer on earth — your phone, a Flipkart server in Hyderabad, the satellite
          orbiting 36,000 kilometres above you — stores and processes everything using the same
          two values. Zero and one. That is it. The entire digital world is built on two states.
        </Para>

        <Para>
          This is not a simplification. It is literally true. The reason computers use binary is
          physical. A transistor — the fundamental building block of every processor and memory
          chip — is essentially a tiny switch. It can be off or on. No current flowing, or current
          flowing. Engineers mapped "off" to 0 and "on" to 1. Every piece of data you have ever
          seen on a screen started as a pattern of these switches.
        </Para>

        <SubTitle>Why not use more than two states?</SubTitle>

        <Para>
          You might wonder: why not use ten states (0 through 9) like we do in everyday counting?
          It would fit more information into each switch. Researchers have tried. The problem is
          reliability. With two states, a switch is clearly on or clearly off — there is no
          ambiguity. With ten states, even a tiny variation in electrical voltage could cause the
          computer to misread a 4 as a 5. At the billions-of-operations-per-second speed that
          modern processors run, even rare mistakes would cascade into constant errors.
          Binary is reliable precisely because it is extreme — fully on, or fully off.
        </Para>

        <SubTitle>How binary represents numbers</SubTitle>

        <Para>
          In our everyday decimal system, each position in a number represents a power of 10.
          The number 347 means: 3 hundreds (10²) + 4 tens (10¹) + 7 ones (10⁰).
        </Para>

        <Para>
          Binary works exactly the same way, but with powers of 2 instead of powers of 10.
          Each position can only hold a 0 or a 1.
        </Para>

        <CodeBox label="Binary number positions">{`Position value:   128   64   32   16    8    4    2    1
                   (2⁷) (2⁶) (2⁵) (2⁴) (2³) (2²) (2¹) (2⁰)

Binary 00001010  =  0    0    0    0    1    0    1    0
                =  0 + 0 + 0 + 0 + 8 + 0 + 2 + 0
                =  10  (the number ten, in decimal)

Binary 01000001  =  0    1    0    0    0    0    0    1
                =  0 + 64 + 0 + 0 + 0 + 0 + 0 + 1
                =  65  (the decimal number sixty-five)`}</CodeBox>

        <Para>
          You do not need to memorise binary-to-decimal conversion. What you need to understand
          is this: every number your computer works with — every price, every user ID, every
          timestamp — is ultimately a pattern of zeros and ones in memory. The computer converts
          between binary and the decimal numbers you see on screen automatically.
        </Para>

        <Callout type="tip">
          <strong>Why data engineers need to know this:</strong> When you work with large datasets,
          you will constantly make decisions about how numbers are stored — as 32-bit integers,
          64-bit floats, and so on. These choices directly affect storage cost, processing speed,
          and the range of values your system can handle. You cannot make those decisions well
          without understanding that storage is ultimately about bits.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 — Bits, Bytes and Scale ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Bits, Bytes and the Scale of Data" />
        <SectionTitle>Bits, Bytes and Scale — From 0 to Petabytes</SectionTitle>

        <Para>
          A single zero or one is called a <strong>bit</strong> — short for binary digit. One bit
          can represent two possible states. Two bits can represent four states (00, 01, 10, 11).
          Eight bits together form a <strong>byte</strong>. One byte can represent 256 different
          values (2⁸ = 256), which is enough to store any single character in the English alphabet,
          any number from 0 to 255, or one pixel of a very simple image.
        </Para>

        <CodeBox label="The byte and what it can hold">{`1 bit   = one 0 or 1
8 bits  = 1 byte  = can hold 256 different values

Examples of what fits in 1 byte:
  The letter 'A'        = 65 in decimal  = 01000001 in binary
  The letter 'a'        = 97 in decimal  = 01100001 in binary
  The number 200        = 200 in decimal = 11001000 in binary
  The number 0          = 0 in decimal   = 00000000 in binary
  The number 255        = 255 in decimal = 11111111 in binary`}</CodeBox>

        <SubTitle>The storage scale — and what it means in practice</SubTitle>

        <Para>
          Now we build up from a single byte to the scale that data engineers actually work with.
          These are not abstract units — every one of these levels corresponds to a real engineering
          challenge.
        </Para>

        <CodeBox label="Storage units — from byte to petabyte">{`1 Byte      (B)   = 8 bits
                         ≈ one character of text

1 Kilobyte  (KB)  = 1,024 bytes
                         ≈ one short text message
                         ≈ half a page of plain text

1 Megabyte  (MB)  = 1,024 KB  = ~1 million bytes
                         ≈ one medium-quality photo
                         ≈ one minute of compressed audio

1 Gigabyte  (GB)  = 1,024 MB  = ~1 billion bytes
                         ≈ one full HD movie (compressed)
                         ≈ 1,000 books as plain text

1 Terabyte  (TB)  = 1,024 GB  = ~1 trillion bytes
                         ≈ 200,000 photos
                         ≈ all books in a large library

1 Petabyte  (PB)  = 1,024 TB  = ~1 quadrillion bytes
                         ≈ Google processes ~20 PB per day
                         ≈ Flipkart's data warehouse: multi-PB scale`}</CodeBox>

        <SubTitle>Real scale of Indian tech companies</SubTitle>

        <Para>
          When you join a data engineering team at a mid-size Indian startup, you will typically
          work with data in the gigabytes to low terabytes range. At a large platform like Zomato,
          Meesho, or PhonePe, the scale is multi-terabyte to low petabyte. At FAANG India
          operations, it is petabyte scale.
        </Para>

        <HighlightBox>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {[
              { company: 'Swiggy', stat: '~3M+ orders/day', data: 'Each order creates ~50 data fields. That is 150M+ data points generated every single day.' },
              { company: 'PhonePe', stat: '~14B transactions/year', data: 'Each transaction generates audit logs, fraud signals, and settlement records. Multi-TB per day.' },
              { company: 'Flipkart', stat: 'Big Billion Days', data: 'Single-day traffic spikes require pipelines that can handle 10× normal volume without failing.' },
              { company: 'Zomato', stat: '~2M daily orders', data: 'Real-time location tracking of delivery partners generates GPS pings every few seconds per agent.' },
            ].map((item) => (
              <div key={item.company}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                  textTransform: 'uppercase', marginBottom: 4,
                }}>
                  {item.company}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                  {item.stat}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                  {item.data}
                </div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <Para>
          The reason this matters to you: the scale of data directly determines which tools and
          approaches you use. A 10 MB CSV file can be opened in Excel. A 10 GB CSV takes seconds
          to load in Python. A 10 TB dataset cannot fit on a single machine at all — you need
          distributed systems. Understanding scale is how you know which solution is appropriate.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 — How Different Data Types Are Stored ───────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — How Numbers, Text, Images and Audio Are Stored" />
        <SectionTitle>How Different Kinds of Data Are Stored</SectionTitle>

        <Para>
          Everything is ultimately zeros and ones. But how does a computer turn a photo, a song, or
          a sentence into zeros and ones — and then perfectly reconstruct the original from them?
          Understanding this removes all the mystery from data formats, which is something you will
          deal with constantly as a data engineer.
        </Para>

        <SubTitle>How numbers are stored</SubTitle>

        <Para>
          Integers (whole numbers) are stored directly in binary. The question is only how many
          bits to use. More bits means a wider range of values you can represent.
        </Para>

        <CodeBox label="Integer storage — bits determine range">{`8-bit integer   = 1 byte   = values from 0 to 255
                           (or -128 to 127 if negative numbers are needed)
                           Use case: age, small counters, status codes

16-bit integer  = 2 bytes  = values from 0 to 65,535
                           Use case: port numbers, small IDs

32-bit integer  = 4 bytes  = values from 0 to ~4.3 billion
                           Use case: most IDs, counts, quantities
                           Danger zone: Swiggy order IDs exceeded 2B in 2023

64-bit integer  = 8 bytes  = values from 0 to ~18.4 quintillion
                           Use case: timestamps (Unix epoch in milliseconds),
                                     large financial transaction IDs`}</CodeBox>

        <Para>
          Decimal numbers (like ₹349.99) are stored as <strong>floating point</strong> numbers.
          Floating point is a way of storing a number with a decimal point by recording a
          mantissa (the significant digits) and an exponent (how far to shift the decimal point).
          This is how your computer stores ₹349.99 — not as the exact value, but as the closest
          representable binary fraction.
        </Para>

        <Callout type="warning">
          <strong>The floating point trap — a real data engineering bug:</strong> Floating point
          numbers cannot represent all decimal values exactly. Try this mental exercise: 0.1 + 0.2
          in binary floating point does not equal exactly 0.3. It equals 0.30000000000000004.
          This is why you should <strong>never store money as a floating point number</strong>.
          Store money as integers in the smallest currency unit (paise, cents) and divide when
          displaying. Many data pipelines have silently lost or gained fractions of rupees because
          of this exact mistake.
        </Callout>

        <SubTitle>How text is stored — character encoding</SubTitle>

        <Para>
          Text is stored by mapping each character to a number, then storing that number in binary.
          The mapping table is called an <strong>encoding</strong>. The original encoding — ASCII —
          mapped 128 characters (English letters, numbers, punctuation) to numbers 0 through 127,
          using 7 bits per character.
        </Para>

        <CodeBox label="ASCII — how English text maps to numbers">{`Character  →  Decimal  →  Binary
'A'        →  65       →  01000001
'B'        →  66       →  01000010
'a'        →  97       →  01100001
'z'        →  122      →  01111010
'0'        →  48       →  00110000
'9'        →  57       →  00111001
' ' (space) → 32       →  00100000

So the word "Data" stored in ASCII:
D = 68 = 01000100
a = 97 = 01100001
t = 116 = 01110100
a = 97 = 01100001

"Data" takes exactly 4 bytes in ASCII.`}</CodeBox>

        <Para>
          ASCII only covers English. The world has thousands of languages. Unicode was created to
          solve this — it maps over 140,000 characters from every major human language to unique
          numbers. <strong>UTF-8</strong> is the most widely used encoding that implements Unicode.
          It is backward-compatible with ASCII for English characters, but uses 2 to 4 bytes for
          characters outside the ASCII range.
        </Para>

        <Callout type="warning">
          <strong>The encoding mismatch error — one of the most common bugs in data engineering:</strong>{' '}
          A file was saved in one encoding (say, latin-1) and read assuming another (UTF-8).
          Result: Indian language characters, emojis, or special currency symbols like ₹ appear
          as garbled nonsense — or cause your pipeline to crash with a UnicodeDecodeError.
          Always declare the encoding explicitly when reading any file. Never assume.
        </Callout>

        <SubTitle>How images are stored</SubTitle>

        <Para>
          A digital image is a grid of pixels. Each pixel is a colour. Each colour is stored as
          three numbers — the intensity of red, green, and blue (RGB) — each between 0 and 255,
          which fits in one byte. So each pixel takes 3 bytes.
        </Para>

        <CodeBox label="Image size calculation">{`A 1920×1080 HD photo (no compression):
  1920 pixels wide × 1080 pixels tall = 2,073,600 pixels
  Each pixel = 3 bytes (red, green, blue)
  Total = 2,073,600 × 3 = 6,220,800 bytes = ~6.2 MB

A 12 megapixel smartphone photo (no compression):
  12,000,000 pixels × 3 bytes = 36,000,000 bytes = ~36 MB

  After JPEG compression (typical 10:1 ratio):
  ~36 MB becomes ~3.6 MB

This is why image compression formats like JPEG exist:
they reduce file size by discarding detail the human eye
barely notices. The file is smaller; some data is lost.`}</CodeBox>

        <Para>
          This is your first introduction to a concept you will use constantly as a data engineer:
          the trade-off between storage size and data fidelity. Compression reduces size but
          changes the data. Some compression is lossless (the original can be perfectly
          reconstructed). Some is lossy (some original data is permanently discarded). Choosing
          the right approach depends entirely on what the data is used for.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 — RAM vs Disk ────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Two Completely Different Kinds of Memory" />
        <SectionTitle>RAM vs Disk — Why Both Exist and Why It Matters</SectionTitle>

        <Para>
          Your computer has two fundamentally different ways of storing data. Most beginners
          treat them as the same thing. They are not. The difference between them explains
          why databases are designed the way they are, why some queries are fast and others
          slow, and why memory management is one of the hardest parts of building data pipelines.
        </Para>

        <HighlightBox>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: '#facc15',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase', marginBottom: 8,
              }}>
                RAM (Random Access Memory)
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
                <div style={{ marginBottom: 6 }}>⚡ Extremely fast — nanoseconds per read/write</div>
                <div style={{ marginBottom: 6 }}>📍 Directly accessible by CPU</div>
                <div style={{ marginBottom: 6 }}>💸 Expensive per GB</div>
                <div style={{ marginBottom: 6 }}>🔌 Volatile — all data lost when power is cut</div>
                <div style={{ marginBottom: 6 }}>📦 Small capacity (8–128 GB on most machines)</div>
                <div>🎯 Used for: currently running programs, active computations</div>
              </div>
            </div>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: '#4285f4',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase', marginBottom: 8,
              }}>
                Disk (SSD / HDD)
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
                <div style={{ marginBottom: 6 }}>🐢 Slow — microseconds to milliseconds per read</div>
                <div style={{ marginBottom: 6 }}>🔗 Accessed via I/O controller</div>
                <div style={{ marginBottom: 6 }}>💰 Cheap per GB</div>
                <div style={{ marginBottom: 6 }}>💾 Persistent — data survives power loss</div>
                <div style={{ marginBottom: 6 }}>📦 Large capacity (500 GB to many TB)</div>
                <div>🎯 Used for: stored files, databases, everything that must survive a restart</div>
              </div>
            </div>
          </div>
        </HighlightBox>

        <SubTitle>The speed gap is enormous — and it shapes everything</SubTitle>

        <Para>
          RAM is roughly 100,000 times faster than a traditional hard disk, and about 10–100 times
          faster than an SSD. This gap explains almost every performance decision in data
          engineering.
        </Para>

        <CodeBox label="The memory hierarchy — speed vs size vs cost">{`Storage Type     Speed           Typical Size     Cost per GB
─────────────────────────────────────────────────────────────
CPU Cache        ~1 ns           4–64 MB          Built into CPU
RAM              ~100 ns         8–256 GB          ~$5–8/GB
NVMe SSD         ~100 μs         256 GB–4 TB       ~$0.10/GB
SATA SSD         ~500 μs         256 GB–8 TB       ~$0.06/GB
HDD              ~10 ms          1–20 TB           ~$0.02/GB
Network Storage  ~1 ms–100 ms    Unlimited (cloud) ~$0.02–0.05/GB

ns = nanosecond (0.000000001 seconds)
μs = microsecond (0.000001 seconds)
ms = millisecond (0.001 seconds)`}</CodeBox>

        <Para>
          When you run a Python script that reads a 50 GB CSV file, Python must load it from disk
          into RAM before it can process anything. If your machine only has 16 GB of RAM, it
          cannot hold 50 GB at once. It has to read, process, and discard data in chunks — or
          crash. This is why data engineers write code that processes data in batches, use
          generators instead of loading everything at once, and choose storage formats (like
          Parquet) that allow reading only the columns you need.
        </Para>

        <Para>
          When you see a query run slowly against a database, the most common reason is that the
          data needed to answer the query was not in RAM — the database had to read it from disk,
          which takes orders of magnitude longer. Database indexes exist precisely to minimise
          how much data must be read from disk.
        </Para>

        <Callout type="info">
          <strong>Cloud storage is just networked disk.</strong> When you store data in Amazon S3,
          Azure Data Lake, or Google Cloud Storage, you are storing it on disk — physically on
          servers in a data centre. Reading from cloud storage has the same fundamental limitation:
          it is slow compared to RAM. The entire architecture of modern data platforms — caching,
          columnar formats, query pushdown — is designed around minimising how much data has to
          travel from slow storage to fast memory.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 — What a File Actually Is ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — What a File Actually Is" />
        <SectionTitle>What a File Actually Is</SectionTitle>

        <Para>
          You have been working with files your entire life — documents, photos, songs, PDFs.
          But almost nobody learns what a file actually is at the level that matters for
          engineering. Once you know, a huge number of things will suddenly make sense.
        </Para>

        <SubTitle>A file is bytes plus metadata</SubTitle>

        <Para>
          At the lowest level, a file is just a sequence of bytes stored on disk. There is no
          magic. A text file is bytes that happen to be valid UTF-8 encoded characters. An image
          file is bytes that represent pixel colours. A CSV file is bytes that happen to follow
          the convention of comma-separated values.
        </Para>

        <Para>
          What makes a file more than just a raw sequence of bytes is its <strong>metadata</strong> —
          data about the data. The operating system maintains a file system that tracks:
        </Para>

        <CodeBox label="What the file system tracks for every file">{`File metadata stored by the operating system:
  name          → orders_2026_03_14.csv
  location      → which sectors on disk hold the bytes
  size          → 4,827,392 bytes
  created_at    → 2026-03-14 06:00:01 UTC
  modified_at   → 2026-03-14 06:00:47 UTC
  permissions   → who can read, write, or execute it
  type          → the file extension is just a convention,
                  not enforced by the OS

The actual file content:
  Just bytes. The operating system does not care what they
  mean. That is the application's job to interpret.`}</CodeBox>

        <Para>
          The extension on a file — .csv, .json, .parquet — is just a naming convention. It is
          a hint to applications about how to interpret the bytes. It is not enforced. You can
          rename a CSV file to have a .txt extension and the bytes inside do not change. It is
          still comma-separated data. This is why reading a corrupted or mis-named file can cause
          confusing errors — the application expects one byte pattern, finds another.
        </Para>

        <SubTitle>File formats are agreements about byte structure</SubTitle>

        <Para>
          A file format is a specification that says: "if you arrange bytes in this specific
          pattern, any application that knows this format can read it correctly." The CSV format
          says: rows are separated by newlines, values within a row are separated by commas,
          and the first row is optionally a header. The JSON format says: data is structured as
          key-value pairs in a specific syntax with braces, brackets, colons, and quotes.
        </Para>

        <Para>
          As a data engineer, you will work with dozens of file formats. You will read corrupt
          files, handle encoding mismatches, deal with files that claim to be one format but
          contain another, and write code that validates file structure before processing.
          Understanding that a file is ultimately just bytes following a convention is what
          lets you debug these problems instead of just being confused by them.
        </Para>

        <Callout type="example">
          <strong>Try this mental exercise:</strong> Open any CSV file in a text editor and look at it.
          Then open an image file in a text editor. The image will show garbled characters —
          not because it is broken, but because the bytes that represent pixel colours do not
          happen to be valid text characters. You are seeing raw bytes being incorrectly
          interpreted as text. This is exactly what happens in a data pipeline when you
          read a file with the wrong format parser.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 — Why Files Are Not Enough ──────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — The Case for Databases" />
        <SectionTitle>Why Files Are Not Enough — The Case for Databases</SectionTitle>

        <Para>
          If data is just bytes in files, why do databases exist? Why not just use files for
          everything? This is a legitimate question. The answer explains not just what databases
          are, but why almost every serious application on earth uses one.
        </Para>

        <SubTitle>Problem 1 — Finding data in a file requires reading all of it</SubTitle>

        <Para>
          Imagine Flipkart stores all its customer data in one giant CSV file with 500 million
          rows. You want to find one specific customer by their email address. The only way is
          to start at the first row and read every single row until you find the match — or
          reach the end and confirm they do not exist. This is called a <strong>full scan</strong>.
          On a file with 500 million rows, this takes minutes. A database solves this with
          indexes — data structures that let you jump directly to the row you need in milliseconds.
        </Para>

        <SubTitle>Problem 2 — Concurrent access breaks files</SubTitle>

        <Para>
          What happens when two processes try to write to the same file at the same time?
          Without careful coordination, one write overwrites the other, or both get interleaved
          in a way that produces garbage data. Imagine two Razorpay servers simultaneously
          recording payments to the same file. With no coordination, transactions disappear.
          Databases are built to handle thousands of simultaneous reads and writes safely.
        </Para>

        <SubTitle>Problem 3 — Files have no concept of transactions</SubTitle>

        <Para>
          A bank transfer involves two operations: subtract money from account A, add it to
          account B. If the system crashes after the subtraction but before the addition,
          the money has vanished. Files have no mechanism to say "either both of these
          operations happen, or neither does." Databases have transactions — they guarantee
          that a group of operations either all succeed together, or all fail together, leaving
          the data in a consistent state.
        </Para>

        <SubTitle>Problem 4 — Files do not enforce data structure</SubTitle>

        <Para>
          Nothing stops someone from adding a row to a CSV with the wrong number of columns,
          or putting text where a number should be, or leaving required fields empty. Databases
          enforce schemas — rules that define exactly what each column can contain. If you
          try to insert a row that violates those rules, the database rejects it. This
          catches bad data before it corrupts your entire dataset.
        </Para>

        <CodeBox label="Files vs Databases — the fundamental differences">{`Files                              Databases
──────────────────────────────────────────────────────────────────
Sequential access (read all         Random access (jump to any
to find one thing)                  record instantly via indexes)

No concurrency control              Built-in concurrent access
(two writers corrupt data)          (thousands of writers safely)

No transactions                     ACID transactions
(crash = data corruption)           (crash = automatic recovery)

No schema enforcement               Schema enforcement
(garbage in = garbage stored)       (invalid data rejected)

No query language                   SQL / query language
(write code for every search)       (one query for any search)

Best for:                           Best for:
  bulk storage                        operational data
  archiving                           applications
  data transfer between systems       anything with concurrent access`}</CodeBox>

        <Para>
          This is not to say files are bad. Files are essential. As a data engineer you will
          work with both extensively. Files — especially efficient formats like Parquet — are
          the backbone of data lakes and long-term storage. Databases handle the live, transactional
          data your applications run on. Understanding when to use each is one of the first
          architectural decisions you will face on the job.
        </Para>
      </section>

      <Divider />

      {/* ── Part 08 — The Scale Problem ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Why Data Needs Engineers" />
        <SectionTitle>The Scale Problem — Why Data Needs Engineers</SectionTitle>

        <Para>
          You now understand what data is, how it is stored, and why databases exist. But you
          still have not answered the most important question: why is there a job called
          "data engineer"? Why not just let the application write data to a database and have
          analysts query it directly?
        </Para>

        <Para>
          The answer is scale, velocity, variety, and conflict.
        </Para>

        <SubTitle>Scale — the database that runs the app cannot also serve analytics</SubTitle>

        <Para>
          A transactional database — the one that Swiggy's app writes orders to in real time —
          is optimised for fast individual reads and writes. It is terrible at the kind of
          questions analytics needs: "What is the total order value broken down by city and
          restaurant category for the last 30 days?" Running that query on the live application
          database would require scanning millions of rows, using enormous amounts of CPU,
          and slowing down the live app for every user placing an order at that moment.
          Companies cannot risk that.
        </Para>

        <Para>
          The solution is to copy data from the operational database into a separate system built
          specifically for analytics queries — a data warehouse or data lake. Someone has to
          build and maintain the pipelines that perform that copy, continuously, reliably, and
          correctly. That person is the data engineer.
        </Para>

        <SubTitle>Velocity — data is generated faster than humans can manage it</SubTitle>

        <Para>
          Zomato generates GPS pings from delivery partners every few seconds. During peak hours,
          that is potentially millions of events per minute. A human cannot manually process
          these. They need automated pipelines that capture the stream, aggregate it, and make
          it available for analysis — all in near real-time. Data engineers design and build
          those automated systems.
        </Para>

        <SubTitle>Variety — data comes from dozens of sources in different formats</SubTitle>

        <Para>
          A typical company has data in: a MySQL production database, a MongoDB collection
          for product catalogue, Kafka event streams from user actions, CSV files from
          partner vendors, JSON responses from third-party APIs, Excel files from the finance
          team, and log files from application servers. All of these need to be brought together,
          made consistent, and stored in a way that allows unified analysis. Each source requires
          a different connector, a different parsing approach, and a different validation strategy.
          That work is data engineering.
        </Para>

        <SubTitle>Conflict — raw data is almost never usable as-is</SubTitle>

        <Para>
          Raw data from real systems is messy. Customer names have inconsistent capitalisation.
          Dates are in three different formats depending on which team created the field.
          The same product has different IDs in the CRM and the order management system.
          Null values mean different things in different tables. A data engineer's job includes
          cleaning, standardising, and validating data before it reaches analysts and scientists —
          because decisions made on bad data are worse than no data at all.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
            textTransform: 'uppercase', marginBottom: 12,
          }}>
            The data engineering problem in one paragraph
          </div>
          <Para>
            Data is generated at high speed from many different sources in many different
            formats. It needs to be moved, cleaned, combined, and stored in a way that
            allows it to be queried reliably and quickly — without disrupting the systems
            that generated it in the first place. This pipeline has to run automatically,
            handle failures gracefully, scale as data volume grows, and produce output that
            analysts and scientists can trust. Building, running, and improving that pipeline
            is the job of a data engineer.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Day One at a Bangalore Startup — The Data Problem You Inherit</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — Fintech Startup, Bangalore · 3rd day on the job
          </div>

          <Para>
            You join a Series B fintech startup as their first dedicated data engineer. The
            company has 800,000 active users, processes ₹50 crore in transactions per month,
            and has a team of four analysts who are all using Excel.
          </Para>

          <Para>
            On your third day, your manager sends you a Slack message: "Our analysts need to
            answer: what is our 30-day retention rate by acquisition channel, broken down by
            city, for the last 6 months? The product team needs this by Friday."
          </Para>

          <SubSubTitle>What you find when you investigate</SubSubTitle>

          <Para>
            User data lives in a PostgreSQL database — the same one the app reads and writes
            to in real time. It has 23 tables with no documentation. Transaction data is in
            a separate MySQL database managed by a vendor. Acquisition channel data is in a
            Google Sheet that the marketing team manually updates every Monday. City data is
            derived from IP addresses at signup, stored as raw IP strings, not city names.
          </Para>

          <Para>
            Nobody has connected these systems before. There is no data warehouse. There is
            no pipeline. The analysts have been manually exporting CSVs from the databases
            every week and joining them in Excel — and the Excel files are 200 MB and crash
            regularly.
          </Para>

          <SubSubTitle>What this problem is, at its core</SubSubTitle>

          <Para>
            This is a data engineering problem. The raw data exists. It is recorded. It is
            stored in databases. But it is in three different systems, in different formats,
            with no automated way to bring it together. Someone needs to build the pipeline
            that: extracts data from all three sources, transforms it into a consistent
            structure, resolves the IP-to-city mapping, loads it into a single queryable
            destination, and keeps it updated automatically so the analysts do not have to
            do any of this manually.
          </Para>

          <Para>
            That is your job. And before you can do any of it well, you need to understand
            exactly what you are dealing with at every level — what the data is, how it is
            stored, what format it is in, and what happens to it as it moves from source to
            destination.
          </Para>

          <Para>
            This is why Module 01 starts here. Not with tools. Not with the cloud. With the
            foundation. Because the data engineer who understands data deeply writes pipelines
            that do not break at 3am.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Misconceptions That Will Slow You Down" />
        <SectionTitle>Five Misconceptions That Hurt Data Engineers</SectionTitle>

        <Para>
          These are the wrong mental models that cause real bugs, bad architectural decisions,
          and wasted hours. Clear them out now before they become habits.
        </Para>

        {[
          {
            wrong: '"More data is always better"',
            right: 'Storing data you never use is not just wasteful — it is expensive and creates compliance risk. Good data engineering is as much about what you choose not to store as what you do store. The India DPDP Act (Digital Personal Data Protection Act) has strict rules about storing personal data. Collecting everything with no plan is a liability, not an asset.',
          },
          {
            wrong: '"The database is the source of truth"',
            right: 'The application database is the source of truth for operational data right now. But operational databases are not designed for historical analysis. They might delete old records, update rows in place, or archive data in ways that lose history. A data warehouse or data lake is what stores the full auditable history. Confusing these two leads to architectures where you cannot answer "what did the data look like six months ago?"',
          },
          {
            wrong: '"If it ran successfully, the data is correct"',
            right: 'A pipeline can complete without errors and still produce wrong data. The source could have sent corrupted records. The transformation logic could have a silent bug. A JOIN could have silently produced duplicate rows. Successful execution means the code ran — it does not mean the output is right. This is why data quality checks exist as a separate, explicit step in every mature pipeline.',
          },
          {
            wrong: '"Text is just text"',
            right: 'Text has an encoding, a language, a collation, a line ending convention (Windows uses \\r\\n, Unix uses \\n), and may contain invisible characters like zero-width spaces. Two strings that look identical on screen can be different bytes because of encoding differences, invisible characters, or different representations of the same Unicode character. These differences cause silent failures in joins, lookups, and comparisons.',
          },
          {
            wrong: '"The cloud handles storage automatically — I just upload it"',
            right: 'Cloud storage is disk. It has the same fundamental characteristics as disk: it is slow compared to memory, it costs money per GB stored and per GB transferred, and reads from cloud storage are a major bottleneck in most data pipelines. "Just upload it" without thinking about file format, partitioning, and compression is how teams end up with petabytes of data they cannot query efficiently.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontSize: 13, fontWeight: 700, color: 'var(--red)',
              marginBottom: 8, fontFamily: 'var(--font-mono)',
            }}>
              ✕ "{item.wrong}"
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
              {item.right}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 11 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        <Callout type="tip">
          These are questions that appear in data engineering interviews — often in the first
          round, asked by a senior engineer who wants to test whether you understand the
          fundamentals or just memorised tool documentation. These answers are written at
          the depth a senior engineer expects to hear.
        </Callout>

        {[
          {
            q: 'Q1. Why should you never store monetary values as floating point numbers?',
            a: `Floating point numbers use binary fractions to approximate decimal values, and most decimal fractions cannot be represented exactly in binary. For example, the decimal value 0.1 is stored as an infinitely repeating binary fraction — the closest representable value is approximately 0.1000000000000000055511151231257827021181583404541015625. When you perform arithmetic on floating point money values, these tiny errors accumulate. Two floating point additions that should both equal ₹100.00 might return ₹99.99999999999998 and ₹100.00000000000001 respectively.

In financial systems, this causes reconciliation failures, incorrect balance calculations, and in regulated environments, compliance violations. The correct approach is to store money as integers in the smallest currency unit (paise for INR, cents for USD) and convert to decimal only for display. ₹349.75 is stored as the integer 34975. All arithmetic is integer arithmetic, which is exact. This is how Razorpay, PhonePe, and every serious payment system stores monetary values.`,
          },
          {
            q: 'Q2. What is the difference between a bit, a byte, and a character, and why does a data engineer need to understand this distinction?',
            a: `A bit is the fundamental unit of digital information — a single binary digit, either 0 or 1. A byte is 8 bits — the smallest addressable unit of memory in most systems, capable of holding 256 distinct values. A character is a human-readable symbol (a letter, digit, or punctuation mark) whose relationship to bytes depends entirely on the encoding used.

In ASCII, one character always equals one byte. In UTF-8 (which all data engineers must understand), a character can be 1 to 4 bytes depending on which character it is — English ASCII characters are 1 byte, most European characters are 2 bytes, Hindi and other Indic scripts are 3 bytes.

A data engineer needs this distinction because: (1) file size calculations must account for encoding — a 1 million row CSV with primarily Hindi text is 2-3× larger than the same data in English; (2) string operations like SUBSTRING behave differently depending on whether the database counts bytes or characters — cutting a UTF-8 string by byte position can split a multi-byte character in half, producing corrupt text; (3) column sizing in databases must be set in bytes or characters depending on the database engine, and getting this wrong causes data truncation or storage inefficiency.`,
          },
          {
            q: 'Q3. Explain why reading from cloud storage (S3, ADLS, GCS) is fundamentally slower than reading from local disk, and what data engineers do about it.',
            a: `Cloud storage is physically located on servers in a data centre, accessed over a network. Even within the same AWS availability zone, a network read has additional latency compared to a local disk read — typically adding 1–10 milliseconds per request. More importantly, cloud storage systems like S3 are object stores optimised for throughput on large sequential reads, not random access. Accessing many small files generates many separate network requests, each with its own latency overhead. This is the origin of "the small file problem" — a common data engineering performance anti-pattern.

Data engineers address this through several techniques: (1) File consolidation — merging many small files into fewer large files reduces the number of network requests; (2) Columnar formats — Parquet and ORC allow reading only the specific columns needed by a query, reducing the bytes transferred across the network; (3) Partitioning — organising files in directories by date, region, or other filter dimensions so queries can skip irrelevant partitions entirely; (4) Predicate pushdown — pushing filter conditions down into the storage reader so data is filtered before it crosses the network. Combined, these techniques can reduce the data read from cloud storage by 90%+ compared to naively reading all CSV files.`,
          },
          {
            q: 'Q4. Why cannot you simply run analytics queries directly on the production operational database?',
            a: `Operational databases (OLTP — Online Transaction Processing) and analytical databases (OLAP — Online Analytical Processing) are optimised for completely different workloads, and running analytical queries on an OLTP system creates two serious problems.

First, resource conflict: an OLAP query like "sum all transactions by city for the last 90 days" requires a full table scan across millions of rows, consuming significant CPU, memory, and I/O. Running this on the production database slows down every concurrent application operation — order placements, payment processing, inventory updates. At companies like Swiggy or Zomato, where thousands of transactions are processed per second, even a 20% performance degradation during peak hours is unacceptable.

Second, architectural mismatch: OLTP databases are row-oriented — all columns for one row are stored together. This is optimal for reading or writing a single complete record quickly. OLAP queries typically access only a few columns across many millions of rows. A row-oriented store must read all columns even if the query needs only two — massively wasteful. Data warehouses use columnar storage, where all values of one column are stored together, making these aggregation queries 10–100× faster.

The solution is to build a separate analytical system — a data warehouse or data lake — and maintain continuous pipelines that copy data from the operational database to the analytical system. This separation is one of the foundational architectural patterns in data engineering.`,
          },
          {
            q: 'Q5. What is the difference between data and information, and why does this matter when designing a data pipeline?',
            a: `Data is raw recorded facts — numbers, strings, bytes — without interpretation. Information is data that has been given context and meaning so that it supports a decision or reveals a pattern. The number 4.2 is data. "Customer satisfaction score for Bangalore restaurant cluster: 4.2 out of 5, down from 4.6 last quarter, correlated with 15% increase in delivery times" is information.

This distinction matters in pipeline design because the transformation from data to information is where value is created — and also where most data quality failures occur. A pipeline that moves raw data from source to destination without adding reliable context produces data that cannot be trusted for decisions. Good pipeline design asks at each stage: what context needs to be preserved, derived, or added for this data to be usable?

Practically, this means: preserving source timestamps so analysts know when events happened (not just when they were processed); maintaining lineage metadata so anyone can trace where a number came from; enriching raw IDs with human-readable labels; and validating that the data matches known business rules before it is labelled as clean. A pipeline that loads data without these practices produces a data lake that looks full but cannot answer real business questions — what the industry calls a data swamp.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{
              fontSize: 14, fontWeight: 800, color: 'var(--text)',
              marginBottom: 14, lineHeight: 1.4,
            }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        <Para>
          These are real errors that appear when working with data at the byte and encoding level.
          Every data engineer hits them. Now you will understand them when you see them.
        </Para>

        {[
          {
            error: `UnicodeDecodeError: 'utf-8' codec can't decode byte 0xe2 in position 47: invalid continuation byte`,
            cause: 'A file saved in a non-UTF-8 encoding (commonly latin-1, windows-1252, or UTF-16) is being read with the default UTF-8 decoder. The byte 0xe2 is a valid start byte in UTF-8 but the bytes that follow it do not form a valid UTF-8 sequence — because they are not UTF-8 at all.',
            fix: 'Open the file with the correct encoding: pd.read_csv("file.csv", encoding="latin-1"). If you do not know the encoding, use the chardet library to detect it: chardet.detect(open("file.csv", "rb").read()). Long term, standardise on UTF-8 at data ingestion and reject files that are not UTF-8.',
          },
          {
            error: `OverflowError: Python int too large to convert to C long`,
            cause: 'A numeric column contains values that exceed the maximum value for the integer type being used (commonly 32-bit signed integer, max ~2.1 billion). This happens when auto-incrementing IDs or transaction counts at high-scale companies exceed the 32-bit limit.',
            fix: 'Cast the column to 64-bit integer: df["id"] = df["id"].astype("int64"). In database schema definitions, use BIGINT instead of INT for any ID or counter column that could plausibly exceed 2 billion.',
          },
          {
            error: `MemoryError: Unable to allocate 48.3 GiB for an array`,
            cause: 'The code is attempting to load an entire file or dataset into RAM at once, but the machine does not have enough available memory. Common with naive pd.read_csv() calls on large files.',
            fix: 'Process the file in chunks: pd.read_csv("file.csv", chunksize=100000) returns an iterator that reads 100,000 rows at a time. Alternatively, use a format like Parquet with columnar reading — read only the columns you need rather than all columns.',
          },
          {
            error: `ValueError: time data '14-03-2026' does not match format '%Y-%m-%d'`,
            cause: 'Date values in the file are formatted differently from what the parser expects. Different teams, different tools, and different regions use different date formats: DD-MM-YYYY, MM/DD/YYYY, YYYY-MM-DD, 14 Mar 2026, and many others. A single pipeline receiving data from multiple sources often encounters all of them.',
            fix: 'Use pd.to_datetime(df["date"], infer_datetime_format=True) for flexible parsing, or explicitly handle each format: pd.to_datetime(df["date"], format="%d-%m-%Y"). The best long-term fix is to standardise all dates to ISO 8601 (YYYY-MM-DD) at the point of ingestion.',
          },
          {
            error: `Database column "amount" type is FLOAT but financial reconciliation shows ₹0.02 discrepancy`,
            cause: 'This is the floating point precision problem. The "amount" column was defined as FLOAT (or DOUBLE) instead of DECIMAL or an integer type. Accumulated floating point arithmetic errors have produced values that are fractionally wrong — not visible in the data but caught during reconciliation against bank records.',
            fix: 'Change the column type to DECIMAL(15, 2) for currency values (15 total digits, 2 after decimal point), or store as BIGINT in paise. Migrate existing data: UPDATE transactions SET amount_paise = ROUND(amount_float * 100). This is a schema migration — always test on a staging environment first.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12,
              color: 'var(--red)', marginBottom: 12,
              background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)',
              borderRadius: 6, padding: '8px 12px',
              lineHeight: 1.5,
            }}>
              {item.error}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase',
              }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase',
              }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'Data is a recorded observation — a fact about the world captured by a system. If it is not recorded, it is not data.',
        'Every computer stores everything as binary — patterns of 0s and 1s. Understanding this explains every storage decision you will ever make.',
        'A byte is 8 bits and can hold 256 values. Choosing the right data type (int32 vs int64, float vs decimal) directly affects storage cost and correctness.',
        'Never store monetary values as floating point. Use integers (paise/cents) or DECIMAL types. Floating point arithmetic accumulates errors that cause financial reconciliation failures.',
        'RAM is fast but volatile and expensive. Disk is slow but persistent and cheap. Everything in data engineering architecture is shaped by managing this trade-off.',
        'A file is just bytes — the extension is only a convention. File formats are agreements about byte structure. A mis-named or corrupt file causes a data pipeline to fail in confusing ways.',
        'Text encoding determines how characters map to bytes. Always use UTF-8. Always declare the encoding explicitly. Never assume.',
        'Databases exist because files cannot handle concurrent access, do not support transactions, have no indexing, and enforce no schema. Both files and databases have important roles in data engineering.',
        'Operational databases (OLTP) and analytical databases (OLAP) are built for different workloads. Running analytics on a production database slows the application and produces slow query results. This is why data warehouses and data pipelines exist.',
        'The data engineer exists because data is generated too fast, from too many sources, in too many formats, for any manual process to handle. The job is to build the automated systems that make raw data reliably usable.',
      ]} />

    </LearnLayout>
  )
}