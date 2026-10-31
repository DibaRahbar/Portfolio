import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'
import { useLang } from '@/i18n'

// Shown once per browser session; reloads and page changes in the same session skip it.
const SEEN_KEY = 'intro-seen'
// Shortest time on screen so the intro reads as deliberate, and the longest before giving up.
const MIN_MS = 2000
const MAX_MS = 4000

/** True when the loading screen is about to play (first visit of the session). */
export function introPending() {
  try {
    return sessionStorage.getItem(SEEN_KEY) !== '1'
  } catch {
    return true
  }
}

/**
 * First-visit loading screen: name, a counter to 100%, and a progress bar.
 * The counter eases toward 90% while fonts load, finishes once they are ready
 * (or after MAX_MS), then the panel slides up to reveal the site.
 */
export function Preloader() {
  const { t, n, lang } = useLang()
  const reduce = useReducedMotion()
  const [show, setShow] = useState(introPending)
  const progress = useMotionValue(0)
  const label = useTransform(progress, v => n(Math.round(v)))
  const bar = useTransform(progress, [0, 100], [0, 1])

  useEffect(() => {
    if (!show) return
    const root = document.documentElement
    root.style.overflow = 'hidden'

    const waiting = animate(progress, 90, { duration: reduce ? 0.2 : MIN_MS / 1000, ease: 'easeOut' })
    let finishing: ReturnType<typeof animate> | undefined
    const ready = Promise.all([document.fonts.ready, new Promise(resolve => setTimeout(resolve, reduce ? 200 : MIN_MS))])
    const giveUp = new Promise(resolve => setTimeout(resolve, MAX_MS))
    let cancelled = false
    const markSeen = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, '1')
      } catch {
        // Not persisted; it may show again on the next load.
      }
    }
    // Safety net: if animation frames stall (for example a background tab), never trap the visitor.
    const failSafe = setTimeout(() => {
      markSeen()
      setShow(false)
    }, MAX_MS + 1500)

    Promise.race([ready, giveUp]).then(() => {
      if (cancelled) return
      waiting.stop()
      finishing = animate(progress, 100, {
        duration: 0.35,
        ease: 'easeOut',
        onComplete: () => {
          markSeen()
          setShow(false)
        },
      })
    })

    return () => {
      cancelled = true
      clearTimeout(failSafe)
      waiting.stop()
      finishing?.stop()
      root.style.overflow = ''
    }
  }, [show, progress, reduce])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label={t('loading')}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-background p-6 sm:p-10"
          exit={reduce ? { opacity: 0 } : { y: '-100%' }}
          transition={{ duration: reduce ? 0.2 : 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-xl font-semibold tracking-tight">{t('name')}</span>
            <span className="font-mono text-[11px] tracking-[0.12em] text-brand-soft uppercase">{t('loading')}</span>
          </div>

          <p className="text-[28vw] leading-none font-bold tracking-[-0.05em] text-brand tabular-nums sm:text-[18vw]">
            <motion.span>{label}</motion.span>
            <span className="text-[0.4em] align-top">{lang === 'fa' ? '٪' : '%'}</span>
          </p>

          <div className="h-1 w-full overflow-hidden rounded-full bg-foreground/10">
            <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-primary rtl:origin-right" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
