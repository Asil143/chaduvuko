'use client'
import { useState } from 'react'
import { ToolModal, TOOLS, Tool } from '@/components/ui/ToolModal'
import { SalaryWidget } from '@/components/ui/SalaryWidget'

const STACK_ITEMS = [
  { name: 'Apache Iceberg', color: '#00c2ff' },
  { name: 'Delta Lake', color: '#ff6b6b' },
  { name: 'Apache Spark', color: '#E25A1C' },
  { name: 'Apache Kafka', color: '#000000' },
  { name: 'Apache Airflow', color: '#017CEE' },
  { name: 'dbt', color: '#FF694A' },
  { name: 'DuckDB', color: '#FFC000' },
  { name: 'Snowflake', color: '#29B5E8' },
  { name: 'Terraform', color: '#7B42BC' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Kubernetes', color: '#326CE5' },
  { name: 'Apache Hudi', color: '#FF6B6B' },
]

export function HomeToolsSection() {
  const [activeTool, setActiveTool] = useState<Tool | null>(null)

  function openTool(name: string) {
    const tool = TOOLS.find(t => t.name === name)
    if (tool) setActiveTool(tool)
  }

  return (
    <>
      {/* Modern Data Stack */}
      <section className="py-20 px-4" style={{ background: 'var(--bg2)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">// The Tools Companies Are Hiring For</span>
            <h2 className="font-display font-extrabold mt-3 mb-3"
              style={{ fontSize: 'clamp(1.75rem,4vw,3rem)', color: 'var(--text)' }}>
              Modern Data Stack
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
              Click any tool to learn what it does, why companies use it, and how it fits into real pipelines.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {STACK_ITEMS.map(item => {
              const tool = TOOLS.find(t => t.name === item.name)
              return (
                <button key={item.name} onClick={() => openTool(item.name)}
                  className="flex items-center gap-3 p-4 rounded-xl text-left group transition-all hover:scale-105"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.background = `${item.color}08` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)' }}>
                  <span className="text-2xl">{tool?.icon || '⚙️'}</span>
                  <div className="min-w-0">
                    <div className="font-display font-semibold text-sm truncate" style={{ color: 'var(--text)' }}>{item.name}</div>
                    <div className="text-xs font-mono mt-0.5" style={{ color: item.color }}>{tool?.category || 'Tool'}</div>
                  </div>
                </button>
              )
            })}
          </div>
          <p className="text-center text-xs font-mono mt-6" style={{ color: 'var(--muted)' }}>
            Click any tool above to learn: what it is, why companies use it, real example, open source or not
          </p>
        </div>
      </section>

      {/* Salary Widget */}
      <section className="py-20 px-4" style={{ background: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-tag">// Career</span>
            <h2 className="font-display font-extrabold mt-3 mb-3"
              style={{ fontSize: 'clamp(1.75rem,4vw,3rem)', color: 'var(--text)' }}>
              Data Engineer Salary by Skills
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
              See how much more each cloud track adds to your salary. Multi-cloud engineers earn 35%+ more than single-cloud.
            </p>
          </div>
          <SalaryWidget />
        </div>
      </section>

      {/* Tool modal */}
      <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />
    </>
  )
}
