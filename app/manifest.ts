import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Asil — Free Data Engineering Learning',
    short_name: 'Asil',
    description: 'Free Data Engineering tutorials covering Azure, AWS, GCP, Interview Prep and more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d1117',
    theme_color: '#0078d4',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/icons/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png',
      },
    ],
    categories: ['education', 'productivity'],
    shortcuts: [
      {
        name: 'Roadmap',
        url: '/learn/roadmap',
        description: 'Data Engineering Roadmap 2026',
      },
      {
        name: 'Interview Prep',
        url: '/learn/interview',
        description: '27 real interview questions',
      },
      {
        name: 'Dashboard',
        url: '/dashboard',
        description: 'Your learning progress',
      },
    ],
  }
}