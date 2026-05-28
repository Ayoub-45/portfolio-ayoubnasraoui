import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'status', 'createdAt'],
  },
  access: {
    // Anyone can read testimonials, handled by filtering approved entries on your frontend
    // Or restrict globally: read: ({ req: { user } }) => !!user || { status: { equals: 'approved' } }
    read: () => true,
    // Essential: allows your public client-side form to POST submissions to '/api/testimonials'
    create: () => true,
    // Only logged-in admin users can update or delete testimonials
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Client Name',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Client Job Title / Role',
      admin: {
        placeholder: 'e.g., DevOps Manager, Tech Lead',
      },
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company Name',
      admin: {
        placeholder: 'e.g., Acme Corp',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: 'Testimonial / Review Content',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        {
          label: 'Pending Review',
          value: 'pending',
        },
        {
          label: 'Approved (Live)',
          value: 'approved',
        },
        {
          label: 'Archived / Rejected',
          value: 'rejected',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Set to "Approved" to display this testimonial publicly on the website.',
      },
    },
  ],
  timestamps: true, // Automatically provides createdAt and updatedAt fields
}
