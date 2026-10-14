'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock3, Layers3, Search } from 'lucide-react'

export interface RoadmapCatalogItem {
  slug: string
  title: string
  emoji: string
  description: string
  level: string
  time: string
  topics: number
  required: number
  recommended: number
  category: string
}

const CATEGORIES = ['All paths', 'AI & Data', 'Software', 'Cloud & Security', 'Architecture']

function formatLevel(level: string) {
  return level.charAt(0).toUpperCase() + level.slice(1)
}

export default function RoadmapCatalog({ roadmaps }: { roadmaps: RoadmapCatalogItem[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All paths')

  const filteredRoadmaps = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return roadmaps.filter(roadmap => {
      const matchesCategory = category === 'All paths' || roadmap.category === category
      const searchable = `${roadmap.title} ${roadmap.description} ${roadmap.category} ${roadmap.level}`.toLowerCase()
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery))
    })
  }, [roadmaps, query, category])

  return (
    <>
      <div className="roadmap-catalog-controls">
        <label className="roadmap-search">
          <Search size={17} aria-hidden="true" />
          <span className="roadmap-sr-only">Search role roadmaps</span>
          <input
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search roles, skills, or areas"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
              Clear
            </button>
          )}
        </label>
        <div className="roadmap-category-filters" aria-label="Filter roadmaps by area">
          {CATEGORIES.map(item => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              className={category === item ? 'is-active' : ''}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="roadmap-results-count" aria-live="polite">
        Showing {filteredRoadmaps.length} of {roadmaps.length} roadmaps
      </p>

      {filteredRoadmaps.length > 0 ? (
        <div className="roadmap-catalog-grid">
          {filteredRoadmaps.map(roadmap => (
            <Link
              key={roadmap.slug}
              href={`/learn/roadmap/${roadmap.slug}`}
              className="roadmap-catalog-card"
            >
              <div className="roadmap-card-topline">
                <span className="roadmap-card-category">{roadmap.category}</span>
                <span className="roadmap-card-level">{formatLevel(roadmap.level)}</span>
              </div>
              <h3>
                <span className="roadmap-card-emoji" aria-hidden="true">{roadmap.emoji}</span>
                <span>{roadmap.title}</span>
              </h3>
              <p className="roadmap-card-description">{roadmap.description}</p>
              <div className="roadmap-card-stats">
                <span><Layers3 size={14} aria-hidden="true" /> {roadmap.topics} topics</span>
                <span><Clock3 size={14} aria-hidden="true" /> {roadmap.time}</span>
              </div>
              <div className="roadmap-card-bottom">
                <span>
                  {roadmap.required} required
                  {roadmap.recommended > 0 ? ` · ${roadmap.recommended} recommended` : ''}
                </span>
                <span className="roadmap-card-cta">View roadmap <ArrowRight size={15} aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="roadmap-empty-state">
          <h3>No roadmaps match that search</h3>
          <p>Try another role or choose a different area.</p>
          <button type="button" onClick={() => { setQuery(''); setCategory('All paths') }}>
            Clear filters
          </button>
        </div>
      )}
    </>
  )
}
