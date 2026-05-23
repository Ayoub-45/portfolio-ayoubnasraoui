import { CollectionConfig } from 'payload'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'company', type: 'text', required: true },
    { name: 'date', type: 'text', required: true, admin: { description: 'e.g., Jan 2026 – Present' } },
    { name: 'description', type: 'text' },
    {
      name: 'bullets',
      type: 'array',
      fields: [{ name: 'bullet', type: 'text', required: true }],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
  ],
}