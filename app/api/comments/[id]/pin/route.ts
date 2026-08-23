import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { verifyGithubIdentity } from '@/lib/comment-auth'

const ADMIN_GITHUB = process.env.NEXT_PUBLIC_ADMIN_GITHUB || 'Asil143'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { pinned, gh_token } = await req.json()

  // Pin/unpin is admin-only — verify the requester's GitHub login from a
  // signed token rather than trusting a client-supplied admin_github string,
  // which anyone could set to impersonate the admin.
  const verified = verifyGithubIdentity(gh_token)
  if (!verified || verified.github !== ADMIN_GITHUB)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await supabaseAdmin.from('comments').update({ is_pinned: !!pinned }).eq('id', params.id)
  return NextResponse.json({ ok: true })
}
