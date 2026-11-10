import { RegistryTrackIndex, registryIndexMetadata } from '@/components/learn/RegistryTrackIndex'

export const metadata = registryIndexMetadata('devops-mlops')

export default function TrackPage() {
  return <RegistryTrackIndex slug="devops-mlops" />
}
