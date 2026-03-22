'use client'

import { useState, useRef, useEffect } from 'react'

const SUGGESTIONS = [
  'I want to become a Data Engineer — where do I start?',
  'What salary can I expect at Flipkart as a junior DE?',
  'My ADF pipeline failed — PipelineRunFailed error, how do I debug?',
  'I know Python basics. What should I learn next?',
]

function BotIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="6" width="14" height="10" rx="3" fill="#00e676" opacity="0.15" stroke="#00e676" strokeWidth="1.2"/>
      <circle cx="7.5" cy="11" r="1.5" fill="#00e676"/>
      <circle cx="12.5" cy="11" r="1.5" fill="#00e676"/>
      <rect x="8" y="3" width="4" height="3" rx="1" fill="#00e676" opacity="0.7"/>
    </svg>
  )
}

type Message = { role: 'user' | 'assistant'; content: string }

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey! I'm your Chaduvuko learning guide 👋\n\nTell me your goal — I'll point you to exactly what to learn and which track to start with.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasNew, setHasNew] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (open) {
      setHasNew(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage(text?: string) {
    const userMsg = text || input.trim()
    if (!userMsg || loading) return
    setInput('')
    if (inputRef.current) inputRef.current.style.height = 'auto'

    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Connection error. Please try again.' }])
    }
    setLoading(false)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <style>{`
        @keyframes chad-bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        @keyframes chad-pop { 0%{transform:scale(0.88) translateY(10px);opacity:0} 100%{transform:scale(1) translateY(0);opacity:1} }
        @keyframes chad-pulse { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(1.65);opacity:0} }
        .chad-bubble { transition: transform 0.18s ease; }
        .chad-bubble:hover { transform: scale(1.07); }
        .chad-input::placeholder { color: #555; }
        .chad-input:focus { outline: none; border-color: rgba(0,230,118,0.4) !important; }
        .chad-send:hover:not(:disabled) { background: #00ff87 !important; }
        .chad-sugg:hover { background: rgba(0,230,118,0.12) !important; border-color: rgba(0,230,118,0.35) !important; }
        .chad-window { animation: chad-pop 0.2s ease-out; }
        .chad-msgs::-webkit-scrollbar { width: 4px; }
        .chad-msgs::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 4px; }
      `}</style>

      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
        {hasNew && !open && (
          <div style={{
            position: 'absolute', inset: -4, borderRadius: '50%',
            border: '2px solid #00e676',
            animation: 'chad-pulse 1.8s ease-out infinite',
            pointerEvents: 'none',
          }} />
        )}

        <button
          className="chad-bubble"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close chat' : 'Open learning guide'}
          style={{
            width: 54, height: 54, borderRadius: '50%',
            background: open ? '#0f0f0f' : '#00e676',
            border: open ? '1px solid rgba(0,230,118,0.3)' : 'none',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 24px rgba(0,230,118,0.22)',
          }}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 3L15 15M15 3L3 15" stroke="#00e676" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <rect x="3" y="8" width="20" height="14" rx="4" fill="#080808"/>
              <circle cx="9" cy="15" r="2" fill="#080808"/>
              <circle cx="17" cy="15" r="2" fill="#080808"/>
              <rect x="11" y="3" width="4" height="6" rx="1.5" fill="#080808" opacity="0.7"/>
            </svg>
          )}
        </button>

        {open && (
          <div
            className="chad-window"
            style={{
              position: 'absolute', bottom: 66, right: 0,
              width: 'min(360px, calc(100vw - 32px))',
              borderRadius: 16,
              background: '#0f0f0f',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.75)',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
              maxHeight: 'min(560px, 80vh)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '14px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: '#161616',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: '#0a1a0e',
                border: '1px solid rgba(0,230,118,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <BotIcon />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#efefef', letterSpacing: '-0.2px' }}>
                  Chaduvuko Guide
                </div>
                <div style={{ fontSize: 11, color: '#00e676', display: 'flex', alignItems: 'center', gap: 4, marginTop: 1 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e676' }} />
                  Online · Powered by Claude
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: 'transparent', border: 'none',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2L12 12M12 2L2 12" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              className="chad-msgs"
              style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 8px', scrollbarWidth: 'thin', scrollbarColor: '#2a2a2a transparent' }}
            >
              {messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end', marginBottom: 10 }}>
                  {m.role === 'assistant' && (
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0a1a0e', border: '1px solid rgba(0,230,118,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <BotIcon />
                    </div>
                  )}
                  <div style={{
                    maxWidth: '80%',
                    background: m.role === 'user' ? '#00e676' : '#161616',
                    color: m.role === 'user' ? '#080808' : '#efefef',
                    borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '4px 14px 14px 14px',
                    padding: '10px 14px',
                    fontSize: 13,
                    lineHeight: 1.65,
                    border: m.role === 'assistant' ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0a1a0e', border: '1px solid rgba(0,230,118,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <BotIcon />
                  </div>
                  <div style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '4px 14px 14px 14px', padding: '12px 16px', display: 'flex', gap: 5, alignItems: 'center' }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e676', animation: `chad-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div style={{ padding: '0 14px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    className="chad-sugg"
                    onClick={() => sendMessage(s)}
                    style={{
                      textAlign: 'left', background: 'rgba(0,230,118,0.06)',
                      border: '1px solid rgba(0,230,118,0.15)',
                      borderRadius: 8, padding: '7px 11px',
                      fontSize: 12, color: '#efefef', cursor: 'pointer',
                      transition: 'all 0.15s', lineHeight: 1.4, fontFamily: 'inherit',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: '10px 14px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <textarea
                ref={inputRef}
                className="chad-input"
                value={input}
                onChange={e => {
                  setInput(e.target.value)
                  e.target.style.height = 'auto'
                  e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px'
                }}
                onKeyDown={handleKey}
                placeholder="Ask anything about learning or careers..."
                rows={1}
                style={{
                  flex: 1, background: '#1c1c1c',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, padding: '9px 12px',
                  color: '#efefef', fontSize: 13, resize: 'none',
                  fontFamily: 'inherit', lineHeight: 1.5,
                  transition: 'border-color 0.15s', overflowY: 'hidden',
                  maxHeight: 100,
                }}
              />
              <button
                className="chad-send"
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: input.trim() && !loading ? '#00e676' : '#333',
                  border: 'none',
                  cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'all 0.15s',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8L14 2L8 14L7 9L2 8Z" fill={input.trim() && !loading ? '#080808' : '#666'} strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
