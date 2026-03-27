'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const PISTON_RUNTIMES: Record<string, { runtime: string; version: string; ext: string }> = {
  python:     { runtime: 'python',     version: '3.10.0',   ext: 'py'    },
  javascript: { runtime: 'javascript', version: '18.15.0',  ext: 'js'    },
  typescript: { runtime: 'typescript', version: '5.0.3',    ext: 'ts'    },
  java:       { runtime: 'java',       version: '15.0.2',   ext: 'java'  },
  cpp:        { runtime: 'c++',        version: '10.2.0',   ext: 'cpp'   },
  c:          { runtime: 'c',          version: '10.2.0',   ext: 'c'     },
  go:         { runtime: 'go',         version: '1.16.2',   ext: 'go'    },
  rust:       { runtime: 'rust',       version: '1.50.0',   ext: 'rs'    },
  shell:      { runtime: 'bash',       version: '5.2.0',    ext: 'sh'    },
  ruby:       { runtime: 'ruby',       version: '3.0.1',    ext: 'rb'    },
  php:        { runtime: 'php',        version: '8.2.3',    ext: 'php'   },
  swift:      { runtime: 'swift',      version: '5.3.3',    ext: 'swift' },
  kotlin:     { runtime: 'kotlin',     version: '1.8.20',   ext: 'kt'    },
  sql:        { runtime: 'sqlite',     version: '3.36.0',   ext: 'sql'   },
};

interface CodePlaygroundProps {
  language: string;
  starterCode: string;
  height?: string;
}

export default function CodePlayground({
  language,
  starterCode,
  height = '300px',
}: CodePlaygroundProps) {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState('');
  const [stderr, setStderr] = useState('');
  const [loading, setLoading] = useState(false);
  const [ran, setRan] = useState(false);

  const handleRun = useCallback(async () => {
    setLoading(true);
    setOutput('');
    setStderr('');
    setRan(false);
    const meta = PISTON_RUNTIMES[language] ?? { runtime: language, version: '*', ext: 'txt' };
    try {
      const res = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: meta.runtime,
          version: meta.version,
          files: [{ name: `main.${meta.ext}`, content: code }],
        }),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setOutput(data.run?.stdout ?? '');
      setStderr(data.run?.stderr ?? data.run?.output ?? '');
    } catch (err: unknown) {
      setStderr(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
      setRan(true);
    }
  }, [code, language]);

  return (
    <div style={{
      border: '1px solid var(--border, rgba(255,255,255,0.07))',
      borderRadius: '8px',
      overflow: 'hidden',
      background: 'var(--surface, #161616)',
      fontFamily: 'inherit',
    }}>
      {/* Editor toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 12px',
        borderBottom: '1px solid var(--border, rgba(255,255,255,0.07))',
        background: 'var(--bg, #080808)',
      }}>
        <span style={{
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--muted, #888)',
        }}>
          {language}
        </span>
        <button
          onClick={handleRun}
          disabled={loading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--green, #00e676)',
            color: '#000',
            border: 'none',
            padding: '4px 14px',
            borderRadius: '5px',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            transition: 'opacity 0.15s',
            fontFamily: 'inherit',
          }}
        >
          {loading ? (
            <span style={{
              width: 11, height: 11, border: '2px solid rgba(0,0,0,0.3)',
              borderTopColor: '#000', borderRadius: '50%',
              display: 'inline-block',
              animation: 'cp-spin 0.7s linear infinite',
            }} />
          ) : '▶'}
          {loading ? 'Running…' : 'Run'}
        </button>
      </div>

      {/* Monaco editor */}
      <div style={{ height }}>
        <MonacoEditor
          height={height}
          language={language === 'shell' ? 'shell' : language}
          value={code}
          theme="vs-dark"
          onChange={v => setCode(v ?? '')}
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontFamily: 'var(--font-mono, "Fira Code", "Cascadia Code", monospace)',
            fontLigatures: true,
            padding: { top: 12, bottom: 12 },
            lineHeight: 1.65,
            renderLineHighlight: 'gutter',
            tabSize: 2,
            overviewRulerLanes: 0,
          }}
        />
      </div>

      {/* Output panel */}
      <div style={{
        borderTop: '1px solid var(--border, rgba(255,255,255,0.07))',
        background: 'var(--bg, #080808)',
      }}>
        <div style={{
          padding: '5px 12px',
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--muted, #888)',
          borderBottom: '1px solid var(--border, rgba(255,255,255,0.07))',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          {ran && !stderr && (
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green, #00e676)', display: 'inline-block' }} />
          )}
          {ran && stderr && (
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red, #ff4757)', display: 'inline-block' }} />
          )}
          Output
        </div>
        <div style={{
          padding: '10px 14px',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.8rem',
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
          maxHeight: '160px',
          overflowY: 'auto',
          minHeight: '38px',
        }}>
          {!ran && !loading && (
            <span style={{ color: 'var(--muted, #888)', fontStyle: 'italic', fontFamily: 'inherit' }}>
              Run your code to see output here.
            </span>
          )}
          {loading && (
            <span style={{ color: 'var(--muted, #888)', fontStyle: 'italic', fontFamily: 'inherit' }}>
              Executing…
            </span>
          )}
          {ran && output && (
            <span style={{ color: 'var(--text, #efefef)' }}>{output}</span>
          )}
          {ran && stderr && (
            <span style={{ color: 'var(--red, #ff4757)' }}>{stderr}</span>
          )}
          {ran && !output && !stderr && (
            <span style={{ color: 'var(--muted, #888)', fontStyle: 'italic', fontFamily: 'inherit' }}>
              No output.
            </span>
          )}
        </div>
      </div>

      <style>{`
        @keyframes cp-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
