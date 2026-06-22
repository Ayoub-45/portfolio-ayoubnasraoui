import type { CollectionConfig } from 'payload'
import path from 'node:path'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt', // Add this
  },
  access: {
    read: () => true,
    create: () => true, // Add this
    update: () => true, // Add this
    delete: () => true, // Add this
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: '/opt/render/project/src/media', //add storage path for media files
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 768 },
    ],
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
  },
}
