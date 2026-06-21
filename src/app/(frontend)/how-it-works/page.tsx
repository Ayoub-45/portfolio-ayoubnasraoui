import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'How It Works - Infrastructure & DevOps Solutions',
  description:
    'A simple, transparent process to get your VPS server, Docker app, CI/CD pipeline, or AWS setup fixed or built.',
}

const workflowSteps = [
  {
    step: '1',
    title: 'You explain your setup or problem',
    description: 'Tell me what you’re working on (VPS, Docker app, CI/CD, or AWS setup).',
    badge: 'Discovery',
    image: '/images/discovery.png',
  },
  {
    step: '2',
    title: 'I analyze your infrastructure',
    description:
      'I review your system and identify bottlenecks, security risks, and optimization opportunities.',
    badge: 'Audit',
    image: '/images/audit.png',
  },
  {
    step: '3',
    title: 'I implement the solution',
    description:
      'I configure, deploy, automate, or fix your infrastructure using modern DevOps practices.',
    badge: 'Execution',
    image: '/images/execution.png',
  },
  {
    step: '4',
    title: 'You receive complete documentation',
    description:
      'Clear documentation and handover notes ensure your team can maintain everything confidently.',
    badge: 'Handover',
    image: '/images/handover.png',
  },
] as const

function WorkflowStep({
  item,
  reverse,
  priority,
}: {
  item: (typeof workflowSteps)[number]
  reverse: boolean
  priority: boolean
}) {
  return (
    <article
      className={`flex flex-col items-center gap-10 ${
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      <div className="w-full md:w-1/2">
        <div className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--muted)]/5">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--text)] text-sm font-bold text-[var(--bg)]">
            {item.step}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center md:w-1/2">
        <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
          Step 0{item.step} — {item.badge}
        </span>

        <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">{item.title}</h2>

        <p className="mb-6 max-w-md text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          {item.description}
        </p>

        <Link
          href="/#inquiry-section"
          className="inline-flex w-fit items-center gap-2 border-b border-[var(--text)] pb-1 text-sm font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Initiate this stage →
        </Link>
      </div>
    </article>
  )
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="mx-auto max-w-4xl border-b border-[var(--border)] px-6 pb-16 pt-20 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--muted)]/10 text-xl">
          ⚙️
        </div>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">How It Works</h1>

        <p className="mx-auto max-w-xl text-lg leading-relaxed text-[var(--muted)]">
          A straightforward process to design, secure, deploy, and optimize your infrastructure.
        </p>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-5xl space-y-24 px-6 py-20">
        {workflowSteps.map((item, idx) => (
          <WorkflowStep key={item.step} item={item} reverse={idx % 2 !== 0} priority={idx === 0} />
        ))}
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--border)] bg-[var(--muted)]/5 py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h3 className="mb-3 text-2xl font-bold">Ready to optimize your infrastructure?</h3>

          <p className="mx-auto mb-8 max-w-sm text-sm text-[var(--muted)]">
            Send your project requirements, architecture, or logs and receive an expert review
            within 24 hours.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/#inquiry-section"
              className="rounded bg-[var(--text)] px-6 py-3 text-sm font-medium text-[var(--bg)] transition-colors hover:bg-[var(--accent)] hover:text-white"
            >
              Get Started
            </Link>

            <Link
              href="/services"
              className="rounded border border-[var(--border)] px-6 py-3 text-sm font-medium transition-colors hover:bg-[var(--muted)]/10"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
