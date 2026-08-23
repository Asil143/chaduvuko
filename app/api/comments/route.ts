import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { verifyGithubIdentity } from '@/lib/comment-auth'

export async function GET(req: NextRequest) {
  const slug    = req.nextUrl.searchParams.get('slug')   || ''
  const voterId = req.nextUrl.searchParams.get('voter')  || ''

  const { data: comments } = await supabaseAdmin
    .from('comments')
    .select('*')
    .eq('page_slug', slug)
    .order('is_pinned', { ascending: false })
    .order('upvotes',   { ascending: false })
    .order('created_at',{ ascending: true })

  if (!comments) return NextResponse.json({ comments: [] })

  const { data: upvotes } = await supabaseAdmin
    .from('comment_upvotes')
    .select('comment_id')
    .eq('voter_id', voterId)

  const upvotedIds = new Set((upvotes || []).map((u: any) => u.comment_id))

  return NextResponse.json({
    comments: comments.map(c => ({ ...c, user_upvoted: upvotedIds.has(c.id) }))
  })
}

export async function POST(req: NextRequest) {
  const { page_slug, content, author_name, author_email,
          gh_token, parent_id } = await req.json()

  if (!page_slug || !content?.trim())
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

  // A GitHub-attributed comment (name, avatar, the "GitHub ✓" badge, the link
  // to a real github.com profile) is only trusted when it's backed by a valid
  // signed token from a completed OAuth login — never from client-supplied
  // author_github/author_avatar/auth_provider fields, which anyone could set
  // directly in a POST body to impersonate another GitHub user.
  const verified = verifyGithubIdentity(gh_token)

  const author_name_final   = verified ? verified.name  : author_name?.trim()
  const author_avatar_final = verified ? verified.avatar : undefined
  const author_github_final = verified ? verified.github : undefined
  const auth_provider_final = verified ? 'github' : 'guest'

  if (!author_name_final)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

  const { data, error } = await supabaseAdmin
    .from('comments')
    .insert({ page_slug, content: content.trim(), author_name: author_name_final,
              author_email: verified ? verified.email : author_email,
              author_avatar: author_avatar_final, author_github: author_github_final,
              auth_provider: auth_provider_final,
              parent_id: parent_id || null })
    .select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ comment: data })
}