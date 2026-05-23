import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'description',
      type: 'array',
      fields: [{ name: 'paragraph', type: 'textarea', required: true }],
    },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'feature', type: 'text', required: true }],
    },
    {
      name: 'stack',
      type: 'array',
      fields: [{ name: 'tech', type: 'text' }],
    },
    { name: 'link', type: 'text' },
  ],
}