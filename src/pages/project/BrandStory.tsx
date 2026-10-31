import type { Project } from '@/data'
import { useLang } from '@/i18n'
import { placeholderImage } from '@/lib/placeholder'
import { useThemeMode } from '@/theme-mode'
import { Reveal } from '@/components/site/Reveal'
import { GalleryGrid, GroupLabel, NumberedSection, StoryText, assetSrc, galleries, layouts, mono } from '@/pages/project/shared'

/** Gray tiles standing in for artwork until real images are added, or real images when `images` is given. */
function Tiles({
  count,
  images,
  label,
  w,
  h,
  className,
}: {
  count: number
  images?: string[]
  label: string
  w: number
  h: number
  className: string
}) {
  const { isDark } = useThemeMode()
  const { n } = useLang()
  const total = images?.length ?? count
  return (
    <div className={className}>
      {Array.from({ length: total }, (_, i) => (
        <Reveal key={i}>
          <img
            src={images ? assetSrc(images[i]) : placeholderImage(`${label} ${n(i + 1)}`, w, h, isDark)}
            alt={`${label} ${n(i + 1)}`}
            style={{ aspectRatio: `${w} / ${h}` }}
            className="w-full rounded-2xl object-cover"
          />
        </Reveal>
      ))}
    </div>
  )
}

function Palette({ project }: { project: Project }) {
  const { l } = useLang()
  const palette = project.identity?.palette
  if (!palette?.length) return null
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {palette.map(swatch => (
        <Reveal key={swatch.name.en}>
          {/* No hex yet: a neutral swatch with a dashed outline stands in for the color */}
          <div
            style={swatch.hex ? { backgroundColor: swatch.hex } : undefined}
            className={`h-28 rounded-2xl border sm:h-36 ${swatch.hex ? '' : 'border-dashed bg-muted'}`}
          />
          <p className="mt-3 text-sm font-medium">{l(swatch.name)}</p>
          <p className={`${mono} text-muted-foreground`}>{swatch.hex ?? '#——————'}</p>
        </Reveal>
      ))}
    </div>
  )
}

/** Tailwind needs literal class names, so the row column count is mapped rather than interpolated. */
const rowGridCols: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
}

/** Palette, logos, fonts, illustrations and stickers. Logos and fonts are stacked vertically, one per row. */
function IdentityAssets({ project }: { project: Project }) {
  const { t } = useLang()
  const identity = project.identity
  if (!identity) return null

  const fontBlock = !!identity.fonts && (
    <div className="space-y-4">
      <GroupLabel>{t('fonts')}</GroupLabel>
      {identity.fontsLayout === 'row' ? (
        <Tiles
          count={identity.fonts}
          images={identity.fontImages}
          label={t('fonts')}
          w={identity.fontImageSize?.w ?? 620}
          h={identity.fontImageSize?.h ?? 440}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        />
      ) : (
        <Tiles
          count={identity.fonts}
          images={identity.fontImages}
          label={t('fonts')}
          w={identity.fontImageSize?.w ?? 1264}
          h={identity.fontImageSize?.h ?? 520}
          className="grid grid-cols-1 gap-4"
        />
      )}
    </div>
  )

  const stickerBlock = !!identity.stickers && (
    <div className="space-y-4">
      <GroupLabel>{t('stickers')}</GroupLabel>
      <Tiles
        count={identity.stickers}
        images={identity.stickerImages}
        label={t('sticker')}
        w={identity.stickerImageSize?.w ?? (identity.stickers === 1 ? 1264 : 400)}
        h={identity.stickerImageSize?.h ?? (identity.stickers === 1 ? 560 : 400)}
        className={identity.stickers === 1 ? 'grid grid-cols-1' : 'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6'}
      />
    </div>
  )

  const fontStickerSideBySide = identity.fontStickerSideBySide && !!identity.fonts && !!identity.stickers

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <GroupLabel>{t('colorPalette')}</GroupLabel>
        <Palette project={project} />
      </div>

      {!!identity.logos && (
        <div className="space-y-4">
          <GroupLabel>{t('logos')}</GroupLabel>
          {identity.logosLayout === 'row' ? (
            <Tiles
              count={identity.logos}
              images={identity.logoImages}
              label={t('logo')}
              w={identity.logoImageSize?.w ?? 400}
              h={identity.logoImageSize?.h ?? 400}
              className={`grid grid-cols-2 gap-4 ${rowGridCols[identity.logos] ?? 'sm:grid-cols-3'}`}
            />
          ) : (
            <Tiles
              count={identity.logos}
              images={identity.logoImages}
              label={t('logo')}
              w={identity.logoImageSize?.w ?? 1264}
              h={identity.logoImageSize?.h ?? 420}
              className="grid grid-cols-1 gap-4"
            />
          )}
        </div>
      )}

      {fontStickerSideBySide ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {fontBlock}
          {stickerBlock}
        </div>
      ) : (
        <>
          {fontBlock}
          {!!identity.illustrations && (
            <div className="space-y-4">
              <GroupLabel>{t('illustrations')}</GroupLabel>
              <Tiles
                count={identity.illustrations}
                images={identity.illustrationImages}
                label={t('illustration')}
                w={identity.illustrationImageSize?.w ?? (identity.illustrations === 1 ? 1264 : 620)}
                h={identity.illustrationImageSize?.h ?? (identity.illustrations === 1 ? 560 : 620)}
                className={identity.illustrations === 1 ? 'grid grid-cols-1' : 'grid grid-cols-2 gap-4 md:grid-cols-4'}
              />
            </div>
          )}
          {stickerBlock}
        </>
      )}
    </div>
  )
}

/** Brand case study: Brief, Approach, Positioning, Visual identity, Result (with the final designs). */
export function BrandStory({ project }: { project: Project }) {
  const { t, l } = useLang()
  const cp = project.copy
  const shots = project.galleryLayout ? layouts[project.galleryLayout] : galleries.brand
  const mergeIdentity = project.mergeIdentityIntoPositioning
  return (
    <section className="mt-16 space-y-12 sm:mt-24 sm:space-y-16">
      {cp?.intro && (
        <Reveal>
          <p className="max-w-[72ch] text-lg leading-8 text-muted-foreground">{l(cp.intro)}</p>
        </Reveal>
      )}

      {cp?.deliverablesList && (
        <Reveal>
          <div className="rounded-2xl border border-dashed p-6 sm:p-8">
            <p className={`${mono} mb-4 text-xs tracking-[0.08em] text-brand-soft uppercase`}>{t('deliverables')}</p>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {cp.deliverablesList.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                  <span className="size-1.5 shrink-0 rounded-full bg-brand" />
                  {l(item)}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      <NumberedSection index={1} title={t('brief')}>
        <StoryText>{cp?.brief ? l(cp.brief) : t('briefCopy')}</StoryText>
      </NumberedSection>
      <NumberedSection index={2} title={t('approach')}>
        <StoryText>{cp?.approach ? l(cp.approach) : t('approachCopy')}</StoryText>
      </NumberedSection>
      {mergeIdentity ? (
        <NumberedSection index={3} title={t('positioning')} wide>
          <StoryText>{cp?.positioning ? l(cp.positioning) : t('positioningCopy')}</StoryText>
          {cp?.visualIdentity && (
            <Reveal>
              <p className="mt-8 max-w-[72ch] text-base leading-7 text-muted-foreground">{l(cp.visualIdentity)}</p>
            </Reveal>
          )}
          <div className="mt-8">
            <IdentityAssets project={project} />
          </div>
        </NumberedSection>
      ) : (
        <>
          <NumberedSection index={3} title={t('positioning')}>
            <StoryText>{cp?.positioning ? l(cp.positioning) : t('positioningCopy')}</StoryText>
          </NumberedSection>
          <NumberedSection index={4} title={t('visualIdentity')} wide={!project.visualIdentitySplit}>
            {cp?.visualIdentity && (
              <Reveal>
                <StoryText>{l(cp.visualIdentity)}</StoryText>
              </Reveal>
            )}
            <div className={`mt-8 ${project.visualIdentitySplit ? 'lg:col-span-2' : ''}`}>
              <IdentityAssets project={project} />
            </div>
          </NumberedSection>
        </>
      )}
      <NumberedSection index={mergeIdentity ? 4 : 5} title={t('result')} wide>
        <StoryText>{cp?.result ? l(cp.result) : t('resultCopy')}</StoryText>
        <div className="mt-8">
          <GalleryGrid project={project} shots={shots} />
        </div>
      </NumberedSection>
    </section>
  )
}
