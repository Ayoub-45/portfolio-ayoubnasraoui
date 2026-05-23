import { GlobalConfig } from 'payload'

export const Profile: GlobalConfig = {
  slug: 'profile',
  access: {
    read: () => true, // Anyone can read your portfolio info
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'tagline', type: 'text', required: true },
    { name: 'bio', type: 'textarea', required: true },
    { name: 'location', type: 'text' },
    { name: 'degree', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'linkedin', type: 'text' },
    { name: 'github', type: 'text' },
    { name: 'status', type: 'text' },
    {
      name: 'languages',
      type: 'array',
      fields: [
        { name: 'lang', type: 'text', required: true },
        { name: 'level', type: 'text', required: true },
      ],
    },
    {
      name: 'interests',
      type: 'array',
      fields: [{ name: 'interest', type: 'text' }],
    },
    {
      name: 'softSkills',
      type: 'array',
      fields: [{ name: 'skill', type: 'text' }],
    },
  ],
}