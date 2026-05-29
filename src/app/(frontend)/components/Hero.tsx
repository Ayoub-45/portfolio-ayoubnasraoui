import { getPayload } from 'payload'
import config from '@/payload.config'
import FadeUp from './FadeUp'
import HeroButtons from './HeroButtons' // Client component interaction layer

export default async function Hero() {
  // 1. Initialize Payload Local Querying Engine
  const payload = await getPayload({ config })

  // 2. Fetch your profile data singleton out of PostgreSQL
  const profile = await payload.findGlobal({ slug: 'profile' })

  // 3. Prepare name parts safely for the stacked layout headline
  const nameParts = profile.name ? profile.name.split(' ') : ['Ayoub', 'Nasraoui']
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ')

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-32 pb-20 px-8 md:px-16 max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-center">
        {/* Left Content Column */}
        <FadeUp>
          {profile.status && (
            <div
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase px-4 py-1.5 rounded-full mb-7"
              style={{
                color: 'var(--accent)',
                /* FIX: Swapped hardcoded background and border with proper dim alpha layers for dark theme consistency */
                background: 'var(--accent-dim, rgba(42,96,73,0.15))',
                border: '1px solid var(--accent-border, rgba(42,96,73,0.3))',
              }}
            >
              <span style={{ fontSize: '0.45rem' }}>●</span>
              {profile.status}
            </div>
          )}

          <h1
            className="font-serif leading-none mb-2"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 4.25rem)',
              fontWeight: 400,
              color: 'var(--text)',
            }}
          >
            {firstName}
            <br />
            {lastName}
          </h1>

          {profile.tagline && (
            <p
              className="font-serif italic mb-6"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                color: 'var(--muted)',
              }}
            >
              {profile.tagline}
            </p>
          )}

          {profile.bio && (
            <p
              className="mb-9 leading-relaxed max-w-md"
              style={{ fontSize: '1.0625rem', color: 'var(--muted)' }}
            >
              {profile.bio}
            </p>
          )}

          {/* Interactive Action Blocks */}
          <div className="mb-8">
            <HeroButtons />
          </div>

          <div className="flex flex-wrap gap-6">
            {profile.location && <MetaItem icon={<PinIcon />} label={profile.location} />}
            {profile.degree && <MetaItem icon={<GradIcon />} label={profile.degree} />}
          </div>
        </FadeUp>

        {/* Right Column: Dynamic Terminal Mock Card */}
        <FadeUp delay={200} className="hidden lg:block">
          <div
            className="rounded-xl overflow-hidden backdrop-blur-sm"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
          >
            {/* Terminal Header Bar Panel */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{
                /* FIX: Shifted light-gray headers to adapt cleanly to an internal dark theme background frame */
                background: 'var(--surface-header, rgba(255,255,255,0.03))',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff6058] opacity-80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#29c941] opacity-80" />
              <span
                className="font-mono text-[11px] mx-auto pr-8"
                style={{ color: 'var(--muted)' }}
              >
                ayoub@devops ~ zsh
              </span>
            </div>

            {/* Terminal Panel Content Workspace */}
            <div className="p-6 font-mono text-xs leading-loose" style={{ color: 'var(--text)' }}>
              <Line prompt="ayoub@devops" cmd="whoami --json" />
              <span style={{ color: 'var(--muted)', paddingLeft: '1rem', display: 'block' }}>
                {'{'}
              </span>
              <TermKV k="role" v={profile.tagline || 'DevOps Engineer'} />
              <TermKV k="location" v={profile.location || 'Tunisia'} />
              <TermKV k="status" v={profile.status || 'open_to_work'} last />
              <span style={{ color: 'var(--muted)', paddingLeft: '1rem', display: 'block' }}>
                {'}'}
              </span>
              <br />
              <Line prompt="ayoub@devops" cmd="docker ps" />
              {/* FIX: Swapped hardcoded text colors out for var(--muted) elements so they remain perfectly readable */}
              <div style={{ color: 'var(--muted)', paddingLeft: '1rem', opacity: 0.5 }}>
                CONTAINER ID &nbsp; IMAGE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; STATUS
              </div>
              <div style={{ color: 'var(--muted)', paddingLeft: '1rem', opacity: 0.85 }}>
                a3f2c1d9e8b7 &nbsp; <span style={{ color: 'var(--accent)' }}>payload-cms:v3</span>{' '}
                &nbsp; Up 4 hours
              </div>
              <div style={{ color: 'var(--muted)', paddingLeft: '1rem', opacity: 0.85 }}>
                b1e4d7a6c9f0 &nbsp; <span style={{ color: 'var(--accent)' }}>postgres-db:16</span>{' '}
                &nbsp; Up 2 days
              </div>
              <br />
              <span style={{ color: 'var(--accent)' }}>ayoub@devops</span>{' '}
              <span className="inline-block w-1.5 h-3.5 bg-[var(--accent)] animate-pulse align-middle ml-0.5" />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Line({ prompt, cmd }: { prompt: string; cmd: string }) {
  return (
    <div>
      <span style={{ color: 'var(--accent)' }}>{prompt}</span>{' '}
      <span style={{ color: 'var(--text)' }}>{cmd}</span>
    </div>
  )
}

function TermKV({ k, v, last }: { k: string; v: string; last?: boolean }) {
  return (
    <div style={{ color: 'var(--muted)', paddingLeft: '2rem' }}>
      {/* FIX: Handled JSON syntax coloring beautifully with fallback text logic */}
      <span style={{ color: 'var(--accent2, var(--accent))', filter: 'brightness(1.1)' }}>
        &quot;{k}&quot;
      </span>
      : <span style={{ color: 'var(--accent)' }}>&quot;{v}&quot;</span>
      {!last && ','}
    </div>
  )
}

function MetaItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--muted)' }}>
      {icon}
      {label}
    </div>
  )
}

function PinIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function GradIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}
