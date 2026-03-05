import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const returnTo = req.nextUrl.searchParams.get('return') || '/'
  const url = new URL('https://github.com/login/oauth/authorize')
  url.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID!)
  url.searchParams.set('scope', 'user:email')
  url.searchParams.set('state', encodeURIComponent(returnTo))
  return NextResponse.redirect(url.toString())
}