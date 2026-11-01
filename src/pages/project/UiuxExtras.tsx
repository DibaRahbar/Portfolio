import { ArrowUpRight, Play } from 'lucide-react'
import type { Project } from '@/data'
import { useLang } from '@/i18n'
import { Reveal } from '@/components/site/Reveal'
import { mono } from '@/pages/project/shared'

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
      href={project.url}
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
