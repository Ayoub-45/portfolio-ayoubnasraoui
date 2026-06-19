'use client'
import { useState, useEffect } from 'react'
import DarkModeToggle from './DarkToggle'

const links = [
  { label: 'Skills', href: '/#skills' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu { animation: fadeDown 0.18s ease; }
      `}</style>

      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 px-6 sm:px-8 flex items-center justify-between"
        style={{
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(8px)',
          boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
          transition: 'box-shadow 0.2s ease, background 0.2s ease',
        }}
      >
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          {/* Changed text-accent to use var(--fg) or a fallback currentColor to ensure visibility */}
          <span 
            className="font-mono text-sm tracking-widest"
            style={{ color: 'var(--fg, currentColor)' }}
          >
            ayoub.nasraoui
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium tracking-wide transition-colors opacity-80 hover:opacity-100"
                style={{ color: 'var(--fg, currentColor)' }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-1 -mr-1 transition-colors duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className="block w-6 h-0.5 transition-all duration-200"
            style={{
              background: 'var(--fg, currentColor)',
              transform: menuOpen ? 'rotate(45deg) translateY(5px)' : 'none',
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-200"
            style={{
              background: 'var(--fg, currentColor)',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-200"
            style={{
              background: 'var(--fg, currentColor)',
              transform: menuOpen ? 'rotate(-45deg) translateY(-5px)' : 'none',
            }}
          />
        </button>

        {/* Mobile menu */}
      {menuOpen && (
  <div
            className="mobile-menu fixed top-16 left-0 right-0 md:hidden flex flex-col"
            style={{
      backgroundColor: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      zIndex: 60,
    }}
  >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="px-6 sm:px-8 py-3 text-sm font-medium transition-colors opacity-80 hover:opacity-100"
                style={{ 
                  color: 'var(--fg)',
                  borderTop: '1px solid var(--border)' 
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}