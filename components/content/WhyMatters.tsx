const TRACK_COLORS: Record<string, string> = {
  sql:     '#06b6d4',
  azure:   '#0078d4',
  aws:     '#ff9900',
  gcp:     '#4285f4',
  python:  '#00e676',
  dsa:     '#7b61ff',
  aiml:    '#8b5cf6',
  devops:  '#f97316',
  default: '#00e676',
};

interface WhyMattersProps {
  track?: keyof typeof TRACK_COLORS;
  children: React.ReactNode;
}

export default function WhyMatters({ track = 'default', children }: WhyMattersProps) {
  const color = TRACK_COLORS[track] ?? TRACK_COLORS.default;

  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
        margin: '0 0 10px',
      }}>
        Before you start
      </p>

      <div style={{
        borderLeft: `3px solid ${color}`,
        background: 'var(--surface)',
        borderRadius: '0 10px 10px 0',
        padding: '14px 18px',
      }}>
        <p style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          margin: '0 0 6px',
        }}>
          Why this matters
        </p>
        <p style={{
          fontSize: 16,
          color: 'var(--text)',
          margin: 0,
          lineHeight: 1.65,
        }}>
          {children}
        </p>
      </div>
    </div>
  );
}
