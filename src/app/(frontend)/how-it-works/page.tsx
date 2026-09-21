export const dynamic = 'force-dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Media } from '@/payload-types'
import { WorkflowStep as WorkflowStepType } from 'payload-types'
export const metadata = {
  title: 'How It Works - Infrastructure & DevOps Solutions',
  description:
    'A simple, transparent process to get your VPS server, Docker app, CI/CD pipeline, or AWS setup fixed or built.',
}

function WorkflowStep({
  item,
  reverse,
  priority,
}: {
  item: WorkflowStepType
  reverse: boolean
  priority: boolean
}) {
  const image = item.image as Media // safe cast since depth:1 resolves it
  const dynamicImageSrc = image?.url || 'https://placehold.co/600x400/png?text=No+Image'
  console.log('dynamicImageSrc =', dynamicImageSrc)
  const altText = image?.alt || item.title
  return (
    <article
      className={`flex flex-col items-center gap-10 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
      <div className="w-full md:w-1/2">
        <div className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--muted)]/5">
          <Image
            src={dynamicImageSrc}
            alt={altText}
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
      </div>
    </article>
  )
}

export default async function HowItWorksPage() {
  const payload = await getPayload({ config })
  const { docs: workflowSteps } = await payload.find({
    collection: 'workflow-steps',
    depth: 1,
    sort: 'order',
  })
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
              href="/#contact"
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
