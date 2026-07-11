'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { STREAMPULSE_CSV, DS_TABLES } from '@/data/datascience-streampulse';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface CellResult {
  stdout: string;
  kind: 'table' | 'text' | 'image' | 'none' | 'error';
  columns?: string[];
  rows?: string[][];
  rowCount?: number;
  text?: string;
  image?: string;
  error?: string;
}

type PyStatus = 'loading' | 'ready' | 'running' | 'failed';

interface Props {
  initialCode?: string;
  height?: number;
  showSchema?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Pyodide singleton — one runtime shared by every playground on the page.
// Loading a full Pyodide + pandas + matplotlib runtime per instance would be
// far too slow, so we boot it once and reuse it everywhere.
// ─────────────────────────────────────────────────────────────────────────────
const PYODIDE_VERSION = '0.26.4';
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<any>;
  }
}

let pyodideSingleton: any = null;
let pyodideLoadingPromise: Promise<any> | null = null;

function loadScriptOnce(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (window.loadPyodide) return resolve();
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('script failed')));
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('script failed to load'));
    document.head.appendChild(script);
  });
}

const BOOTSTRAP_PY = `
import pandas as pd, numpy as np, io, json, ast, contextlib, base64
import matplotlib
matplotlib.use('AGG')
import matplotlib.pyplot as plt

users = pd.read_csv(io.StringIO(__csv_users), parse_dates=['signup_date'])
titles = pd.read_csv(io.StringIO(__csv_titles))
subscriptions = pd.read_csv(io.StringIO(__csv_subscriptions), parse_dates=['start_date', 'end_date'])
watch_history = pd.read_csv(io.StringIO(__csv_watch_history), parse_dates=['watch_date'])
ratings = pd.read_csv(io.StringIO(__csv_ratings), parse_dates=['rating_date'])

def __run_cell(source):
    out = io.StringIO()
    result = {'stdout': '', 'kind': 'none'}
    try:
        tree = ast.parse(source, mode='exec')
        last_expr = None
        if tree.body and isinstance(tree.body[-1], ast.Expr):
            last_expr = tree.body.pop()
        exec_code = compile(tree, '<cell>', 'exec')
        eval_code = compile(ast.Expression(last_expr.value), '<cell>', 'eval') if last_expr is not None else None
        g = globals()
        value = None
        with contextlib.redirect_stdout(out):
            exec(exec_code, g)
            if eval_code is not None:
                value = eval(eval_code, g)
        result['stdout'] = out.getvalue()

        fignums = plt.get_fignums()
        if fignums:
            fig = plt.figure(fignums[0])
            buf = io.BytesIO()
            fig.savefig(buf, format='png', dpi=130, bbox_inches='tight', facecolor='#111318')
            buf.seek(0)
            result['kind'] = 'image'
            result['image'] = base64.b64encode(buf.read()).decode('ascii')
            for n in fignums:
                plt.close(n)
        elif value is not None:
            if isinstance(value, pd.DataFrame):
                d = value.head(200)
                result['kind'] = 'table'
                result['columns'] = [str(c) for c in d.columns]
                result['rows'] = [[('' if pd.isna(v) else str(v)) for v in row] for row in d.values.tolist()]
                result['rowCount'] = len(value)
            elif isinstance(value, pd.Series):
                d = value.head(200)
                result['kind'] = 'table'
                result['columns'] = [d.index.name or 'index', d.name or 'value']
                result['rows'] = [[str(idx), ('' if pd.isna(v) else str(v))] for idx, v in d.items()]
                result['rowCount'] = len(value)
            else:
                result['kind'] = 'text'
                result['text'] = repr(value)
        elif result['stdout']:
            result['kind'] = 'text'
    except Exception as e:
        result['kind'] = 'error'
        result['error'] = f'{type(e).__name__}: {e}'
        result['stdout'] = out.getvalue()
    return json.dumps(result)
`;

async function getPyodide(onStage?: (stage: string) => void) {
  if (pyodideSingleton) return pyodideSingleton;
  if (pyodideLoadingPromise) return pyodideLoadingPromise;

  pyodideLoadingPromise = (async () => {
    onStage?.('engine');
    await loadScriptOnce(PYODIDE_CDN + 'pyodide.js');
    const pyodide = await window.loadPyodide!({ indexURL: PYODIDE_CDN });

    onStage?.('packages');
    await pyodide.loadPackage(['pandas', 'matplotlib']);

    onStage?.('dataset');
    for (const [name, csv] of Object.entries(STREAMPULSE_CSV)) {
      pyodide.globals.set(`__csv_${name}`, csv);
    }
    await pyodide.runPythonAsync(BOOTSTRAP_PY);

    pyodideSingleton = pyodide;
    return pyodide;
  })();

  return pyodideLoadingPromise;
}

// ─────────────────────────────────────────────────────────────────────────────
// PyPlayground
// ─────────────────────────────────────────────────────────────────────────────
export default function PyPlayground({
  initialCode = 'users.head()',
  height = 160,
  showSchema = true,
}: Props) {
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState<CellResult | null>(null);
  const [status, setStatus] = useState<PyStatus>('loading');
  const [stage, setStage] = useState('engine');
  const [schemaOpen, setSchemaOpen] = useState(false);
  const [expandedTable, setExpandedTable] = useState<string | null>(null);
  const pyRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    getPyodide(s => { if (!cancelled) setStage(s); })
      .then(pyodide => {
        if (cancelled) return;
        pyRef.current = pyodide;
        setStatus('ready');
      })
      .catch(e => {
        console.error('[PyPlayground] Pyodide init failed:', e);
        if (!cancelled) setStatus('failed');
      });

    return () => { cancelled = true; };
  }, []);

  const runCode = useCallback(async () => {
    if (!pyRef.current || status !== 'ready') return;
    const source = code.trim();
    if (!source) return;

    setStatus('running');
    setResult(null);

    try {
      pyRef.current.globals.set('__user_code', source);
      const raw = await pyRef.current.runPythonAsync('__run_cell(__user_code)');
      setResult(JSON.parse(raw));
    } catch (e: any) {
      setResult({ stdout: '', kind: 'error', error: e?.message ?? 'Execution failed' });
    }

    setStatus('ready');
  }, [code, status]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  };

  const DS_COLOR = '#8b5cf6';

  const loadingLabel =
    stage === 'engine' ? 'Loading Python engine…'
    : stage === 'packages' ? 'Loading pandas + matplotlib…'
    : 'Loading StreamPulse dataset…';

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
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', borderBottom: '1px solid var(--border)', background: 'var(--surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: status === 'ready' ? '#00e676'
              : status === 'loading' ? '#facc15'
              : status === 'failed' ? '#ff4757'
              : DS_COLOR,
            display: 'inline-block',
            boxShadow: status === 'ready' ? '0 0 6px #00e67660' : 'none',
            transition: 'all 0.3s',
          }} />
          <span style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {status === 'loading' ? loadingLabel
              : status === 'ready'   ? 'StreamPulse Python · Ready'
              : status === 'running' ? 'Running…'
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
              }}
            >
              {schemaOpen ? 'Hide Tables' : 'Tables'}
            </button>
          )}
          <button
            onClick={runCode}
            disabled={status !== 'ready'}
            style={{
              background: status === 'ready' ? DS_COLOR : 'var(--surface2)',
              color: status === 'ready' ? '#fff' : 'var(--muted)',
              border: 'none', borderRadius: 6,
              padding: '5px 14px', fontSize: 12, fontWeight: 700,
              cursor: status === 'ready' ? 'pointer' : 'not-allowed',
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
            width: 220, minWidth: 220, borderRight: '1px solid var(--border)',
            background: 'var(--surface)', overflowY: 'auto', maxHeight: 420,
          }}>
            <div style={{ padding: '8px 12px', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
              DataFrames
            </div>
            {DS_TABLES.map(table => (
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
                      <div key={col.name} style={{ padding: '4px 12px 4px 28px', borderTop: '1px solid var(--border)', display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                        <span style={{ fontSize: 11, color: 'var(--text)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{col.name}</span>
                        <span style={{ fontSize: 10, color: table.color, marginLeft: 'auto', flexShrink: 0, paddingTop: 1 }}>{col.dtype}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Editor + Output ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            style={{
              width: '100%', height, padding: '14px 16px',
              background: 'var(--bg)', color: 'var(--text)',
              border: 'none', outline: 'none', resize: 'vertical',
              fontFamily: 'var(--font-mono, monospace)', fontSize: 13, lineHeight: 1.7,
              boxSizing: 'border-box', borderBottom: '1px solid var(--border)',
            }}
            placeholder="Write your Python here…"
          />

          <div style={{ padding: '4px 16px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 10, color: 'var(--muted)' }}>Ctrl + Enter to run</span>
          </div>

          {/* stdout */}
          {result?.stdout && (
            <pre style={{
              margin: 0, padding: '10px 16px', background: 'var(--bg)',
              borderBottom: '1px solid var(--border)', fontSize: 12, lineHeight: 1.7,
              color: 'var(--muted)', whiteSpace: 'pre-wrap', overflowX: 'auto',
            }}>{result.stdout}</pre>
          )}

          {/* error */}
          {result?.kind === 'error' && (
            <div style={{ padding: '12px 16px', background: 'rgba(255,71,87,0.08)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, color: '#ff4757', fontFamily: 'var(--font-mono)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                <span style={{ fontWeight: 700 }}>Error: </span>{result.error}
              </div>
            </div>
          )}

          {/* image (matplotlib) */}
          {result?.kind === 'image' && result.image && (
            <div style={{ padding: 16, background: '#111318', overflowX: 'auto' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`data:image/png;base64,${result.image}`} alt="Plot output" style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }} />
            </div>
          )}

          {/* table (DataFrame / Series) */}
          {result?.kind === 'table' && (
            <div style={{ overflowX: 'auto', maxHeight: 320 }}>
              <div style={{ padding: '6px 16px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', gap: 16, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                  <span style={{ color: DS_COLOR, fontWeight: 700 }}>{result.rowCount}</span> row{result.rowCount !== 1 ? 's' : ''}
                  {result.rows && result.rowCount && result.rows.length < result.rowCount ? ` (showing ${result.rows.length})` : ''}
                </span>
              </div>
              {result.rows && result.rows.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr>
                      {result.columns!.map((col, i) => (
                        <th key={i} style={{
                          padding: '8px 12px', textAlign: 'left', color: DS_COLOR,
                          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                          background: 'var(--surface)', borderBottom: '1px solid var(--border)',
                          whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 1,
                        }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row, ri) => (
                      <tr key={ri} style={{ background: ri % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                        {row.map((cell, ci) => (
                          <td key={ci} style={{
                            padding: '7px 12px', color: cell === '' ? 'var(--muted)' : 'var(--text)',
                            fontStyle: cell === '' ? 'italic' : 'normal',
                            fontFamily: 'var(--font-mono)', fontSize: 12,
                            borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap',
                          }}>{cell === '' ? 'NaN' : cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: '16px', color: 'var(--muted)', fontSize: 13 }}>Ran successfully. No rows to show.</div>
              )}
            </div>
          )}

          {/* text output (repr of scalars, lists, dicts, print-only cells) */}
          {result?.kind === 'text' && result.text && (
            <pre style={{
              margin: 0, padding: '14px 16px', background: 'var(--bg)',
              fontSize: 13, lineHeight: 1.8, color: 'var(--text)',
              whiteSpace: 'pre-wrap', overflowX: 'auto',
            }}>{result.text}</pre>
          )}

          {/* empty states */}
          {!result && status === 'ready' && (
            <div style={{ padding: '20px 16px', color: 'var(--muted)', fontSize: 12, textAlign: 'center' }}>
              Write some Python above and press Run (or Ctrl + Enter)
            </div>
          )}
          {status === 'loading' && (
            <div style={{ padding: '20px 16px', color: 'var(--muted)', fontSize: 12, textAlign: 'center' }}>
              {loadingLabel} (first run on a page takes a few seconds)
            </div>
          )}
          {status === 'failed' && (
            <div style={{ padding: '16px', color: '#ff4757', fontSize: 12, textAlign: 'center' }}>
              Could not load the Python engine. Check your connection and try refreshing.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
