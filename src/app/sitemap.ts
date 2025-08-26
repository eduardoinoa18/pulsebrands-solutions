import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://pulsebrandsolutions.com'
  return [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
  ]
}
