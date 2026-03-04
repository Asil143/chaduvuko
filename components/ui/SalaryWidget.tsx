'use client'
import { useState } from 'react'
import { DollarSign, TrendingUp } from 'lucide-react'

const data: Record<string, Record<string, { min: number; max: number; median: number }>> = {
  'United States': {
    'Azure only':          { min: 85,  max: 130, median: 105 },
    'Azure + AWS':         { min: 100, max: 155, median: 125 },
    'Azure + AWS + GCP':   { min: 115, max: 175, median: 142 },
    'Spark + Iceberg + dbt': { min: 120, max: 180, median: 150 },
  },
  'India': {
    'Azure only':          { min: 8,   max: 18,  median: 13 },
    'Azure + AWS':         { min: 12,  max: 25,  median: 18 },
    'Azure + AWS + GCP':   { min: 15,  max: 32,  median: 23 },
    'Spark + Iceberg + dbt': { min: 18, max: 40, median: 28 },
  },
  'United Kingdom': {
    'Azure only':          { min: 55,  max: 85,  median: 68 },
    'Azure + AWS':         { min: 65,  max: 100, median: 80 },
    'Azure + AWS + GCP':   { min: 75,  max: 115, median: 92 },
    'Spark + Iceberg + dbt': { min: 80, max: 125, median: 100 },
  },
  'Canada': {
    'Azure only':          { min: 70,  max: 110, median: 88 },
    'Azure + AWS':         { min: 85,  max: 130, median: 105 },
    'Azure + AWS + GCP':   { min: 95,  max: 145, median: 118 },
    'Spark + Iceberg + dbt': { min: 100, max: 155, median: 126 },
  },
  'Australia': {
    'Azure only':          { min: 90,  max: 130, median: 108 },
    'Azure + AWS':         { min: 105, max: 150, median: 126 },
    'Azure + AWS + GCP':   { min: 115, max: 165, median: 138 },
    'Spark + Iceberg + dbt': { min: 120, max: 175, median: 146 },
  },
}

const locations = Object.keys(data)
const skills = Object.keys(data['United States'])
const currencySymbol: Record<string, string> = {
  'United States': '$', 'India': '₹', 'United Kingdom': '£', 'Canada': 'CA$', 'Australia': 'AU$',
}

export function SalaryWidget() {
  const [location, setLocation] = useState('United States')
  const [skill, setSkill] = useState('Azure + AWS')

  const range = data[location][skill]
  const symbol = currencySymbol[location]
  const unit = location === 'India' ? 'LPA' : 'K/year'
  const maxSalary = Math.max(...skills.map(s => data[location][s].max))
  const barPct = Math.round((range.median / maxSalary) * 100)

  return (
    <div className="rounded-2xl p-6" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={16} style={{ color: 'var(--accent)' }} />
        <span className="font-display font-bold text-base" style={{ color: 'var(--text)' }}>
          Data Engineer Salary Estimator
        </span>
        <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}>
          2025
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div>
          <label className="block text-xs font-mono mb-1.5" style={{ color: 'var(--muted)' }}>Location</label>
          <select value={location} onChange={e => setLocation(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{ background: 'var(--bg)', border: '1px solid var(--border2)', color: 'var(--text)' }}>
            {locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono mb-1.5" style={{ color: 'var(--muted)' }}>Your Skills</label>
          <select value={skill} onChange={e => setSkill(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{ background: 'var(--bg)', border: '1px solid var(--border2)', color: 'var(--text)' }}>
            {skills.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="flex items-end gap-4 mb-4">
        <div>
          <div className="text-xs font-mono mb-1" style={{ color: 'var(--muted)' }}>Median</div>
          <div className="font-display font-black" style={{ fontSize: 'clamp(2rem,5vw,3rem)', color: 'var(--accent)', lineHeight: 1 }}>
            {symbol}{range.median}{unit === 'LPA' ? ' LPA' : 'K'}
          </div>
        </div>
        <div className="text-sm mb-2" style={{ color: 'var(--muted)' }}>
          Range: {symbol}{range.min}–{symbol}{range.max}{unit === 'LPA' ? ' LPA' : 'K'}
        </div>
      </div>

      <div className="h-3 rounded-full overflow-hidden mb-4" style={{ background: 'var(--bg3)' }}>
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${barPct}%`, background: 'linear-gradient(90deg, var(--accent), #7b61ff)' }} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {skills.map(s => {
          const r = data[location][s]
          const active = s === skill
          return (
            <button key={s} onClick={() => setSkill(s)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-left transition-all"
              style={{
                background: active ? 'var(--accent-glow)' : 'var(--bg)',
                border: `1px solid ${active ? 'rgba(0,120,212,0.3)' : 'var(--border)'}`,
                color: active ? 'var(--accent)' : 'var(--text2)',
              }}>
              <span className="font-mono">{s}</span>
              <span className="font-bold ml-2">{symbol}{r.median}{unit === 'LPA' ? 'L' : 'K'}</span>
            </button>
          )
        })}
      </div>

      <p className="text-xs mt-4 text-center" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
        Estimates based on 2025 job market data. Actual salaries vary by experience, company size, and negotiation.
      </p>
    </div>
  )
}
