import { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name', // Shows the tag name in the Payload Admin panel dropdowns
    defaultColumns: ['name', 'slug'],
  },
  access: {
    read: () => true, // Allows public access to read tags on your frontend
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        placeholder: 'e.g., Docker, Next.js, CI/CD',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier for filtering (e.g., ci-cd)',
      },
    },
  ],
}
