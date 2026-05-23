import { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: { 
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishDate']
  },
  access: { 
    read: () => true 
  },
  fields: [
    { 
      name: 'title', 
      type: 'text', 
      required: true 
    },
    { 
      name: 'slug', 
      type: 'text', 
      required: true, 
      unique: true,
      admin: {
        description: 'URL-friendly path identifier (e.g., my-first-devops-post)'
      }
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g., Tech, DevOps, Systems'
      }
    },
    { 
      name: 'publishDate', 
      type: 'date', 
      required: true 
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'A brief 1-2 sentence summary displayed on the main blog listing page.'
      }
    },
    {
      name: 'content', 
      type: 'array', // Clean block model structure mapped directly to post.content array rendering loops
      required: true,
      fields: [
        { 
          name: 'paragraph', 
          type: 'textarea', 
          required: true 
        }
      ]
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        { 
          name: 'tag', 
          type: 'text',
          required: true
        }
      ],
    },
  ],
}