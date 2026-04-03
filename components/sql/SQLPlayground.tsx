'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { FRESHMART_SCHEMA_SQL, FRESHMART_SEED_SQL, SQL_TABLES } from '@/data/sql-freshmart';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface QueryResult {
  columns: string[];
  rows: string[][];
  rowCount: number;
  timeMs: number;
}

type DBStatus = 'loading' | 'ready' | 'running' | 'failed';

interface Props {
  initialQuery?: string;
  height?: number;
  showSchema?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// SQLPlayground
// ─────────────────────────────────────────────────────────────────────────────
export default function SQLPlayground({
  initialQuery = 'SELECT first_name, last_name, city, loyalty_tier\nFROM customers\nLIMIT 5;',
  height = 160,
  showSchema = true,
}: Props) {
  const [query, setQuery]     = useState(initialQuery);
  const [result, setResult]   = useState<QueryResult | null>(null);
  const [error, setError]     = useState('');
  const [status, setStatus]   = useState<DBStatus>('loading');
  const [schemaOpen, setSchemaOpen] = useState(false);
  const [expandedTable, setExpandedTable] = useState<string | null>(null);
  const connRef = useRef<any>(null);

  // ── Init DuckDB ──────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function initDB() {
      try {
        const duckdb: any = await import('@duckdb/duckdb-wasm');
        const { JSDELIVR_BUNDLES, selectBundle, AsyncDuckDB, ConsoleLogger } = duckdb;

        const bundle = await selectBundle(JSDELIVR_BUNDLES);
        const workerUrl = URL.createObjectURL(
          new Blob([`importScripts("${bundle.mainWorker}");`], { type: 'text/javascript' })
        );
        const worker = new Worker(workerUrl);
        const db     = new AsyncDuckDB(new ConsoleLogger(), worker);
        await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
        URL.revokeObjectURL(workerUrl);

        const conn = await db.connect();
        await conn.query(FRESHMART_SCHEMA_SQL);
        await conn.query(FRESHMART_SEED_SQL);

        if (!cancelled) {
          connRef.current = conn;
          setStatus('ready');
        }
      } catch (e) {
        console.error('[SQLPlayground] DuckDB init failed:', e);
        if (!cancelled) setStatus('failed');
      }
    }

    initDB();
    return () => { cancelled = true; };
  }, []);

  // ── Run query ────────────────────────────────────────────────────────────
  const runQuery = useCallback(async () => {
    if (!connRef.current || status !== 'ready') return;
    const q = query.trim();
    if (!q) return;

    setStatus('running');
    setError('');
    setResult(null);

    try {
      const start = performance.now();
      const res   = await connRef.current.query(q);
      const elapsed = Math.round(performance.now() - start);

      const columns: string[] = res.schema.fields.map((f: any) => f.name);
      const rows: string[][] = res.toArray().map((row: any) =>
        columns.map(col => {
          const val = row[col];
          if (val === null || val === undefined) return 'NULL';
          if (typeof val === 'bigint') return val.toString();
          if (val instanceof Date) return val.toISOString().split('T')[0];
          return String(val);
        })
      );

      setResult({ columns, rows, rowCount: rows.length, timeMs: elapsed });
    } catch (e: any) {
      setError(e.message ?? 'Query failed');
    }

    setStatus('ready');
  }, [query, status]);

  // ── Ctrl/Cmd + Enter shortcut ────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runQuery();
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────
  const SQL_COLOR = '#06b6d4';

  return (
    <div style={{
      background: 'var(--bg2)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      overflow: 'hidden',
      marginTop: 32,
      fontFamily: 'var(--font-mono, monospace)',
    }}>

      {/* ── Header bar ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: status === 'ready' ? '#00e676'
              : status === 'loading' ? '#facc15'
              : status === 'failed' ? '#ff4757'
              : '#06b6d4',
            display: 'inline-block',
            boxShadow: status === 'ready' ? '0 0 6px #00e67660' : 'none',
            transition: 'all 0.3s',
          }} />
          <span style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {status === 'loading' ? 'Loading FreshMart DB…'
              : status === 'ready'   ? 'FreshMart SQL · Ready'
              : status === 'running' ? 'Running query…'
              : 'Failed to load — try refresh'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {showSchema && (
            <button
              onClick={() => setSchemaOpen(p => !p)}
              style={{
                background: 'none', border: '1px solid var(--border)',
                color: 'var(--muted)', borderRadius: 6,
                padding: '4px 10px', fontSize: 11, cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {schemaOpen ? 'Hide Schema' : 'Schema'}
            </button>
          )}
          <button
            onClick={runQuery}
            disabled={status !== 'ready'}
            style={{
              background: status === 'ready' ? SQL_COLOR : 'var(--surface2)',
              color: status === 'ready' ? '#000' : 'var(--muted)',
              border: 'none', borderRadius: 6,
              padding: '5px 14px', fontSize: 12, fontWeight: 700,
              cursor: status === 'ready' ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s',
              letterSpacing: '0.04em',
            }}
          >
            ▶ Run
          </button>
        </div>
      </div>

      <div style={{ display: 'flex' }}>

        {/* ── Schema sidebar ── */}
        {showSchema && schemaOpen && (
          <div style={{
            width: 220, minWidth: 220,
            borderRight: '1px solid var(--border)',
            background: 'var(--surface)',
            overflowY: 'auto',
            maxHeight: 420,
          }}>
            <div style={{ padding: '8px 12px', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
              Tables
            </div>
            {SQL_TABLES.map(table => (
              <div key={table.name}>
                <button
                  onClick={() => setExpandedTable(expandedTable === table.name ? null : table.name)}
                  style={{
                    width: '100%', textAlign: 'left',
                    background: expandedTable === table.name ? 'var(--surface2)' : 'none',
                    border: 'none', borderTop: '1px solid var(--border)',
                    padding: '8px 12px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: table.color, display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{table.name}</span>
                  <span style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 'auto' }}>{table.rowCount}r</span>
                </button>
                {expandedTable === table.name && (
                  <div style={{ background: 'var(--bg)' }}>
                    {table.columns.map(col => (
                      <div key={col.name} style={{
                        padding: '4px 12px 4px 28px',
                        borderTop: '1px solid var(--border)',
                        display: 'flex', gap: 6, alignItems: 'flex-start',
                      }}>
                        <span style={{ fontSize: 11, color: 'var(--text)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{col.name}</span>
                        <span style={{ fontSize: 10, color: SQL_COLOR, marginLeft: 'auto', flexShrink: 0, paddingTop: 1 }}>{col.type}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Editor + Results ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Editor */}
          <textarea
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            style={{
              width: '100%',
              height,
              padding: '14px 16px',
              background: 'var(--bg)',
              color: 'var(--text)',
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: 13,
              lineHeight: 1.7,
              boxSizing: 'border-box',
              borderBottom: '1px solid var(--border)',
            }}
            placeholder="Write your SQL here…"
          />

          {/* Shortcut hint */}
          <div style={{ padding: '4px 16px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 10, color: 'var(--muted)' }}>Ctrl + Enter to run</span>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              padding: '12px 16px',
              background: 'rgba(255,71,87,0.08)',
              borderBottom: '1px solid var(--border)',
            }}>
              <div style={{ fontSize: 11, color: '#ff4757', fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}>
                <span style={{ fontWeight: 700 }}>Error: </span>{error}
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div style={{ overflowX: 'auto', maxHeight: 280 }}>
              {/* Meta bar */}
              <div style={{
                padding: '6px 16px',
                background: 'var(--surface)',
                borderBottom: '1px solid var(--border)',
                display: 'flex', gap: 16, alignItems: 'center',
              }}>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                  <span style={{ color: SQL_COLOR, fontWeight: 700 }}>{result.rowCount}</span> row{result.rowCount !== 1 ? 's' : ''} returned
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{result.timeMs}ms</span>
              </div>

              {/* Table */}
              {result.rows.length > 0 ? (
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: 12,
                }}>
                  <thead>
                    <tr>
                      {result.columns.map(col => (
                        <th key={col} style={{
                          padding: '8px 12px',
                          textAlign: 'left',
                          color: SQL_COLOR,
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          fontWeight: 700,
                          background: 'var(--surface)',
                          borderBottom: '1px solid var(--border)',
                          whiteSpace: 'nowrap',
                          position: 'sticky', top: 0, zIndex: 1,
                        }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row, ri) => (
                      <tr key={ri} style={{ background: ri % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                        {row.map((cell, ci) => (
                          <td key={ci} style={{
                            padding: '7px 12px',
                            color: cell === 'NULL' ? 'var(--muted)' : 'var(--text)',
                            fontStyle: cell === 'NULL' ? 'italic' : 'normal',
                            fontFamily: 'var(--font-mono)',
                            fontSize: 12,
                            borderBottom: '1px solid var(--border)',
                            whiteSpace: 'nowrap',
                          }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: '16px', color: 'var(--muted)', fontSize: 13 }}>
                  Query ran successfully. No rows returned.
                </div>
              )}
            </div>
          )}

          {/* Empty state */}
          {!result && !error && status === 'ready' && (
            <div style={{ padding: '20px 16px', color: 'var(--muted)', fontSize: 12, textAlign: 'center' }}>
              Write a query above and press Run (or Ctrl + Enter)
            </div>
          )}

          {/* Loading DB state */}
          {status === 'loading' && (
            <div style={{ padding: '20px 16px', color: 'var(--muted)', fontSize: 12, textAlign: 'center' }}>
              Loading FreshMart database in your browser…
            </div>
          )}

          {/* Failed state */}
          {status === 'failed' && (
            <div style={{ padding: '16px', color: '#ff4757', fontSize: 12, textAlign: 'center' }}>
              Could not load the SQL engine. Try refreshing the page.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}