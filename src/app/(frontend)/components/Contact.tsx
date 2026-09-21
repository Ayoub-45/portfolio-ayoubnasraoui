const dynamic = 'force-dynamic'
import { getPayload } from 'payload'
import config from '@/payload.config'
import FadeUp from './FadeUp'
import ContactCards from './ContactCards' // Our client interaction wrapper
export default async function Contact() {
  // 1. Initialize the Payload local querying engine
  const payload = await getPayload({ config })

  // 2. Fetch your profile data singleton out of PostgreSQL
  const profile = await payload.findGlobal({ slug: 'profile' })

  // 3. Construct raw structural data safe to cross the server boundary
  const contacts = [
    {
      label: 'Email',
      value: 'Say hello',
      href: profile.email ? `mailto:${profile.email}` : '#',
      /* FIX: Explicitly enforce the blue accent theme color context on the icon wrappers */
      icon: (
        <span style={{ color: 'var(--accent)' }}>
          <EmailIcon />
        </span>
      ),
    },
    {
      label: 'LinkedIn',
      value: profile.name || 'Ayoub Nasraoui',
      href: profile.linkedin || '#',
      icon: (
        <span style={{ color: 'var(--accent)' }}>
          <LinkedInIcon />
        </span>
      ),
    },
    {
      label: 'GitHub',
      value: 'View code',
      href: profile.github || '#',
      icon: (
        <span style={{ color: 'var(--accent)' }}>
          <GitHubIcon />
        </span>
      ),
    },
  ]

  return (
    <section
      id="contact"
      className="px-8 md:px-16 py-24 max-w-6xl mx-auto text-center"
      style={{ color: 'var(--text)' }}
    >
      <FadeUp>
        <p
          className="font-mono text-xs tracking-widest uppercase mb-3"
          style={{ color: 'var(--accent)' }}
        >
          Let&apos;s connect
        </p>

        <h2
          className="font-serif mb-4 tracking-tight"
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 400,
            /* Light Mode: Becomes a soft, dark premium slate blue */
            /* Dark Mode: Becomes a glowing crisp off-white */
            color: 'var(--text)',
            lineHeight: 1.2,
          }}
        >
          Get In Touch
        </h2>

        <p className="mx-auto mb-10 max-w-md" style={{ color: 'var(--muted)' }}>
          Whether you have a project in mind, a role to discuss, or just want to talk DevOps — my
          inbox is open.
        </p>

        {/* Adapts beautifully because children cards use var(--surface) on top of the section var(--text) */}
        <ContactCards contacts={contacts} email={profile.email} />
      </FadeUp>
    </section>
  )
}

function EmailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
    </svg>
  )
}
