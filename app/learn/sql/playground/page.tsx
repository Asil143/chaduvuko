'use client';

import { useState } from 'react';
import { LearnLayout } from '@/components/content/LearnLayout';
import SQLPlayground from '@/components/sql/SQLPlayground';

const SQL_COLOR = '#06b6d4';

const CHALLENGES: {
  label: string;
  category: string;
  color: string;
  difficulty: string;
  desc: string;
  sql: string;
}[] = [
  {
    label: 'Revenue by city',
    category: 'Aggregation',
    color: '#10b981',
    difficulty: 'Beginner',
    desc: 'Which city generates the most revenue for FreshMart?',
    sql: `SELECT s.city,\n  COUNT(o.order_id)        AS total_orders,\n  ROUND(SUM(o.total_amount), 2) AS revenue\nFROM stores s\nJOIN orders o ON s.store_id = o.store_id\nGROUP BY s.city\nORDER BY revenue DESC;`,
  },
  {
    label: 'Gold & Platinum customers',
    category: 'Filtering',
    color: '#f59e0b',
    difficulty: 'Beginner',
    desc: 'Find all premium customers sorted by city.',
    sql: `SELECT first_name, last_name, city, loyalty_tier\nFROM customers\nWHERE loyalty_tier IN ('Gold', 'Platinum')\nORDER BY city, last_name;`,
  },
  {
    label: 'Top 10 products by units sold',
    category: 'JOIN + GROUP BY',
    color: '#8b5cf6',
    difficulty: 'Intermediate',
    desc: 'Which products are flying off the shelves?',
    sql: `SELECT\n  p.product_name,\n  p.category,\n  SUM(oi.quantity)           AS units_sold,\n  ROUND(SUM(oi.line_total), 2) AS revenue\nFROM products p\nJOIN order_items oi ON p.product_id = oi.product_id\nGROUP BY p.product_name, p.category\nORDER BY units_sold DESC\nLIMIT 10;`,
  },
  {
    label: 'Monthly revenue trend',
    category: 'Date functions',
    color: '#06b6d4',
    difficulty: 'Intermediate',
    desc: 'Show revenue month-by-month across all stores.',
    sql: `SELECT\n  STRFTIME('%Y-%m', order_date) AS month,\n  COUNT(*)                       AS total_orders,\n  ROUND(SUM(total_amount), 2)    AS revenue\nFROM orders\nGROUP BY month\nORDER BY month;`,
  },
  {
    label: 'Customers with zero orders',
    category: 'LEFT JOIN',
    color: '#f97316',
    difficulty: 'Intermediate',
    desc: 'Use LEFT JOIN to find customers who have never ordered.',
    sql: `SELECT c.first_name, c.last_name, c.city, c.loyalty_tier\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE o.order_id IS NULL\nORDER BY c.city;`,
  },
  {
    label: 'Average order value by store',
    category: 'Window function',
    color: '#ec4899',
    difficulty: 'Advanced',
    desc: 'Compare each store\'s avg order value against the overall average.',
    sql: `SELECT\n  s.store_name,\n  s.city,\n  ROUND(AVG(o.total_amount), 2)  AS store_avg,\n  ROUND(AVG(AVG(o.total_amount)) OVER (), 2) AS overall_avg\nFROM stores s\nJOIN orders o ON s.store_id = o.store_id\nGROUP BY s.store_name, s.city\nORDER BY store_avg DESC;`,
  },
  {
    label: 'Employee salary ranking',
    category: 'Window function',
    color: '#a78bfa',
    difficulty: 'Advanced',
    desc: 'Rank employees by salary within their department using ROW_NUMBER.',
    sql: `SELECT\n  first_name || ' ' || last_name AS name,\n  department,\n  role,\n  salary,\n  ROW_NUMBER() OVER (\n    PARTITION BY department\n    ORDER BY salary DESC\n  ) AS rank_in_dept\nFROM employees\nORDER BY department, rank_in_dept;`,
  },
  {
    label: 'Best-selling category per city',
    category: 'CTE + RANK',
    color: '#ef4444',
    difficulty: 'Advanced',
    desc: 'In each city, which product category sells the most?',
    sql: `WITH city_category AS (\n  SELECT\n    s.city,\n    p.category,\n    SUM(oi.quantity) AS total_units,\n    RANK() OVER (\n      PARTITION BY s.city\n      ORDER BY SUM(oi.quantity) DESC\n    ) AS rnk\n  FROM stores s\n  JOIN orders o     ON s.store_id    = o.store_id\n  JOIN order_items oi ON o.order_id  = oi.order_id\n  JOIN products p   ON oi.product_id = p.product_id\n  GROUP BY s.city, p.category\n)\nSELECT city, category, total_units\nFROM city_category\nWHERE rnk = 1\nORDER BY city;`,
  },
];

const DIFFICULTY_COLOR: Record<string, string> = {
  Beginner:     '#10b981',
  Intermediate: '#f59e0b',
  Advanced:     '#ef4444',
};

export default function SQLPlaygroundPage() {
  const [selected, setSelected]   = useState(0);
  const [mounted,  setMounted]    = useState(false);
  const [playKey,  setPlayKey]    = useState(0);

  function loadChallenge(idx: number) {
    setSelected(idx);
    setPlayKey(k => k + 1); // remount playground with new query
    setMounted(true);
  }

  const challenge = CHALLENGES[selected];

  return (
    <LearnLayout
      title="SQL Playground"
      description="Run real SQL against the FreshMart database — DuckDB-WASM, fully in your browser"
      section="SQL"
      readTime="Interactive"
      updatedAt="April 2026"
    >
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
        @keyframes statusPulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        .challenge-card { transition: all 0.18s ease; }
        .challenge-card:hover { transform: translateY(-1px); }
      `}</style>

      {/* ── Hero status bar ─────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap',
        gap: 12, marginBottom: 32,
        background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(6,182,212,0.03))',
        border: '1px solid rgba(6,182,212,0.2)',
        borderRadius: 14, padding: '16px 24px',
        boxShadow: '0 0 40px rgba(6,182,212,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00e676', boxShadow: '0 0 8px #00e67680', animation: 'statusPulse 2s ease infinite' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>DuckDB-WASM</span>
          </div>
          <div style={{ width: 1, height: 16, background: 'var(--border)' }} />
          {[
            { label: '6 tables', color: SQL_COLOR },
            { label: 'FreshMart DB', color: SQL_COLOR },
            { label: 'No install', color: '#10b981' },
            { label: '100% local', color: '#10b981' },
          ].map(b => (
            <span key={b.label} style={{
              fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700,
              padding: '3px 10px', borderRadius: 20,
              background: `${b.color}18`, color: b.color,
              border: `1px solid ${b.color}30`,
            }}>{b.label}</span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          <kbd style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 7px', fontSize: 11, color: 'var(--text)' }}>Ctrl</kbd>
          {' + '}
          <kbd style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 7px', fontSize: 11, color: 'var(--text)' }}>Enter</kbd>
          {' to run'}
        </div>
      </div>

      {/* ── Main layout: challenges sidebar + playground ─────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, alignItems: 'start' }}>

        {/* ── Left: challenge cards ─── */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
            // {CHALLENGES.length} challenges
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CHALLENGES.map((ch, i) => {
              const isActive = selected === i && mounted;
              return (
                <button
                  key={i}
                  className="challenge-card"
                  onClick={() => loadChallenge(i)}
                  style={{
                    textAlign: 'left', cursor: 'pointer', width: '100%',
                    background: isActive
                      ? `linear-gradient(135deg, ${ch.color}18, ${ch.color}0a)`
                      : 'var(--surface)',
                    border: isActive ? `1px solid ${ch.color}50` : '1px solid var(--border)',
                    borderRadius: 10, padding: '12px 14px',
                    boxShadow: isActive ? `0 0 16px ${ch.color}18` : 'none',
                  }}
                >
                  {/* Top row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: ch.color, textTransform: 'uppercase', letterSpacing: '.08em' }}>
                      {ch.category}
                    </span>
                    <span style={{
                      fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700,
                      padding: '1px 7px', borderRadius: 20,
                      background: `${DIFFICULTY_COLOR[ch.difficulty]}18`,
                      color: DIFFICULTY_COLOR[ch.difficulty],
                      border: `1px solid ${DIFFICULTY_COLOR[ch.difficulty]}30`,
                    }}>{ch.difficulty}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: isActive ? 'var(--text)' : 'var(--text2)', lineHeight: 1.3, marginBottom: 4 }}>{ch.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{ch.desc}</div>
                  {isActive && (
                    <div style={{ marginTop: 8, fontSize: 10, color: ch.color, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      ▶ Loaded in editor
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right: playground ─── */}
        <div>
          {/* Active challenge header */}
          {mounted && (
            <div style={{
              marginBottom: 12,
              background: `${challenge.color}10`,
              border: `1px solid ${challenge.color}30`,
              borderRadius: 10, padding: '12px 16px',
              animation: 'fadeIn 0.3s ease-out',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: challenge.color, textTransform: 'uppercase', letterSpacing: '.08em' }}>
                  {challenge.category}
                </span>
                <span style={{
                  fontSize: 9, padding: '1px 7px', borderRadius: 20,
                  background: `${DIFFICULTY_COLOR[challenge.difficulty]}18`,
                  color: DIFFICULTY_COLOR[challenge.difficulty],
                  border: `1px solid ${DIFFICULTY_COLOR[challenge.difficulty]}30`,
                  fontFamily: 'var(--font-mono)', fontWeight: 700,
                }}>
                  {challenge.difficulty}
                </span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{challenge.label}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>{challenge.desc}</div>
            </div>
          )}

          {/* Playground */}
          <SQLPlayground
            key={playKey}
            initialQuery={mounted ? challenge.sql : `-- Welcome to the FreshMart SQL Playground\n-- Pick a challenge on the left, or write your own query below\n\nSELECT first_name, last_name, city, loyalty_tier\nFROM customers\nORDER BY loyalty_tier\nLIMIT 10;`}
            height={200}
            showSchema={true}
          />

          {/* Schema quick reference */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
              // Schema reference
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {[
                { name: 'stores',      color: '#06b6d4', key: 'store_id',    cols: ['store_name','city','monthly_target'] },
                { name: 'customers',   color: '#10b981', key: 'customer_id', cols: ['first_name','loyalty_tier','joined_date'] },
                { name: 'orders',      color: '#f97316', key: 'order_id',    cols: ['customer_id','store_id','total_amount'] },
                { name: 'order_items', color: '#8b5cf6', key: 'item_id',     cols: ['order_id','product_id','quantity','line_total'] },
                { name: 'products',    color: '#ef4444', key: 'product_id',  cols: ['product_name','category','unit_price'] },
                { name: 'employees',   color: '#facc15', key: 'employee_id', cols: ['role','department','salary','store_id'] },
              ].map(t => (
                <div key={t.name} style={{
                  background: 'var(--surface)', border: `1px solid ${t.color}25`,
                  borderRadius: 8, overflow: 'hidden',
                }}>
                  <div style={{
                    padding: '6px 10px', background: `${t.color}12`,
                    borderBottom: `1px solid ${t.color}20`,
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: 1, background: t.color }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--text)' }}>{t.name}</span>
                  </div>
                  <div style={{ padding: '6px 10px' }}>
                    <div style={{ fontSize: 10, color: t.color, fontFamily: 'var(--font-mono)', marginBottom: 3 }}>PK: {t.key}</div>
                    {t.cols.map(c => (
                      <div key={c} style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', padding: '1px 0' }}>{c}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LearnLayout>
  );
}
