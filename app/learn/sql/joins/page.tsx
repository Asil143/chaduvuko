'use client';

import { useState, useEffect, useRef } from 'react';
import { LearnLayout } from '@/components/content/LearnLayout';

// ── Static data ───────────────────────────────────────────────────────────────
const CUSTOMERS = [
  { id: 'C001', name: 'Ravi Kumar',   city: 'Hyderabad', tier: 'Gold'     },
  { id: 'C002', name: 'Meera Patel',  city: 'Mumbai',    tier: 'Silver'   },
  { id: 'C003', name: 'Arjun Singh',  city: 'Delhi',     tier: 'Platinum' },
  { id: 'C004', name: 'Priya Nair',   city: 'Bangalore', tier: 'Bronze'   },
];

const ORDERS = [
  { id: 'O001', cid: 'C001', amount: '₹1,240', item: 'Rice 5kg'   },
  { id: 'O002', cid: 'C002', amount: '₹890',   item: 'Vegetables'  },
  { id: 'O003', cid: 'C005', amount: '₹2,100', item: 'Groceries'   },
  { id: 'O004', cid: 'C001', amount: '₹560',   item: 'Fruits'      },
];

// Which left-row index maps to which right-row indices
const CONN: Record<number, number[]> = { 0: [0, 3], 1: [1], 2: [], 3: [] };
// O003 (index 2) maps to no customer

type JoinType = 'INNER' | 'LEFT' | 'RIGHT' | 'FULL';

const JOINS = [
  { type: 'INNER' as JoinType, label: 'INNER JOIN',      color: '#06b6d4',
    desc: 'Returns only rows where both tables have a matching key. C003, C004, and O003 vanish — no match found.',
    sql: `SELECT c.name, c.city, o.id, o.amount\nFROM customers c\nINNER JOIN orders o ON c.id = o.customer_id;` },
  { type: 'LEFT'  as JoinType, label: 'LEFT JOIN',       color: '#10b981',
    desc: 'Every customer row is kept. C003 and C004 appear with NULL order columns. O003 is excluded.',
    sql: `SELECT c.name, c.city, o.id, o.amount\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id;` },
  { type: 'RIGHT' as JoinType, label: 'RIGHT JOIN',      color: '#f97316',
    desc: 'Every order row is kept. O003 appears with NULL customer columns. C003 and C004 are excluded.',
    sql: `SELECT c.name, c.city, o.id, o.amount\nFROM customers c\nRIGHT JOIN orders o ON c.id = o.customer_id;` },
  { type: 'FULL'  as JoinType, label: 'FULL OUTER JOIN', color: '#8b5cf6',
    desc: 'Every row from both sides. C003, C004 get NULL orders. O003 gets NULL customer. Zero rows lost.',
    sql: `SELECT c.name, c.city, o.id, o.amount\nFROM customers c\nFULL OUTER JOIN orders o ON c.id = o.customer_id;` },
];

// ── Layout constants ──────────────────────────────────────────────────────────
const ROW_H  = 52;
const HEAD_H = 44;
const TABLE_H = HEAD_H + CUSTOMERS.length * ROW_H; // 44 + 4*52 = 252
const SVG_W  = 110;

function rowY(idx: number) { return HEAD_H + idx * ROW_H + ROW_H / 2; }

function bezier(lY: number, rY: number) {
  return `M 0 ${lY} C ${SVG_W / 2} ${lY}, ${SVG_W / 2} ${rY}, ${SVG_W} ${rY}`;
}

// All possible connections as SVG paths
const ALL_PATHS = Object.entries(CONN).flatMap(([li, ris]) =>
  (ris as number[]).map(ri => ({
    li: parseInt(li), ri,
    d: bezier(rowY(parseInt(li)), rowY(ri)),
    key: `${li}-${ri}`,
  }))
);

function getResultRows(type: JoinType) {
  const rows: { cIdx: number | null; oIdx: number | null }[] = [];
  CUSTOMERS.forEach((_, ci) => {
    const ms = CONN[ci];
    if (ms.length) ms.forEach(oi => rows.push({ cIdx: ci, oIdx: oi }));
    else if (type === 'LEFT' || type === 'FULL') rows.push({ cIdx: ci, oIdx: null });
  });
  if (type === 'RIGHT' || type === 'FULL') {
    ORDERS.forEach((_, oi) => {
      if (!Object.values(CONN).some(a => a.includes(oi)))
        rows.push({ cIdx: null, oIdx: oi });
    });
  }
  return rows;
}

function leftIncluded(ci: number, type: JoinType) {
  if (type === 'INNER' || type === 'RIGHT') return CONN[ci].length > 0;
  return true;
}
function rightIncluded(oi: number, type: JoinType) {
  const has = Object.values(CONN).some(a => a.includes(oi));
  if (type === 'INNER' || type === 'LEFT') return has;
  return true;
}

export default function VisualJoinsPage() {
  const [active, setActive]   = useState<JoinType>('INNER');
  const [hovL,   setHovL]     = useState<number | null>(null);
  const [hovR,   setHovR]     = useState<number | null>(null);
  const [step,   setStep]     = useState<number>(-1);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const join   = JOINS.find(j => j.type === active)!;
  const result = getResultRows(active);

  // highlighted pairs from hover or play step
  const pairs: { li: number; ri: number }[] = [];
  if (hovL !== null) CONN[hovL].forEach(ri => pairs.push({ li: hovL, ri }));
  if (hovR !== null) Object.entries(CONN).forEach(([li, ris]) => {
    if ((ris as number[]).includes(hovR)) pairs.push({ li: parseInt(li), ri: hovR });
  });
  if (step >= 0 && step < CUSTOMERS.length) CONN[step].forEach(ri => pairs.push({ li: step, ri }));

  const isPathLit = (li: number, ri: number) => pairs.some(p => p.li === li && p.ri === ri);
  const isLeftLit  = (ci: number) => pairs.some(p => p.li === ci) || hovL === ci || step === ci;
  const isRightLit = (oi: number) => pairs.some(p => p.ri === oi) || hovR === oi;

  function play() {
    setStep(0); setPlaying(true);
    timerRef.current = setInterval(() => {
      setStep(prev => {
        const next = prev + 1;
        if (next >= CUSTOMERS.length) { setPlaying(false); clearInterval(timerRef.current!); return -1; }
        return next;
      });
    }, 1100);
  }

  function stopPlay() { setPlaying(false); setStep(-1); if (timerRef.current) clearInterval(timerRef.current); }

  useEffect(() => { stopPlay(); setHovL(null); setHovR(null); }, [active]);
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const C = join.color;

  return (
    <LearnLayout
      title="Visual JOIN Diagrams"
      description="See SQL JOINs row-by-row — hover any row or hit play to watch the join happen live"
      section="SQL"
      readTime="Interactive"
      updatedAt="April 2026"
    >
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pathDraw {
          from { stroke-dashoffset: 200; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes rowPulse {
          0%,100% { box-shadow: 0 0 0 0 transparent; }
          50%      { box-shadow: 0 0 12px 2px var(--pulse-color); }
        }
        @keyframes glowPing {
          0%   { transform: scale(1);   opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .join-row-left:hover  { cursor: pointer; }
        .join-row-right:hover { cursor: pointer; }
      `}</style>

      {/* ── Join type tabs ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
        {JOINS.map(j => (
          <button key={j.type} onClick={() => setActive(j.type)} style={{
            fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)',
            padding: '10px 22px', borderRadius: 10, cursor: 'pointer',
            border: active === j.type ? `1.5px solid ${j.color}` : '1px solid var(--border)',
            background: active === j.type
              ? `linear-gradient(135deg, ${j.color}22, ${j.color}10)`
              : 'var(--surface)',
            color: active === j.type ? j.color : 'var(--muted)',
            boxShadow: active === j.type ? `0 0 20px ${j.color}22` : 'none',
            transition: 'all 0.2s',
          }}>
            {j.label}
          </button>
        ))}
      </div>

      {/* ── Description ────────────────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(135deg, ${C}10, ${C}05)`,
        border: `1px solid ${C}30`,
        borderRadius: 12, padding: '16px 20px',
        fontSize: 14, color: 'var(--text)', lineHeight: 1.8,
        marginBottom: 32,
        boxShadow: `0 0 40px ${C}10`,
      }}>
        <strong style={{ color: C }}>{join.label}: </strong>{join.desc}
      </div>

      {/* ── Visual area ────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #0a0a0f 0%, #0d0f18 100%)',
        border: `1px solid ${C}25`,
        borderRadius: 16,
        padding: '28px 24px 32px',
        boxShadow: `0 0 60px ${C}15, inset 0 1px 0 ${C}20`,
        marginBottom: 32,
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }} />

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, position: 'relative' }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {/* Traffic lights */}
            {['#ff5f57','#febc2e','#28c840'].map((c,i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c, opacity: 0.9 }} />
            ))}
            <span style={{ fontSize: 11, color: '#ffffff40', marginLeft: 10, fontFamily: 'var(--font-mono)' }}>
              freshmart_db · {CUSTOMERS.length} customers · {ORDERS.length} orders
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {step >= 0 && (
              <span style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                Scanning row {step + 1}/{CUSTOMERS.length}
              </span>
            )}
            <button
              onClick={playing ? stopPlay : play}
              style={{
                fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)',
                padding: '7px 18px', borderRadius: 8, cursor: 'pointer',
                border: `1px solid ${C}60`,
                background: playing ? `${C}25` : C,
                color: playing ? C : '#000',
                transition: 'all 0.2s',
                boxShadow: playing ? `0 0 12px ${C}40` : 'none',
              }}
            >
              {playing ? '⏹ Stop' : '▶ Play animation'}
            </button>
          </div>
        </div>

        {/* Tables + SVG */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 1fr', gap: 0, alignItems: 'start', position: 'relative' }}>

          {/* ── LEFT TABLE: customers ─── */}
          <div>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#ffffff50', marginBottom: 10, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              customers (left table)
            </div>
            <div style={{ border: `1px solid ${C}25`, borderRadius: 10, overflow: 'hidden' }}>
              {/* Header */}
              <div style={{
                height: HEAD_H, display: 'grid', gridTemplateColumns: '60px 1fr 80px',
                alignItems: 'center', gap: 8, padding: '0 14px',
                background: `${C}15`, borderBottom: `1px solid ${C}20`,
              }}>
                {['id','name','tier'].map(h => (
                  <span key={h} style={{ fontSize: 10, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</span>
                ))}
              </div>
              {/* Rows */}
              {CUSTOMERS.map((c, ci) => {
                const inc  = leftIncluded(ci, active);
                const lit  = isLeftLit(ci);
                const hasMatch = CONN[ci].length > 0;
                return (
                  <div
                    key={c.id}
                    className="join-row-left"
                    onMouseEnter={() => setHovL(ci)}
                    onMouseLeave={() => setHovL(null)}
                    style={{
                      height: ROW_H,
                      display: 'grid', gridTemplateColumns: '60px 1fr 80px',
                      alignItems: 'center', gap: 8, padding: '0 14px',
                      borderBottom: `1px solid ${C}15`,
                      background: lit
                        ? `${C}22`
                        : !inc ? 'rgba(255,255,255,0.02)' : 'transparent',
                      opacity: !inc ? 0.3 : 1,
                      transition: 'all 0.25s',
                      position: 'relative',
                      // @ts-ignore
                      '--pulse-color': C,
                      boxShadow: lit ? `inset 0 0 0 1px ${C}50, 0 0 20px ${C}20` : 'none',
                    }}
                  >
                    {/* Glow ping on play */}
                    {lit && playing && (
                      <div style={{
                        position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%)',
                        width: 12, height: 12, borderRadius: '50%', background: C,
                        animation: 'glowPing 0.8s ease-out infinite',
                        zIndex: 10,
                      }} />
                    )}
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: lit ? C : '#ffffff60' }}>{c.id}</span>
                    <span style={{ fontSize: 13, color: lit ? '#fff' : '#ffffff80', fontWeight: lit ? 600 : 400, transition: 'all 0.2s' }}>{c.name}</span>
                    <span style={{
                      fontSize: 10, fontFamily: 'var(--font-mono)',
                      padding: '2px 8px', borderRadius: 20,
                      background: lit ? `${C}25` : '#ffffff10',
                      color: lit ? C : '#ffffff40',
                      transition: 'all 0.2s',
                    }}>{c.tier}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── SVG CONNECTOR ZONE ─── */}
          <div style={{ position: 'relative', marginTop: HEAD_H + 42 /* label height */ }}>
            <svg
              width={SVG_W} height={TABLE_H}
              style={{ overflow: 'visible', display: 'block' }}
            >
              {/* All paths dimmed */}
              {ALL_PATHS.map(p => (
                <path
                  key={p.key + '-bg'}
                  d={p.d}
                  fill="none"
                  stroke="#ffffff08"
                  strokeWidth={1.5}
                />
              ))}
              {/* Active paths lit */}
              {ALL_PATHS.map(p => {
                const lit = isPathLit(p.li, p.ri);
                return lit ? (
                  <path
                    key={p.key + '-lit'}
                    d={p.d}
                    fill="none"
                    stroke={C}
                    strokeWidth={2.5}
                    strokeDasharray={200}
                    strokeDashoffset={0}
                    style={{
                      filter: `drop-shadow(0 0 6px ${C})`,
                      animation: 'pathDraw 0.4s ease-out forwards',
                    }}
                  />
                ) : null;
              })}
              {/* Endpoint dots on active */}
              {ALL_PATHS.filter(p => isPathLit(p.li, p.ri)).map(p => (
                <g key={p.key + '-dots'}>
                  <circle cx={0} cy={rowY(p.li)} r={4} fill={C} style={{ filter: `drop-shadow(0 0 4px ${C})` }} />
                  <circle cx={SVG_W} cy={rowY(p.ri)} r={4} fill={C} style={{ filter: `drop-shadow(0 0 4px ${C})` }} />
                </g>
              ))}
            </svg>
          </div>

          {/* ── RIGHT TABLE: orders ─── */}
          <div>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#ffffff50', marginBottom: 10, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              orders (right table)
            </div>
            <div style={{ border: `1px solid ${C}25`, borderRadius: 10, overflow: 'hidden' }}>
              {/* Header */}
              <div style={{
                height: HEAD_H, display: 'grid', gridTemplateColumns: '56px 60px 1fr',
                alignItems: 'center', gap: 8, padding: '0 14px',
                background: `${C}15`, borderBottom: `1px solid ${C}20`,
              }}>
                {['id','cust_id','amount'].map(h => (
                  <span key={h} style={{ fontSize: 10, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</span>
                ))}
              </div>
              {/* Rows */}
              {ORDERS.map((o, oi) => {
                const inc = rightIncluded(oi, active);
                const lit = isRightLit(oi);
                return (
                  <div
                    key={o.id}
                    className="join-row-right"
                    onMouseEnter={() => setHovR(oi)}
                    onMouseLeave={() => setHovR(null)}
                    style={{
                      height: ROW_H,
                      display: 'grid', gridTemplateColumns: '56px 60px 1fr',
                      alignItems: 'center', gap: 8, padding: '0 14px',
                      borderBottom: `1px solid ${C}15`,
                      background: lit
                        ? `${C}22`
                        : !inc ? 'rgba(255,255,255,0.02)' : 'transparent',
                      opacity: !inc ? 0.3 : 1,
                      transition: 'all 0.25s',
                      boxShadow: lit ? `inset 0 0 0 1px ${C}50, 0 0 20px ${C}20` : 'none',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: lit ? C : '#ffffff60' }}>{o.id}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: o.cid === 'C005' ? '#ff475750' : lit ? C : '#ffffff50' }}>{o.cid}</span>
                    <div>
                      <div style={{ fontSize: 13, color: lit ? '#fff' : '#ffffff80', fontWeight: lit ? 600 : 400, transition: 'all 0.2s' }}>{o.amount}</div>
                      <div style={{ fontSize: 10, color: '#ffffff30', marginTop: 1 }}>{o.item}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hint */}
        <div style={{ marginTop: 20, textAlign: 'center', fontSize: 11, color: '#ffffff25', fontFamily: 'var(--font-mono)' }}>
          hover any row to see its connections · or click play to animate
        </div>
      </div>

      {/* ── Result table ───────────────────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '.12em',
            textTransform: 'uppercase', color: 'var(--muted)',
          }}>
            // Result
          </div>
          <div style={{
            fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 700,
            padding: '3px 12px', borderRadius: 20,
            background: `${C}18`, border: `1px solid ${C}40`, color: C,
          }}>
            {result.length} rows returned
          </div>
        </div>
        <div style={{ border: `1px solid ${C}25`, borderRadius: 12, overflow: 'hidden' }}>
          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '120px 120px 80px 80px 90px',
            padding: '10px 16px', gap: 12,
            background: `${C}12`, borderBottom: `1px solid ${C}20`,
          }}>
            {['cust.id','name','city','order_id','amount'].map(h => (
              <span key={h} style={{ fontSize: 10, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</span>
            ))}
          </div>
          {/* Rows */}
          {result.map((r, i) => {
            const c = r.cIdx !== null ? CUSTOMERS[r.cIdx] : null;
            const o = r.oIdx !== null ? ORDERS[r.oIdx] : null;
            const isMatch = c && o;
            return (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '120px 120px 80px 80px 90px',
                padding: '11px 16px', gap: 12,
                borderBottom: i < result.length - 1 ? `1px solid var(--border)` : 'none',
                background: isMatch ? `${C}06` : 'var(--surface)',
                animation: `fadeSlideUp 0.3s ease-out ${i * 0.06}s both`,
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: c ? C : 'var(--muted)', fontStyle: c ? 'normal' : 'italic' }}>{c?.id ?? 'NULL'}</span>
                <span style={{ fontSize: 13, color: c ? 'var(--text)' : 'var(--muted)', fontStyle: c ? 'normal' : 'italic' }}>{c?.name ?? 'NULL'}</span>
                <span style={{ fontSize: 12, color: c ? 'var(--text2)' : 'var(--muted)', fontStyle: c ? 'normal' : 'italic' }}>{c?.city ?? 'NULL'}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: o ? 'var(--text)' : 'var(--muted)', fontStyle: o ? 'normal' : 'italic' }}>{o?.id ?? 'NULL'}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: o ? C : 'var(--muted)', fontStyle: o ? 'normal' : 'italic' }}>{o?.amount ?? 'NULL'}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SQL block ──────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>
          // SQL
        </div>
        <div style={{ border: `1px solid ${C}25`, borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '8px 14px', background: `${C}10`, borderBottom: `1px solid ${C}20`, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: C, boxShadow: `0 0 6px ${C}` }} />
            <span style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{join.label}</span>
          </div>
          <pre style={{
            margin: 0, padding: '18px 20px',
            fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 1.8,
            color: 'var(--text)', background: 'var(--bg)',
            overflowX: 'auto',
          }}>
            {join.sql.split('\n').map((line, i) => {
              const kw = ['SELECT','FROM','INNER JOIN','LEFT JOIN','RIGHT JOIN','FULL OUTER JOIN','ON'];
              let colored = line;
              kw.forEach(k => { colored = colored.replace(k, `§${k}§`); });
              const parts = colored.split('§');
              return (
                <span key={i}>
                  {parts.map((p, j) => (
                    <span key={j} style={{ color: kw.includes(p) ? C : 'inherit' }}>{p}</span>
                  ))}
                  {'\n'}
                </span>
              );
            })}
          </pre>
        </div>
      </div>

      {/* ── All 4 joins side-by-side summary ───────────────────────────── */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>
          // Quick reference
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
          {JOINS.map(j => (
            <button
              key={j.type}
              onClick={() => setActive(j.type)}
              style={{
                textAlign: 'left', cursor: 'pointer',
                background: active === j.type ? `${j.color}12` : 'var(--surface)',
                border: active === j.type ? `1px solid ${j.color}50` : '1px solid var(--border)',
                borderRadius: 12, padding: '16px 18px',
                transition: 'all 0.2s',
                boxShadow: active === j.type ? `0 0 20px ${j.color}15` : 'none',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: j.color, fontFamily: 'var(--font-mono)', marginBottom: 6 }}>{j.label}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{j.desc.split('.')[0]}.</div>
              <div style={{ marginTop: 10, fontSize: 11, color: j.color, fontFamily: 'var(--font-mono)' }}>
                {getResultRows(j.type).length} rows →
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.08))',
        border: '1px solid var(--border)', borderRadius: 14,
        padding: '32px', textAlign: 'center',
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#06b6d4', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
          // Try it yourself
        </div>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 440, margin: '0 auto 20px' }}>
          Write real JOIN queries against the FreshCart database in your browser — no install needed.
        </p>
        <a href="/learn/sql/playground" style={{
          display: 'inline-block', background: '#06b6d4',
          color: '#000', fontWeight: 700, fontSize: 13,
          borderRadius: 8, padding: '10px 28px', textDecoration: 'none',
        }}>
          Open SQL Playground →
        </a>
      </div>
    </LearnLayout>
  );
}
