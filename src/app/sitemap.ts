import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ayoub-devops.com',
      lastModified: new Date(),
    },
    {
      url: 'https://ayoub-devops.com/blog',
      lastModified: new Date(),
    },
  ]
}