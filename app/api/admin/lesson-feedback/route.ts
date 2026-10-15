import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  if (!process.env.ADMIN_SECRET || req.headers.get('x-admin-key') !== process.env.ADMIN_SECRET)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY)
    return NextResponse.json({ error: 'Lesson feedback storage is not configured.' }, { status: 503 })

  const { data, error } = await supabaseAdmin
    .from('lesson_feedback')
    .select('id, lesson_href, category, details, created_at')
    .order('created_at', { ascending: false })
    .limit(200)
  if (error) {
    console.error('Admin lesson feedback read failed:', error.message)
    return NextResponse.json({ error: 'Could not load lesson feedback.' }, { status: 500 })
  }
  return NextResponse.json({ feedback: data ?? [] })
}
