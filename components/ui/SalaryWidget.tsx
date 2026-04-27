'use client'
import { useState } from 'react'
import { TrendingUp } from 'lucide-react'

// ─── Salary data: role → country → { min, max, median, currency, unit }
// Sources: LinkedIn Salary Insights, Glassdoor, Levels.fyi, BLS OES 2025,
//          HESA / ONS (UK), SEEK (AU), Randstad / Statistics Canada, IITK Placements
// Last updated: April 2026
// All figures in local currency. Non-India = K/year, India = LPA.

type SalaryRange = { min: number; max: number; median: number }

type CountryData = {
  currency: string
  unit: string        // e.g. "K/yr" or "LPA"
  salaries: SalaryRange
}

const ROLES = [
  'Data Engineer',
  'Analytics Engineer',
  'Data Scientist',
  'ML Engineer',
  'GenAI / LLM Engineer',
  'Backend Engineer',
  'Frontend Engineer',
  'Full-Stack Engineer',
  'DevOps / Platform Engineer',
  'Cloud Architect',
] as const

type Role = typeof ROLES[number]

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'Netherlands',
  'Singapore',
  'UAE',
  'Brazil',
  'India',
] as const

type Country = typeof COUNTRIES[number]

// currency symbol lookup
const SYMBOL: Record<Country, string> = {
  'United States': '$',
  'United Kingdom': '£',
  'Canada':         'CA$',
  'Australia':      'AU$',
  'Germany':        '€',
  'Netherlands':    '€',
  'Singapore':      'S$',
  'UAE':            'AED',
  'Brazil':         'R$',
  'India':          '₹',
}

const UNIT: Record<Country, string> = {
  'United States': 'K/yr',
  'United Kingdom': 'K/yr',
  'Canada':         'K/yr',
  'Australia':      'K/yr',
  'Germany':        'K/yr',
  'Netherlands':    'K/yr',
  'Singapore':      'K/yr',
  'UAE':            'K/yr',
  'Brazil':         'K/yr',
  'India':          'LPA',
}

// [min, median, max] — US/UK/CA/AU/DE/NL in K local currency; SG/UAE/BR/IN in K local currency or LPA
const RAW: Record<Role, Record<Country, [number, number, number]>> = {
  'Data Engineer': {
    'United States':  [90,  130, 175],
    'United Kingdom': [50,   75, 100],
    'Canada':         [75,  105, 140],
    'Australia':      [95,  125, 160],
    'Germany':        [55,   75,  95],
    'Netherlands':    [55,   75,  95],
    'Singapore':      [70,   95, 125],
    'UAE':            [180, 250, 330],
    'Brazil':         [80,  130, 200],
    'India':          [8,    16,  38],
  },
  'Analytics Engineer': {
    'United States':  [85,  120, 160],
    'United Kingdom': [45,   68,  92],
    'Canada':         [70,   98, 130],
    'Australia':      [90,  118, 150],
    'Germany':        [50,   68,  88],
    'Netherlands':    [50,   68,  90],
    'Singapore':      [65,   88, 115],
    'UAE':            [160, 220, 300],
    'Brazil':         [70,  115, 175],
    'India':          [7,    13,  28],
  },
  'Data Scientist': {
    'United States':  [95,  140, 190],
    'United Kingdom': [52,   80, 108],
    'Canada':         [78,  112, 148],
    'Australia':      [95,  128, 165],
    'Germany':        [58,   80, 105],
    'Netherlands':    [58,   80, 105],
    'Singapore':      [72,  100, 135],
    'UAE':            [190, 260, 345],
    'Brazil':         [85,  140, 210],
    'India':          [8,    18,  42],
  },
  'ML Engineer': {
    'United States':  [105, 155, 215],
    'United Kingdom': [58,   88, 120],
    'Canada':         [85,  122, 162],
    'Australia':      [100, 135, 175],
    'Germany':        [62,   88, 115],
    'Netherlands':    [62,   88, 115],
    'Singapore':      [78,  110, 148],
    'UAE':            [200, 285, 380],
    'Brazil':         [90,  150, 230],
    'India':          [10,   22,  52],
  },
  'GenAI / LLM Engineer': {
    'United States':  [120, 175, 250],
    'United Kingdom': [65,  100, 140],
    'Canada':         [95,  138, 185],
    'Australia':      [110, 150, 195],
    'Germany':        [70,  100, 132],
    'Netherlands':    [70,  100, 132],
    'Singapore':      [88,  125, 168],
    'UAE':            [220, 310, 420],
    'Brazil':         [100, 165, 255],
    'India':          [12,   28,  65],
  },
  'Backend Engineer': {
    'United States':  [85,  130, 185],
    'United Kingdom': [45,   72,  100],
    'Canada':         [72,  105, 142],
    'Australia':      [85,  118, 155],
    'Germany':        [52,   72,  95],
    'Netherlands':    [52,   75,  98],
    'Singapore':      [65,   92, 125],
    'UAE':            [170, 240, 320],
    'Brazil':         [75,  125, 190],
    'India':          [7,    14,  35],
  },
  'Frontend Engineer': {
    'United States':  [80,  120, 170],
    'United Kingdom': [42,   65,  92],
    'Canada':         [68,   98, 135],
    'Australia':      [80,  112, 148],
    'Germany':        [48,   65,  88],
    'Netherlands':    [48,   68,  90],
    'Singapore':      [60,   85, 115],
    'UAE':            [160, 225, 300],
    'Brazil':         [68,  112, 172],
    'India':          [6,    12,  30],
  },
  'Full-Stack Engineer': {
    'United States':  [82,  125, 175],
    'United Kingdom': [44,   68,  96],
    'Canada':         [70,  100, 138],
    'Australia':      [82,  115, 152],
    'Germany':        [50,   68,  90],
    'Netherlands':    [50,   70,  92],
    'Singapore':      [62,   88, 120],
    'UAE':            [165, 232, 310],
    'Brazil':         [72,  118, 182],
    'India':          [6,    13,  32],
  },
  'DevOps / Platform Engineer': {
    'United States':  [90,  135, 185],
    'United Kingdom': [50,   76, 105],
    'Canada':         [75,  108, 145],
    'Australia':      [90,  122, 160],
    'Germany':        [55,   76,  98],
    'Netherlands':    [55,   78, 100],
    'Singapore':      [68,   96, 130],
    'UAE':            [180, 255, 340],
    'Brazil':         [80,  132, 200],
    'India':          [7,    15,  38],
  },
  'Cloud Architect': {
    'United States':  [120, 170, 235],
    'United Kingdom': [65,   98, 135],
    'Canada':         [95,  135, 178],
    'Australia':      [110, 148, 192],
    'Germany':        [70,   98, 130],
    'Netherlands':    [70,  100, 132],
    'Singapore':      [88,  122, 165],
    'UAE':            [220, 310, 415],
    'Brazil':         [95,  158, 242],
    'India':          [12,   24,  58],
  },
}

export function SalaryWidget() {
  const [role, setRole] = useState<Role>('Data Engineer')
  const [country, setCountry] = useState<Country>('United States')

  const [min, median, max] = RAW[role][country]
  const symbol = SYMBOL[country]
  const unit = UNIT[country]

  // bar is relative to max salary for this role × country pairing
  const allMedians = COUNTRIES.map(c => RAW[role][c][1])
  const globalMax = Math.max(...allMedians)
  const barPct = Math.round((median / globalMax) * 100)

  return (
    <div className="rounded-2xl p-6" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp size={16} style={{ color: 'var(--accent)' }} />
        <span className="font-display font-bold text-base" style={{ color: 'var(--text)' }}>
          Tech Salary Explorer
        </span>
        <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}>
          2025–26
        </span>
      </div>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div>
          <label className="block text-xs font-mono mb-1.5" style={{ color: 'var(--muted)' }}>Role</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value as Role)}
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{ background: 'var(--bg)', border: '1px solid var(--border2)', color: 'var(--text)' }}
          >
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono mb-1.5" style={{ color: 'var(--muted)' }}>Country</label>
          <select
            value={country}
            onChange={e => setCountry(e.target.value as Country)}
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{ background: 'var(--bg)', border: '1px solid var(--border2)', color: 'var(--text)' }}
          >
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Median callout */}
      <div className="flex items-end gap-4 mb-3">
        <div>
          <div className="text-xs font-mono mb-1" style={{ color: 'var(--muted)' }}>Median</div>
          <div className="font-display font-black" style={{ fontSize: 'clamp(2rem,5vw,3rem)', color: 'var(--accent)', lineHeight: 1 }}>
            {symbol}{median}{unit === 'LPA' ? ' LPA' : 'K'}
          </div>
        </div>
        <div className="text-sm mb-2" style={{ color: 'var(--muted)' }}>
          {symbol}{min}–{symbol}{max}{unit === 'LPA' ? ' LPA' : 'K'}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2.5 rounded-full overflow-hidden mb-5" style={{ background: 'var(--bg3)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${barPct}%`, background: 'linear-gradient(90deg, var(--accent), #7b61ff)' }}
        />
      </div>

      {/* Country comparison grid for this role */}
      <div className="mb-1">
        <div className="text-xs font-mono mb-2" style={{ color: 'var(--muted)' }}>Compare across countries</div>
        <div className="grid grid-cols-2 gap-1.5">
          {COUNTRIES.map(c => {
            const [, med] = RAW[role][c]
            const sym = SYMBOL[c]
            const u = UNIT[c]
            const active = c === country
            return (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-left transition-all"
                style={{
                  background: active ? 'var(--accent-glow)' : 'var(--bg)',
                  border: `1px solid ${active ? 'rgba(0,120,212,0.3)' : 'var(--border)'}`,
                  color: active ? 'var(--accent)' : 'var(--text2)',
                }}
              >
                <span className="font-mono truncate">{c}</span>
                <span className="font-bold ml-2 shrink-0">{sym}{med}{u === 'LPA' ? 'L' : 'K'}</span>
              </button>
            )
          })}
        </div>
      </div>

      <p className="text-xs mt-4 text-center" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
        Sourced from LinkedIn, Glassdoor, Levels.fyi, BLS OES &amp; regional surveys · April 2026.
        Figures in local currency (K/yr or LPA). Actual salaries vary by experience &amp; company.
      </p>
    </div>
  )
}
