import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'

export type ThemeMode = 'light' | 'dark'

// Keep in sync with the inline script in index.html, which applies the theme before first paint.
const STORAGE_KEY = 'theme'
const darkQuery = () => window.matchMedia('(prefers-color-scheme: dark)')

type ThemeState = { mode: ThemeMode; saved: boolean }

function initialTheme(): ThemeState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return { mode: saved, saved: true }
  } catch {
    // Storage can be blocked; fall back to the system setting.
  }
  return { mode: darkQuery().matches ? 'dark' : 'light', saved: false }
}

type Point = { x: number; y: number }

type ThemeContextValue = {
  mode: ThemeMode
  isDark: boolean
  /** Switch themes. With an origin, the new theme expands as a circle from that point. */
  toggle: (origin?: Point) => void
}

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  root.classList.toggle('dark', mode === 'dark')
  root.style.colorScheme = mode
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

/** Light/dark theme. Follows the system until the visitor picks one, then remembers it. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ThemeState>(initialTheme)
  const modeRef = useRef(state.mode)
  modeRef.current = state.mode

  useEffect(() => applyTheme(state.mode), [state.mode])

  useEffect(() => {
    if (state.saved) return
    const query = darkQuery()
    const onChange = () => setState({ mode: query.matches ? 'dark' : 'light', saved: false })
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [state.saved])

  const toggle = useCallback((origin?: Point) => {
    const mode: ThemeMode = modeRef.current === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // Not persisted; the choice still applies for this visit.
    }
    // Apply synchronously so the view transition captures the finished new theme.
    const commit = () => {
      applyTheme(mode)
      flushSync(() => setState({ mode, saved: true }))
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!origin || reduce || !document.startViewTransition) {
      commit()
      return
    }

    const transition = document.startViewTransition(commit)
    transition.ready.then(() => {
      const radius = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y))
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${origin.x}px ${origin.y}px)`,
            `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
          ],
        },
        { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    }).catch(() => {
      // The browser skips the reveal when the tab is hidden or another transition starts; the theme still switches.
    })
  }, [])

  const value = useMemo(() => ({ mode: state.mode, isDark: state.mode === 'dark', toggle }), [state.mode, toggle])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeMode() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useThemeMode must be used inside ThemeProvider')
  return ctx
}
