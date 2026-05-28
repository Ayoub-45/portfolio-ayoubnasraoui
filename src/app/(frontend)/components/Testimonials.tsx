import { getPayload } from 'payload'
import config from '@/payload.config'
import FadeUp from './FadeUp'
import TestimonialsClient from './TestiimonialsClient'

export default async function Testimonials() {
  const payload = await getPayload({ config })

  // Fetch approved entries from Postgres via Payload
  const testimonialsRes = await payload.find({
    collection: 'testimonials',
    where: {
      status: { equals: 'approved' },
    },
    sort: '-createdAt',
  })

  const testimonials = testimonialsRes.docs

  return (
    <section
      id="testimonials"
      className="py-24 px-8 md:px-16 max-w-6xl mx-auto border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <FadeUp>
          <div
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
            style={{
              color: 'var(--accent)',
              background: 'var(--accent-light)',
              border: '1px solid #c5dfd4',
            }}
          >
            <span className="animate-pulse" style={{ fontSize: '0.45rem' }}>
              ●
            </span>
            Testimonials
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-normal leading-tight">
            Clients
            <span className="italic text-muted" style={{ color: 'var(--muted)' }}>
              reviews & feedback
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={100}>
          <p
            className="text-sm max-w-sm font-mono leading-relaxed"
            style={{ color: 'var(--muted)' }}
          >
            Real feedback from clients and collaborators, showcasing the impact of my work through
            their words.
          </p>
        </FadeUp>
      </div>

      {/* Main Client Shell for Interactivity */}
      <TestimonialsClient initialData={testimonials} />
    </section>
  )
}
