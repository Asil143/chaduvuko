import HomePage from '@/components/home/HomePage'
import { getTrackSummaries } from '@/lib/catalog'

export default function Page() {
  return <HomePage tracks={getTrackSummaries()} />
}
