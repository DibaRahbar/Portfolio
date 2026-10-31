import { ArrowUpRight } from 'lucide-react'
import TiltedCard from '@/components/TiltedCard'
import { Badge } from '@/components/ui/badge'
import type { Website } from '@/data'
import { useLang } from '@/i18n'
import { placeholderImage } from '@/lib/placeholder'

export function WebsiteTile({ site }: { site: Website }) {
  const { t, l, n } = useLang()
  const hasLink = site.url !== '#'
  const name = l(site.name)

  return (
    <a
      href={hasLink ? site.url : undefined}
      target={hasLink ? '_blank' : undefined}
      rel={hasLink ? 'noreferrer' : undefined}
      className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <TiltedCard
        imageSrc={placeholderImage(`${name} ${t('preview')}`)}
        altText={`${name} ${t('preview')}`}
        captionText={hasLink ? t('visitSite') : t('linkSoon')}
        containerHeight="260px"
        containerWidth="100%"
        imageHeight="260px"
        imageWidth="100%"
        rotateAmplitude={10}
        scaleOnHover={1.04}
        showMobileWarning={false}
        showTooltip
      />
      <div className="mt-5 flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-brand">{name}</h3>
        {/* Mirrored in RTL so the arrow points up and toward the reading direction */}
        <ArrowUpRight className="size-5 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-soft rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        {l(site.kind)} · {n(site.year)}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {site.tags.map(tag => (
          <Badge key={tag.en} variant="secondary" className="h-6 px-2.5">
            {l(tag)}
          </Badge>
        ))}
      </div>
    </a>
  )
}
