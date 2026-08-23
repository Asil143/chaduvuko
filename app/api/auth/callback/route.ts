import { NextRequest } from 'next/server'
import { handleGithubOAuthCallback } from '@/lib/github-oauth-callback'

export async function GET(req: NextRequest) {
  return handleGithubOAuthCallback(req)
}
