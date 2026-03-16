import type { Metadata } from 'next'
import {LearnLayout} from '@/components/content/LearnLayout'
import {Callout} from '@/components/content/Callout'
import {KeyTakeaways} from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Introduction to Databases & DBMS | Chaduvuko',
  description:
    'What is a database, what is a DBMS, and why does every application depend on one? Start from absolute zero — no prior knowledge needed.',
}

export default function DBMSIntroduction() {
  return (
    <LearnLayout
      title="Introduction to Databases & DBMS"
      description="What a database actually is, why every application depends on one, and what you will be able to build by the end of this track."
      section="DBMS"
      readTime="25–30 min"
      updatedAt="March 2026"
    >

      {/* ── SECTION 1 — HOOK ── */}
      <section style={{ marginBottom: 56 }}>
        <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
          Let's start with something you already use every day.
        </p>
        <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
          When you open <strong>Zomato</strong> and search for "biryani near me" — in under a second,
          the app shows you 40 restaurants, their menus, prices, ratings, delivery time, and whether
          they're open right now.
        </p>
        <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
          That's not magic. That's a <strong>database working at full speed.</strong>
        </p>
        <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
          Every restaurant name, every menu item, every customer review, every past order you've
          placed — all of it is stored in a database. When you hit search, the database finds exactly
          what you need from millions of records in milliseconds.
        </p>
        <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
          Same when you order on <strong>Flipkart</strong> — your cart, your address, your payment
          method, your order history, the stock count of that product — all of it is database
          operations happening in real time. And when you message someone on <strong>WhatsApp</strong> —
          your contacts, chat history, delivery receipts — database again.
        </p>

        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderLeft: '4px solid var(--accent)',
          borderRadius: 10,
          padding: '20px 24px',
          marginTop: 24,
        }}>
          <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
            <strong style={{ color: 'var(--accent)' }}>Simple definition:</strong> A database is an
            organized collection of data that can be stored, retrieved, and managed efficiently.
            The word <em>"organized"</em> is the key — a random pile of files is not a database.
            A database has structure, so you can find exactly what you need, exactly when you need it.
          </p>
        </div>
      </section>

      {/* ── SECTION 2 — THE PROBLEM ── */}
      <section style={{ marginBottom: 56 }}>
        <h2 style={{
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 900,
          letterSpacing: '-1px',
          color: 'var(--text)',
          marginBottom: 20,
        }}>
          The Problem Databases Solve — A Story
        </h2>

        <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
          Imagine you're running a small shop. You have 50 customers. You write their names, phone
          numbers, and orders in a notebook. That works fine for 50 customers.
        </p>
        <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
          Now your business grows. 5,000 customers. 200 orders a day. You hire staff. Now three
          people are writing in the same notebook simultaneously. Pages get torn. Someone writes the
          wrong phone number. A customer calls to change their order but no one can find which page
          it's on. Two staff members update the same order at the same time and the numbers don't match.
        </p>
        <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 28 }}>
          This is exactly the problem every business faces when they try to manage data without a
          proper database. Let's name each problem so you recognize it when it comes up in interviews:
        </p>

        {/* Problems Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 28 }}>
          {[
            {
              title: 'Data Redundancy',
              desc: 'The same customer\'s address is written in 5 different places. When they move, someone updates 3 of them and misses 2. You now have conflicting information everywhere.',
            },
            {
              title: 'Data Inconsistency',
              desc: 'One page says the phone is 98765-43210. Another says 98765-43219. Which is correct? Nobody knows. Both look equally valid.',
            },
            {
              title: 'Difficult Data Access',
              desc: '"Show me all orders above ₹500 placed on Sundays in Hyderabad." With notebooks and spreadsheets, you\'d spend hours. A database answers this in milliseconds.',
            },
            {
              title: 'No Security Control',
              desc: 'Anyone who picks up the notebook reads everything. You can\'t say "billing staff can see prices but NOT customer phone numbers."',
            },
            {
              title: 'No Concurrent Access',
              desc: 'Two people can\'t safely update the same record simultaneously without one overwriting the other. In a busy system, this causes data corruption.',
            },
            {
              title: 'No Recovery',
              desc: 'If the notebook is lost, burned, or soaked — the data is gone forever. No undo. No backup. No way back.',
            },
          ].map((item) => (
            <div key={item.title} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '18px 20px',
            }}>
              <div style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--red)',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                marginBottom: 8,
                fontFamily: 'var(--font-mono)',
              }}>
                ✕ Problem
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        <Callout type="tip">
          A Database Management System (DBMS) solves every single one of these problems — redundancy,
          inconsistency, access difficulty, security, concurrency, and recovery. That's the entire
          reason it was invented.
        </Callout>
      </section>

      {/* ── SECTION 3 — WHAT IS A DBMS ── */}
      <section style={{ marginBottom: 56 }}>
        <h2 style={{
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 900,
          letterSpacing: '-1px',
          color: 'var(--text)',
          marginBottom: 20,
        }}>
          What is a DBMS?
        </h2>

        <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
          A <strong>DBMS (Database Management System)</strong> is software that manages a database.
          It sits between your application and the raw data — handling everything. Storing data,
          retrieving it, securing it, keeping it consistent even when 10,000 people are using it
          at the same time.
        </p>
        <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 24 }}>
          Think of it like this: your data is a library of millions of books. You could wander
          through the shelves yourself and search every single shelf manually — that's a file system.
          Or you could go to the <strong>librarian</strong> (the DBMS) and say "I need all books on
          databases published after 2020 by Indian authors" — and the librarian finds them in
          2 seconds flat.
        </p>
        <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 28 }}>
          The librarian knows exactly where everything is, makes sure only authorized people can
          access certain sections, keeps a log of who borrowed what, and ensures two people don't
          check out the same last copy at the same time.
        </p>

        {/* DBMS examples table */}
        <div style={{ overflowX: 'auto', marginBottom: 12 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['DBMS', 'Used By', 'Best For'].map((h) => (
                  <th key={h} style={{
                    textAlign: 'left',
                    padding: '10px 14px',
                    color: 'var(--muted)',
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['MySQL', 'Flipkart, Facebook (historically)', 'Web applications, startups'],
                ['PostgreSQL', 'Instagram, Swiggy, Razorpay', 'Complex queries, high reliability'],
                ['Oracle', 'Banks, large enterprises', 'Mission-critical enterprise data'],
                ['SQL Server', 'Large Indian IT companies', 'Windows-heavy enterprise stacks'],
                ['MongoDB', 'Zomato, many startups', 'Flexible, document-based storage'],
                ['Redis', 'Almost every large app', 'Caching, sessions, real-time data'],
                ['SQLite', 'Every mobile app', 'Lightweight, on-device storage'],
              ].map(([dbms, usedBy, bestFor], i) => (
                <tr key={dbms} style={{
                  borderBottom: '1px solid var(--border)',
                  background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
                }}>
                  <td style={{ padding: '12px 14px', color: 'var(--accent)', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: 13 }}>{dbms}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text)' }}>{usedBy}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--muted)' }}>{bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── SECTION 4 — DATABASE vs DBMS vs DATABASE SYSTEM ── */}
      <section style={{ marginBottom: 56 }}>
        <h2 style={{
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 900,
          letterSpacing: '-1px',
          color: 'var(--text)',
          marginBottom: 20,
        }}>
          Database vs DBMS vs Database System
        </h2>

        <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 24 }}>
          These three terms get confused constantly — even by people who've been working in tech
          for years. Here's the clean definition for each, once and for all.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 24 }}>
          {[
            {
              label: 'Database',
              color: '#0078d4',
              icon: '🗄️',
              desc: 'The actual data. Just the data. Tables, records, files stored on disk. If you deleted the DBMS software tomorrow, the data files would still exist. That raw collection is the database.',
            },
            {
              label: 'DBMS',
              color: 'var(--accent)',
              icon: '⚙️',
              desc: 'The software that manages the database. MySQL, PostgreSQL, Oracle — these are DBMS products. They read, write, protect, and organize the database. Without the DBMS, you can\'t easily interact with the data.',
            },
            {
              label: 'Database System',
              color: 'var(--purple)',
              icon: '🏗️',
              desc: 'The complete picture: your application code + the DBMS software + the database itself, all working together. When someone says "Swiggy\'s database system," they mean all three layers combined.',
            },
          ].map((item) => (
            <div key={item.label} style={{
              background: 'var(--surface)',
              border: `1px solid var(--border)`,
              borderTop: `3px solid ${item.color}`,
              borderRadius: 10,
              padding: '20px 20px',
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 10 }}>{item.label}</div>
              <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <Callout type="info">
          Quick memory trick — the <strong>Database</strong> is the building (the structure and contents).
          The <strong>DBMS</strong> is the security system, elevators, and staff that manage the building.
          The <strong>Database System</strong> is the entire property — building + staff + all operations combined.
        </Callout>
      </section>

      {/* ── SECTION 5 — TYPES OF DATABASES ── */}
      <section style={{ marginBottom: 56 }}>
        <h2 style={{
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 900,
          letterSpacing: '-1px',
          color: 'var(--text)',
          marginBottom: 20,
        }}>
          Types of Databases
        </h2>

        <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 28 }}>
          Not all databases work the same way. Different problems need different types. Here are
          the main categories you'll encounter in the real world and in interviews.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
          {[
            {
              type: 'Relational Databases (RDBMS)',
              color: '#0078d4',
              tag: 'The Foundation — Learn This First',
              examples: 'MySQL · PostgreSQL · Oracle · SQL Server',
              usedFor: 'Orders, customers, payments, inventory — anything with structured, related data',
              desc: 'Data is stored in tables with rows and columns — like a very powerful, intelligent spreadsheet. Tables are linked to each other using keys. You use SQL to talk to it. This is what this entire track is built on.',
            },
            {
              type: 'NoSQL Databases',
              color: 'var(--accent)',
              tag: 'Covered Later in This Track',
              examples: 'MongoDB · Redis · Cassandra · Neo4j',
              usedFor: 'Social feeds, product catalogs, real-time analytics, recommendation engines',
              desc: 'Data is stored as documents, key-value pairs, graphs, or wide columns. More flexible structure. Better for certain scale requirements where rigid table structure gets in the way.',
            },
            {
              type: 'In-Memory Databases',
              color: 'var(--yellow)',
              tag: 'Speed-First Design',
              examples: 'Redis · Memcached',
              usedFor: 'Caching, session storage, leaderboards, real-time counters, OTP storage',
              desc: 'Data lives in RAM instead of disk. Blindingly fast — microsecond reads. Data is lost on restart unless separately persisted. Every large Indian app (Paytm, CRED, Swiggy) uses Redis for caching.',
            },
            {
              type: 'Time-Series Databases',
              color: 'var(--orange)',
              tag: 'For Sequential, Timestamped Data',
              examples: 'InfluxDB · TimescaleDB · Apache Druid',
              usedFor: 'IoT sensors, server monitoring dashboards, stock price tracking, trading platforms',
              desc: 'Optimized for data that arrives in a continuous stream over time. Regular databases slow down with millions of time-stamped records. Time-series databases are built exactly for this.',
            },
            {
              type: 'Cloud Databases',
              color: 'var(--purple)',
              tag: 'Modern Standard — No Servers to Manage',
              examples: 'AWS RDS · Azure SQL · Google Cloud SQL · Snowflake',
              usedFor: 'Any modern application that doesn\'t want to manage its own database servers',
              desc: 'Traditional databases hosted and managed entirely on cloud platforms. No hardware to buy, no OS to patch, no backups to manually configure. You use them the same way — just without any server management.',
            },
          ].map((item) => (
            <div key={item.type} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderLeft: `4px solid ${item.color}`,
              borderRadius: 10,
              padding: '20px 24px',
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>{item.type}</span>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: item.color,
                  background: `${item.color}18`,
                  border: `1px solid ${item.color}40`,
                  borderRadius: 4,
                  padding: '2px 8px',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {item.tag}
                </span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 12 }}>{item.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13 }}>
                <span><span style={{ color: 'var(--muted)' }}>Examples: </span><span style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{item.examples}</span></span>
                <span><span style={{ color: 'var(--muted)' }}>Used for: </span><span style={{ color: 'var(--text)' }}>{item.usedFor}</span></span>
              </div>
            </div>
          ))}
        </div>

        <Callout type="info">
          For this entire track, we focus on <strong>Relational Databases</strong>. They are the
          foundation of everything. Once you understand relational databases deeply — normalization,
          indexes, transactions, query optimization — every other database type starts making
          perfect sense. You learn one thing right, and everything else becomes easier.
        </Callout>
      </section>

      {/* ── SECTION 6 — WHAT A DBA DOES ── */}
      <section style={{ marginBottom: 56 }}>
        <h2 style={{
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 900,
          letterSpacing: '-1px',
          color: 'var(--text)',
          marginBottom: 20,
        }}>
          What is a DBA? What Do They Actually Do at Work?
        </h2>

        <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
          A <strong>DBA (Database Administrator)</strong> is the person responsible for keeping
          a company's databases healthy, fast, secure, and recoverable.
        </p>
        <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 24 }}>
          At a company like <strong>Razorpay</strong>, where millions of payment transactions happen
          every single day, the DBA's job is critical. If the database slows down by even 100
          milliseconds, thousands of payment failures happen. If the database crashes with no
          recovery plan, the company loses crores in minutes.
        </p>

        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '20px 24px',
          marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: 16,
          }}>
            What a DBA actually does at work — day to day
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['🔧', 'Sets up and configures databases on servers — choosing storage, memory, and connection settings'],
              ['🔑', 'Creates user accounts with the right permissions — billing team reads payment data, but cannot delete it'],
              ['📊', 'Monitors query performance — finds and fixes slow queries before users ever notice a slowdown'],
              ['💾', 'Plans and tests backup and recovery procedures — so there is always a way back from any failure'],
              ['⬆️', 'Manages database upgrades without downtime — upgrading PostgreSQL 14 to 15 while users are still active'],
              ['🔍', 'Tunes indexes and query plans when performance degrades at scale'],
              ['🤝', 'Works with developers from day one to design tables and relationships correctly before writing a single line of code'],
            ].map(([icon, text]) => (
              <div key={text as string} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 16, marginTop: 1, flexShrink: 0 }}>{icon}</span>
                <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{text as string}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
          You don't need to become a DBA to use databases. But knowing what a DBA does shows you
          how seriously companies treat database management — and why the concepts in this track
          directly translate to real, high-stakes work.
        </p>
      </section>

      {/* ── SECTION 7 — WHAT THIS LOOKS LIKE AT WORK ── */}
      <section style={{ marginBottom: 56 }}>
        <div style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: 12,
        }}>
          💼 What This Looks Like at Work
        </div>
        <h2 style={{
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 900,
          letterSpacing: '-1px',
          color: 'var(--text)',
          marginBottom: 20,
        }}>
          Your Day 1 Task at a Real Company
        </h2>

        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '24px 28px',
          marginBottom: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{
              background: '#00e67618',
              border: '1px solid #00e67640',
              borderRadius: 6,
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--accent)',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)',
            }}>
              Real Task — Backend Engineer, Day 1
            </div>
          </div>

          <div style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '16px 20px',
            marginBottom: 20,
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            color: 'var(--text)',
            lineHeight: 1.7,
          }}>
            <span style={{ color: 'var(--muted)' }}>Manager (Slack, 10:03am):</span>
            <br />
            "Hey, we need a new table to store user preferences — notification settings, language,
            dark mode toggle. Users already exist in the <span style={{ color: 'var(--accent)' }}>users</span> table.
            Design the table structure and write the CREATE TABLE statement. Send it for review by EOD."
          </div>

          <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 16 }}>
            Before you write a single line of SQL, you need to answer:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {[
              'Should this be a separate user_preferences table, or should I just add columns to users?',
              'What data types should each column be — BOOLEAN for dark mode? VARCHAR for language?',
              'How do I link this table back to the users table?',
              'If a user is deleted, should their preferences be deleted automatically too?',
              'What if a user has no preferences set yet — should I allow NULL or use default values?',
            ].map((q) => (
              <div key={q} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>→</span>
                <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{q}</span>
              </div>
            ))}
          </div>

          <div style={{
            background: '#00e67608',
            border: '1px solid #00e67625',
            borderRadius: 8,
            padding: '14px 18px',
          }}>
            <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>
              Every single one of these questions is answered by DBMS concepts you're about to learn —
              relational model, keys, normalization, referential integrity, constraints, and data types.
              By the time you finish this track, a task like this takes you 10 minutes and you make
              the right call every time.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 8 — WHY DBMS IN INTERVIEWS ── */}
      <section style={{ marginBottom: 56 }}>
        <h2 style={{
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 900,
          letterSpacing: '-1px',
          color: 'var(--text)',
          marginBottom: 20,
        }}>
          Why DBMS Shows Up in Every Technical Interview
        </h2>

        <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 24 }}>
          Whether you're applying for backend, data engineering, full stack, DevOps, or even mobile
          development — DBMS questions appear in almost every technical interview. The reason is
          simple: <strong>every application stores data. And that data lives in a database.</strong>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, marginBottom: 24 }}>
          {[
            {
              company: 'TCS · Wipro · Infosys',
              tag: 'Service Companies',
              color: '#0078d4',
              topics: ['Normalization (1NF–3NF guaranteed)', 'ACID properties', 'SQL joins (all types)', 'Primary vs Foreign key differences'],
            },
            {
              company: 'Flipkart · Swiggy · CRED · Meesho',
              tag: 'Product Companies',
              color: 'var(--accent)',
              topics: ['Indexing and query optimization', 'Transaction isolation levels', 'Schema design for scale', 'SQL window functions'],
            },
            {
              company: 'GATE CS Exam',
              tag: 'Competitive Exam',
              color: 'var(--orange)',
              topics: ['Relational algebra', 'Functional dependencies', 'B+ trees and hashing', 'Concurrency control — high weightage'],
            },
            {
              company: 'Senior / System Design Rounds',
              tag: 'Advanced Interviews',
              color: 'var(--purple)',
              topics: ['CAP theorem', 'SQL vs NoSQL decision', 'Database sharding and replication', 'Designing schemas at millions of rows'],
            },
          ].map((item) => (
            <div key={item.company} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderTop: `3px solid ${item.color}`,
              borderRadius: 10,
              padding: '18px 20px',
            }}>
              <div style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: item.color,
                marginBottom: 6,
                fontFamily: 'var(--font-mono)',
              }}>
                {item.tag}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>{item.company}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {item.topics.map((t) => (
                  <div key={t} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: item.color, flexShrink: 0, fontSize: 12, marginTop: 3 }}>▸</span>
                    <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 9 — FULL TRACK ROADMAP ── */}
      <section style={{ marginBottom: 56 }}>
        <h2 style={{
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 900,
          letterSpacing: '-1px',
          color: 'var(--text)',
          marginBottom: 8,
        }}>
          What You Will Learn in This Track
        </h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 28 }}>
          The complete journey — in the exact sequence that makes each topic build on the previous
          one. No topic skipped. No shortcut taken.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { num: '01', title: 'Introduction', desc: 'What databases are, why they exist, the problems they solve — you are here', current: true },
            { num: '02', title: 'Data Models', desc: 'Hierarchical, Network, Relational, Document — how different databases think about structure' },
            { num: '03', title: 'ER Model', desc: 'Design a database visually before writing a single line of SQL' },
            { num: '04', title: 'Relational Model & Keys', desc: 'Tables, rows, columns, primary keys, foreign keys — the complete picture' },
            { num: '05', title: 'Normalization', desc: '1NF through BCNF — eliminate every design mistake before it causes problems' },
            { num: '06', title: 'Functional Dependencies', desc: 'The math behind normalization — Armstrong\'s Axioms, closures, candidate keys' },
            { num: '07', title: 'SQL — Complete', desc: 'DDL, DML, DCL, TCL, joins, window functions, CTEs — from absolute zero to advanced' },
            { num: '08', title: 'Indexes', desc: 'B+ tree indexes, clustered vs non-clustered, covering indexes, when NOT to index' },
            { num: '09', title: 'Transactions & ACID', desc: 'All-or-nothing operations — what keeps your bank balance correct' },
            { num: '10', title: 'Concurrency Control', desc: 'Locks, deadlocks, isolation levels, MVCC — how databases handle thousands of simultaneous users' },
            { num: '11', title: 'Query Processing & Optimization', desc: 'What actually happens when you run a query — and how to make it 10x faster' },
            { num: '12', title: 'Storage & File Organization', desc: 'How data lives on disk — blocks, pages, buffer pool, heap vs sequential' },
            { num: '13', title: 'Hashing & B+ Trees', desc: 'The data structures powering every database index — explained from scratch' },
            { num: '14', title: 'Relational Algebra', desc: 'The math SQL is built on — appears in every GATE exam and system design discussion' },
            { num: '15', title: 'Views, Procedures & Triggers', desc: 'Database objects that encapsulate logic — virtual tables, stored procedures, auto-triggers' },
            { num: '16', title: 'Crash Recovery', desc: 'Write-ahead logging, checkpoints, ARIES — how databases survive every failure' },
            { num: '17', title: 'Distributed Databases & CAP', desc: 'Data across multiple machines — fragmentation, replication, and the CAP theorem' },
            { num: '18', title: 'NoSQL', desc: 'MongoDB, Redis, Cassandra, Neo4j — when and why to go beyond relational' },
            { num: '19', title: 'Database Security', desc: 'Authentication, authorization, SQL injection, encryption — protecting data at every layer' },
            { num: '20', title: 'Interview Questions', desc: '60 questions categorized by topic and company — TCS, Infosys, Flipkart, GATE, System Design' },
          ].map((item) => (
            <div key={item.num} style={{
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
              padding: '14px 16px',
              background: item.current ? 'var(--accent-glow)' : 'transparent',
              border: item.current ? '1px solid rgba(0,230,118,0.2)' : '1px solid transparent',
              borderRadius: 8,
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                fontWeight: 700,
                color: item.current ? 'var(--accent)' : 'var(--muted)',
                flexShrink: 0,
                marginTop: 2,
                minWidth: 24,
              }}>
                {item.num}
              </span>
              <div>
                <span style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: item.current ? 'var(--accent)' : 'var(--text)',
                }}>
                  {item.title}
                  {item.current && (
                    <span style={{
                      marginLeft: 8,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '.1em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      ← You are here
                    </span>
                  )}
                </span>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginTop: 3 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── KEY TAKEAWAYS ── */}
      <KeyTakeaways items={[
        'A database is an organized collection of data — "organized" is the key word. Structure is what makes it a database.',
        'File systems cause 6 core problems: redundancy, inconsistency, difficult access, no security, no concurrency, no recovery. DBMS solves all six.',
        'Database = the data. DBMS = the software managing it. Database System = all three layers together.',
        'Relational databases store data in linked tables and use SQL. This is the foundation of everything in this track.',
        'DBMS questions appear in every technical interview regardless of role — backend, data, full stack, or mobile.',
        'This track goes from absolute zero to advanced, in the exact sequence it must be learned. Every topic builds on the previous one.',
      ]} />

    </LearnLayout>
  )
}