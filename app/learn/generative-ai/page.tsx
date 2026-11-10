import { RegistryTrackIndex, registryIndexMetadata } from '@/components/learn/RegistryTrackIndex'

export const metadata = registryIndexMetadata('generative-ai')

export default function TrackPage() {
  return <RegistryTrackIndex slug="generative-ai" />
}
