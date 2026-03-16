import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Data Models in DBMS — Hierarchical, Relational, NoSQL | Chaduvuko',
  description:
    'What is a data model, why it matters, and how every major type works — hierarchical, network, relational, object-oriented, and document models explained with real analogies.',
}

export default function DataModels() {
  return (
    <LearnLayout
      title="Data Models"
      description="The blueprint that decides how your data is structured, stored, and connected — before a single line of code is written."
      section="DBMS"
      readTime="25–30 min"
      updatedAt="March 2026"
    >

      {/* ── SECTION 1 — WHAT IS A DATA MODEL ── */}
      <section style={{ marginBottom: 60 }}>
        <p style={{
          fontSize: 15, color: 'var(--text2)',
          lineHeight: 1.9, marginBottom: 20,
          fontFamily: 'Inter, sans-serif',
        }}>
          Before a single table is created, before a single query is written — someone has to decide
          <strong style={{ color: 'var(--text)' }}> how the data will be organized.</strong> That
          decision is called a <strong style={{ color: 'var(--text)' }}>data model</strong>.
        </p>
        <p style={{
          fontSize: 15, color: 'var(--text2)',
          lineHeight: 1.9, marginBottom: 20,
          fontFamily: 'Inter, sans-serif',
        }}>
          Think of building a house. Before the first brick is laid, an architect draws a blueprint.
          That blueprint decides where the rooms go, how they connect, what goes where. A data model
          is exactly that — the <strong style={{ color: 'var(--text)' }}>blueprint of a database</strong>.
          It defines what kind of data exists, how pieces of data relate to each other, and what rules
          must always be followed.
        </p>
        <p style={{
          fontSize: 15, color: 'var(--text2)',
          lineHeight: 1.9, marginBottom: 24,
          fontFamily: 'Inter, sans-serif',
        }}>
          Get the blueprint wrong and the entire building has problems — walls in the wrong places,
          rooms that don't connect, no space for what you actually need. Get the data model wrong
          and the entire database has problems — data that duplicates itself, queries that are
          impossible to write, performance that collapses at scale.
        </p>

        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderLeft: '4px solid var(--accent)',
          borderRadius: 10,
          padding: '20px 24px',
        }}>
          <p style={{
            fontSize: 15, color: 'var(--text2)',
            lineHeight: 1.85, margin: 0,
            fontFamily: 'Inter, sans-serif',
          }}>
            <strong style={{ color: 'var(--accent)' }}>Formal definition:</strong> A data model is
            a collection of concepts and rules that describe how data is structured, how data relates
            to other data, and what constraints must be enforced to keep data accurate and consistent.
          </p>
        </div>
      </section>

      {/* ── SECTION 2 — WHY DATA MODELS MATTER ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 900, letterSpacing: '-1px',
          color: 'var(--text)', marginBottom: 20,
          fontFamily: 'Syne, sans-serif',
        }}>
          Why Does the Data Model Choice Matter So Much?
        </h2>

        <p style={{
          fontSize: 15, color: 'var(--text2)',
          lineHeight: 1.9, marginBottom: 20,
          fontFamily: 'Inter, sans-serif',
        }}>
          Let's make this real. Imagine Zomato needs to store data about customers, restaurants,
          menu items, orders, delivery agents, and reviews. Each of these is connected to the others
          in specific ways — a customer places an order, an order contains menu items, a delivery
          agent is assigned to an order.
        </p>
        <p style={{
          fontSize: 15, color: 'var(--text2)',
          lineHeight: 1.9, marginBottom: 24,
          fontFamily: 'Inter, sans-serif',
        }}>
          How you model these connections changes everything — how fast queries run, how easy it is
          to add new features, how much storage is used, and how badly things break when data changes.
          Different data models handle these connections in completely different ways.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 14, marginBottom: 8,
        }}>
          {[
            { icon: '⚡', title: 'Query Speed', desc: 'The model determines how fast your application can find and return data under real load.' },
            { icon: '🔧', title: 'Ease of Change', desc: 'A good model makes adding new features easy. A bad one makes every small change a major project.' },
            { icon: '📏', title: 'Data Integrity', desc: 'Rules baked into the model prevent garbage data from being stored in the first place.' },
            { icon: '📈', title: 'Scale', desc: 'Some models work beautifully at 10,000 records and completely collapse at 10 million.' },
          ].map((item) => (
            <div key={item.title} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10, padding: '18px 20px',
            }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{item.icon}</div>
              <div style={{
                fontSize: 14, fontWeight: 700,
                color: 'var(--text)', marginBottom: 8,
                fontFamily: 'Syne, sans-serif',
              }}>{item.title}</div>
              <div style={{
                fontSize: 13, color: 'var(--text2)',
                lineHeight: 1.75,
                fontFamily: 'Inter, sans-serif',
              }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3 — THE 5 DATA MODELS ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 900, letterSpacing: '-1px',
          color: 'var(--text)', marginBottom: 8,
          fontFamily: 'Syne, sans-serif',
        }}>
          The Five Major Data Models
        </h2>
        <p style={{
          fontSize: 14, color: 'var(--muted)',
          lineHeight: 1.8, marginBottom: 32,
          fontFamily: 'Inter, sans-serif',
        }}>
          Databases have evolved over 60 years. Here are every major model — in the order they
          were invented — and exactly how each one thinks about data.
        </p>

        {/* ── MODEL 1 — HIERARCHICAL ── */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderTop: '3px solid #f97316',
          borderRadius: 12, padding: '28px 28px',
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10, fontWeight: 700,
              color: '#f97316',
              background: 'rgba(249,115,22,0.1)',
              border: '1px solid rgba(249,115,22,0.25)',
              borderRadius: 5, padding: '3px 8px',
              letterSpacing: '.1em', textTransform: 'uppercase',
            }}>Model 01 — 1960s</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10, fontWeight: 600,
              color: 'var(--muted)',
              letterSpacing: '.08em', textTransform: 'uppercase',
            }}>Oldest</span>
          </div>

          <h3 style={{
            fontSize: 20, fontWeight: 800,
            color: 'var(--text)', marginBottom: 16,
            fontFamily: 'Syne, sans-serif',
            letterSpacing: '-0.5px',
          }}>
            Hierarchical Model
          </h3>

          <p style={{
            fontSize: 15, color: 'var(--text2)',
            lineHeight: 1.9, marginBottom: 20,
            fontFamily: 'Inter, sans-serif',
          }}>
            Data is organized exactly like a family tree — one parent, many children. Every record
            has exactly one parent (except the root at the very top), and a parent can have multiple
            children. Data flows in one direction only — top down.
          </p>

          {/* Visual tree diagram */}
          <div style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 10, padding: '24px',
            marginBottom: 20, fontFamily: 'var(--font-mono)',
            fontSize: 13, lineHeight: 2, color: 'var(--text2)',
          }}>
            <div style={{ color: '#f97316', fontWeight: 700 }}>📁 Company</div>
            <div style={{ paddingLeft: 24 }}>├── 📁 Department: Engineering</div>
            <div style={{ paddingLeft: 48 }}>├── 👤 Employee: Rahul</div>
            <div style={{ paddingLeft: 48 }}>└── 👤 Employee: Priya</div>
            <div style={{ paddingLeft: 24 }}>└── 📁 Department: Marketing</div>
            <div style={{ paddingLeft: 48 }}>└── 👤 Employee: Arjun</div>
          </div>

          <p style={{
            fontSize: 15, color: 'var(--text2)',
            lineHeight: 1.9, marginBottom: 16,
            fontFamily: 'Inter, sans-serif',
          }}>
            <strong style={{ color: 'var(--text)' }}>Real analogy you already know:</strong> Your
            phone's file system — folders inside folders. A folder (parent) can contain many files
            (children). But a file can only be inside one folder. That's a hierarchical model.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12, marginBottom: 16,
          }}>
            <div style={{
              background: 'rgba(0,230,118,0.05)',
              border: '1px solid rgba(0,230,118,0.15)',
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700,
                color: 'var(--accent)', marginBottom: 8,
                letterSpacing: '.08em', textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}>✓ Strengths</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>
                Very fast for queries that follow the parent → child path. Simple to understand.
                Great for data that is naturally tree-shaped.
              </div>
            </div>
            <div style={{
              background: 'rgba(255,71,87,0.05)',
              border: '1px solid rgba(255,71,87,0.15)',
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700,
                color: 'var(--red)', marginBottom: 8,
                letterSpacing: '.08em', textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}>✕ Weaknesses</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>
                A child can only have one parent. Real-world data often needs many-to-many
                relationships — this model cannot represent them at all.
              </div>
            </div>
          </div>

          <div style={{
            fontSize: 13, color: 'var(--muted)',
            fontFamily: 'Inter, sans-serif', lineHeight: 1.75,
            padding: '12px 16px',
            background: 'var(--bg2)',
            borderRadius: 8,
            border: '1px solid var(--border)',
          }}>
            <strong style={{ color: 'var(--text2)' }}>Still used today?</strong> IBM's IMS (Information
            Management System) — the hierarchical database IBM built in the 1960s for NASA's Apollo
            mission — is still running in thousands of banks and insurance companies worldwide.
            Legacy systems die slowly.
          </div>
        </div>

        {/* ── MODEL 2 — NETWORK ── */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderTop: '3px solid #facc15',
          borderRadius: 12, padding: '28px 28px',
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10, fontWeight: 700,
              color: '#facc15',
              background: 'rgba(250,204,21,0.1)',
              border: '1px solid rgba(250,204,21,0.25)',
              borderRadius: 5, padding: '3px 8px',
              letterSpacing: '.1em', textTransform: 'uppercase',
            }}>Model 02 — 1970s</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10, fontWeight: 600,
              color: 'var(--muted)',
              letterSpacing: '.08em', textTransform: 'uppercase',
            }}>Fixed Hierarchical's Biggest Problem</span>
          </div>

          <h3 style={{
            fontSize: 20, fontWeight: 800,
            color: 'var(--text)', marginBottom: 16,
            fontFamily: 'Syne, sans-serif',
            letterSpacing: '-0.5px',
          }}>
            Network Model
          </h3>

          <p style={{
            fontSize: 15, color: 'var(--text2)',
            lineHeight: 1.9, marginBottom: 20,
            fontFamily: 'Inter, sans-serif',
          }}>
            The network model fixed the biggest problem with hierarchical — it allowed a child to
            have <strong style={{ color: 'var(--text)' }}>more than one parent</strong>. Records
            are connected using pointers, like a web of nodes. Any node can connect to any other
            node — creating a graph-like structure of connections.
          </p>

          <div style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px',
            marginBottom: 20, fontFamily: 'var(--font-mono)',
            fontSize: 13, lineHeight: 2, color: 'var(--text2)',
          }}>
            <div style={{ marginBottom: 4 }}>
              <span style={{ color: '#facc15', fontWeight: 700 }}>Student: Rahul</span>
              <span style={{ color: 'var(--muted)' }}> ──────── enrolled in ───────▶ </span>
              <span style={{ color: '#facc15', fontWeight: 700 }}>Course: Mathematics</span>
            </div>
            <div style={{ marginBottom: 4 }}>
              <span style={{ color: '#facc15', fontWeight: 700 }}>Student: Rahul</span>
              <span style={{ color: 'var(--muted)' }}> ──────── enrolled in ───────▶ </span>
              <span style={{ color: '#facc15', fontWeight: 700 }}>Course: Physics</span>
            </div>
            <div>
              <span style={{ color: '#facc15', fontWeight: 700 }}>Student: Priya</span>
              <span style={{ color: 'var(--muted)' }}> ──────── enrolled in ───────▶ </span>
              <span style={{ color: '#facc15', fontWeight: 700 }}>Course: Mathematics</span>
            </div>
          </div>

          <p style={{
            fontSize: 15, color: 'var(--text2)',
            lineHeight: 1.9, marginBottom: 16,
            fontFamily: 'Inter, sans-serif',
          }}>
            <strong style={{ color: 'var(--text)' }}>Real analogy:</strong> Think of a metro rail
            map — stations are nodes, rail lines are connections. One station can connect to
            multiple lines. One line connects multiple stations. No strict parent-child hierarchy —
            just a web of connections in every direction.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
          }}>
            <div style={{
              background: 'rgba(0,230,118,0.05)',
              border: '1px solid rgba(0,230,118,0.15)',
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700,
                color: 'var(--accent)', marginBottom: 8,
                letterSpacing: '.08em', textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}>✓ Strengths</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>
                Can model many-to-many relationships. More flexible than hierarchical.
                Faster than hierarchical for complex connected data.
              </div>
            </div>
            <div style={{
              background: 'rgba(255,71,87,0.05)',
              border: '1px solid rgba(255,71,87,0.15)',
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700,
                color: 'var(--red)', marginBottom: 8,
                letterSpacing: '.08em', textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}>✕ Weaknesses</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>
                Extremely complex to design and maintain. Navigating the network required
                writing procedural code — there was no simple query language like SQL.
              </div>
            </div>
          </div>
        </div>

        {/* ── MODEL 3 — RELATIONAL ── */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid rgba(0,230,118,0.3)',
          borderTop: '3px solid var(--accent)',
          borderRadius: 12, padding: '28px 28px',
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10, fontWeight: 700,
              color: 'var(--accent)',
              background: 'rgba(0,230,118,0.1)',
              border: '1px solid rgba(0,230,118,0.25)',
              borderRadius: 5, padding: '3px 8px',
              letterSpacing: '.1em', textTransform: 'uppercase',
            }}>Model 03 — 1970s</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10, fontWeight: 700,
              color: 'var(--accent)',
              letterSpacing: '.08em', textTransform: 'uppercase',
            }}>★ The Dominant Model — This Entire Track</span>
          </div>

          <h3 style={{
            fontSize: 20, fontWeight: 800,
            color: 'var(--text)', marginBottom: 16,
            fontFamily: 'Syne, sans-serif',
            letterSpacing: '-0.5px',
          }}>
            Relational Model
          </h3>

          <p style={{
            fontSize: 15, color: 'var(--text2)',
            lineHeight: 1.9, marginBottom: 20,
            fontFamily: 'Inter, sans-serif',
          }}>
            In 1970, a computer scientist at IBM named <strong style={{ color: 'var(--text)' }}>Edgar
            F. Codd</strong> published a paper that changed databases forever. His idea was
            beautifully simple: store all data in <strong style={{ color: 'var(--text)' }}>tables
            </strong> (rows and columns), and connect tables to each other using shared values —
            not physical pointers.
          </p>
          <p style={{
            fontSize: 15, color: 'var(--text2)',
            lineHeight: 1.9, marginBottom: 20,
            fontFamily: 'Inter, sans-serif',
          }}>
            You don't navigate the data with code — you <strong style={{ color: 'var(--text)' }}>
            describe what you want</strong> and the database figures out how to get it. That
            description language became SQL.
          </p>

          {/* Table visual */}
          <div style={{ overflowX: 'auto', marginBottom: 20 }}>
            <div style={{
              fontSize: 11, fontWeight: 700,
              color: 'var(--muted)', letterSpacing: '.1em',
              textTransform: 'uppercase', marginBottom: 8,
              fontFamily: 'var(--font-mono)',
            }}>
              customers table
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['customer_id', 'name', 'city', 'phone'].map((h) => (
                    <th key={h} style={{
                      textAlign: 'left', padding: '8px 14px',
                      color: 'var(--accent)', fontWeight: 700,
                      fontSize: 12, fontFamily: 'var(--font-mono)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['C001', 'Rahul Sharma', 'Bengaluru', '98765-43210'],
                  ['C002', 'Priya Reddy', 'Hyderabad', '87654-32109'],
                  ['C003', 'Arjun Nair', 'Mumbai', '76543-21098'],
                ].map((row, i) => (
                  <tr key={i} style={{
                    borderBottom: '1px solid var(--border)',
                    background: i % 2 === 0 ? 'transparent' : 'var(--bg2)',
                  }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{
                        padding: '10px 14px',
                        color: j === 0 ? 'var(--accent)' : 'var(--text2)',
                        fontFamily: j === 0 ? 'var(--font-mono)' : 'Inter, sans-serif',
                        fontSize: 13,
                      }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{
              fontSize: 11, fontWeight: 700,
              color: 'var(--muted)', letterSpacing: '.1em',
              textTransform: 'uppercase', margin: '20px 0 8px',
              fontFamily: 'var(--font-mono)',
            }}>
              orders table — linked to customers via customer_id
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['order_id', 'customer_id', 'item', 'amount'].map((h) => (
                    <th key={h} style={{
                      textAlign: 'left', padding: '8px 14px',
                      color: 'var(--accent)', fontWeight: 700,
                      fontSize: 12, fontFamily: 'var(--font-mono)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['O1001', 'C001', 'Chicken Biryani', '₹280'],
                  ['O1002', 'C001', 'Masala Dosa', '₹120'],
                  ['O1003', 'C002', 'Paneer Butter Masala', '₹340'],
                ].map((row, i) => (
                  <tr key={i} style={{
                    borderBottom: '1px solid var(--border)',
                    background: i % 2 === 0 ? 'transparent' : 'var(--bg2)',
                  }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{
                        padding: '10px 14px',
                        color: j === 1 ? '#f97316' : j === 0 ? 'var(--accent)' : 'var(--text2)',
                        fontFamily: j <= 1 ? 'var(--font-mono)' : 'Inter, sans-serif',
                        fontSize: 13,
                      }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{
              fontSize: 12, color: 'var(--muted)',
              marginTop: 8, fontFamily: 'Inter, sans-serif',
            }}>
              ↑ The orange <code style={{ fontFamily: 'var(--font-mono)', color: '#f97316' }}>customer_id</code> in
              orders connects to the <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>customer_id</code> in
              customers. No pointers — just matching values.
            </p>
          </div>

          <Callout type="tip">
            The relational model's genius: relationships between data are represented by
            <strong> shared values in columns</strong> — not by physical memory pointers. This means
            you can ask any question about your data using SQL without knowing anything about how
            it's physically stored on disk. That separation changed everything.
          </Callout>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12, marginTop: 20,
          }}>
            <div style={{
              background: 'rgba(0,230,118,0.05)',
              border: '1px solid rgba(0,230,118,0.15)',
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700,
                color: 'var(--accent)', marginBottom: 8,
                letterSpacing: '.08em', textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}>✓ Why It Won</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>
                Simple tables everyone understands. SQL is declarative — describe the result,
                not the steps. Strong math foundation. Works for almost every business problem.
              </div>
            </div>
            <div style={{
              background: 'rgba(255,71,87,0.05)',
              border: '1px solid rgba(255,71,87,0.15)',
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700,
                color: 'var(--red)', marginBottom: 8,
                letterSpacing: '.08em', textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}>✕ Limitations</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>
                Rigid schema — changing table structure is expensive at scale. Struggles with
                highly nested or unstructured data. Horizontal scaling is harder than NoSQL.
              </div>
            </div>
          </div>
        </div>

        {/* ── MODEL 4 — OBJECT ORIENTED ── */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderTop: '3px solid #8b5cf6',
          borderRadius: 12, padding: '28px 28px',
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10, fontWeight: 700,
              color: '#8b5cf6',
              background: 'rgba(139,92,246,0.1)',
              border: '1px solid rgba(139,92,246,0.25)',
              borderRadius: 5, padding: '3px 8px',
              letterSpacing: '.1em', textTransform: 'uppercase',
            }}>Model 04 — 1980s–90s</span>
          </div>

          <h3 style={{
            fontSize: 20, fontWeight: 800,
            color: 'var(--text)', marginBottom: 16,
            fontFamily: 'Syne, sans-serif',
            letterSpacing: '-0.5px',
          }}>
            Object-Oriented Model
          </h3>

          <p style={{
            fontSize: 15, color: 'var(--text2)',
            lineHeight: 1.9, marginBottom: 20,
            fontFamily: 'Inter, sans-serif',
          }}>
            As object-oriented programming (Java, C++) became dominant in the 1980s and 90s,
            developers wanted to store objects directly in the database — without converting them
            to rows and tables first. The object-oriented model stores data as
            <strong style={{ color: 'var(--text)' }}> objects</strong> — just like classes in code —
            complete with their properties and methods.
          </p>
          <p style={{
            fontSize: 15, color: 'var(--text2)',
            lineHeight: 1.9, marginBottom: 16,
            fontFamily: 'Inter, sans-serif',
          }}>
            <strong style={{ color: 'var(--text)' }}>Real analogy:</strong> You have a
            <code style={{ fontFamily: 'var(--font-mono)', color: '#8b5cf6', fontSize: 13 }}> Customer</code> class
            in your Java code with properties like name, address, orderHistory. Instead of
            converting that to rows and columns, you just save the whole object directly.
            It comes back as a Customer object when you retrieve it — no translation needed.
          </p>

          <div style={{
            fontSize: 13, color: 'var(--muted)',
            fontFamily: 'Inter, sans-serif', lineHeight: 1.8,
            padding: '14px 18px',
            background: 'var(--bg2)',
            borderRadius: 8,
            border: '1px solid var(--border)',
          }}>
            <strong style={{ color: 'var(--text2)' }}>Why it never took over:</strong> It was complex
            to query, had no universal standard like SQL, and the relational model extended itself
            (Oracle, PostgreSQL added object features) rather than being replaced. You'll encounter
            this concept in academics and interviews but rarely see a pure object-oriented DBMS
            in production today.
          </div>
        </div>

        {/* ── MODEL 5 — DOCUMENT ── */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderTop: '3px solid #4285f4',
          borderRadius: 12, padding: '28px 28px',
          marginBottom: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10, fontWeight: 700,
              color: '#4285f4',
              background: 'rgba(66,133,244,0.1)',
              border: '1px solid rgba(66,133,244,0.25)',
              borderRadius: 5, padding: '3px 8px',
              letterSpacing: '.1em', textTransform: 'uppercase',
            }}>Model 05 — 2000s</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10, fontWeight: 600,
              color: 'var(--muted)',
              letterSpacing: '.08em', textTransform: 'uppercase',
            }}>The NoSQL Revolution</span>
          </div>

          <h3 style={{
            fontSize: 20, fontWeight: 800,
            color: 'var(--text)', marginBottom: 16,
            fontFamily: 'Syne, sans-serif',
            letterSpacing: '-0.5px',
          }}>
            Document Model
          </h3>

          <p style={{
            fontSize: 15, color: 'var(--text2)',
            lineHeight: 1.9, marginBottom: 20,
            fontFamily: 'Inter, sans-serif',
          }}>
            When internet-scale applications appeared — Facebook, Google, Amazon — the relational
            model started showing cracks under billions of records and millions of concurrent
            users. The document model stores data as
            <strong style={{ color: 'var(--text)' }}> self-contained JSON-like documents</strong>.
            No fixed schema required. Each document can have different fields.
          </p>

          <div style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px',
            marginBottom: 20,
            fontFamily: 'var(--font-mono)',
            fontSize: 13, lineHeight: 1.85,
            overflowX: 'auto',
          }}>
            <div style={{ color: 'var(--muted)', marginBottom: 6 }}>// A Zomato order as a MongoDB document</div>
            <div><span style={{ color: '#8b5cf6' }}>{`{`}</span></div>
            <div style={{ paddingLeft: 20 }}><span style={{ color: '#4285f4' }}>"order_id"</span><span style={{ color: 'var(--text2)' }}>: </span><span style={{ color: '#facc15' }}>"ORD-20240315-8821"</span><span style={{ color: 'var(--text2)' }}>,</span></div>
            <div style={{ paddingLeft: 20 }}><span style={{ color: '#4285f4' }}>"customer"</span><span style={{ color: 'var(--text2)' }}>: </span><span style={{ color: '#8b5cf6' }}>{`{`}</span></div>
            <div style={{ paddingLeft: 40 }}><span style={{ color: '#4285f4' }}>"name"</span><span style={{ color: 'var(--text2)' }}>: </span><span style={{ color: '#facc15' }}>"Rahul Sharma"</span><span style={{ color: 'var(--text2)' }}>,</span></div>
            <div style={{ paddingLeft: 40 }}><span style={{ color: '#4285f4' }}>"city"</span><span style={{ color: 'var(--text2)' }}>: </span><span style={{ color: '#facc15' }}>"Bengaluru"</span></div>
            <div style={{ paddingLeft: 20 }}><span style={{ color: '#8b5cf6' }}>{`},`}</span></div>
            <div style={{ paddingLeft: 20 }}><span style={{ color: '#4285f4' }}>"items"</span><span style={{ color: 'var(--text2)' }}>: </span><span style={{ color: '#8b5cf6' }}>[</span></div>
            <div style={{ paddingLeft: 40 }}><span style={{ color: '#8b5cf6' }}>{`{`}</span><span style={{ color: '#4285f4' }}>"name"</span><span style={{ color: 'var(--text2)' }}>: </span><span style={{ color: '#facc15' }}>"Chicken Biryani"</span><span style={{ color: 'var(--text2)' }}>, </span><span style={{ color: '#4285f4' }}>"qty"</span><span style={{ color: 'var(--text2)' }}>: </span><span style={{ color: '#f97316' }}>1</span><span style={{ color: 'var(--text2)' }}>, </span><span style={{ color: '#4285f4' }}>"price"</span><span style={{ color: 'var(--text2)' }}>: </span><span style={{ color: '#f97316' }}>280</span><span style={{ color: '#8b5cf6' }}>{`}`}</span></div>
            <div style={{ paddingLeft: 20 }}><span style={{ color: '#8b5cf6' }}>],</span></div>
            <div style={{ paddingLeft: 20 }}><span style={{ color: '#4285f4' }}>"total"</span><span style={{ color: 'var(--text2)' }}>: </span><span style={{ color: '#f97316' }}>280</span><span style={{ color: 'var(--text2)' }}>,</span></div>
            <div style={{ paddingLeft: 20 }}><span style={{ color: '#4285f4' }}>"status"</span><span style={{ color: 'var(--text2)' }}>: </span><span style={{ color: '#facc15' }}>"delivered"</span></div>
            <div><span style={{ color: '#8b5cf6' }}>{`}`}</span></div>
          </div>

          <p style={{
            fontSize: 15, color: 'var(--text2)',
            lineHeight: 1.9, marginBottom: 16,
            fontFamily: 'Inter, sans-serif',
          }}>
            Notice how the entire order — customer info, items, total — is stored together as one
            unit. In a relational model, this would be spread across 3 or 4 separate tables and
            joined at query time. In a document model it's one read, retrieved instantly.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
          }}>
            <div style={{
              background: 'rgba(0,230,118,0.05)',
              border: '1px solid rgba(0,230,118,0.15)',
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700,
                color: 'var(--accent)', marginBottom: 8,
                letterSpacing: '.08em', textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}>✓ Strengths</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>
                Flexible schema — each document can have different fields. Scales horizontally
                across many servers easily. Fast reads when all data for an entity is together.
              </div>
            </div>
            <div style={{
              background: 'rgba(255,71,87,0.05)',
              border: '1px solid rgba(255,71,87,0.15)',
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700,
                color: 'var(--red)', marginBottom: 8,
                letterSpacing: '.08em', textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}>✕ Weaknesses</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>
                Data can duplicate across documents. Complex multi-document queries are harder
                than SQL. Weaker consistency guarantees than relational databases.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — COMPARISON TABLE ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 900, letterSpacing: '-1px',
          color: 'var(--text)', marginBottom: 20,
          fontFamily: 'Syne, sans-serif',
        }}>
          Side by Side — All Five Models
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Model', 'Era', 'Structure', 'Query Language', 'Best For', 'Still Used?'].map((h) => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '10px 14px',
                    color: 'var(--muted)', fontWeight: 700,
                    fontSize: 11, letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-mono)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Hierarchical', '1960s', 'Tree (parent → children)', 'Proprietary', 'Strict parent-child data', '✓ Legacy banking'],
                ['Network', '1970s', 'Graph (nodes + links)', 'Proprietary', 'Complex many-to-many', '✗ Mostly replaced'],
                ['Relational', '1970s', 'Tables (rows + columns)', 'SQL', 'Almost everything', '✓✓ Dominant today'],
                ['Object-Oriented', '1980s–90s', 'Objects (class instances)', 'OQL', 'CAD, engineering apps', '✗ Niche only'],
                ['Document', '2000s', 'JSON-like documents', 'MongoDB Query', 'Flexible, scalable apps', '✓ Very common'],
              ].map((row, i) => (
                <tr key={i} style={{
                  borderBottom: '1px solid var(--border)',
                  background: i === 2
                    ? 'rgba(0,230,118,0.04)'
                    : i % 2 === 0 ? 'transparent' : 'var(--surface)',
                }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{
                      padding: '12px 14px',
                      color: j === 0
                        ? 'var(--text)'
                        : j === 5
                          ? cell.includes('✓✓') ? 'var(--accent)' : cell.includes('✓') ? 'var(--accent)' : 'var(--muted)'
                          : 'var(--text2)',
                      fontWeight: j === 0 ? 700 : 400,
                      fontFamily: j === 0 ? 'Syne, sans-serif' : 'Inter, sans-serif',
                      fontSize: 13,
                    }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── SECTION 5 — WHY RELATIONAL WON ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 900, letterSpacing: '-1px',
          color: 'var(--text)', marginBottom: 20,
          fontFamily: 'Syne, sans-serif',
        }}>
          Why Did the Relational Model Win?
        </h2>

        <p style={{
          fontSize: 15, color: 'var(--text2)',
          lineHeight: 1.9, marginBottom: 20,
          fontFamily: 'Inter, sans-serif',
        }}>
          Every model had its moment. But the relational model has been the default choice for
          over 50 years and still runs the majority of the world's data. Here's exactly why:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              num: '01',
              title: 'SQL is universal',
              desc: 'One query language works on MySQL, PostgreSQL, Oracle, SQL Server — and even inside Spark, Databricks, BigQuery, and Snowflake. Learn SQL once and it works everywhere. No other data model has anything close to this.',
            },
            {
              num: '02',
              title: 'Mathematical foundation',
              desc: "Codd built the relational model on a branch of mathematics called set theory and predicate logic. This means it's not just a practical tool — it's provably correct. Every operation has defined, predictable behaviour. That's why it scales from a college project to a bank processing a billion transactions.",
            },
            {
              num: '03',
              title: 'Physical independence',
              desc: "You describe what data you want, not how to find it. The DBMS decides the best physical path. This means the same SQL query works whether the database has 100 rows or 100 billion — the optimizer handles it. No other model gave developers this freedom.",
            },
            {
              num: '04',
              title: 'ACID transactions built in',
              desc: 'Bank transfers, payments, hospital records — anything where data corruption means real-world disaster. The relational model\'s transaction model guarantees that partial updates never happen. Your Flipkart payment either fully completes or fully rolls back — never half-done.',
            },
            {
              num: '05',
              title: 'Everyone knows it',
              desc: 'Every university teaches it. Every job requires it. Every cloud platform supports it. Network effects made the relational model the common language of data — which itself became a reason to keep using it.',
            },
          ].map((item) => (
            <div key={item.num} style={{
              display: 'flex', gap: 20, alignItems: 'flex-start',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10, padding: '20px 22px',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13, fontWeight: 700,
                color: 'var(--accent)',
                background: 'rgba(0,230,118,0.08)',
                border: '1px solid rgba(0,230,118,0.2)',
                borderRadius: 6, padding: '4px 10px',
                flexShrink: 0, marginTop: 2,
              }}>{item.num}</span>
              <div>
                <div style={{
                  fontSize: 15, fontWeight: 700,
                  color: 'var(--text)', marginBottom: 6,
                  fontFamily: 'Syne, sans-serif',
                }}>{item.title}</div>
                <div style={{
                  fontSize: 14, color: 'var(--text2)',
                  lineHeight: 1.85, fontFamily: 'Inter, sans-serif',
                }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 6 — WHAT THIS LOOKS LIKE AT WORK ── */}
      <section style={{ marginBottom: 60 }}>
        <div style={{
          fontSize: 10, fontWeight: 700,
          letterSpacing: '.12em', textTransform: 'uppercase',
          color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <h2 style={{
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 900, letterSpacing: '-1px',
          color: 'var(--text)', marginBottom: 20,
          fontFamily: 'Syne, sans-serif',
        }}>
          The Real Conversation That Happens at Every Startup
        </h2>

        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px',
        }}>
          <div style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 8, padding: '16px 20px',
            marginBottom: 20, fontFamily: 'var(--font-mono)',
            fontSize: 13, lineHeight: 1.8,
          }}>
            <span style={{ color: 'var(--muted)' }}>Tech Lead (Architecture meeting, Day 3 at new startup):</span>
            <br />
            <span style={{ color: 'var(--text2)' }}>"We're building a food delivery app. User profiles,
            restaurant menus, orders, reviews. Should we use</span>
            <span style={{ color: 'var(--accent)' }}> PostgreSQL</span>
            <span style={{ color: 'var(--text2)' }}> or </span>
            <span style={{ color: '#4285f4' }}>MongoDB</span>
            <span style={{ color: 'var(--text2)' }}>? What does everyone think?"</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                role: 'Senior Engineer answers',
                color: 'var(--accent)',
                text: '"User profiles, orders, payments — that\'s all highly structured and relational. Use PostgreSQL. The data integrity guarantees alone are worth it for payments."',
              },
              {
                role: 'Another engineer adds',
                color: '#4285f4',
                text: '"Restaurant menus are deeply nested — categories, subcategories, modifiers, variants. MongoDB might actually be cleaner for just the menu service."',
              },
              {
                role: 'Tech Lead decides',
                color: '#f97316',
                text: '"PostgreSQL for core data — users, orders, payments. MongoDB for menus only. We can always add more databases later. Start with what fits the data."',
              },
            ].map((item) => (
              <div key={item.role} style={{
                display: 'flex', gap: 14, alignItems: 'flex-start',
              }}>
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  color: item.color,
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}30`,
                  borderRadius: 5, padding: '3px 8px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '.06em', textTransform: 'uppercase',
                  flexShrink: 0, marginTop: 2,
                  whiteSpace: 'nowrap',
                }}>{item.role}</span>
                <span style={{
                  fontSize: 14, color: 'var(--text2)',
                  lineHeight: 1.8, fontFamily: 'Inter, sans-serif',
                  fontStyle: 'italic',
                }}>{item.text}</span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 20,
            background: 'rgba(0,230,118,0.05)',
            border: '1px solid rgba(0,230,118,0.15)',
            borderRadius: 8, padding: '14px 18px',
          }}>
            <p style={{
              fontSize: 14, color: 'var(--text2)',
              lineHeight: 1.8, margin: 0,
              fontFamily: 'Inter, sans-serif',
            }}>
              This conversation happens at every company building something new. Understanding the
              strengths and tradeoffs of each data model is what makes you the engineer who can
              contribute to this decision — not just implement whatever someone else decided.
            </p>
          </div>
        </div>
      </section>

      {/* ── KEY TAKEAWAYS ── */}
      <KeyTakeaways items={[
        'A data model is the blueprint that decides how data is structured and connected — get it wrong and the entire system suffers.',
        'Hierarchical = tree structure, one parent per child. Fast but rigid. Network = web of connections, many parents allowed. More flexible but complex.',
        'Relational model (1970) stores data in tables linked by shared column values — not pointers. This is the foundation of everything in this track.',
        'SQL is the query language of the relational model. It describes what you want, not how to find it. That separation is what made it universal.',
        'Document model stores self-contained JSON-like records. Great for flexible, nested data. Used by MongoDB, Firestore, Couchbase.',
        'In real companies, the choice between SQL and NoSQL is not religious — it depends on data shape, relationship complexity, scale requirements, and team familiarity.',
      ]} />

    </LearnLayout>
  )
}