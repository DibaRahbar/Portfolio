import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { ProjectCard } from '@/components/site/ProjectCard'
import { Reveal } from '@/components/site/Reveal'
import { categories, type Category, type Project } from '@/data'
import { useLang } from '@/i18n'
import { categoryLabel } from '@/lib/category'
import { projectsIn } from '@/lib/folders'

/** All plus one button per category, with counts and a sliding highlight. */
export function CategoryFilter({
  value,
  onChange,
}: {
  value: Category | null
  onChange: (category: Category | null) => void
}) {
  const { t, n, lang } = useLang()
  const reduce = useReducedMotion()
  const bar = useRef<HTMLDivElement>(null)
  const tabs: (Category | null)[] = [null, ...categories]
  const count = (c: Category | null) => projectsIn(c).length

  // On narrow screens the bar scrolls sideways; keep the active button in view.
  // Scrolls the bar only (scrollIntoView could also move the page).
  useEffect(() => {
    const container = bar.current
    const active = container?.querySelector<HTMLElement>('[aria-pressed="true"]')
    if (!container || !active) return
    const a = active.getBoundingClientRect()
    const c = container.getBoundingClientRect()
    container.scrollBy({ left: a.left + a.width / 2 - (c.left + c.width / 2), behavior: reduce ? 'auto' : 'smooth' })
  }, [value, lang, reduce])

  return (
    <div
      ref={bar}
      role="group"
      aria-label={t('filterProjects')}
      className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border bg-background/80 p-1 backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {tabs.map(c => {
        const active = c === value
        return (
          <button
            key={c ?? 'all'}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(c)}
            className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              active ? 'text-primary-foreground' : 'text-muted-foreground hover:text-brand'
            }`}
          >
            {active && (
              <motion.span
                layoutId="category-pill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10">
              {c ? t(categoryLabel[c]) : t('all')}
              <span className="ms-1.5 text-xs opacity-60">{n(count(c))}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

/** Two-column project grid; cards fade and reflow when the list changes. */
export function ProjectGrid({ items }: { items: Project[] }) {
  const reduce = useReducedMotion()
  const { t } = useLang()
  if (!items.length) {
    return <p className="rounded-3xl border border-dashed px-6 py-12 text-center text-sm text-muted-foreground">{t('noProjects')}</p>
  }
  return (
    <motion.div layout={!reduce} className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <AnimatePresence mode="popLayout" initial={false}>
        {items.map(project => (
          <motion.div
            key={project.slug}
            layout={!reduce}
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Inner wrapper so the scroll scrub and the filter layout animation use separate transforms */}
            <Reveal className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
