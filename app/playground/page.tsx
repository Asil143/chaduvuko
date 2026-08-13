'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { drawCoderCard, type CoderCardData } from '@/lib/coderCard';

const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/KnPtWB3yzR3HM8CcQlHswD?s=cl&p=i&ilr=0';
const WHATSAPP_POPUP_SESSION_KEY = 'chaduvuko_whatsapp_popup_shown';

const PG_KEY_RUNS = 'chaduvuko_pg_runs';
const PG_KEY_LANGUAGES = 'chaduvuko_pg_languages';
const PG_KEY_STREAK = 'chaduvuko_pg_streak';
const PG_KEY_BEST_STREAK = 'chaduvuko_pg_best_streak';
const PG_KEY_LAST_VISIT = 'chaduvuko_pg_last_visit';
const PG_KEY_FIRST_RUN = 'chaduvuko_pg_first_run_date';
const PG_KEY_NAME = 'chaduvuko_pg_name';
const PG_KEY_AI_USES = 'chaduvuko_pg_ai_uses';

const PG_LEVELS: { min: number; label: string; icon: string }[] = [
  { min: 0,   label: 'Rookie',  icon: '🌱' },
  { min: 5,   label: 'Builder', icon: '🔧' },
  { min: 20,  label: 'Grinder', icon: '⚙️' },
  { min: 50,  label: 'Machine', icon: '🤖' },
  { min: 100, label: 'Legend',  icon: '🏆' },
];

function getPgLevel(runs: number) {
  return [...PG_LEVELS].reverse().find(l => runs >= l.min) ?? PG_LEVELS[0];
}

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
  { label: 'C#',         value: 'csharp',     pistonRuntime: 'csharp',      pistonVersion: '6.6.0.161' },
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
  csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
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

  const [mounted, setMounted] = useState(false);
  const [pgRuns, setPgRuns] = useState(0);
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardNameInput, setCardNameInput] = useState('');
  const [hasSavedName, setHasSavedName] = useState(false);
  const cardCanvasRef = useRef<HTMLCanvasElement>(null);

  const [mentorReply, setMentorReply] = useState('');
  const [mentorLoading, setMentorLoading] = useState(false);
  const [mentorError, setMentorError] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem(WHATSAPP_POPUP_SESSION_KEY)) return;
    setShowWhatsappPopup(true);
    sessionStorage.setItem(WHATSAPP_POPUP_SESSION_KEY, '1');
  }, []);

  useEffect(() => {
    setMounted(true);
    try {
      setPgRuns(parseInt(localStorage.getItem(PG_KEY_RUNS) || '0'));
    } catch {}
  }, []);

  const dismissWhatsappPopup = useCallback(() => setShowWhatsappPopup(false), []);

  const recordSuccessfulRun = useCallback((language: string) => {
    try {
      const runs = parseInt(localStorage.getItem(PG_KEY_RUNS) || '0') + 1;
      localStorage.setItem(PG_KEY_RUNS, String(runs));
      setPgRuns(runs);

      const languages: string[] = JSON.parse(localStorage.getItem(PG_KEY_LANGUAGES) || '[]');
      if (!languages.includes(language)) {
        languages.push(language);
        localStorage.setItem(PG_KEY_LANGUAGES, JSON.stringify(languages));
      }

      if (!localStorage.getItem(PG_KEY_FIRST_RUN)) {
        localStorage.setItem(PG_KEY_FIRST_RUN, new Date().toISOString());
      }

      const lastVisit = localStorage.getItem(PG_KEY_LAST_VISIT);
      const savedStreak = parseInt(localStorage.getItem(PG_KEY_STREAK) || '0');
      const today = new Date().toDateString();
      let newStreak = savedStreak;
      if (lastVisit === today) {
        newStreak = savedStreak || 1;
      } else if (lastVisit === new Date(Date.now() - 86400000).toDateString()) {
        newStreak = savedStreak + 1;
      } else {
        newStreak = 1;
      }
      localStorage.setItem(PG_KEY_STREAK, String(newStreak));
      localStorage.setItem(PG_KEY_LAST_VISIT, today);

      const bestStreak = Math.max(newStreak, parseInt(localStorage.getItem(PG_KEY_BEST_STREAK) || '0'));
      localStorage.setItem(PG_KEY_BEST_STREAK, String(bestStreak));
    } catch {}
  }, []);

  const buildCardData = useCallback((name: string): CoderCardData => {
    let runs = 0, bestStreak = 0, languages: string[] = [], firstRun = '';
    try {
      runs = parseInt(localStorage.getItem(PG_KEY_RUNS) || '0');
      bestStreak = parseInt(localStorage.getItem(PG_KEY_BEST_STREAK) || '0');
      languages = JSON.parse(localStorage.getItem(PG_KEY_LANGUAGES) || '[]');
      firstRun = localStorage.getItem(PG_KEY_FIRST_RUN) || '';
    } catch {}
    const codingSince = firstRun
      ? new Date(firstRun).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return {
      name,
      level: getPgLevel(runs),
      runs,
      bestStreak,
      languages,
      codingSince,
    };
  }, []);

  const renderCard = useCallback((name: string) => {
    const canvas = cardCanvasRef.current;
    if (!canvas) return;
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawCoderCard(ctx, buildCardData(name));
  }, [buildCardData]);

  const openCardModal = useCallback(() => {
    setShowCardModal(true);
    let savedName = '';
    try { savedName = localStorage.getItem(PG_KEY_NAME) || ''; } catch {}
    if (savedName) {
      setCardNameInput(savedName);
      setHasSavedName(true);
      requestAnimationFrame(() => renderCard(savedName));
    } else {
      setHasSavedName(false);
    }
  }, [renderCard]);

  const handleGenerateCard = useCallback(() => {
    const name = cardNameInput.trim().slice(0, 24);
    if (!name) return;
    try { localStorage.setItem(PG_KEY_NAME, name); } catch {}
    setHasSavedName(true);
    requestAnimationFrame(() => renderCard(name));
  }, [cardNameInput, renderCard]);

  const handleDownloadCard = useCallback(() => {
    const canvas = cardCanvasRef.current;
    if (!canvas) return;
    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'chaduvuko-coder-card.png';
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }, []);

  const handleShareCard = useCallback(() => {
    const canvas = cardCanvasRef.current;
    if (!canvas) return;
    canvas.toBlob(async blob => {
      if (!blob) return;
      const file = new File([blob], 'chaduvuko-coder-card.png', { type: 'image/png' });
      try {
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'My Chaduvuko Coder Card',
            text: 'Check out my coding stats on Chaduvuko!',
          });
        }
      } catch {}
    }, 'image/png');
  }, []);

  const handleAskMentor = useCallback(async () => {
    setMentorLoading(true);
    setMentorError('');
    setMentorReply('');
    try {
      const res = await fetch('/api/playground-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language: selectedLang.value,
          stdout: output,
          stderr,
        }),
      });
      const data = await res.json();
      const reply: string = data.reply || 'No feedback returned.';
      setMentorReply(reply);
      if (!reply.startsWith('DEBUG')) {
        try {
          const uses = parseInt(localStorage.getItem(PG_KEY_AI_USES) || '0') + 1;
          localStorage.setItem(PG_KEY_AI_USES, String(uses));
        } catch {}
      }
    } catch (err: unknown) {
      setMentorError(err instanceof Error ? err.message : 'Could not reach the AI mentor.');
    } finally {
      setMentorLoading(false);
    }
  }, [code, selectedLang, output, stderr]);

  const handleLangChange = useCallback((value: string) => {
    const lang = LANGUAGES.find(l => l.value === value) ?? LANGUAGES[0];
    setSelectedLang(lang);
    setCode(STARTER_CODE[value] ?? '');
    setOutput('');
    setStderr('');
    setRan(false);
    setMentorReply('');
    setMentorError('');
  }, []);

  const handleRun = useCallback(async () => {
    setLoading(true);
    setOutput('');
    setStderr('');
    setRan(false);
    setMentorReply('');
    setMentorError('');

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
      csharp:     51,
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

      if (result.stdout && !result.stderr && !result.compile_output) {
        recordSuccessfulRun(selectedLang.value);
      }
    } catch (err: unknown) {
      setStderr(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
      setRan(true);
    }
  }, [code, selectedLang, recordSuccessfulRun]);

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
          justify-content: space-between;
          gap: 8px;
        }
        .pg-output-label {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mentor-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--muted);
          padding: 4px 10px;
          border-radius: 5px;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: none;
          letter-spacing: normal;
          cursor: pointer;
          font-family: inherit;
          transition: border-color 0.15s, color 0.15s;
        }
        .mentor-btn:not(:disabled):hover { border-color: var(--green); color: var(--text); }
        .mentor-btn:disabled { opacity: 0.5; cursor: not-allowed; }
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
        .card-trigger-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text);
          padding: 7px 14px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: border-color 0.15s;
        }
        .card-trigger-btn:hover { border-color: var(--green); }
        .card-overlay {
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
        .card-modal {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          max-width: 460px;
          width: 100%;
          padding: 28px 24px 24px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          animation: wa-pop-in 0.25s ease;
        }
        .card-name-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 10px;
          font-family: var(--font-display, sans-serif);
        }
        .card-name-body {
          font-size: 0.85rem;
          color: var(--muted);
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .card-name-input {
          width: 100%;
          background: var(--bg);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 0.9rem;
          margin-bottom: 14px;
          font-family: inherit;
          outline: none;
        }
        .card-name-input:focus { border-color: var(--green); }
        .card-generate-btn {
          width: 100%;
          background: var(--green);
          color: #000;
          border: none;
          padding: 11px 18px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
        }
        .card-generate-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .card-canvas-wrap {
          width: 100%;
          aspect-ratio: 1 / 1;
          margin-bottom: 16px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .card-canvas-wrap canvas { width: 100%; height: 100%; display: block; }
        .card-actions {
          display: flex;
          gap: 10px;
        }
        .card-action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text);
        }
        .card-action-btn.primary {
          background: var(--green);
          border-color: var(--green);
          color: #000;
        }
        .card-action-btn:hover { opacity: 0.88; }
        .mentor-block {
          margin-top: 12px;
          padding-left: 12px;
          border-left: 2px solid var(--green);
          font-family: var(--font-display, sans-serif);
          font-size: 0.85rem;
          line-height: 1.6;
        }
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
        {showCardModal && (
          <div className="card-overlay" onClick={() => setShowCardModal(false)}>
            <div className="card-modal" onClick={e => e.stopPropagation()}>
              <button className="wa-close" onClick={() => setShowCardModal(false)} aria-label="Close">✕</button>
              {!hasSavedName ? (
                <>
                  <div className="card-name-title">🎴 Generate Your Coder Card</div>
                  <div className="card-name-body">
                    What should we call you? This name appears on your shareable card.
                  </div>
                  <input
                    className="card-name-input"
                    type="text"
                    placeholder="Your name or handle"
                    value={cardNameInput}
                    maxLength={24}
                    onChange={e => setCardNameInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleGenerateCard()}
                  />
                  <button
                    className="card-generate-btn"
                    onClick={handleGenerateCard}
                    disabled={!cardNameInput.trim()}
                  >
                    Generate Card
                  </button>
                </>
              ) : (
                <>
                  <div className="card-canvas-wrap">
                    <canvas ref={cardCanvasRef} />
                  </div>
                  <div className="card-actions">
                    <button className="card-action-btn primary" onClick={handleDownloadCard}>
                      ⬇ Download PNG
                    </button>
                    {mounted && typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                      <button className="card-action-btn" onClick={handleShareCard}>
                        ↗ Share
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        <header className="pg-header">
          <span className="pg-title">Code <span>Playground</span> — Chaduvuko</span>
          <div className="pg-controls">
            {mounted && pgRuns > 0 && (
              <button className="card-trigger-btn" onClick={openCardModal}>
                🎴 My Card
              </button>
            )}
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
              <span className="pg-output-label">
                {ran && !stderr && <span className="dot-run" />}
                {ran && stderr && <span className="dot-err" />}
                Output
              </span>
              {ran && !loading && (
                <button className="mentor-btn" onClick={handleAskMentor} disabled={mentorLoading}>
                  {mentorLoading ? <span className="spinner" /> : '🤖'}
                  {mentorLoading ? 'Thinking…' : 'AI Mentor'}
                </button>
              )}
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
              {mentorReply && (
                <div className="mentor-block">
                  {mentorReply.startsWith('DEBUG')
                    ? <span className="pg-stderr">{mentorReply}</span>
                    : <span className="pg-stdout">🤖 {mentorReply}</span>}
                </div>
              )}
              {mentorError && (
                <div className="mentor-block">
                  <span className="pg-stderr">{mentorError}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
