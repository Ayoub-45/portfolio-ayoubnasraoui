import type { CollectionConfig } from 'payload'

export const WorkflowSteps: CollectionConfig = {
  slug: 'workflow-steps',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['step', 'title', 'badge'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'step', type: 'text', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'badge', type: 'text', required: true },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    { name: 'order', type: 'number', required: true }, // for sorting
  ],
}
