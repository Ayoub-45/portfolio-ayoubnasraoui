export const dynamic = 'force-dynamic'
import { getPayload } from 'payload'
import config from '@/payload.config'
import FadeUp from './FadeUp'
export default async function Experience() {
  const payload = await getPayload({ config })
  const experienceData = await payload.find({ collection: 'experiences', sort: '-createdAt' })
  const sorted = experienceData.docs.sort((a, b) => {
    const aPresent = a.date?.toLowerCase().includes('present')
    const bPresent = b.date?.toLowerCase().includes('present')
    if (aPresent && !bPresent) return -1
    if (!aPresent && bPresent) return 1
    return 0
  })
  return (
    <section id="experience" className="px-8 md:px-16 py-24 max-w-6xl mx-auto">
      <p
        className="font-mono text-xs tracking-widest uppercase mb-3"
        style={{ color: 'var(--accent)' }}
      >
        Career
      </p>
      <h2
        className="font-serif mb-12"
        style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 400 }}
      >
        Work Experience
      </h2>

      <div className="relative pl-8" style={{ borderLeft: '1px solid var(--border)' }}>
        {sorted.map((exp, i) => (
          /* Payload documents always have a string/number 'id' field, which is a safer React key than exp.title */
          <FadeUp key={exp.id} delay={i * 150} className="relative pb-12 last:pb-0">
            {/* Dot */}
            <div
              className="absolute rounded-full"
              style={{
                left: '-2.4rem',
                top: '0.35rem',
                width: 10,
                height: 10,
                background: 'var(--accent)',
                border: '2px solid var(--bg)',
                outline: '1px solid var(--accent)',
              }}
            />

            <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
              <div>
                <div className="text-base font-semibold">{exp.title}</div>
                <div className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
                  {exp.company}
                </div>
              </div>
              <span
                className="font-mono text-xs px-3 py-1 rounded-full whitespace-nowrap"
                style={{
                  color: 'var(--accent)',
                  background: 'var(--accent-light)',
                  border: '1px solid #c5dfd4',
                }}
              >
                {exp.date}
              </span>
            </div>

            {exp.description && (
              <p className="text-sm mb-4 mt-2" style={{ color: 'var(--muted)' }}>
                {exp.description}
              </p>
            )}

            <ul className="mb-4 space-y-1">
              {/* FIXED: Payload array items are objects; map through 'b.bullet' and use 'b.id' as the key */}
              {exp.bullets?.map((b) => (
                <li key={b.id} className="relative pl-4 text-sm" style={{ color: 'var(--muted)' }}>
                  <span
                    className="absolute left-0"
                    style={{ color: 'var(--accent)', fontSize: '0.8rem' }}
                  >
                    →
                  </span>
                  {b.bullet}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {/* FIXED: Map through 'tag.tag' and use 'tag.id' as the key */}
              {exp.tags?.map((tag) => (
                <span
                  key={tag.id}
                  className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--muted)',
                  }}
                >
                  {tag.tag}
                </span>
              ))}
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
