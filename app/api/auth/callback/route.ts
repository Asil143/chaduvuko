import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const code     = req.nextUrl.searchParams.get('code')
  const state    = req.nextUrl.searchParams.get('state') || '/'
  const returnTo = decodeURIComponent(state)
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
      provider: 'github',
    }

    // 3. Redirect back with user data in URL (frontend stores in localStorage)
    const dest = new URL(returnTo, base)
    dest.searchParams.set('gh_user', encodeURIComponent(JSON.stringify(user)))
    return NextResponse.redirect(dest.toString())
  } catch {
    return NextResponse.redirect(new URL(returnTo, base))
  }
}