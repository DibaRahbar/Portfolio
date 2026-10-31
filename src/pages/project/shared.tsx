import type { ReactNode } from 'react'
import { Reveal } from '@/components/site/Reveal'
import type { Project } from '@/data'
import { useLang } from '@/i18n'
import { placeholderImage } from '@/lib/placeholder'
import { useThemeMode } from '@/theme-mode'

export const mono = 'font-mono text-[11px] tracking-[0.06em] uppercase'

/** Resolves an asset path inside public/ (works under the GitHub Pages sub-path) or passes a full URL through. */
export const assetSrc = (path: string) => (/^https?:\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`)

/** Small caption above a group of assets, e.g. "Color palette". */
export function GroupLabel({ children }: { children: ReactNode }) {
  return <h3 className={`${mono} text-brand-soft`}>{children}</h3>
}

/** A numbered story section. `wide` puts the heading above full-width content instead of beside it. */
export function NumberedSection({
  index,
  title,
  wide = false,
  children,
}: {
  index: number
  title: string
  wide?: boolean
  children: ReactNode
}) {
  const { n } = useLang()
  const heading = (
    <div>
      <p className={`${mono} text-brand-soft`}>{n(index, 2)}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  )
  if (wide) {
    return (
      <Reveal className="border-t pt-10">
        {heading}
        <div className="mt-8">{children}</div>
      </Reveal>
    )
  }
  return (
    <Reveal className="grid gap-4 border-t pt-10 lg:grid-cols-[300px_1fr] lg:gap-16">
      {heading}
      {children}
    </Reveal>
  )
}

function BulletList({ text }: { text: string }) {
  const items = text.split('\n').filter(l => l.startsWith('* ')).map(l => l.slice(2))
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-lg leading-8 text-muted-foreground">
          <span className="mt-3 size-1.5 shrink-0 rounded-full bg-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function StoryText({ children }: { children: ReactNode }) {
  if (typeof children !== 'string') {
    return <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{children}</p>
  }
  const isBullet = (s: string) => s.trimStart().startsWith('* ')
  if (children.includes('\n\n')) {
    return (
      <div className="max-w-2xl space-y-4">
        {children.split('\n\n').map((para, i) =>
          isBullet(para) ? <BulletList key={i} text={para} /> : <p key={i} className="text-lg leading-8 text-muted-foreground">{para}</p>
        )}
      </div>
    )
  }
  if (isBullet(children)) return <BulletList text={children} />
  return <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{children}</p>
}

export type Shot = { w: number; h: number; span: string }

const wide: Shot = { w: 1264, h: 560, span: 'col-span-6' }
const half: Shot = { w: 620, h: 440, span: 'col-span-6 md:col-span-3' }

/** 3 horizontal (wide) images and 8 regular ones: 11 in total. */
export const mixed11: Shot[] = [wide, half, half, half, half, wide, half, half, half, half, wide]

const tall3: Shot = { w: 400, h: 500, span: 'col-span-6 sm:col-span-2' }
const tall2: Shot = { w: 620, h: 775, span: 'col-span-6 sm:col-span-3' }

/** 5 vertical and 4 horizontal photos: 9 in total. */
export const v5h4: Shot[] = [wide, tall3, tall3, tall3, wide, tall2, tall2, wide, wide]

/** 11 horizontal images, one per row. */
export const horizontal11: Shot[] = Array.from({ length: 11 }, () => wide)

/** 10 rectangles, two side by side per row: 5 rows of 2. */
export const pair10: Shot[] = Array.from({ length: 10 }, () => half)

/** 8 vertical images, two side by side per row: 4 rows of 2. */
export const vertical8: Shot[] = Array.from({ length: 8 }, () => tall2)

export const layouts = { mixed11, v5h4, horizontal11, pair10, vertical8 }

/** Default gallery per category: a mix for brand, portrait posts for social. UI/UX pages have no gallery. */
export const galleries: Record<Exclude<Project['category'], 'uiux'>, Shot[]> = {
  brand: [
    { w: 620, h: 620, span: 'col-span-6 md:col-span-3' },
    { w: 620, h: 620, span: 'col-span-6 md:col-span-3' },
    { w: 1264, h: 560, span: 'col-span-6' },
    { w: 400, h: 400, span: 'col-span-6 sm:col-span-2' },
    { w: 400, h: 400, span: 'col-span-6 sm:col-span-2' },
    { w: 400, h: 400, span: 'col-span-6 sm:col-span-2' },
  ],
  social: Array.from({ length: 6 }, () => ({ w: 480, h: 600, span: 'col-span-3 md:col-span-2' })),
}

/** Grid of placeholder images laid out from a list of shots, or real images when the project has `resultImages`. */
export function GalleryGrid({ project, shots }: { project: Project; shots: Shot[] }) {
  const { t, l, n } = useLang()
  const { isDark } = useThemeMode()
  const title = l(project.title)
  const images = project.resultImages
  const rows = images ? shots.slice(0, images.length) : shots
  return (
    <div className="grid grid-cols-6 gap-4">
      {rows.map((shot, i) => {
        const label = `${t('image')} ${n(i + 1)}`
        return (
          <Reveal key={i} className={shot.span}>
            <img
              src={images ? assetSrc(images[i]) : placeholderImage(label, shot.w, shot.h, isDark)}
              alt={`${title} — ${label}`}
              style={{ aspectRatio: `${shot.w} / ${shot.h}`, objectPosition: project.resultImageFocus?.[i] ?? 'center' }}
              className="w-full rounded-2xl object-cover"
            />
          </Reveal>
        )
      })}
    </div>
  )
}
