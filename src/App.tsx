import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import DotGrid from '@/components/DotGrid'
import { Preloader } from '@/components/site/Preloader'
import { SiteDock, type Section } from '@/components/site/SiteDock'
import { StickerTrail } from '@/components/site/StickerTrail'
import { LangProvider } from '@/i18n'
import { ContactPage } from '@/pages/ContactPage'
import { HomePage } from '@/pages/HomePage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { ProjectsPage, parseCategory } from '@/pages/ProjectsPage'
import { colors, darkColors } from '@/theme'
import { ThemeProvider, useThemeMode } from '@/theme-mode'

/** Current hash split into path and query, e.g. '#/projects?category=brand'. */
function useRoute() {
  const read = () => {
    const [path, query = ''] = (window.location.hash || '#/').split('?')
    return { path, query }
  }
  const [route, setRoute] = useState(read)

  useEffect(() => {
    const onChange = () => setRoute(read())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

/** Which dock item is active for a route. */
function sectionFor(path: string): Section {
  if (path.startsWith('#/projects')) return 'projects'
  if (path.startsWith('#/contact')) return 'contact'
  return 'home'
}

const easeOut = [0.16, 1, 0.3, 1] as const

/**
 * Cross-fades between pages: the old page lifts and blurs out, then the new one rises in.
 * Keyed by path only, so changing the Projects filter (the query) does not trigger it.
 * Scrolls to the top while nothing is on screen, between the exit and the entrance.
 */
function PageTransition({ path, children }: { path: string; children: ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        key={path}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: 'blur(6px)' }}
        animate={{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.3, ease: easeOut },
          // Drop the filter once settled: a leftover filter would stop the footer glass from blurring the page behind it.
          transitionEnd: { filter: 'none' },
        }}
        exit={
          reduce
            ? { opacity: 0, transition: { duration: 0.1 } }
            : { opacity: 0, y: -10, filter: 'blur(6px)', transition: { duration: 0.15, ease: 'easeIn' } }
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function Page({ path, query }: { path: string; query: string }) {
  const detail = path.match(/^#\/projects\/(.+)$/)
  if (detail) return <ProjectDetailPage key={detail[1]} slug={detail[1]} />
  if (path.startsWith('#/projects')) return <ProjectsPage category={parseCategory(query)} />
  if (path.startsWith('#/contact')) return <ContactPage />
  return <HomePage />
}

/** Dotted background, mounted once so its intro does not replay on every route change. */
function Background() {
  const { isDark } = useThemeMode()
  return (
    <div className="fixed inset-0 -z-10">
      <DotGrid
        dotSize={3}
        gap={24}
        baseColor={isDark ? darkColors.dot : colors.dot}
        activeColor={isDark ? darkColors.dotActive : colors.primary}
        proximity={120}
        shockRadius={220}
        shockStrength={3}
      />
    </div>
  )
}

export default function App() {
  const route = useRoute()
  return (
    <ThemeProvider>
      <LangProvider>
        <Background />
        <PageTransition path={route.path}>
          <Page path={route.path} query={route.query} />
        </PageTransition>
        <SiteDock active={sectionFor(route.path)} />
        <StickerTrail />
        <Preloader />
      </LangProvider>
    </ThemeProvider>
  )
}
