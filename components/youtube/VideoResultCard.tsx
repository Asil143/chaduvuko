export type YouTubeVideo = {
  id: string
  title: string
  channelTitle: string
  thumbnailUrl: string
  viewCount: number
  likeCount: number
  url: string
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

export function VideoResultCard({
  video,
  loading,
  debug,
}: {
  video: YouTubeVideo | null
  loading?: boolean
  debug?: string
}) {
  if (loading) {
    return (
      <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px', marginBottom: 16 }}>
        <p style={{ fontSize: 13, color: 'var(--muted)' }}>📺 Finding the best video for this topic…</p>
      </div>
    )
  }

  if (debug) {
    return (
      <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px', marginBottom: 16 }}>
        <p style={{ fontSize: 13, color: '#ff4757' }}>{debug}</p>
      </div>
    )
  }

  if (!video) return null

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        gap: 14,
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: 14,
        marginBottom: 16,
        textDecoration: 'none',
        alignItems: 'center',
      }}
    >
      {video.thumbnailUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          style={{ width: 140, height: 79, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }}
        />
      )}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 6 }}>
          📺 Best video for this topic
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {video.title}
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)' }}>
          {video.channelTitle} · {formatCount(video.viewCount)} views · {formatCount(video.likeCount)} likes
        </div>
      </div>
    </a>
  )
}
