import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard'],
      },
    ],
    sitemap: 'https://asil-site.vercel.app/sitemap.xml',
    host: 'https://asil-site.vercel.app',
  }
}