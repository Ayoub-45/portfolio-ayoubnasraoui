import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

// 1. IMPORT ALL YOUR COLLECTIONS AND GLOBALS HERE
import { Profile } from './collections/Profile' // adjust paths to your files
import { Experiences } from './collections/Experiences'
import { Projects } from './collections/Projects'
import { Skills } from './collections/Skills'
import { Blog } from './collections/Blog'
import { Users } from './collections/Users'
import { Testimonials } from './collections/Testimonials'
import { Tags } from './collections/Tags'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users', // Payload's default auth collection
  },
  // 2. REGISTER THEM INSIDE THESE ARRAYS
  collections: [Experiences, Projects, Skills, Blog, Users, Testimonials, Tags],
  globals: [Profile],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_HERE',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
