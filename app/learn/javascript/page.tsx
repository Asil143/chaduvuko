import { RegistryTrackIndex, registryIndexMetadata } from '@/components/learn/RegistryTrackIndex'

export const metadata = registryIndexMetadata('javascript')

export default function TrackPage() {
  return <RegistryTrackIndex slug="javascript" />
}
