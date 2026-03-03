interface Props { items: string[] }

export function KeyTakeaways({ items }: Props) {
  return (
    <div className="my-8 rounded-xl p-6" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
      <h3 className="font-display font-bold text-base mb-4" style={{ color: 'var(--gold)' }}>🎯 Key Takeaways</h3>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 items-start text-sm leading-relaxed" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>
            <span className="flex-shrink-0 mt-0.5 font-mono text-xs font-bold" style={{ color: 'var(--accent)' }}>✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
