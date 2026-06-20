import { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'priceRange', 'deliveryTime'],
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
      name: 'priceRange',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g., $80 – $200',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'A brief summary of what the service achieves.',
      },
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'deliveryTime',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g., 1 day or 1–2 days',
      },
    },
  ],
}