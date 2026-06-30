import { getPayload } from 'payload'
import config from '@/payload.config'
import FadeUp from './FadeUp' // Adjust path to your FadeUp file if necessary
export const dynamic = 'force-dynamic'
export default async function Skills() {
  // 1. Initialize the Payload engine
  const payload = await getPayload({ config })

  // 2. Fetch all rows from your 'skills' collection
  const skillGroupsData = await payload.find({
    collection: 'skills',
    limit: 100,
  })

  return (
    <section id="skills" className="px-8 md:px-16 py-24 max-w-6xl mx-auto">
      <p
        className="font-mono text-xs tracking-widest uppercase mb-3"
        style={{ color: 'var(--accent)' }}
      >
        Capabilities
      </p>
      <h2
        className="font-serif mb-12"
        style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 400 }}
      >
        Skills &amp; Tech Stack
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {skillGroupsData.docs.map((group, i) => {
          // Explicit check against the checkbox field from your schema
          const isSoftSkill = !!group.soft

          return (
            <FadeUp
              key={group.id || group.label}
              delay={i * 60}
              className={isSoftSkill ? 'md:col-span-2' : ''}
            >
              <div
                className="rounded-xl p-7 h-full"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <p
                  className="font-mono text-xs tracking-widest uppercase mb-5"
                  style={{ color: 'var(--accent)' }}
                >
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(group.skills) &&
                    group.skills.map((skillItem: any, childIdx: number) => {
                      // Correctly maps to the 'skillName' text field from your collection schema
                      const name = skillItem?.skillName

                      if (!name) return null

                      return (
                        <span
                          key={skillItem.id || childIdx}
                          className={`skill-pill inline-flex items-center px-3 py-1.5 rounded border text-xs transition-all cursor-default ${
                            isSoftSkill ? 'font-sans text-sm' : 'font-mono'
                          }`}
                          style={{
                            background: 'var(--bg)',
                            borderColor: 'var(--border)',
                            color: 'var(--text)',
                          }}
                        >
                          {name}
                        </span>
                      )
                    })}
                </div>
              </div>
            </FadeUp>
          )
        })}
      </div>
    </section>
  )
}
