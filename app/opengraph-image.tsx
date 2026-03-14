import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Asil — Free Data Engineering Learning'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0d1117',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}>

        {/* Background grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,120,212,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,120,212,0.07) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          display: 'flex',
        }} />

        {/* Glow */}
        <div style={{
          position: 'absolute', top: '-100px', left: '-100px',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(0,120,212,0.15) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{
            width: '12px', height: '12px', borderRadius: '50%',
            background: '#0078d4',
            display: 'flex',
          }} />
          <div style={{ fontSize: '36px', fontWeight: 900, color: '#f0f6ff', display: 'flex' }}>
            As<span style={{ color: '#0078d4' }}>il</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: '64px', fontWeight: 900, color: '#f0f6ff',
          lineHeight: 1.1, marginBottom: '24px', display: 'flex',
          flexDirection: 'column',
        }}>
          <span>Free Data Engineering</span>
          <span style={{ color: '#0078d4' }}>Learning Platform</span>
        </div>

        {/* Description */}
        <div style={{
          fontSize: '24px', color: '#8b949e', marginBottom: '48px',
          maxWidth: '700px', lineHeight: 1.5, display: 'flex',
        }}>
          Azure · AWS · GCP · Interview Prep · Real Projects
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {['20+ Tutorials', 'No Paywall', 'Built by Asil', '100% Free'].map(tag => (
            <div key={tag} style={{
              background: 'rgba(0,120,212,0.15)',
              border: '1px solid rgba(0,120,212,0.3)',
              color: '#0078d4',
              padding: '8px 20px',
              borderRadius: '100px',
              fontSize: '18px',
              fontWeight: 600,
              display: 'flex',
            }}>
              {tag}
            </div>
          ))}
        </div>

        {/* URL bottom right */}
        <div style={{
          position: 'absolute', bottom: '40px', right: '80px',
          fontSize: '20px', color: '#30363d', display: 'flex',
        }}>
          chaduvuko.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}