import { ArrowUpRight, ChevronDown, Download, Play } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useId, useState } from 'react'
import type { CaseStudyFile, Project } from '@/data'
import { useLang } from '@/i18n'
import { Reveal } from '@/components/site/Reveal'
import { assetSrc, mono } from '@/pages/project/shared'

/** Info-card row that expands to list downloadable case-study files. */
export function CaseStudyRow({ files }: { files: CaseStudyFile[] }) {
  const { t, l } = useLang()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const listId = useId()
  return (
    <div className="border-t py-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen(value => !value)}
        className="group flex w-full items-center justify-between gap-6 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <span className={`${mono} text-muted-foreground transition-colors group-hover:text-brand`}>{t('caseStudy')}</span>
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform duration-300 group-hover:text-brand ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            id={listId}
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {files.map(file => (
              <li key={file.href} className="pt-3">
                <a
                  href={assetSrc(file.href)}
                  download={file.fileName}
                  className="group flex items-center justify-between gap-4 text-sm font-medium outline-none transition-colors hover:text-brand focus-visible:text-brand"
                >
                  <span>{l(file.label)}</span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border text-brand transition-colors group-hover:border-brand group-hover:bg-primary group-hover:text-primary-foreground group-focus-visible:border-brand">
                    <Download className="size-3.5" aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Resolves a video path inside public/ (works under the GitHub Pages sub-path) or passes a full URL through. */
const videoSrc = (video: string) => (/^https?:\/\//.test(video) ? video : `${import.meta.env.BASE_URL}${video.replace(/^\//, '')}`)

/** "Visit website" button, or a muted "coming soon" label until the project has a URL. */
export function WebsiteLink({ project, className = 'mt-6' }: { project: Project; className?: string }) {
  const { t } = useLang()
  if (!project.url) {
    return (
      <span className={`${className} inline-flex w-fit items-center gap-2 rounded-full border border-dashed px-6 py-3 text-sm font-medium text-muted-foreground`}>
        {t('websiteSoon')}
      </span>
    )
  }
  return (
    <a
      href={assetSrc(project.url)}
      target="_blank"
      rel="noreferrer"
      className={`group ${className} inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-soft`}
    >
      {t('visitWebsite')}
      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
    </a>
  )
}

/** Showcase video player, or a 16:9 placeholder until a video file is set on the project. */
export function VideoSection({ project }: { project: Project }) {
  const { t } = useLang()
  return (
    <section className="mt-16 sm:mt-24">
      <h2 className={`${mono} text-brand-soft`}>{t('video')}</h2>
      <Reveal className="mt-4">
        {project.video ? (
          <video
            controls
            playsInline
            preload="metadata"
            src={videoSrc(project.video)}
            className="aspect-video w-full rounded-3xl bg-black object-contain"
          />
        ) : (
          <div className="grid aspect-video w-full place-items-center rounded-3xl border border-dashed bg-muted/60">
            <div className="flex flex-col items-center gap-4 px-6 text-center">
              <span className="grid size-16 place-items-center rounded-full bg-primary text-primary-foreground">
                <Play className="size-6 translate-x-0.5 fill-current rtl:-translate-x-0.5 rtl:-scale-x-100" />
              </span>
              <p className="text-sm font-medium text-muted-foreground">{t('videoSoon')}</p>
            </div>
          </div>
        )}
      </Reveal>
    </section>
  )
}
