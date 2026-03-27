'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const LANGUAGES: { label: string; value: string; pistonRuntime: string; pistonVersion: string }[] = [
  { label: 'Python',     value: 'python',     pistonRuntime: 'python',      pistonVersion: '3.10.0' },
  { label: 'JavaScript', value: 'javascript', pistonRuntime: 'javascript',  pistonVersion: '18.15.0' },
  { label: 'TypeScript', value: 'typescript', pistonRuntime: 'typescript',  pistonVersion: '5.0.3' },
  { label: 'Java',       value: 'java',       pistonRuntime: 'java',        pistonVersion: '15.0.2' },
  { label: 'C++',        value: 'cpp',        pistonRuntime: 'c++',         pistonVersion: '10.2.0' },
  { label: 'C',          value: 'c',          pistonRuntime: 'c',           pistonVersion: '10.2.0' },
  { label: 'Go',         value: 'go',         pistonRuntime: 'go',          pistonVersion: '1.16.2' },
  { label: 'Rust',       value: 'rust',       pistonRuntime: 'rust',        pistonVersion: '1.50.0' },
  { label: 'Bash',       value: 'shell',      pistonRuntime: 'bash',        pistonVersion: '5.2.0' },
  { label: 'Ruby',       value: 'ruby',       pistonRuntime: 'ruby',        pistonVersion: '3.0.1' },
  { label: 'PHP',        value: 'php',        pistonRuntime: 'php',         pistonVersion: '8.2.3' },
  { label: 'Swift',      value: 'swift',      pistonRuntime: 'swift',       pistonVersion: '5.3.3' },
  { label: 'Kotlin',     value: 'kotlin',     pistonRuntime: 'kotlin',      pistonVersion: '1.8.20' },
  { label: 'SQL',        value: 'sql',        pistonRuntime: 'sqlite',      pistonVersion: '3.36.0' },
];

const STARTER_CODE: Record<string, string> = {
  python: `print("Hello, World!")`,
  javascript: `console.log("Hello, World!");`,
  typescript: `const greet = (name: string): string => \`Hello, \${name}!\`;
console.log(greet("World"));`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  cpp: `#include <iostream>
int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  c: `#include <stdio.h>
int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
  rust: `fn main() {
    println!("Hello, World!");
}`,
  shell: `echo "Hello, World!"`,
  ruby: `puts "Hello, World!"`,
  php: `<?php
echo "Hello, World!\\n";`,
  swift: `print("Hello, World!")`,
  kotlin: `fun main() {
    println("Hello, World!")
}`,
  sql: `SELECT 'Hello, World!' AS greeting;`,
};

export default function PlaygroundPage() {
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(STARTER_CODE['python']);
  const [output, setOutput] = useState('');
  const [stderr, setStderr] = useState('');
  const [loading, setLoading] = useState(false);
  const [ran, setRan] = useState(false);

  const handleLangChange = useCallback((value: string) => {
    const lang = LANGUAGES.find(l => l.value === value) ?? LANGUAGES[0];
    setSelectedLang(lang);
    setCode(STARTER_CODE[value] ?? '');
    setOutput('');
    setStderr('');
    setRan(false);
  }, []);

  const handleRun = useCallback(async () => {
    setLoading(true);
    setOutput('');
    setStderr('');
    setRan(false);

    if (selectedLang.value === 'sql') {
      setOutput('SQL execution coming soon.');
      setLoading(false);
      setRan(true);
      return;
    }

    const pistonLanguage = selectedLang.pistonRuntime;

    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: pistonLanguage,
          version: '*',
          files: [
            {
              name: 'main',
              content: code,
            }
          ]
        })
      });

      const result = await response.json();
      const output = result.run?.stdout || result.run?.stderr || 'No output';
      setOutput(output);
    } catch (err: unknown) {
      setStderr(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
      setRan(true);
    }
  }, [code, selectedLang]);

  return (
    <>
      <style>{`
        :root {
          --bg: #080808;
          --surface: #161616;
          --border: rgba(255,255,255,0.07);
          --text: #efefef;
          --muted: #888;
          --green: #00e676;
          --red: #ff4757;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--bg); color: var(--text); }
        .pg-root {
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          font-family: var(--font-display, sans-serif);
          padding-top: 80px;
        }
        .pg-header {
          border-bottom: 1px solid var(--border);
          padding: 0 24px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--surface);
          flex-shrink: 0;
        }
        .pg-title {
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: var(--text);
        }
        .pg-title span { color: var(--green); }
        .pg-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pg-select {
          background: var(--bg);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.85rem;
          cursor: pointer;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          padding-right: 32px;
        }
        .pg-select:focus { border-color: var(--green); }
        .pg-run-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--green);
          color: #000;
          border: none;
          padding: 7px 18px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s;
          font-family: inherit;
        }
        .pg-run-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .pg-run-btn:not(:disabled):hover { opacity: 0.88; }
        .pg-editor-wrap {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }
        .pg-editor {
          height: 420px;
        }
        .pg-output-panel {
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
        }
        .pg-output-header {
          padding: 8px 16px;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pg-output-body {
          padding: 14px 16px;
          font-family: var(--font-mono, monospace);
          font-size: 0.82rem;
          line-height: 1.6;
          white-space: pre-wrap;
          max-height: 220px;
          overflow-y: auto;
          min-height: 60px;
        }
        .pg-stdout { color: var(--text); }
        .pg-stderr { color: var(--red); }
        .pg-placeholder { color: var(--muted); font-style: italic; font-family: inherit; font-size: 0.82rem; }
        .spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(0,0,0,0.3);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .dot-run { width: 7px; height: 7px; border-radius: 50%; background: var(--green); display: inline-block; }
        .dot-err { width: 7px; height: 7px; border-radius: 50%; background: var(--red); display: inline-block; }
      `}</style>
      <div className="pg-root">
        <header className="pg-header">
          <span className="pg-title">Code <span>Playground</span> — Chaduvuko</span>
          <div className="pg-controls">
            <select
              className="pg-select"
              value={selectedLang.value}
              onChange={e => handleLangChange(e.target.value)}
            >
              {LANGUAGES.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
            <button className="pg-run-btn" onClick={handleRun} disabled={loading}>
              {loading ? <span className="spinner" /> : '▶'}
              {loading ? 'Running…' : 'Run'}
            </button>
          </div>
        </header>

        <div className="pg-editor-wrap">
          <div className="pg-editor">
            <MonacoEditor
              height="100%"
              language={selectedLang.value}
              value={code}
              theme="vs-dark"
              onChange={v => setCode(v ?? '')}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontFamily: 'var(--font-mono, "Fira Code", "Cascadia Code", monospace)',
                fontLigatures: true,
                padding: { top: 16, bottom: 16 },
                lineHeight: 1.7,
                renderLineHighlight: 'gutter',
                tabSize: 2,
              }}
            />
          </div>

          <div className="pg-output-panel">
            <div className="pg-output-header">
              {ran && !stderr && <span className="dot-run" />}
              {ran && stderr && <span className="dot-err" />}
              Output
            </div>
            <div className="pg-output-body">
              {!ran && !loading && (
                <span className="pg-placeholder">Run your code to see output here.</span>
              )}
              {loading && (
                <span className="pg-placeholder">Executing…</span>
              )}
              {ran && output && <span className="pg-stdout">{output}</span>}
              {ran && stderr && <span className="pg-stderr">{stderr}</span>}
              {ran && !output && !stderr && (
                <span className="pg-placeholder">No output.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
