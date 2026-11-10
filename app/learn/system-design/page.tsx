import { RegistryTrackIndex, registryIndexMetadata } from '@/components/learn/RegistryTrackIndex'

export const metadata = registryIndexMetadata('system-design')

export default function TrackPage() {
  return <RegistryTrackIndex slug="system-design" />
}
