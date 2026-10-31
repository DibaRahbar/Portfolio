import { ArrowLeft } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import CountUp from '@/components/CountUp'
import { Reveal } from '@/components/site/Reveal'
import { Shell } from '@/components/site/Shell'
import { Badge } from '@/components/ui/badge'
import { projects, type Project } from '@/data'
import { useLang, type MessageKey } from '@/i18n'
import { categoryLabel } from '@/lib/category'
import { placeholderImage } from '@/lib/placeholder'
import { BrandStory } from '@/pages/project/BrandStory'
import { GalleryGrid, NumberedSection, StoryText, assetSrc, galleries, mono } from '@/pages/project/shared'
import { VideoSection, WebsiteLink } from '@/pages/project/UiuxExtras'
import { useThemeMode } from '@/theme-mode'
import { ProjectsPage } from '@/pages/ProjectsPage'

/** Hero image that settles from a slight zoom as it scrolls through the viewport. */
function HeroImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1])
  return (
    <div ref={ref} className="mt-12 overflow-hidden rounded-3xl">
      <motion.img src={src} alt={alt} style={reduce ? undefined : { scale }} className="aspect-[1264/600] w-full object-cover" />
    </div>
  )
}

function MetaCard({ project }: { project: Project }) {
  const { t, l, n } = useLang()
  const rows = [
    project.client && [t('client'), l(project.client)],
    project.year !== undefined && [t('year'), n(project.year)],
    [t('role'), l(project.role)],
    project.appTool && [t('app'), l(project.appTool)],
    project.duration && [t('duration'), l(project.duration)],
    project.deliverables && [t('deliverables'), l(project.deliverables)],
  ].filter((row): row is string[] => Boolean(row))
  return (
    <div className="space-y-4">
      {project.category === 'uiux' && <WebsiteLink project={project} className="w-fit" />}
      <dl className="h-fit rounded-3xl border bg-background/80 p-6 backdrop-blur">
        {rows.map(([label, value], i) => (
          <div key={label} className={`flex items-baseline justify-between gap-6 py-3 ${i ? 'border-t' : 'pt-0'}`}>
            <dt className={`${mono} text-muted-foreground`}>{label}</dt>
            <dd className="text-end text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function Results({ project }: { project: Project }) {
  const { t, l, lang, locale } = useLang()
  if (!project.results?.length) return null
  return (
    <section className="mt-16">
      <h2 className={`${mono} text-brand-soft`}>{t('results')}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {project.results.map(result => (
          <Reveal key={result.label.en} className="rounded-3xl border border-brand-soft/20 bg-secondary p-6 sm:p-8">
            <p className="text-5xl font-bold tracking-tight text-brand sm:text-6xl">
              {/* Keyed by language so the count replays with the right digits after switching */}
              <CountUp key={lang} to={result.value} duration={1.6} locale={locale} />
              {l(result.suffix)}
            </p>
            <p className="mt-3 text-sm font-medium text-secondary-foreground/80">{l(result.label)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Story({ project }: { project: Project }) {
  const { t, l } = useLang()
  const cp = project.uiuxCopy
  const sections: { key: MessageKey; body: string }[] = []

  sections.push({ key: 'overview', body: cp?.overview ? l(cp.overview) : `${l(project.description)} ${t('caseStudyCopy')}` })

  if (cp?.objectives) {
    sections.push({ key: 'objectives', body: l(cp.objectives) })
  } else {
    sections.push({ key: 'challenge', body: cp?.challenge ? l(cp.challenge) : t('challengeCopy') })
  }

  if (cp?.challenges) sections.push({ key: 'challenges', body: l(cp.challenges) })

  if (cp?.objectives) {
    // Extended order: solution before process
    if (cp?.solution) sections.push({ key: 'solution', body: l(cp.solution) })
    if (cp?.process) sections.push({ key: 'process', body: l(cp.process) })
  } else {
    sections.push({ key: 'process', body: cp?.process ? l(cp.process) : t('processCopy') })
    sections.push({ key: 'solution', body: cp?.solution ? l(cp.solution) : t('solutionCopy') })
  }

  if (cp?.keyFeatures) sections.push({ key: 'keyFeatures', body: l(cp.keyFeatures) })
  if (cp?.conclusion) sections.push({ key: 'conclusion', body: l(cp.conclusion) })

  return (
    <section className="mt-16 space-y-12 sm:mt-24 sm:space-y-16">
      {sections.map((section, i) => (
        <NumberedSection key={section.key} index={i + 1} title={t(section.key)}>
          <StoryText>{section.body}</StoryText>
        </NumberedSection>
      ))}
    </section>
  )
}

function Gallery({ project }: { project: Project }) {
  const { t } = useLang()
  return (
    <section className="mt-16 sm:mt-24">
      <h2 className={`${mono} text-brand-soft`}>{t('gallery')}</h2>
      <div className="mt-4">
        <GalleryGrid project={project} shots={galleries.social} />
      </div>
    </section>
  )
}

export function ProjectDetailPage({ slug }: { slug: string }) {
  const { t, l, n } = useLang()
  const { isDark } = useThemeMode()
  const project = projects.find(p => p.slug === slug)
  if (!project) return <ProjectsPage category={null} />
  const title = l(project.title)

  return (
    <Shell>
      <a
        href="#/projects"
        className="mt-10 inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2.5 text-[13px] font-medium transition-colors hover:border-brand hover:text-brand"
      >
        <ArrowLeft className="size-4 rtl:-scale-x-100" /> {t('backToProjects')}
      </a>

      <Reveal className="mt-8 grid gap-8 sm:mt-10 sm:gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
        <div>
          <p className={`${mono} text-brand-soft`}>
            {[
              t(categoryLabel[project.category]),
              [project.year !== undefined && n(project.year), project.place && l(project.place)].filter(Boolean).join(' — '),
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
          <h1 className="mt-4 text-4xl leading-[1.08] font-bold tracking-[-0.03em] sm:text-7xl sm:leading-[1.05] rtl:leading-[1.3]">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">{l(project.description)}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <Badge key={tag.en} variant="secondary" className="h-7 px-3 text-[13px]">
                {l(tag)}
              </Badge>
            ))}
          </div>
        </div>
        <MetaCard project={project} />
      </Reveal>

      {project.category === 'social' && (
        <HeroImage
          src={project.coverImage ? assetSrc(project.coverImage) : placeholderImage(`${title} ${t('hero')}`, 1264, 600, isDark)}
          alt={`${title} ${t('hero')}`}
        />
      )}
      <Results project={project} />
      {project.category === 'brand' ? (
        <BrandStory project={project} />
      ) : (
        <>
          {project.category === 'uiux' && <VideoSection project={project} />}
          {!project.hideStory && <Story project={project} />}
          {project.category !== 'uiux' && <Gallery project={project} />}
        </>
      )}
    </Shell>
  )
}
