import { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: { useAsTitle: 'label' },
  access: { read: () => true },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'soft', type: 'checkbox', defaultValue: false },
    {
      name: 'skills',
      type: 'array',
      fields: [{ name: 'skillName', type: 'text', required: true }],
    },
  ],
}