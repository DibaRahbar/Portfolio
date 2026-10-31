import { ArrowUpRight, Mail, Send } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { InstagramIcon, LinkedinIcon } from '@/components/site/BrandIcons'
import { Reveal } from '@/components/site/Reveal'
import { SectionHeading, Shell } from '@/components/site/Shell'
import { useLang } from '@/i18n'
import { contactLinks, isExternal, type ContactLink } from '@/lib/contact'

// Telegram uses the paper-plane icon, as its own logo is not in the icon library.
const icons: Record<ContactLink['id'], ComponentType<SVGProps<SVGSVGElement>>> = {
  email: Mail,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  telegram: Send,
}

export function ContactPage() {
  const { t } = useLang()
  return (
    <Shell>
      <section className="mt-12 sm:mt-14">
        <SectionHeading label={t('sayHello')} title={t('contact')} />
        <p className="mt-6 max-w-none text-lg text-muted-foreground sm:whitespace-nowrap">{t('contactIntro')}</p>

        <ul className="mt-10 grid max-w-3xl grid-cols-1 border-t sm:grid-cols-2 sm:gap-x-10">
          {contactLinks.map(link => {
            const Icon = icons[link.id]
            return (
              <li key={link.id}>
                <Reveal>
                  <a
                    href={link.href}
                    {...(isExternal(link.href) ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="group flex items-center gap-4 border-b py-6 outline-none transition-colors hover:text-brand focus-visible:text-brand sm:gap-6"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border bg-background/80 text-brand backdrop-blur transition-colors group-hover:border-brand group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1 text-xl font-semibold tracking-tight sm:text-2xl">
                      {link.id === 'email' ? t('email') : link.label}
                    </span>
                    <ArrowUpRight className="size-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                  </a>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </section>
    </Shell>
  )
}
