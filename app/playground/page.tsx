'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';

const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/KnPtWB3yzR3HM8CcQlHswD?s=cl&p=i&ilr=0';
const WHATSAPP_POPUP_SESSION_KEY = 'chaduvuko_whatsapp_popup_shown';

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
  const [showWhatsappPopup, setShowWhatsappPopup] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(WHATSAPP_POPUP_SESSION_KEY)) return;
    setShowWhatsappPopup(true);
    sessionStorage.setItem(WHATSAPP_POPUP_SESSION_KEY, '1');
  }, []);

  const dismissWhatsappPopup = useCallback(() => setShowWhatsappPopup(false), []);

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
      setOutput('SQL execution coming soon — we\'re building an in-browser SQL runner.');
      setLoading(false);
      setRan(true);
      return;
    }

    const pistonLanguage = selectedLang.pistonRuntime;

    const languageIdMap: Record<string, number> = {
      python:     71,
      javascript: 63,
      typescript: 74,
      java:       62,
      'c++':      54,
      c:          50,
      go:         60,
      rust:       73,
      bash:       46,
      ruby:       72,
      php:        68,
      swift:      83,
      kotlin:     78,
    };

    try {
      const submitRes = await fetch('https://ce.judge0.com/submissions?base64_encoded=false&wait=true', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language_id: languageIdMap[pistonLanguage],
          source_code: code,
        })
      });

      const result = await submitRes.json();
      const output = result.stdout
        || result.stderr
        || result.compile_output
        || result.message
        || 'No output returned.';
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
        .wa-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 16px;
          animation: wa-fade-in 0.2s ease;
        }
        @keyframes wa-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .wa-modal {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          max-width: 380px;
          width: 100%;
          padding: 28px 24px 24px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          animation: wa-pop-in 0.25s ease;
        }
        @keyframes wa-pop-in {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .wa-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: transparent;
          border: none;
          color: var(--muted);
          font-size: 1.1rem;
          line-height: 1;
          cursor: pointer;
          padding: 6px;
          border-radius: 6px;
        }
        .wa-close:hover { color: var(--text); background: rgba(255,255,255,0.06); }
        .wa-icon { font-size: 2.2rem; margin-bottom: 10px; }
        .wa-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 10px;
          font-family: var(--font-display, sans-serif);
        }
        .wa-body {
          font-size: 0.88rem;
          line-height: 1.6;
          color: var(--muted);
          margin-bottom: 20px;
        }
        .wa-join-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          background: #25D366;
          color: #fff;
          border: none;
          padding: 11px 18px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          font-family: inherit;
          transition: opacity 0.15s;
        }
        .wa-join-btn:hover { opacity: 0.9; }
        .wa-later-btn {
          display: block;
          width: 100%;
          background: transparent;
          border: none;
          color: var(--muted);
          font-size: 0.8rem;
          padding: 12px 0 0;
          cursor: pointer;
          font-family: inherit;
        }
        .wa-later-btn:hover { color: var(--text); }
      `}</style>
      <div className="pg-root">
        {showWhatsappPopup && (
          <div className="wa-overlay" onClick={dismissWhatsappPopup}>
            <div className="wa-modal" onClick={e => e.stopPropagation()}>
              <button className="wa-close" onClick={dismissWhatsappPopup} aria-label="Close">✕</button>
              <div className="wa-icon">🎥</div>
              <div className="wa-title">Want to make YouTube study content with us?</div>
              <div className="wa-body">
                I&apos;m looking to work with students on YouTube study content — I&apos;d love to hear your unique
                ideas and thoughts. Join the WhatsApp group and let&apos;s talk!
              </div>
              <a
                className="wa-join-btn"
                href={WHATSAPP_GROUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={dismissWhatsappPopup}
              >
                Join WhatsApp Group
              </a>
              <button className="wa-later-btn" onClick={dismissWhatsappPopup}>Maybe later</button>
            </div>
          </div>
        )}
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
