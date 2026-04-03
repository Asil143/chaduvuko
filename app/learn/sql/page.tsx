import type { Metadata } from 'next';
import Link from 'next/link';
import { SQL_CURRICULUM, SQL_TABLES } from '@/data/sql-freshmart';

export const metadata: Metadata = {
  title: 'SQL — Zero to Advanced | Chaduvuko',
  description:
    'Learn SQL from absolute scratch to advanced window functions. 62 modules, live browser playground, real Indian dataset (FreshMart), and 50+ interview questions. Free forever.',
};

const SQL_COLOR = '#06b6d4';

export default function SQLTrackPage() {
  const totalModules = SQL_CURRICULUM.reduce((acc, s) => acc + s.modules.length, 0);
  const liveModules  = SQL_CURRICULUM.reduce(
    (acc, s) => acc + s.modules.filter(m => m.status === 'live').length, 0
  );

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>

      {/* ── Hero ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '72px 24px 48px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
            textTransform: 'uppercase', color: SQL_COLOR,
            fontFamily: 'var(--font-mono)',
          }}>
            Foundations Track
          </span>
          <span style={{ width: 1, height: 12, background: 'var(--border)' }} />
          <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            {liveModules}/{totalModules} modules live
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px,6vw,64px)',
          fontWeight: 900,
          letterSpacing: '-2px',
          lineHeight: 1.08,
          color: 'var(--text)',
          margin: 0,
        }}>
          SQL — Zero to<br />
          <span style={{ color: SQL_COLOR }}>Advanced</span>
        </h1>

        <p style={{
          fontSize: 18, color: 'var(--muted)', lineHeight: 1.8,
          maxWidth: 620, marginTop: 20, marginBottom: 0,
          fontFamily: 'Lora, Georgia, serif', fontStyle: 'italic',
        }}>
          The only SQL course that teaches with real Indian data, runs queries in your browser,
          and never asks you to sign up or pay.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 32, marginTop: 36, flexWrap: 'wrap' }}>
          {[
            { n: '62', l: 'Modules' },
            { n: '13', l: 'Sections' },
            { n: '50+', l: 'Interview Qs' },
            { n: '118', l: 'Practice Queries' },
          ].map(s => (
            <div key={s.l}>
              <div style={{ fontSize: 28, fontWeight: 900, color: SQL_COLOR, fontFamily: 'var(--font-display)', letterSpacing: '-1px' }}>{s.n}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/learn/sql/what-is-a-database" style={{
            background: SQL_COLOR, color: '#000',
            padding: '12px 28px', borderRadius: 8,
            fontWeight: 700, fontSize: 14, textDecoration: 'none',
            display: 'inline-block',
          }}>
            Start from Module 01 →
          </Link>
          <Link href="/learn/sql/cheatsheet" style={{
            background: 'none', color: 'var(--text)',
            border: '1px solid var(--border)',
            padding: '12px 24px', borderRadius: 8,
            fontSize: 14, textDecoration: 'none',
            display: 'inline-block',
          }}>
            SQL Cheat Sheet
          </Link>
        </div>
      </section>

      {/* ── 4 Special Features ── */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '48px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 28 }}>
            What makes this different
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {[
              {
                icon: '▶',
                title: 'Live SQL Playground',
                desc: 'Run real queries in your browser — no install, no account. Uses DuckDB-WASM with the FreshMart database preloaded.',
                color: SQL_COLOR,
              },
              {
                icon: '◎',
                title: 'Try It Challenges',
                desc: 'Every module ends with a practice question. Reveal the answer and explanation when you\'re ready.',
                color: '#10b981',
              },
              {
                icon: '⊞',
                title: 'Visual JOIN Diagrams',
                desc: 'Animated row-matching visualizations that make joins click — not the tired Venn diagram.',
                color: '#8b5cf6',
              },
              {
                icon: '≡',
                title: 'SQL Cheat Sheet',
                desc: 'All 62 modules\' syntax on one printable page. Bookmark it for interviews.',
                color: '#f97316',
              },
            ].map(f => (
              <div key={f.title} style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '20px',
              }}>
                <div style={{ fontSize: 20, color: f.color, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FreshMart Database ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '56px 24px 0' }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          Your learning dataset
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(22px,3vw,32px)',
          fontWeight: 900,
          letterSpacing: '-1px',
          margin: '12px 0 8px',
        }}>
          The FreshMart Database
        </h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 580, marginBottom: 28 }}>
          Every module, every query, every example uses FreshMart — a fictional Indian grocery chain with 10 stores across Bangalore, Hyderabad, Mumbai, Delhi, Chennai, and Ahmedabad.
          You'll know this database inside out by Module 62.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {SQL_TABLES.map(table => (
            <div key={table.name} style={{
              background: 'var(--surface)',
              border: `1px solid ${table.color}30`,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '10px 14px',
                borderBottom: `1px solid ${table.color}20`,
                display: 'flex', alignItems: 'center', gap: 8,
                background: `${table.color}10`,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: table.color, display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{table.name}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 'auto' }}>{table.rowCount} rows</span>
              </div>
              <div style={{ padding: '8px 0' }}>
                {table.columns.slice(0, 5).map(col => (
                  <div key={col.name} style={{
                    padding: '4px 14px',
                    display: 'flex', gap: 8, alignItems: 'center',
                  }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text)' }}>{col.name}</span>
                    <span style={{ fontSize: 10, color: table.color, marginLeft: 'auto' }}>{col.type}</span>
                  </div>
                ))}
                {table.columns.length > 5 && (
                  <div style={{ padding: '4px 14px', fontSize: 11, color: 'var(--muted)' }}>
                    +{table.columns.length - 5} more columns
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '56px 24px 80px' }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          Full curriculum
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(22px,3vw,32px)',
          fontWeight: 900,
          letterSpacing: '-1px',
          margin: '12px 0 36px',
        }}>
          62 Modules · 13 Sections
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {SQL_CURRICULUM.map(section => (
            <div key={section.id}>
              {/* Section header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{
                  width: 4, height: 22, borderRadius: 2,
                  background: section.color, display: 'inline-block', flexShrink: 0,
                }} />
                <div>
                  <span style={{
                    fontSize: 10, color: 'var(--muted)',
                    fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em',
                  }}>
                    Section {section.id}
                  </span>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginTop: 1 }}>
                    {section.title}
                  </div>
                </div>
              </div>

              {/* Module list */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 8 }}>
                {section.modules.map(module => (
                  module.status === 'live' ? (
                    <Link key={module.slug} href={`/learn/sql/${module.slug}`} style={{
                      display: 'block', textDecoration: 'none',
                      background: 'var(--surface)',
                      border: `1px solid ${section.color}30`,
                      borderRadius: 8, padding: '14px 16px',
                      transition: 'border-color 0.15s, background 0.15s',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <span style={{
                          fontSize: 10, color: section.color,
                          fontFamily: 'var(--font-mono)', fontWeight: 700,
                          paddingTop: 3, flexShrink: 0,
                        }}>
                          {String(module.id).padStart(2, '0')}
                        </span>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.4 }}>
                            {module.title}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4, lineHeight: 1.5 }}>
                            {module.description}
                          </div>
                          <div style={{ fontSize: 10, color: section.color, marginTop: 8 }}>
                            {module.readTime}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div key={module.slug} style={{
                      background: 'var(--bg2)',
                      border: '1px solid var(--border)',
                      borderRadius: 8, padding: '14px 16px',
                      opacity: 0.55,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <span style={{
                          fontSize: 10, color: 'var(--muted)',
                          fontFamily: 'var(--font-mono)', fontWeight: 700,
                          paddingTop: 3, flexShrink: 0,
                        }}>
                          {String(module.id).padStart(2, '0')}
                        </span>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', lineHeight: 1.4 }}>
                            {module.title}
                          </div>
                          <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 6 }}>
                            Coming soon
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}