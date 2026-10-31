import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'fa'

/** A string in both languages. */
export type Localized = Record<Lang, string>

const en = {
  name: 'Diba Rahbar',
  available: 'Open to new projects',
  heroHi: 'Hi! I’m',
  heroHiEnd: '✿',
  heroHeadline: 'UI/UX Designer, Brand & Visual Identity & AI Content Creator',
  heroBasedIn: 'Based in',
  heroCity: 'Tabriz',
  heroBody:
    'Focusing on minimal aesthetics, human-centered design and creative content. With visual identity design, intuitive UI/UX, and AI-driven content creation, I help businesses build simple, functional and scalable digital brands.',
  realWebsites: 'Real websites',
  uiux: 'UI/UX',
  caseStudies: 'Selected work',
  projects: 'Projects',
  home: 'Home',
  contact: 'Contact',
  sayHello: 'Get in touch',
  contactIntro: 'Have a project in mind, or want to talk? Reach me by email, LinkedIn, Instagram, or Telegram.',
  email: 'Email',
  backToProjects: 'All projects',
  caseStudyCopy: 'Placeholder: who the client is and why they hired you, in two sentences.',
  visitSite: 'Visit live site',
  linkSoon: 'Live link coming soon',
  deliverables: 'Deliverables',
  duration: 'Duration',
  role: 'Role',
  client: 'Client',
  year: 'Year',
  preview: 'preview',
  cover: 'cover',
  hero: 'hero image',
  image: 'image',
  language: 'Language',
  all: 'All',
  brand: 'Brand Identity',
  social: 'Social media',
  uiuxCategory: 'UI/UX',
  filterProjects: 'Filter projects by category',
  results: 'What changed',
  overview: 'Overview',
  objectives: 'Objectives',
  challenge: 'The problem',
  challenges: 'Challenges',
  process: 'Process',
  solution: 'Solution',
  keyFeatures: 'Key Features',
  conclusion: 'Conclusion',
  app: 'App',
  gallery: 'Gallery',
  viewAllProjects: 'See all projects',
  footerLead: 'Have a project ',
  footerTail: 'in mind?',
  startProject: 'Tell me about your project',
  basedIn: 'Based in',
  city: 'Tabriz, Iran',
  backToTop: 'Back to top',
  brief: 'Brief',
  approach: 'Approach',
  positioning: 'Positioning',
  visualIdentity: 'Visual identity',
  result: 'Result',
  briefCopy: 'Placeholder: who the client is, what they asked for, and the goal of the project.',
  approachCopy: 'Placeholder: how you worked, the research, the directions you explored, and why one won.',
  positioningCopy: 'Placeholder: where the brand sits in its market, who it speaks to, and how it should feel.',
  resultCopy: 'Placeholder: the final designs in use, and what changed for the client.',
  colorPalette: 'Color palette',
  logos: 'Logos',
  fonts: 'Font',
  illustrations: 'Illustrations',
  stickers: 'Stickers',
  color: 'Color',
  logo: 'Logo',
  illustration: 'Illustration',
  sticker: 'Sticker',
  visitWebsite: 'Visit website',
  websiteSoon: 'Website link coming soon',
  video: 'Video',
  videoSoon: 'Showcase video coming soon',
  loading: 'Loading',
  darkMode: 'Switch to dark mode',
  lightMode: 'Switch to light mode',
  challengeCopy:
    'Placeholder: what was broken, who it affected, and the limits you worked within, such as the deadline, budget, tech, or brand rules.',
  processCopy:
    'Placeholder: the research, the directions you tried, and why one won. Mention any testing or feedback rounds.',
  solutionCopy:
    'Placeholder: the final design and the two or three decisions that mattered most. Point to the images below.',
}

export type MessageKey = keyof typeof en
type Key = MessageKey

const fa: Record<Key, string> = {
  name: 'دیبا رهبر',
  available: 'پذیرای پروژه‌های جدید',
  heroHi: 'سلام! من',
  heroHiEnd: 'هستم ✿',
  heroHeadline: 'طراح رابط و تجربه کاربری، برند و هویت بصری و تولیدکننده محتوای هوش مصنوعی',
  heroBasedIn: 'ساکن',
  heroCity: 'تبریز',
  heroBody:
    'تمرکز بر زیبایی‌شناسی مینیمال، طراحی انسان‌محور و محتوای خلاق. با طراحی هویت بصری، رابط و تجربه کاربری شهودی و تولید محتوای مبتنی بر هوش مصنوعی، به کسب‌وکارها کمک می‌کنم برندهای دیجیتال ساده، کاربردی و مقیاس‌پذیر بسازند.',
  realWebsites: 'وب‌سایت‌های واقعی',
  uiux: 'UI/UX',
  caseStudies: 'نمونه‌کارهای منتخب',
  projects: 'پروژه‌ها',
  home: 'خانه',
  contact: 'تماس',
  sayHello: 'در تماس باشیم',
  contactIntro: 'پروژه‌ای در ذهن دارید یا می‌خواهید صحبت کنیم؟ از راه ایمیل، لینکدین، اینستاگرام یا تلگرام با من در ارتباط باشید.',
  email: 'Email',
  backToProjects: 'همه‌ی پروژه‌ها',
  caseStudyCopy: 'متن نمونه: کارفرما کیست و چرا شما را انتخاب کرد، در دو جمله.',
  visitSite: 'مشاهده‌ی سایت',
  linkSoon: 'لینک به‌زودی',
  deliverables: 'خروجی‌ها',
  duration: 'مدت',
  role: 'نقش',
  client: 'کارفرما',
  year: 'سال',
  preview: 'پیش‌نمایش',
  cover: 'کاور',
  hero: 'تصویر اصلی',
  image: 'تصویر',
  language: 'زبان',
  all: 'همه',
  brand: 'هویت برند',
  social: 'شبکه‌های اجتماعی',
  uiuxCategory: 'طراحی رابط کاربری و تجربه کاربری',
  filterProjects: 'فیلتر پروژه‌ها بر اساس دسته',
  results: 'چه چیزی تغییر کرد',
  overview: 'معرفی',
  objectives: 'اهداف',
  challenge: 'مسئله',
  challenges: 'چالش‌ها',
  process: 'فرآیند',
  solution: 'راه‌حل',
  keyFeatures: 'ویژگی‌های کلیدی',
  conclusion: 'نتیجه‌گیری',
  app: 'اپ',
  gallery: 'گالری',
  viewAllProjects: 'دیدن همه‌ی پروژه‌ها',
  footerLead: 'پروژه‌ای ',
  footerTail: 'در ذهن دارید؟',
  startProject: 'از پروژه‌تان بگویید',
  basedIn: 'ساکن',
  city: 'تبریز، ایران',
  backToTop: 'بازگشت به بالا',
  brief: 'خلاصه‌ی پروژه',
  approach: 'رویکرد',
  positioning: 'جایگاه‌یابی',
  visualIdentity: 'هویت بصری',
  result: 'نتیجه',
  briefCopy: 'متن نمونه: کارفرما کیست، چه چیزی خواست و هدف پروژه چه بود.',
  approachCopy: 'متن نمونه: چطور کار کردید، پژوهش، مسیرهایی که بررسی کردید و دلیل انتخاب یکی از آن‌ها.',
  positioningCopy: 'متن نمونه: برند در بازارش کجا قرار می‌گیرد، با چه کسانی حرف می‌زند و باید چه حسی بدهد.',
  resultCopy: 'متن نمونه: طرح‌های نهایی در کاربرد واقعی و آنچه برای کارفرما تغییر کرد.',
  colorPalette: 'پالت رنگ',
  logos: 'لوگوها',
  fonts: 'فونت',
  illustrations: 'تصویرسازی‌ها',
  stickers: 'استیکرها',
  color: 'رنگ',
  logo: 'لوگو',
  illustration: 'تصویرسازی',
  sticker: 'استیکر',
  visitWebsite: 'مشاهده‌ی وب‌سایت',
  websiteSoon: 'لینک وب‌سایت به‌زودی',
  video: 'ویدیو',
  videoSoon: 'ویدیوی معرفی به‌زودی',
  loading: 'در حال بارگذاری',
  darkMode: 'تغییر به حالت تیره',
  lightMode: 'تغییر به حالت روشن',
  challengeCopy:
    'متن نمونه: چه چیزی خراب بود، روی چه کسانی اثر می‌گذاشت و در چه محدودیت‌هایی کار کردید؛ مثل زمان، بودجه، فناوری یا قواعد برند.',
  processCopy:
    'متن نمونه: پژوهش، مسیرهایی که امتحان کردید و دلیل انتخاب یکی از آن‌ها. اگر آزمون یا دور بازخورد داشتید، بنویسید.',
  solutionCopy: 'متن نمونه: طرح نهایی و دو سه تصمیمی که بیشترین اثر را داشت. به تصاویر پایین اشاره کنید.',
}

const dictionaries: Record<Lang, Record<Key, string>> = { en, fa }
const STORAGE_KEY = 'lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'fa') return saved
  } catch {
    // Storage can be blocked; fall back to the browser language.
  }
  return navigator.language.toLowerCase().startsWith('fa') ? 'fa' : 'en'
}

type LangContextValue = {
  lang: Lang
  dir: 'ltr' | 'rtl'
  /** BCP 47 locale for Intl formatting, e.g. 'fa-IR'. */
  locale: string
  setLang: (lang: Lang) => void
  t: (key: Key) => string
  /** Pick the current language from a bilingual value. */
  l: (value: Localized) => string
  /** Format a number with the current language's digits, padded to `minDigits`. */
  n: (value: number, minDigits?: number) => string
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const dir = lang === 'fa' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Not persisted; the choice still applies for this visit.
    }
  }, [])

  const value = useMemo<LangContextValue>(() => {
    const locale = lang === 'fa' ? 'fa-IR' : 'en-US'
    return {
      lang,
      dir,
      locale,
      setLang,
      t: key => dictionaries[lang][key],
      l: v => v[lang],
      n: (v, minDigits = 1) => v.toLocaleString(locale, { useGrouping: false, minimumIntegerDigits: minDigits }),
    }
  }, [lang, dir, setLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
