import { BriefcaseBusiness, House, MessageCircle } from 'lucide-react'
import Dock from '@/components/Dock'
import { useLang } from '@/i18n'
import { colors, darkColors } from '@/theme'
import { useThemeMode } from '@/theme-mode'

export type Section = 'home' | 'projects' | 'contact'

const go = (hash: string) => () => {
  window.location.hash = hash
}

export function SiteDock({ active }: { active: Section }) {
  const { t } = useLang()
  const { isDark } = useThemeMode()
  const items = [
    { icon: <House className="size-5" />, label: t('home'), onClick: go('#/'), active: active === 'home' },
    { icon: <BriefcaseBusiness className="size-5" />, label: t('projects'), onClick: go('#/projects'), active: active === 'projects' },
    { icon: <MessageCircle className="size-5" />, label: t('contact'), onClick: go('#/contact'), active: active === 'contact' },
  ]

  return (
    // The dock is centered with a transform, so it is pinned to LTR to keep that math stable in RTL.
    <div dir="ltr" className="pointer-events-none fixed inset-x-0 bottom-0 z-50 h-40">
      <Dock
        items={items}
        theme={isDark ? 'dark' : 'light'}
        position="bottom"
        baseItemSize={52}
        magnification={72}
        tiles
        showLabels
        showIndicators
        accentColor={isDark ? darkColors.dotActive : colors.primary}
        className="pointer-events-auto"
      />
    </div>
  )
}
