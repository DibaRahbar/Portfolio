import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { introPending } from '@/components/site/Preloader'
import { CategoryFilter, ProjectGrid, filterProjects } from '@/components/site/ProjectFilter'
import { SectionHeading, Shell } from '@/components/site/Shell'
import type { Category } from '@/data'
import { useLang } from '@/i18n'

// How many project cards the home page shows before "View all".
const HOME_PROJECT_LIMIT = 4

function ProjectsSection() {
  const { t } = useLang()
  // Kept in local state so filtering on Home does not change the URL or scroll.
  const [category, setCategory] = useState<Category | null>(null)
  const items = filterProjects(category).slice(0, HOME_PROJECT_LIMIT)
  const viewAllHref = category ? `#/projects?category=${category}` : '#/projects'

  return (
    <section id="projects" className="mt-14 scroll-mt-6 sm:mt-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading label={t('caseStudies')} title={t('projects')} />
        <CategoryFilter value={category} onChange={setCategory} />
      </div>
      <div className="mt-10">
        <ProjectGrid items={items} />
      </div>
      <div className="mt-10 flex justify-center">
        <a
          href={viewAllHref}
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-soft"
        >
          {t('viewAllProjects')}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
        </a>
      </div>
    </section>
  )
}

const fadeItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

/**
 * Centered text hero that fills the first screen on desktop (header + hero = 100vh) and sizes to its
 * content on mobile. Its lines fade in one after another (after the loading screen on a first visit),
 * and the whole block drifts up and fades as you scroll past.
 */
function HeroSection() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 })
  const opacity = useTransform(progress, [0, 1], [1, 0.1])
  const y = useTransform(progress, [0, 1], [0, -80])
  const scale = useTransform(progress, [0, 1], [1, 0.95])
  // Wait for the loading screen's slide-up before the text fades in.
  const [startDelay] = useState(() => (introPending() ? 2.5 : 0.1))

  return (
    <section ref={ref} className="flex w-full items-center pt-4 pb-10 lg:min-h-[calc(100svh-5rem)] lg:pt-0 lg:pb-28">
      <motion.div
        style={reduce ? undefined : { opacity, y, scale }}
        className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 text-center lg:px-20"
      >
        <motion.div
          initial={reduce ? false : 'hidden'}
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: startDelay } } }}
          className="flex w-full flex-col items-center"
        >
          <motion.p variants={fadeItem} className="flex items-baseline justify-center gap-2 text-lg font-normal sm:gap-3 sm:text-xl">
            <span className="-rotate-3 font-hand text-2xl leading-none font-semibold sm:text-4xl rtl:rotate-0 rtl:font-sans rtl:text-lg rtl:font-normal sm:rtl:text-xl">
              {t('heroHi')}
            </span>
            <span className="text-brand">{t('name')}</span>
            <span>{t('heroHiEnd')}</span>
          </motion.p>

          <motion.h1
            variants={fadeItem}
            className="mt-5 max-w-[1100px] text-[2rem] leading-[1.15] font-black tracking-[-0.02em] text-balance uppercase sm:text-5xl lg:text-6xl rtl:leading-[1.45]"
          >
            {t('heroHeadline')}
          </motion.h1>

          <motion.p variants={fadeItem} className="mt-6 flex items-baseline gap-2 sm:mt-8 sm:gap-3">
            <span className="-rotate-3 font-hand text-3xl leading-none font-semibold sm:text-5xl rtl:rotate-0 rtl:font-sans rtl:text-xl rtl:font-medium sm:rtl:text-3xl">
              {t('heroBasedIn')}
            </span>
            <span className="text-3xl font-black tracking-tight text-brand sm:text-5xl">{t('heroCity')}</span>
          </motion.p>

          <motion.p
            variants={fadeItem}
            className="mt-6 max-w-[800px] text-lg leading-8 font-normal text-[#555] sm:mt-8 dark:text-[#b9afc7]"
          >
            {t('heroBody')}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export function HomePage() {
  return (
    <Shell hero={<HeroSection />}>
      <ProjectsSection />
    </Shell>
  )
}
