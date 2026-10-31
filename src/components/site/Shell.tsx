import { Moon, Sun } from 'lucide-react'
import type { ReactNode } from 'react'
import { Footer } from '@/components/site/Footer'
import { useLang, type Lang } from '@/i18n'
import { burst } from '@/lib/burst'
import { useThemeMode } from '@/theme-mode'

export function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.06em] text-brand-soft uppercase">{label}</p>
      <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
    </div>
  )
}

function LanguageSwitch() {
  const { lang, setLang, t } = useLang()
  const options: { value: Lang; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'fa', label: 'فا' },
  ]
  return (
    <div role="group" aria-label={t('language')} className="flex rounded-full border bg-background p-1">
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          lang={option.value}
          aria-pressed={lang === option.value}
          onClick={() => setLang(option.value)}
          className="min-w-10 rounded-full px-3 py-1 text-[13px] font-medium text-muted-foreground transition-colors hover:text-brand aria-pressed:bg-primary aria-pressed:text-primary-foreground"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function ThemeToggle() {
  const { t } = useLang()
  const { isDark, toggle } = useThemeMode()
  return (
    <button
      type="button"
      onClick={event => {
        const rect = event.currentTarget.getBoundingClientRect()
        const origin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) burst(origin.x, origin.y)
        toggle(origin)
      }}
      aria-label={isDark ? t('lightMode') : t('darkMode')}
      className="grid size-10 place-items-center rounded-full border bg-background text-muted-foreground transition-colors hover:text-brand"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}

export function Shell({ children, hero }: { children: ReactNode; hero?: ReactNode }) {
  const { t } = useLang()
  return (
    <>
      {/* h-20 (5rem): the hero subtracts this so header + hero fill exactly one screen. */}
      <header className="mx-auto flex h-20 max-w-[1264px] items-center justify-between gap-4 px-4 sm:px-8 xl:px-0">
        <a href="#/" className="text-xl font-semibold tracking-tight">
          {t('name')}
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitch />
        </div>
      </header>
      {hero}
      <main className="mx-auto max-w-[1264px] px-4 sm:px-8 xl:px-0">{children}</main>
      <Footer />
    </>
  )
}
