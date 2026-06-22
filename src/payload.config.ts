import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer' // <-- Add this import// 1. IMPORT ALL YOUR COLLECTIONS AND GLOBALS HERE
import { Profile } from './collections/Profile' // adjust paths to your files
import { Experiences } from './collections/Experiences'
import { Projects } from './collections/Projects'
import { Skills } from './collections/Skills'
import { Blog } from './collections/Blog'
import { Users } from './collections/Users'
import { Testimonials } from './collections/Testimonials'
import { Tags } from './collections/Tags'
import { Inquiries } from './collections/Inqueries'
import { Services } from './collections/Services'
import { Media } from './collections/Media'
export default buildConfig({
  admin: {
    user: 'users', // Payload's default auth collection
  },
  // 2. REGISTER THEM INSIDE THESE ARRAYS
  collections: [
    Experiences,
    Projects,
    Skills,
    Blog,
    Users,
    Testimonials,
    Tags,
    Inquiries,
    Services,
    Media,
  ],
  globals: [Profile],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_HERE',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.PRODUCTION_DB!,
    },
  }),
  email: nodemailerAdapter({
    defaultFromAddress: 'noreply@ayoub-devops.com',
    defaultFromName: 'Ayoub DevOps',
    transportOptions: {
      host: process.env.HOST,
      port: 587,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_APP_PASSWORD,
      },
    },
  }),
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },
})
