import { RegistryTrackIndex, registryIndexMetadata } from '@/components/learn/RegistryTrackIndex'

export const metadata = registryIndexMetadata('operating-systems')

export default function TrackPage() {
  return <RegistryTrackIndex slug="operating-systems" />
}
