import { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishDate'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly path identifier (e.g., my-first-devops-post)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Tech Stack', value: 'tech' },
        { label: 'DevOps & Infrastructure', value: 'devops' },
        { label: 'Systems Architecture', value: 'systems' },
      ],
    },
    {
      name: 'publishDate',
      type: 'date',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'A brief 1-2 sentence summary displayed on the main blog listing page.',
      },
    },
    {
      name: 'content',
      type: 'blocks', // Leverages blocks to easily handle paragraphs, lists, and headings
      required: true,
      blocks: [
        {
          slug: 'paragraphBlock',
          fields: [{ name: 'text', type: 'textarea', required: true }],
        },
        {
          slug: 'headingBlock',
          fields: [
            { name: 'text', type: 'text', required: true },
            {
              name: 'level',
              type: 'select',
              defaultValue: 'h2',
              options: [
                { label: 'Heading 2', value: 'h2' },
                { label: 'Heading 3', value: 'h3' },
              ],
            },
          ],
        },
        {
          slug: 'listBlock',
          fields: [
            {
              name: 'items',
              type: 'array',
              required: true,
              fields: [{ name: 'item', type: 'text', required: true }],
            },
          ],
        },
      ],
    },
    {
      name: 'tags',
      type: 'relationship', // Establishes a formal relation to the standalone Tags collection
      relationTo: 'tags', // Must match the slug of your Tags collection
      hasMany: true, // Allows a blog post to have multiple tags selected
      admin: {
        description: 'Select or create global tags for this post.',
      },
    },
  ],
}
