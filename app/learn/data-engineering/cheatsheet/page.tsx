import type { Metadata } from 'next'
import { CheatSheetView } from '@/components/content/CheatSheetView'
import { CHEAT_SHEETS } from '@/data/cheatsheets'

const sheet = CHEAT_SHEETS['data-engineering']

export const metadata: Metadata = {
  title: `${sheet.title} Cheat Sheet — Reference & Project Ideas`,
  description: sheet.blurb,
}

export default function CheatSheetPage() {
  return <CheatSheetView sheet={sheet} />
}
