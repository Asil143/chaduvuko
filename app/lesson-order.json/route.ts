import { NextResponse } from 'next/server'
import { getLessonOrder } from '@/lib/catalog'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json(getLessonOrder())
}
