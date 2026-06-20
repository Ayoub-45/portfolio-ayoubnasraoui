import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'How It Works - Infrastructure & DevOps Solutions',
  description:
    'A simple, transparent process to get your VPS server, Docker app, CI/CD pipeline, or AWS setup fixed or built.',
}

export default function HowItWorksPage() {
  const workflowSteps = [
    {
      step: '1',
      title: 'You explain your setup or problem',
      description: 'Tell me what you’re working on (VPS, Docker app, CI/CD, or AWS setup).',
      image: '/images/how-it-works-1.jpg',
      badge: 'Discovery',
    },
    {
      step: '2',
      title: 'I analyze your infrastructure',
      description:
        'I review your system and identify bottlenecks, potential security risks, and optimization improvements.',
      image: '/images/how-it-works-2.jpg',
      badge: 'Audit',
    },
    {
      step: '3',
      title: 'I implement the solution',
      description:
        'I configure, containerize, deploy, or fix your infrastructure using modern best practices and clean code.',
      image: '/images/how-it-works-3.jpg',
      badge: 'Execution',
    },
    {
      step: '4',
      title: 'You receive a clean documentation summary',
      description:
        'You get a clear, step-by-step explanation of everything that was executed so your team can maintain it easily.',
      image: '/images/how-it-works-4.jpg',
      badge: 'Handover',
    },
  ]

  return (
    <main className="w-full min-h-screen text-[var(--text)] bg-[var(--bg)] transition-colors duration-200">
      {/* Hero Header Banner */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center border-b border-[var(--border)]">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--muted)] bg-opacity-10 text-xl mb-4">
          ⚙️
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">How it Works</h1>
        <p className="text-lg text-[var(--muted)] max-w-xl mx-auto leading-relaxed">
          A straightforward and reliable process to design, fix, or optimize your DevOps
          environments without the friction.
        </p>
      </section>

      {/* Alternating Step Grid List */}
      <section className="max-w-5xl mx-auto px-6 py-20 space-y-24">
        {workflowSteps.map((item, idx) => {
          const isEven = idx % 2 === 0
          return (
            <div
              key={item.step}
              className={`flex flex-col gap-10 items-center md:flex-row ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Image Graphics Container */}
              <div className="w-full md:w-1/2">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--muted)] bg-opacity-5 group shadow-sm">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-w-768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-102"
                    priority={idx === 0}
                  />
                  {/* Step counter bubble inside image element */}
                  <div className="absolute top-4 left-4 bg-[var(--text)] text-[var(--bg)] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {item.step}
                  </div>
                </div>
              </div>

              {/* Text Description Box */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="text-xs font-mono tracking-wider uppercase text-[var(--accent)] mb-2 font-semibold">
                  Step 0{item.step} — {item.badge}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight leading-tight">
                  {item.title}
                </h2>
                <p className="text-[var(--muted)] text-base sm:text-lg mb-6 leading-relaxed max-w-md">
                  {item.description}
                </p>
                <div>
                  <Link
                    href="/#inquiry-section"
                    className="inline-flex items-center gap-2 text-sm font-medium border-b border-[var(--text)] pb-1 transition-all hover:text-[var(--accent)] hover:border-[var(--accent)]"
                  >
                    Initiate this stage <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* Conversion Footer Banner */}
      <section className="bg-[var(--muted)] bg-opacity-5 border-t border-[var(--border)] py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-3">Ready to optimize your infrastructure?</h3>
          <p className="text-[var(--muted)] mb-8 max-w-sm mx-auto text-sm">
            Send over your project technical specifications, logs, or requirements to get an expert
            review within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#inquiry-section"
              className="w-full sm:w-auto px-6 py-3 rounded font-medium bg-[var(--text)] text-[var(--bg)] hover:bg-[var(--accent)] hover:text-white transition-colors text-center text-sm"
            >
              Get Started Now
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto px-6 py-3 rounded font-medium border border-[var(--border)] text-center text-sm hover:bg-[var(--muted)] hover:bg-opacity-10 transition-colors"
            >
              View Service Tiers
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
