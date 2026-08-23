import { createHmac, timingSafeEqual } from 'crypto'

// Signs the GitHub identity the OAuth callback resolved, so later comment
// POSTs can prove "this really came from a completed GitHub login" instead of
// the server just trusting whatever author_* fields the client sends —
// otherwise any client can POST directly to /api/comments claiming to be
// anyone, with the site's own "GitHub ✓" badge rendered on top of it.
// Reuses GITHUB_CLIENT_SECRET as the signing key — it's already a private,
// server-only secret required for the OAuth flow to work at all.
export interface GithubIdentity {
  name: string
  email?: string
  avatar?: string
  github: string
  provider: 'github'
}

function secret(): string {
  return process.env.GITHUB_CLIENT_SECRET || ''
}

export function signGithubIdentity(user: GithubIdentity): string {
  const payload = Buffer.from(JSON.stringify(user)).toString('base64url')
  const sig = createHmac('sha256', secret()).update(payload).digest('hex')
  return `${payload}.${sig}`
}

export function verifyGithubIdentity(token: unknown): GithubIdentity | null {
  if (typeof token !== 'string' || !token.includes('.') || !secret()) return null
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return null

  const expected = createHmac('sha256', secret()).update(payload).digest('hex')
  const a = Buffer.from(expected, 'hex')
  const b = Buffer.from(sig, 'hex')
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null

  try {
    const user = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (user?.provider !== 'github' || typeof user.github !== 'string' || typeof user.name !== 'string') return null
    return user as GithubIdentity
  } catch {
    return null
  }
}
