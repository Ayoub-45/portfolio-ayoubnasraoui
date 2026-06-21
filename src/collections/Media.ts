// src/collections/Media.ts
import type { CollectionConfig } from 'payload'
import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: path.resolve(__dirname, '../../media'), // resolves to /opt/render/project/src/media in production
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 768 },
    ],
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
  },
}
