'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import posthog from 'posthog-js'

type Theme = 'light' | 'dark'

// Create context for any components that need to read the current state
const ThemeContext = createContext<{
  theme: Theme
  toggle: () => void
}>({ theme: 'light', toggle: () => {} })

export function useTheme() {
  return useContext(ThemeContext)
}

// 1. GLOBAL THEME PROVIDER (Put this back so layout.tsx stops throwing errors)
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Sync context state safely with local storage or system preferences on load
    const savedTheme = localStorage.getItem('theme') as Theme
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const activeTheme =
      savedTheme || (document.documentElement.getAttribute('data-theme') as Theme) || systemTheme

    setTheme(activeTheme)
    setMounted(true)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    posthog.capture('theme_toggled', { theme: next })

    // Direct DOM mutation guarantees execution instantly
    document.documentElement.setAttribute('data-theme', next)
    if (next === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {/* Structural shield prevents flash of unstyled content during server side render */}
      <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>{children}</div>
    </ThemeContext.Provider>
  )
}

// 2. SELF-CONTAINED TOGGLE SWITCH BUTTON
export default function DarkModeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle()
  }

  return (
    <button
      onClick={handleToggleClick}
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        width: 44,
        height: 24,
        borderRadius: 999,
        border: '1.5px solid var(--border, #ccc)',
        background: isDark ? 'var(--accent, #38bdf8)' : 'var(--bg, #fff)',
        cursor: 'pointer',
        transition: 'background 0.25s, border-color 0.25s',
        flexShrink: 0,
        padding: 0,
        zIndex: 9999, // Crucial: Forces button above invisible layout containers
        pointerEvents: 'auto', // Crucial: Intercepts click gestures flawlessly
      }}
    >
      {/* Sliding knob */}
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: isDark ? 22 : 2,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: isDark ? '#fff' : 'var(--accent, #2563eb)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
          transition: 'left 0.25s cubic-bezier(.4,0,.2,1), background 0.25s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none', // Bypasses internal interaction traps
        }}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  )
}

function SunIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}
