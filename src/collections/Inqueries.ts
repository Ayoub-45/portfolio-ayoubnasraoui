import { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'services', 'createdAt'],
  },
  access: {
    create: () => true, // Anyone can submit a contact form request
    read: ({ req: { user } }) => Boolean(user), // Only authenticated admins can read logs
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'services',
      type: 'select',
      hasMany: true, // Allows multi-checkbox parsing
      required: true,
      options: [
        { label: 'VPS / Server setup', value: 'vps_setup' },
        { label: 'Docker / Kubernetes deployment', value: 'docker_k8s' },
        { label: 'CI/CD pipeline', value: 'cicd_pipeline' },
        { label: 'Cloud migration', value: 'cloud_migration' },
        { label: 'Debugging / fixing an issue', value: 'debugging' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'projectDetails',
      type: 'textarea',
      required: false,
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          try {
            // Trigger an automated email using Payload's configured email transporter
            await req.payload.sendEmail({
              to: 'ayoub@ayoub-devops.com',
              from: 'ayoub@ayoub-devops.com', // Update to match your verified sender domain
              subject: `🚀 New Infrastructure Request from ${doc.name}`,
              html: `
                <h2>Let's build your infrastructure!</h2>
                <p><strong>Name:</strong> ${doc.name}</p>
                <p><strong>Email:</strong> ${doc.email}</p>
                <p><strong>Requested Services:</strong> ${doc.services.join(', ')}</p>
                <p><strong>Project Details:</strong> ${doc.projectDetails || 'None provided'}</p>
              `,
            })
          } catch (error) {
            req.payload.logger.error(`Failed to send inquiry email: ${error}`)
          }
        }
      },
    ],
  },
}
