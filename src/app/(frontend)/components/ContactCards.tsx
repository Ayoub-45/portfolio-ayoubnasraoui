'use client'

import React, { useState } from 'react'

interface CardProps {
  label: string
  value: string
  href: string
  icon: React.ReactNode
}

interface ContactCardsProps {
  contacts: CardProps[]
  email: string | null | undefined
}

export default function ContactCards({ contacts, email }: ContactCardsProps) {
  // Store the active hovering index
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMainBtnHovered, setIsMainBtnHovered] = useState(false)

  return (
    <>
      {/* Contact Cards Grid Wrapper */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {contacts.map((c, idx) => {
          const isHovered = hoveredIndex === idx
          return (
            <a
              key={c.label}
              href={c.href}
              target={c.label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 rounded-xl px-8 py-6 min-w-[160px] transition-all duration-300 ease-out"
              style={{
                background: 'var(--surface)',
                /* Smooth adaptive borders */
                border: isHovered ? '1px solid var(--accent)' : '1px solid var(--border)',
                /* A subtle, dark-mode safe glow instead of a heavy black shadow */
                boxShadow: isHovered
                  ? '0 4px 24px -4px rgba(0, 0, 0, 0.4), 0 0 8px var(--accent-glow, rgba(42,96,73,0.1))'
                  : 'none',
                color: 'var(--text)',
                textDecoration: 'none',
                transform: isHovered ? 'translateY(-2px)' : 'none',
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Subtle tint variations for better visual dark theme hierarchy */}
              <span
                style={{ color: 'var(--accent)', filter: isHovered ? 'brightness(1.1)' : 'none' }}
              >
                {c.icon}
              </span>
              <span className="font-mono text-xs tracking-wider" style={{ color: 'var(--muted)' }}>
                {c.label}
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                {c.value}
              </span>
            </a>
          )
        })}
      </div>

      {/* Main Bottom Email Button */}
      {email && (
        <div className="w-full flex justify-center">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 font-medium transition-all duration-200"
            style={{
              /* FIX: Swapped background states. Uses a sleek dark surface frame, lifting to accent on hover */
              background: isMainBtnHovered ? 'var(--accent)' : 'var(--surface)',
              border: isMainBtnHovered ? '1px solid var(--accent)' : '1px solid var(--border)',
              color: isMainBtnHovered ? 'var(--background, #000000)' : 'var(--text)',
              fontSize: '0.95rem',
              boxShadow: isMainBtnHovered
                ? '0 4px 20px var(--accent-glow, rgba(0,0,0,0.3))'
                : 'none',
            }}
            onMouseEnter={() => setIsMainBtnHovered(true)}
            onMouseLeave={() => setIsMainBtnHovered(false)}
          >
            <EmailIcon />
            <span>{email}</span>
          </a>
        </div>
      )}
    </>
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
      strokeWidth="1.75"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}
