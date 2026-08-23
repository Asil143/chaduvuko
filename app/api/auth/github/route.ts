import { NextRequest, NextResponse } from 'next/server'

// Only allow redirecting back into this site — a `return` value like
// "https://evil.com" or "//evil.com" would otherwise let this endpoint be
// used as an open redirect (and, after login, leak the user's GitHub
// profile to that external origin via the callback's query string).
function safeReturnPath(value: string | null): string {
  if (!value) return '/'
  if (!value.startsWith('/') || value.startsWith('//') || value.includes('://')) return '/'
  return value
}

export async function GET(req: NextRequest) {
  const returnTo = safeReturnPath(req.nextUrl.searchParams.get('return'))
  const url = new URL('https://github.com/login/oauth/authorize')
  url.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID!)
  url.searchParams.set('scope', 'user:email')
  url.searchParams.set('state', encodeURIComponent(returnTo))
  return NextResponse.redirect(url.toString())
}