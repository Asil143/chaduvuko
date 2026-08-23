import { NextRequest, NextResponse } from 'next/server'
import { signGithubIdentity } from '@/lib/comment-auth'

// Only allow redirecting back into this site — `state` is attacker-controlled
// input round-tripped through GitHub, so an unchecked absolute/protocol-relative
// value here would be an open redirect that also leaks the user's GitHub
// profile (name/email/avatar) to whatever origin it points at.
function safeReturnPath(value: string): string {
  if (!value.startsWith('/') || value.startsWith('//') || value.includes('://')) return '/'
  return value
}

// Shared by both /api/auth/callback and /api/auth/github/callback — whichever
// one is actually registered as this GitHub OAuth App's callback URL needs to
// run the real code-for-token exchange, not just re-redirect to GitHub.
export async function handleGithubOAuthCallback(req: NextRequest) {
  const code     = req.nextUrl.searchParams.get('code')
  const state    = req.nextUrl.searchParams.get('state') || '/'
  const returnTo = safeReturnPath(decodeURIComponent(state))
  const base     = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  if (!code) return NextResponse.redirect(new URL(returnTo, base))

  try {
    // 1. Exchange code for access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id:     process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    })
    const { access_token } = await tokenRes.json()

    // 2. Get GitHub user profile
    const userRes = await fetch('https://api.github.com/user', {
      headers: { Authorization: 'Bearer ' + access_token, Accept: 'application/json' },
    })
    const gh = await userRes.json()

    const user = {
      name:     gh.name || gh.login,
      email:    gh.email || undefined,
      avatar:   gh.avatar_url,
      github:   gh.login,
      provider: 'github' as const,
    }

    // 3. Redirect back with user data in URL (frontend stores in localStorage).
    // gh_token is a signed copy of `user` — the only thing /api/comments will
    // trust as proof of a real GitHub login when posting/rendering the badge.
    const dest = new URL(returnTo, base)
    dest.searchParams.set('gh_user', encodeURIComponent(JSON.stringify(user)))
    dest.searchParams.set('gh_token', signGithubIdentity(user))
    return NextResponse.redirect(dest.toString())
  } catch {
    return NextResponse.redirect(new URL(returnTo, base))
  }
}
