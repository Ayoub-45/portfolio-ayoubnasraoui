import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
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
import { WorkflowSteps } from './collections/WorkflowSteps'
export default buildConfig({
  admin: {2026-09-21T17:50:17.601063044Z #17 45.79               at /app/node_modules/pg-pool/index.js:45:11
2026-09-21T17:50:17.601064747Z #17 45.79               at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
2026-09-21T17:50:17.601066475Z #17 45.79               at async k (/app/.next/server/chunks/ssr/_0mhsgz0._.js:92:158046)
2026-09-21T17:50:17.601067854Z #17 45.79               at async Object.l [as connect] (/app/.next/server/chunks/ssr/_0mhsgz0._.js:92:158288)
2026-09-21T17:50:17.601069197Z #17 45.79               at async bA.init (/app/.next/server/chunks/ssr/_0mhsgz0._.js:107:10139)
2026-09-21T17:50:17.601070706Z #17 45.79       "aggregateErrors": [
2026-09-21T17:50:17.60107201Z #17 45.79         {
2026-09-21T17:50:17.60107339Z #17 45.79           "type": "Error",
2026-09-21T17:50:17.601075201Z #17 45.79           "message": "connect ECONNREFUSED ::1:5432",
2026-09-21T17:50:17.601076449Z #17 45.79           "stack":
2026-09-21T17:50:17.601077784Z #17 45.79               Error: connect ECONNREFUSED ::1:5432
2026-09-21T17:50:17.601079152Z #17 45.79                   at createConnectionError (node:net:2062:14)
2026-09-21T17:50:17.601080426Z #17 45.79                   at afterConnectMultiple (node:net:2092:16)
2026-09-21T17:50:17.601081784Z #17 45.79           "errno": -111,
2026-09-21T17:50:17.601083131Z #17 45.79           "code": "ECONNREFUSED",
2026-09-21T17:50:17.601084495Z #17 45.79           "syscall": "connect",
2026-09-21T17:50:17.601102976Z #17 45.79           "address": "::1",
2026-09-21T17:50:17.601104572Z #17 45.79           "port": 5432
2026-09-21T17:50:17.601105956Z #17 45.79         },
2026-09-21T17:50:17.601107304Z #17 45.79         {
2026-09-21T17:50:17.601108712Z #17 45.79           "type": "Error",
2026-09-21T17:50:17.601110122Z #17 45.79           "message": "connect ECONNREFUSED 127.0.0.1:5432",
2026-09-21T17:50:17.601111422Z #17 45.79           "stack":
2026-09-21T17:50:17.601112806Z #17 45.79               Error: connect ECONNREFUSED 127.0.0.1:5432
2026-09-21T17:50:17.60111412Z #17 45.79                   at createConnectionError (node:net:2062:14)
2026-09-21T17:50:17.601115454Z #17 45.79                   at afterConnectMultiple (node:net:2092:16)
2026-09-21T17:50:17.601116871Z #17 45.79           "errno": -111,
2026-09-21T17:50:17.601118209Z #17 45.79           "code": "ECONNREFUSED",
2026-09-21T17:50:17.601119638Z #17 45.79           "syscall": "connect",
2026-09-21T17:50:17.601121113Z #17 45.79           "address": "127.0.0.1",
2026-09-21T17:50:17.601127848Z #17 45.79           "port": 5432
2026-09-21T17:50:17.601129447Z #17 45.79         }
2026-09-21T17:50:17.601130797Z #17 45.79       ],
2026-09-21T17:50:17.601132013Z #17 45.79       "code": "ECONNREFUSED"
2026-09-21T17:50:17.601133313Z #17 45.79     }
2026-09-21T17:50:17.799455695Z #17 45.79 undefined
2026-09-21T17:50:17.799472783Z #17 45.80 {
2026-09-21T17:50:17.799475202Z #17 45.80   err: Error: connect ECONNREFUSED ::1:587
2026-09-21T17:50:17.799477137Z #17 45.80       at <unknown> (Error: connect ECONNREFUSED ::1:587) {
2026-09-21T17:50:17.799479027Z #17 45.80     errno: -111,
2026-09-21T17:50:17.79948036Z #17 45.80     code: 'ESOCKET',
2026-09-21T17:50:17.799482363Z #17 45.80     syscall: 'connect',
2026-09-21T17:50:17.799483682Z #17 45.80     address: '::1',
2026-09-21T17:50:17.799484934Z #17 45.80     port: 587,
2026-09-21T17:50:17.799486291Z #17 45.80     command: 'CONN'
2026-09-21T17:50:17.799487574Z #17 45.80   },
2026-09-21T17:50:17.799488917Z #17 45.80   msg: 'Error verifying Nodemailer transport.'
2026-09-21T17:50:17.799490307Z #17 45.80 }
2026-09-21T17:50:17.799491575Z #17 45.81 {
2026-09-21T17:50:17.79949288Z #17 45.81   err: Error: connect ECONNREFUSED ::1:587
2026-09-21T17:50:17.799494287Z #17 45.81       at <unknown> (Error: connect ECONNREFUSED ::1:587) {
2026-09-21T17:50:17.799495802Z #17 45.81     errno: -111,
2026-09-21T17:50:17.799497078Z #17 45.81     code: 'ESOCKET',
2026-09-21T17:50:17.799498343Z #17 45.81     syscall: 'connect',
2026-09-21T17:50:17.799499529Z #17 45.81     address: '::1',
2026-09-21T17:50:17.799500697Z #17 45.81     port: 587,
2026-09-21T17:50:17.799501922Z #17 45.81     command: 'CONN'
2026-09-21T17:50:17.799503229Z #17 45.81   },
2026-09-21T17:50:17.799504513Z #17 45.81   msg: 'Error verifying Nodemailer transport.'
2026-09-21T17:50:17.79950569Z #17 45.81 }
2026-09-21T17:50:17.799507016Z #17 45.84   Generating static pages using 16 workers (5/7) 
2026-09-21T17:50:17.799508967Z #17 45.84 Error occurred prerendering page "/". Read more: https://nextjs.org/docs/messages/prerender-error
2026-09-21T17:50:18.331036555Z #17 46.52 Error: Error: cannot connect to Postgres: 
2026-09-21T17:50:18.331052154Z #17 46.52     at ignore-listed frames {
2026-09-21T17:50:18.331054481Z #17 46.52   payloadInitError: true,
2026-09-21T17:50:18.331057191Z #17 46.52   digest: '3055537035'
2026-09-21T17:50:18.331059525Z #17 46.52 }
2026-09-21T17:50:18.331061936Z #17 46.52 Export encountered an error on /(frontend)/page: /, exiting the build.
2026-09-21T17:50:18.476355609Z #17 46.58 ⨯ Next.js build worker exited with code: 1 and signal: null
2026-09-21T17:50:18.476370704Z #17 46.67 npm notice
2026-09-21T17:50:18.476372454Z #17 46.67 npm notice New major version of npm available! 11.19.0 -> 12.0.2
2026-09-21T17:50:18.476374014Z #17 46.67 npm notice Changelog: https://github.com/npm/cli/releases/tag/v12.0.2
2026-09-21T17:50:18.476375768Z #17 46.67 npm notice To update run: npm install -g npm@12.0.2
2026-09-21T17:50:18.476377267Z #17 46.67 npm notice
2026-09-21T17:50:18.93076308Z #17 ERROR: process "/bin/sh -c if [ -f yarn.lock ]; then yarn run build;   elif [ -f package-lock.json ]; then npm run build;   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build;   else echo \"Lockfile not found.\" && exit 1;   fi" did not complete successfully: exit code: 1
2026-09-21T17:50:18.937773185Z ------
2026-09-21T17:50:18.937779557Z  > [builder 4/4] RUN   if [ -f yarn.lock ]; then yarn run build;   elif [ -f package-lock.json ]; then npm run build;   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build;   else echo "Lockfile not found." && exit 1;   fi:
2026-09-21T17:50:18.937784516Z 46.52   payloadInitError: true,
2026-09-21T17:50:18.937786Z 46.52   digest: '3055537035'
2026-09-21T17:50:18.937787341Z 46.52 }
2026-09-21T17:50:18.937789271Z 46.52 Export encountered an error on /(frontend)/page: /, exiting the build.
2026-09-21T17:50:18.937790643Z 46.58 ⨯ Next.js build worker exited with code: 1 and signal: null
2026-09-21T17:50:18.937791985Z 46.67 npm notice
2026-09-21T17:50:18.937793332Z 46.67 npm notice New major version of npm available! 11.19.0 -> 12.0.2
2026-09-21T17:50:18.937796719Z 46.67 npm notice Changelog: https://github.com/npm/cli/releases/tag/v12.0.2
2026-09-21T17:50:18.93779841Z 46.67 npm notice To update run: npm install -g npm@12.0.2
2026-09-21T17:50:18.937799674Z 46.67 npm notice
2026-09-21T17:50:18.937800967Z ------
2026-09-21T17:50:18.938329098Z Dockerfile:29
2026-09-21T17:50:18.938332584Z --------------------
2026-09-21T17:50:18.938333965Z   28 |     
2026-09-21T17:50:18.938335365Z   29 | >>> RUN \
2026-09-21T17:50:18.938336981Z   30 | >>>   if [ -f yarn.lock ]; then yarn run build; \
2026-09-21T17:50:18.938338599Z   31 | >>>   elif [ -f package-lock.json ]; then npm run build; \
2026-09-21T17:50:18.938340203Z   32 | >>>   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
2026-09-21T17:50:18.938341539Z   33 | >>>   else echo "Lockfile not found." && exit 1; \
2026-09-21T17:50:18.93834275Z   34 | >>>   fi
2026-09-21T17:50:18.93834397Z   35 |     
2026-09-21T17:50:18.938345285Z --------------------
2026-09-21T17:50:18.938348149Z error: failed to solve: process "/bin/sh -c if [ -f yarn.lock ]; then yarn run build;   elif [ -f package-lock.json ]; then npm run build;   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build;   else echo \"Lockfile not found.\" && exit 1;   fi" did not complete successfully: exit code: 1
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
    WorkflowSteps,
  ],
  globals: [Profile],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_HERE',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.PRODUCTION_DB!,
    },
    push: false,
  }),
  email: nodemailerAdapter({
    defaultFromAddress: 'noreply@ayoub-devops.com',
    defaultFromName: 'Ayoub DevOps',
    transportOptions: {
      host: process.env.SMTP_HOST,
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
