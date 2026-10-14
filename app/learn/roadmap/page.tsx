import type { Metadata } from 'next'
import { ArrowDown, BookOpenCheck, Route, ShieldCheck } from 'lucide-react'
import CustomRoadmapGenerator from '@/components/roadmap/CustomRoadmapGenerator'
import RoadmapCatalog, { type RoadmapCatalogItem } from '@/components/roadmap/RoadmapCatalog'
import { ROLE_ROADMAPS } from '@/data/roadmaps/role-registry'

export const metadata: Metadata = {
  title: 'Learning Roadmaps',
  description: 'Explore structured, prerequisite-aware learning roadmaps for software, data, AI, cloud, and security roles.',
}

const AI_DATA_SLUGS = new Set([
  'data-engineer',
  'ml-engineer',
  'ai-engineer',
  'genai-developer',
  'data-scientist',
  'analytics-engineer',
])
const SOFTWARE_SLUGS = new Set([
  'fullstack',
  'frontend',
  'backend-dev',
  'python-developer',
  'java-developer',
  'mobile-app-developer',
])
const CLOUD_SECURITY_SLUGS = new Set([
  'devops',
  'site-reliability-engineer',
  'platform-engineer',
  'cloud-architect',
  'cybersecurity-analyst',
  'cloud-security-engineer',
])

const ROLE_EMOJI: Record<string, string> = {
  'data-engineer': '🛠️',
  'ml-engineer': '🧠',
  'ai-engineer': '🤖',
  'genai-developer': '✨',
  'data-scientist': '📊',
  'analytics-engineer': '📈',
  fullstack: '🧩',
  frontend: '🎨',
  'backend-dev': '⚙️',
  'python-developer': '🐍',
  'java-developer': '☕',
  'mobile-app-developer': '📱',
  devops: '♾️',
  'site-reliability-engineer': '📡',
  'platform-engineer': '🧱',
  'cloud-architect': '☁️',
  'software-architect': '🏛️',
  'database-administrator': '🗃️',
  'cybersecurity-analyst': '🛡️',
  'cloud-security-engineer': '🔐',
}

const roadmaps: RoadmapCatalogItem[] = Object.values(ROLE_ROADMAPS)
  .map(roadmap => ({
    slug: roadmap.slug,
    title: roadmap.title,
    emoji: ROLE_EMOJI[roadmap.slug] ?? '🧭',
    description: roadmap.description,
    level: roadmap.level ?? 'all levels',
    time: roadmap.estimatedTime ?? roadmap.totalTime ?? 'Self-paced',
    topics: roadmap.nodes.length,
    required: roadmap.nodes.filter(node => node.type === 'required').length,
    recommended: roadmap.nodes.filter(node => node.type === 'recommended').length,
    category: AI_DATA_SLUGS.has(roadmap.slug)
      ? 'AI & Data'
      : SOFTWARE_SLUGS.has(roadmap.slug)
        ? 'Software'
        : CLOUD_SECURITY_SLUGS.has(roadmap.slug)
          ? 'Cloud & Security'
          : 'Architecture',
  }))
  .sort((a, b) => a.title.localeCompare(b.title))

export default function RoadmapIndex() {
  return (
    <div className="roadmap-index">
      <div className="roadmap-index-inner">
        <section className="roadmap-index-hero" aria-labelledby="roadmap-index-title">
          <div className="roadmap-index-copy">
            <p className="roadmap-index-eyebrow">LEARN WITH A CLEAR DIRECTION</p>
            <h1 id="roadmap-index-title">
              Choose your path.
              <span>Build skills in order.</span>
            </h1>
            <p className="roadmap-index-description">
              Follow a structured route from foundations to practical, job-relevant skills.
              Your progress stays on this device—no account needed.
            </p>
            <div className="roadmap-index-actions">
              <a className="roadmap-index-primary" href="#roadmap-catalog">
                Explore roadmaps <ArrowDown size={16} aria-hidden="true" />
              </a>
              <a className="roadmap-index-secondary" href="#custom-roadmap">
                Create a custom guide
              </a>
            </div>
          </div>
          <div className="roadmap-index-highlights" aria-label="Roadmap benefits">
            <div>
              <span className="roadmap-index-highlight-icon"><Route size={18} aria-hidden="true" /></span>
              <span><strong>{roadmaps.length} learning paths</strong><small>Explore different tech roles</small></span>
            </div>
            <div>
              <span className="roadmap-index-highlight-icon"><BookOpenCheck size={18} aria-hidden="true" /></span>
              <span><strong>Learn in sequence</strong><small>Prerequisites guide what comes next</small></span>
            </div>
            <div>
              <span className="roadmap-index-highlight-icon"><ShieldCheck size={18} aria-hidden="true" /></span>
              <span><strong>Progress saved locally</strong><small>Pick up where you left off</small></span>
            </div>
          </div>
        </section>

        <section id="roadmap-catalog" className="roadmap-catalog-section" aria-labelledby="roadmap-catalog-title">
          <div className="roadmap-section-heading">
            <div>
              <p className="roadmap-index-eyebrow">FIND YOUR DIRECTION</p>
              <h2 id="roadmap-catalog-title">Explore role roadmaps</h2>
              <p>Compare paths by area, starting level, and the topics they cover.</p>
            </div>
            <span className="roadmap-catalog-count">{roadmaps.length} paths</span>
          </div>
          <RoadmapCatalog roadmaps={roadmaps} />
        </section>

        <section id="custom-roadmap" className="custom-roadmap-section" aria-labelledby="custom-roadmap-title">
          <div className="roadmap-section-heading">
            <div>
              <p className="roadmap-index-eyebrow">A PATH THAT FITS YOU</p>
              <h2 id="custom-roadmap-title">A learning guide made for your goal</h2>
              <p>Start with a topic, a career goal, or a skill you want to build. We’ll help you plan the next steps.</p>
            </div>
          </div>
          <CustomRoadmapGenerator />
        </section>
      </div>
    </div>
  )
}
