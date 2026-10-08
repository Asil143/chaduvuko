import LearnIndex from '@/components/learn/LearnIndex'
import { getTrackSummaries } from '@/lib/catalog'

export default function Page() {
  return <LearnIndex tracks={getTrackSummaries()} />
}
