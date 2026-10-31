import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/site/Reveal'
import { useLang } from '@/i18n'
import { contactLinks, isExternal } from '@/lib/contact'

const link = 'text-sm text-foreground/70 transition-colors hover:text-brand'

/** Minimal frosted-glass footer floating over soft brand-colored light. */
export function Footer() {
  const { t, n } = useLang()
  const pages = [
    { label: t('home'), href: '#/' },
    { label: t('projects'), href: '#/projects' },
    { label: t('contact'), href: '#/contact' },
  ]

  return (
    <footer className="relative isolate mx-auto mt-20 max-w-[1264px] px-4 pb-32 sm:mt-32 sm:px-8 sm:pb-36 xl:px-0">
      {/* Soft color behind the glass so the blur has something to catch */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute start-[8%] top-6 size-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute end-[10%] top-24 size-80 rounded-full bg-brand-soft/30 blur-3xl" />
        <div className="absolute start-[40%] top-40 size-64 rounded-full bg-secondary blur-3xl" />
      </div>

      <Reveal>
        <div className="rounded-[2rem] border border-white/70 bg-white/45 p-6 shadow-[0_8px_40px_-12px_rgba(84,23,144,0.18)] ring-1 ring-white/40 ring-inset backdrop-blur-2xl backdrop-saturate-150 sm:p-12 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] dark:ring-white/5">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm text-foreground/60">{t('available')}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
                {t('footerLead')} <span className="text-brand">{t('footerTail')}</span>
              </h2>
            </div>
            <a
              href="#/contact"
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-8px_rgba(84,23,144,0.6)] transition-transform hover:-translate-y-0.5"
            >
              {t('startProject')}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
            </a>
          </div>

          <div className="my-8 h-px bg-foreground/10 sm:my-10" />

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <nav aria-label={t('projects')} className="flex flex-wrap gap-x-6 gap-y-2">
              {pages.map(page => (
                <a key={page.href} href={page.href} className={link}>
                  {page.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {contactLinks.map(contact => (
                <a
                  key={contact.id}
                  href={contact.href}
                  {...(isExternal(contact.href) ? { target: '_blank', rel: 'noreferrer' } : {})}
                  lang="en"
                  className={link}
                >
                  {contact.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 text-xs text-foreground/50">
            <span>
              © {n(new Date().getFullYear())} {t('name')} · {t('basedIn')} {t('city')}
            </span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label={t('backToTop')}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-white/70 bg-white/60 text-foreground/70 backdrop-blur transition-colors hover:text-brand dark:border-white/15 dark:bg-white/10"
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
