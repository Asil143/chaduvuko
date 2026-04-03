'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}>Something went wrong loading this module.</p>
      <button
        onClick={reset}
        style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#06b6d4', background: 'transparent', border: '1px solid #06b6d4', borderRadius: 6, padding: '6px 16px', cursor: 'pointer' }}
      >
        Try again
      </button>
    </main>
  );
}
