'use client'
import type { Service } from '@/payload-types'
import FadeUp from './FadeUp'

interface ServicesClientProps {
  services: Service[]
}

export default function ServicesClient({ services }: ServicesClientProps) {
  return (
    <div className="max-w-5xl mx-auto pt-32 px-6 pb-24">
      {/* Page Header */}
      <FadeUp>
        <p
          className="font-mono text-xs tracking-widest uppercase mb-3"
          style={{ color: 'var(--accent)' }}
        >
          Offerings
        </p>
        <h1
          className="text-3xl font-bold font-mono mb-12 tracking-tight"
          style={{ color: 'var(--text)' }}
        >
          Dedicated Services
        </h1>
      </FadeUp>

      {/* Services Grid Layout */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 list-none p-0 m-0">
        {services.map((service, index) => (
          <li key={service.id || index} className="flex flex-col h-full">
            <FadeUp className="h-full flex flex-col">
              <div
                className="flex flex-col h-full p-6 border rounded-sm transition-all duration-200"
                style={{ borderColor: 'var(--border)' }}
              >
                {/* Title & Price Meta row */}
                <div className="flex flex-col gap-1 mb-4">
                  <h2 className="text-lg font-semibold font-mono" style={{ color: 'var(--text)' }}>
                    {service.title}
                  </h2>
                  <span
                    className="font-mono text-xs font-medium"
                    style={{ color: 'var(--accent)' }}
                  >
                    Starting from {service.priceRange}
                  </span>
                </div>

                {/* Description - flex-grow ensures matching heights across rows */}
                <p
                  className="text-sm font-mono leading-relaxed mb-6 flex-grow"
                  style={{ color: 'var(--muted)' }}
                >
                  {service.description}
                </p>

                {/* Features Checklist */}
                <div className="mb-6">
                  <p
                    className="text-xs font-mono uppercase tracking-wider mb-3 font-semibold"
                    style={{ color: 'var(--text)' }}
                  >
                    Includes:
                  </p>
                  <ul className="list-none p-0 m-0 space-y-2 pl-1">
                    {service.features.map((item) => (
                      <li
                        key={item.id}
                        className="text-xs font-mono flex items-start gap-2"
                        style={{ color: 'var(--text)' }}
                      >
                        <span style={{ color: 'var(--accent)' }}>—</span>
                        <span>{item.feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Section: Meta Metrics & Call To Action */}
                <div
                  className="mt-auto pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <span style={{ color: 'var(--muted)' }}>⏱ Delivery:</span>
                    <span style={{ color: 'var(--text)' }}>{service.deliveryTime}</span>
                  </div>

                  {/* Redirects directly to your infrastructure lead-capture form page */}
                  <a
                    href="/#contact"
                    className="inline-block text-center font-mono text-xs border px-4 py-2 uppercase tracking-wider rounded-sm transition-colors duration-150 hover:opacity-80"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--text)',
                      borderColor: 'var(--text)',
                    }}
                  >
                    Request Setup →
                  </a>
                </div>
              </div>
            </FadeUp>
          </li>
        ))}
      </ul>
    </div>
  )
}
