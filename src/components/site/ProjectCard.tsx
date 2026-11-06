import SpotlightCard from '@/components/SpotlightCard'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/data'
import { useLang } from '@/i18n'
import { categoryLabel } from '@/lib/category'
import { placeholderImage } from '@/lib/placeholder'
import { assetSrc } from '@/pages/project/shared'
import { colors, darkColors, placeholderColors } from '@/theme'
import { useThemeMode } from '@/theme-mode'

export function ProjectCard({ project }: { project: Project }) {
  const { t, l, n } = useLang()
  const { isDark } = useThemeMode()
  const title = l(project.title)
  const placeholder = isDark ? placeholderColors.dark : placeholderColors.light
  // Year and city, when known.
  const when = [project.year !== undefined && n(project.year), project.place && l(project.place)].filter(Boolean).join(' — ')

  return (
    <a
      href={`#/projects/${project.slug}`}
      className="group block h-full rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <SpotlightCard
        theme={isDark ? 'dark' : 'light'}
        spotlightColor={isDark ? darkColors.spotlight : colors.tertiary}
        intensity={0.45}
        borderGlow={1}
        spotlightSize={340}
        className="h-full p-4! transition-transform duration-500 ease-out group-hover:-translate-y-1"
      >
        <div className="relative overflow-hidden rounded-2xl">
          {!project.coverImage && project.coverLabel ? (
            <div
              role="img"
              aria-label={`${title} ${t('cover')}: ${l(project.coverLabel)}`}
              style={{ backgroundColor: placeholder.fill, color: placeholder.text }}
              className="grid aspect-[620/380] w-full place-items-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            >
              <span className="font-mono text-base font-medium tracking-[0.18em] uppercase sm:text-lg rtl:font-sans rtl:tracking-normal">
                {l(project.coverLabel)}
              </span>
            </div>
          ) : (
            <img
              src={project.coverImage ? assetSrc(project.coverImage) : placeholderImage(`${title} ${t('cover')}`, undefined, undefined, isDark)}
              alt={`${title} ${t('cover')}`}
              style={{
                ...(project.coverFocus ? { objectPosition: project.coverFocus } : {}),
                // transform (not the scale property) so the hover zoom below still stacks on top of it.
                ...(project.coverZoom ? { transform: `scale(${project.coverZoom})` } : {}),
              }}
              className="aspect-[620/380] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          )}
          <Badge className="absolute start-3 top-3 h-7 px-3 text-[13px]">{t(categoryLabel[project.category])}</Badge>
        </div>
        <div className="px-2 pt-5 pb-2">
          {when && (
            <p className="font-mono text-[11px] tracking-[0.06em] text-brand-soft uppercase">{when}</p>
          )}
          <h3 className="mt-2 text-[28px] leading-[34px] font-semibold tracking-tight transition-colors group-hover:text-brand">
            {title}
          </h3>
          <p className="mt-2 text-[15px] leading-6 text-muted-foreground">{l(project.description)}</p>
          <div className="mt-5 flex flex-wrap gap-2 border-t pt-4">
            {project.tags.map(tag => (
              <Badge key={tag.en} variant="secondary" className="h-6 px-2.5">
                {l(tag)}
              </Badge>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </a>
  )
}
