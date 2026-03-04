import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

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
          author_avatar, author_github, auth_provider, parent_id } = await req.json()

  if (!page_slug || !content?.trim() || !author_name?.trim())
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

  const { data, error } = await supabaseAdmin
    .from('comments')
    .insert({ page_slug, content: content.trim(), author_name,
              author_email, author_avatar, author_github, auth_provider,
              parent_id: parent_id || null })
    .select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ comment: data })
}