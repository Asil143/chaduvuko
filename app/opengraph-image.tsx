import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Chaduvuko — Free IT Learning Platform'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#080808',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}>

        {/* Glow */}
        <div style={{
          position: 'absolute', top: '-100px', left: '-100px',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(0,230,118,0.15) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{
            width: '12px', height: '12px', borderRadius: '50%',
            background: '#00e676',
            display: 'flex',
          }} />
          <div style={{ fontSize: '36px', fontWeight: 900, color: '#f0f6ff', display: 'flex' }}>
            Chadu<span style={{ color: '#00e676' }}>vuko</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: '60px', fontWeight: 900, color: '#f0f6ff',
          lineHeight: 1.15, marginBottom: '24px', display: 'flex',
          flexDirection: 'column',
        }}>
          <span>Free structured learning</span>
          <span style={{ color: '#00e676' }}>for every branch of IT</span>
        </div>

        {/* Description */}
        <div style={{
          fontSize: '24px', color: '#b8b8b8', marginBottom: '48px',
          maxWidth: '760px', lineHeight: 1.5, display: 'flex',
        }}>
          Data Engineering · Python · SQL · Web Dev · AI/ML
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {['Every IT Track', 'No Paywall', 'Built by Asil', '100% Free'].map(tag => (
            <div key={tag} style={{
              background: 'rgba(0,230,118,0.15)',
              border: '1px solid rgba(0,230,118,0.3)',
              color: '#00e676',
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
          fontSize: '20px', color: '#4a4a4a', display: 'flex',
        }}>
          chaduvuko.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
