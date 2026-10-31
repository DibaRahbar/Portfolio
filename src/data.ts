// Placeholder content in English and Persian. Replace names, years, links, and copy with real work.
import type { Localized } from '@/i18n'

export type Website = {
  id: string
  name: Localized
  kind: Localized
  year: number
  tags: Localized[]
  url: string // '#' means no live link yet
}

export type Category = 'brand' | 'social' | 'uiux'
/** Display order: filter buttons and the "All" list. */
export const categories: Category[] = ['uiux', 'brand', 'social']

export type Result = {
  value: number
  suffix: Localized
  label: Localized
}

/** One color in a brand palette. Leave `hex` out until the real color is known. */
export type Swatch = { name: Localized; hex?: string }

/** Brand assets shown in the Visual identity section. Counts are placeholder slots until images are added. */
export type BrandIdentity = {
  palette: Swatch[]
  logos?: number
  /** 'row': logos shown side by side as squares. Default ('stack'): one per row. */
  logosLayout?: 'stack' | 'row'
  /** Real logo image paths inside public/ (e.g. 'Image/L3.jpg'). When present, used instead of placeholder tiles; overrides `logos` count. */
  logoImages?: string[]
  /** Pixel size of logoImages, for correct aspect ratio (no stretching/over-cropping). */
  logoImageSize?: { w: number; h: number }
  fonts?: number
  /** 'row': fonts shown two side by side as rectangles. Default ('stack'): one per row. */
  fontsLayout?: 'stack' | 'row'
  /** Real font image paths inside public/ (e.g. 'Image/F3.jpg'). When present, used instead of placeholder tiles; overrides `fonts` count. */
  fontImages?: string[]
  /** Pixel size of fontImages, for correct aspect ratio. */
  fontImageSize?: { w: number; h: number }
  illustrations?: number
  /** Real illustration image paths inside public/ (e.g. 'Image/FO.jpg'). When present, used instead of placeholder tiles; overrides `illustrations` count. */
  illustrationImages?: string[]
  /** Pixel size of illustrationImages, for correct aspect ratio. */
  illustrationImageSize?: { w: number; h: number }
  stickers?: number
  /** Real sticker image paths inside public/ (e.g. 'Image/ST1.jpg'). When present, used instead of placeholder tiles; overrides `stickers` count. */
  stickerImages?: string[]
  /** Pixel size of stickerImages, for correct aspect ratio. */
  stickerImageSize?: { w: number; h: number }
  /** When true, the Fonts and Stickers groups render side by side instead of stacked. */
  fontStickerSideBySide?: boolean
}

/** Per-project copy for UI/UX case study sections. When present, overrides the generic placeholder text. */
export type UiuxCopy = {
  overview?: Localized
  objectives?: Localized
  challenge?: Localized
  challenges?: Localized
  solution?: Localized
  process?: Localized
  keyFeatures?: Localized
  conclusion?: Localized
}

/** Per-project copy for brand case study sections. When present, overrides the generic placeholder text. */
export type BrandCopy = {
  intro?: Localized
  deliverablesList?: Localized[]
  brief?: Localized
  approach?: Localized
  positioning?: Localized
  visualIdentity?: Localized
  result?: Localized
}

// Fields marked optional are simply not shown when missing, so a real project never needs made-up details.
export type Project = {
  slug: string
  category: Category
  title: Localized
  client?: Localized
  year?: number
  place?: Localized
  description: Localized
  /** Real cover image path inside public/ (e.g. 'Image/3.jpg'). When present, used instead of the placeholder on the project card and (for brand/social) the detail-page hero. */
  coverImage?: string
  tags: Localized[]
  deliverables?: Localized
  duration?: Localized
  role: Localized
  /** Tool used for the project, shown right under Role (e.g. "Figma"). */
  appTool?: Localized
  /** UI/UX projects: when true, the case-study section (Overview, etc.) is not shown at all. */
  hideStory?: boolean
  results?: Result[]
  /** Brand projects: palette, logos, fonts, illustrations, stickers. */
  identity?: BrandIdentity
  /** Brand projects: real case-study copy. When present, replaces generic placeholders. */
  copy?: BrandCopy
  /** Brand projects: when true, Visual identity (text + assets) renders inside the Positioning section instead of its own. */
  mergeIdentityIntoPositioning?: boolean
  /** Brand projects: when true, Visual identity uses the same heading-left/content-right layout as Positioning, instead of the wide layout. */
  visualIdentitySplit?: boolean
  /** UI/UX projects: real case-study copy. When present, replaces generic placeholders. */
  uiuxCopy?: UiuxCopy
  /**
   * Result gallery layout. 'mixed11': 3 wide + 8 regular. 'v5h4': 5 vertical + 4 horizontal.
   * 'horizontal11': 11 horizontal. 'pair10': 10 rectangles, 2 side by side per row.
   * 'vertical8': 8 vertical images, 2 side by side per row. Brand projects without one use a default mix.
   */
  galleryLayout?: 'mixed11' | 'v5h4' | 'horizontal11' | 'pair10' | 'vertical8'
  /** Real result-gallery image paths inside public/ (e.g. 'Image/3.jpg'). When present, used instead of placeholder tiles, matched in order to the gallery layout's shots. */
  resultImages?: string[]
  /** CSS object-position per resultImages index (e.g. {1: 'top'} shifts image 2's crop upward). Defaults to 'center'. */
  resultImageFocus?: Record<number, string>
  /** UI/UX projects: live website. Leave out until known; the page shows "coming soon". */
  url?: string
  /** UI/UX projects: showcase video file in public/videos (e.g. 'videos/academic-hu.mp4') or a full https URL to a video file. */
  video?: string
}

const tag = {
  responsive: { en: 'Responsive', fa: 'واکنش‌گرا' },
  live: { en: 'Live site', fa: 'سایت فعال' },
  ecommerce: { en: 'E-commerce', fa: 'تجارت الکترونیک' },
  landing: { en: 'Landing page', fa: 'لندینگ پیج' },
  dashboard: { en: 'Dashboard', fa: 'داشبورد' },
  mobile: { en: 'Mobile', fa: 'موبایل' },
  data: { en: 'Data-heavy', fa: 'داده‌محور' },
  health: { en: 'Healthcare', fa: 'سلامت' },
  logo: { en: 'Logo', fa: 'لوگو' },
  packaging: { en: 'Packaging', fa: 'بسته‌بندی' },
  identity: { en: 'Brand Identity', fa: 'هویت برند' },
  motion: { en: 'Motion', fa: 'موشن' },
  instagram: { en: 'Instagram', fa: 'اینستاگرام' },
  campaign: { en: 'Campaign', fa: 'کمپین' },
  reels: { en: 'Reels', fa: 'ریلز' },
  ads: { en: 'Ads', fa: 'تبلیغات' },
  website: { en: 'Website', fa: 'وب‌سایت' },
  app: { en: 'App', fa: 'اپلیکیشن' },
  platform: { en: 'Platform', fa: 'پلتفرم' },
  virtual: { en: 'Virtual', fa: 'مجازی' },
  art: { en: 'Art & Culture', fa: 'هنر و فرهنگ' },
  uiDesign: { en: 'UI Design', fa: 'طراحی رابط کاربری' },
  uxDesign: { en: 'UX Design', fa: 'طراحی تجربه کاربری' },
  dashboardDesign: { en: 'Dashboard Design', fa: 'طراحی داشبورد' },
  portfolioDesign: { en: 'Portfolio Design', fa: 'طراحی پورتفولیو' },
}

export const websites: Website[] = [
  {
    id: 'northwind',
    name: { en: 'Northwind Studio', fa: 'استودیو نورث‌ویند' },
    kind: { en: 'Marketing website', fa: 'وب‌سایت معرفی' },
    year: 2026,
    tags: [tag.responsive, tag.live],
    url: '#',
  },
  {
    id: 'harbor',
    name: { en: 'Harbor Bank', fa: 'بانک هاربر' },
    kind: { en: 'Banking website', fa: 'وب‌سایت بانکی' },
    year: 2026,
    tags: [tag.responsive, tag.live],
    url: '#',
  },
  {
    id: 'lumen',
    name: { en: 'Lumen Health', fa: 'لومن هلث' },
    kind: { en: 'Clinic website', fa: 'وب‌سایت کلینیک' },
    year: 2025,
    tags: [tag.responsive, tag.live],
    url: '#',
  },
  {
    id: 'atlas',
    name: { en: 'Atlas Travel', fa: 'اطلس سفر' },
    kind: { en: 'Booking website', fa: 'وب‌سایت رزرو' },
    year: 2025,
    tags: [tag.responsive, tag.live],
    url: '#',
  },
  {
    id: 'pine',
    name: { en: 'Pine & Co', fa: 'پاین و شرکا' },
    kind: { en: 'Online store', fa: 'فروشگاه آنلاین' },
    year: 2025,
    tags: [tag.ecommerce, tag.live],
    url: '#',
  },
  {
    id: 'orbit',
    name: { en: 'Orbit Analytics', fa: 'اوربیت آنالیتیکس' },
    kind: { en: 'SaaS website', fa: 'وب‌سایت SaaS' },
    year: 2024,
    tags: [tag.landing, tag.live],
    url: '#',
  },
]

const allProjects: Project[] = [
  // Real works (details beyond name, category and role are not filled in yet).
  {
    slug: 'mars',
    category: 'brand',
    title: { en: 'Mars Agency', fa: 'مارس آژانس' },
    client: { en: 'MARS', fa: 'MARS' },
    year: 2026,
    description: {
      en: 'Brand identity for MARS, a modern creative and digital agency built around technology, strategy and bold visual communication.',
      fa: 'هویت بصری برند MARS، یک آژانس خلاقانه و دیجیتال مدرن بنا شده بر پایه‌ی فناوری، استراتژی و ارتباط بصری جسورانه.',
    },
    coverImage: 'Image/3.jpg',
    tags: [tag.identity],
    role: { en: 'Brand Identity Designer', fa: 'طراح هویت برند' },
    appTool: { en: 'Adobe Illustrator · Adobe Photoshop', fa: 'ادوبی ایلاستریتور · ادوبی فتوشاپ' },
    identity: {
      palette: [
        { name: { en: 'Vibrant Orange', fa: 'نارنجی زنده' }, hex: '#D44E27' },
        { name: { en: 'Gold', fa: 'طلایی' }, hex: '#DAAC4F' },
        { name: { en: 'Black', fa: 'مشکی' }, hex: '#020202' },
        { name: { en: 'Off-White', fa: 'سفید مایل به خاکستری' }, hex: '#FAFAFA' },
      ],
      logos: 3,
      logosLayout: 'row',
      logoImages: ['Image/L3.jpg', 'Image/L33.jpg', 'Image/L333.jpg'],
      logoImageSize: { w: 936, h: 750 },
      fonts: 1,
      fontImages: ['Image/F3.jpg'],
      fontImageSize: { w: 2985, h: 750 },
    },
    galleryLayout: 'pair10',
    resultImages: [
      'Image/3.jpg',
      'Image/33.jpg',
      'Image/333.jpg',
      'Image/3333.jpg',
      'Image/35.jpg',
      'Image/36.jpg',
      'Image/37.jpg',
      'Image/38.jpg',
      'Image/39.jpg',
    ],
    visualIdentitySplit: true,
    copy: {
      intro: {
        en: 'Mars is a modern creative and digital agency built around technology, strategy, and bold visual communication. The project focuses on turning a multidisciplinary service — combining programming, design, and marketing — into a powerful and memorable brand. At the heart of the identity is a custom geometric logo mark inspired by the planet Mars, supported by bold typography, dynamic modular patterns, and a high-contrast palette of deep black and vibrant orange.',
        fa: 'مارس یک آژانس خلاقانه و دیجیتال مدرن است که بر پایه‌ی فناوری، استراتژی و ارتباط بصری جسورانه بنا شده است. این پروژه بر تبدیل یک سرویس چندرشته‌ای — ترکیب برنامه‌نویسی، طراحی و بازاریابی — به یک برند قدرتمند و به‌یادماندنی تمرکز دارد. در قلب هویت، یک علامت لوگوی هندسی سفارشی الهام‌گرفته از سیاره‌ی مارس قرار دارد که با تایپوگرافی جسورانه، الگوهای ماژولار پویا و یک پالت پرتضاد از سیاه عمیق و نارنجی زنده همراه است.',
      },
      deliverablesList: [
        { en: 'Typography & Logotype', fa: 'تایپوگرافی و لوگوتایپ' },
        { en: 'Brand Color Palette', fa: 'پالت رنگ برند' },
        { en: 'Business Cards & Stationery', fa: 'کارت‌های ویزیت و نوشت‌افزار' },
        { en: 'Envelope & Letterhead', fa: 'پاکت و سربرگ' },
        { en: 'Bi-fold Brochure / Catalog', fa: 'بروشور دولاشو / کاتالوگ' },
        { en: 'Tote Bag', fa: 'کیف توت' },
        { en: 'Framed Poster / Wall Sign', fa: 'پوستر قاب‌دار / تابلوی دیواری' },
        { en: 'Invoice', fa: 'فاکتور' },
        { en: 'Web, App & iPad Design', fa: 'طراحی وب، اپ و آیپد' },
      ],
      brief: {
        en: 'The goal was to design a full visual identity and collateral system for a contemporary agency offering programming, design, and marketing services. The challenge was to keep the brand modern, bold, and full of character, while ensuring all deliverables — from business cards and stationery to merchandise — stay clean, consistent, and easy to scale.',
        fa: 'هدف طراحی یک سیستم هویت بصری و ضمایم کامل برای یک آژانس معاصر بود که خدمات برنامه‌نویسی، طراحی و بازاریابی ارائه می‌دهد. چالش این بود که برند مدرن، جسورانه و پر از شخصیت باشد، در حالی که همه‌ی تحویل‌دادنی‌ها — از کارت‌های ویزیت و نوشت‌افزار تا کالا — تمیز، منسجم و آسان برای مقیاس‌بندی باشند.',
      },
      approach: {
        en: 'The identity is built around structure, technology, and a cosmic theme — not decoration. A custom geometric logo mark (reminiscent of the Red Planet), a bold typeface, and a modular zigzag pattern system form the core of the brand. The color palette stays minimal — deep black, vibrant orange, and clean off-white — to let the striking geometry and typography shine, reflecting the precision of code and the creativity of design.',
        fa: 'هویت بر ساختار، فناوری و تم کیهانی ساخته شده، نه تزئین. یک علامت لوگوی هندسی سفارشی (یادآور سیاره‌ی سرخ)، یک فونت جسورانه و یک سیستم الگوی زیگزاگ ماژولار هسته‌ی اصلی برند را تشکیل می‌دهند. پالت رنگ حداقلی باقی می‌ماند — سیاه عمیق، نارنجی زنده و آف‌وایت تمیز — تا هندسه‌ی چشمگیر و تایپوگرافی بدرخشند و دقت کد و خلاقیت طراحی را منعکس کنند.',
      },
      positioning: {
        en: 'Mars is a forward-thinking, full-service agency focused on innovation, clarity, and measurable results. Instead of conventional corporate aesthetics, the brand uses a confident, structured, and slightly futuristic visual language built around sharp contrasts, geometric consistency, and the mysterious energy of the Red Planet.',
        fa: 'مارس یک آژانس پیشرو و خدمات کامل است که بر نوآوری، وضوح و نتایج قابل اندازه‌گیری تمرکز دارد. به‌جای زیبایی‌شناسی شرکتی معمولی، برند از یک زبان بصری مطمئن، ساختاریافته و کمی آینده‌نگرانه استفاده می‌کند که بر اساس تضادهای تیز، ثبات هندسی و انرژی رمزآلود سیاره‌ی سرخ بنا شده است.',
      },
      visualIdentity: {
        en: 'The identity centers on a custom geometric logo and a bold color blocking system that define the brand\'s look and feel.\n\nDeep black and vibrant orange, inspired by the Mars landscape, reflect a professional yet dynamic personality—combining the logic of programming with the creativity of design and strategy. The supporting diagonal pattern and modular design system help the brand expand across business cards, packaging, signage, merchandise (like t-shirts and mugs), and future applications while staying consistent across every service line.',
        fa: 'هویت بر یک لوگوی هندسی سفارشی و یک سیستم بلوک‌بندی رنگ جسورانه تمرکز دارد که ظاهر و حس برند را تعریف می‌کنند.\n\nسیاه عمیق و نارنجی زنده، الهام‌گرفته از چشم‌انداز مارس، یک شخصیت حرفه‌ای اما پویا را منعکس می‌کنند — که منطق برنامه‌نویسی را با خلاقیت طراحی و استراتژی ترکیب می‌کند. الگوی مورب حمایتی و سیستم طراحی ماژولار به برند کمک می‌کنند تا در کارت‌های ویزیت، بسته‌بندی، تابلوها، کالا (مانند تی‌شرت و ماگ) و کاربردهای آینده گسترش یابد، در حالی که در تمام خطوط خدماتی سازگار باقی می‌ماند.',
      },
      result: {
        en: 'Mars becomes more than just an agency — it turns into a bold, cosmic-driven brand experience. A clear visual system, a strong logo, and a flexible collateral system make it easy to recognize, efficient to use, and ready to grow across technology, design, and marketing landscapes.',
        fa: 'مارس بیش از یک آژانس می‌شود — به یک تجربه‌ی برند جسورانه و کیهان‌محور تبدیل می‌شود. یک سیستم بصری واضح، یک لوگوی قوی و یک سیستم ضمایم انعطاف‌پذیر آن را آسان برای شناخت، کارآمد برای استفاده و آماده برای رشد در حوزه‌های فناوری، طراحی و بازاریابی می‌کند.',
      },
    },
  },
  {
    slug: 'coralia',
    category: 'brand',
    title: { en: 'Coralia Beach Hotel', fa: 'کورالیا هتل ساحلی' },
    client: { en: 'CORALIA', fa: 'CORALIA' },
    year: 2026,
    description: {
      en: 'Brand identity for CORALIA, a modern beach hotel on the Antalya coast with a hand-drawn coral motif and a warm coastal aesthetic.',
      fa: 'هویت بصری برند CORALIA، یک هتل ساحلی مدرن در ساحل آنتالیا با نقش مرجان دست‌کشیده و زیبایی‌شناسی گرم ساحلی.',
    },
    coverImage: 'Image/5.jpg',
    tags: [tag.identity],
    role: { en: 'Brand Identity Designer', fa: 'طراح هویت برند' },
    appTool: { en: 'Adobe Illustrator · Adobe Photoshop', fa: 'ادوبی ایلاستریتور · ادوبی فتوشاپ' },
    identity: {
      palette: [
        { name: { en: 'Coral Pink', fa: 'صورتی مرجانی' }, hex: '#FF6B5E' },
        { name: { en: 'Golden Sand', fa: 'شنی طلایی' }, hex: '#EDD487' },
        { name: { en: 'Ocean Aqua', fa: 'فیروزه‌ای اقیانوس' }, hex: '#A0CEE6' },
        { name: { en: 'Deep Navy', fa: 'سرمه‌ای تیره' }, hex: '#0B4F6C' },
        { name: { en: 'Warm Sand', fa: 'شنی گرم' }, hex: '#D8C2A3' },
      ],
      logos: 4,
      logosLayout: 'row',
      logoImages: ['Image/L2.jpg', 'Image/L22.jpg', 'Image/cooo.jpg', 'Image/L2222.jpg'],
      logoImageSize: { w: 732, h: 729 },
      fonts: 1,
      fontImages: ['Image/FO.jpg'],
      fontImageSize: { w: 1449, h: 750 },
      stickers: 1,
      stickerImages: ['Image/ST1.jpg'],
      stickerImageSize: { w: 1449, h: 750 },
      fontStickerSideBySide: true,
    },
    galleryLayout: 'vertical8',
    resultImages: [
      'Image/28.jpg',
      'Image/27.jpg',
      'Image/26.jpg',
      'Image/25.jpg',
      'Image/24.jpg',
      'Image/23.jpg',
      'Image/22.jpg',
      'Image/21.jpg',
    ],
    visualIdentitySplit: true,
    copy: {
      intro: {
        en: 'Coralia is a modern beach hotel on the Antalya coast, facing the sea. With a minimal visual identity, it turns a simple seaside stay into a warm, memorable experience. Rather than luxury, the brand offers a friendly, effortless aesthetic rooted in the coast\'s relaxed rhythm. At its heart, the identity tells a story of endless beach days through a hand-drawn coral motif, fluid typography, and a vibrant sea-and-sun palette.',
        fa: 'کورالیا یک هتل ساحلی مدرن در ساحل آنتالیا است که روبه‌روی دریا قرار دارد. با یک هویت بصری مینیمال، یک اقامت ساده‌ی کنار دریا را به یک تجربه‌ی گرم و به‌یادماندنی تبدیل می‌کند. به‌جای تجمل، برند یک زیبایی‌شناسی صمیمی و بی‌دردسر ارائه می‌دهد که ریشه در ریتم آرام ساحل دارد.',
      },
      deliverablesList: [
        { en: 'Typography & Logotype', fa: 'تایپوگرافی و لوگوتایپ' },
        { en: 'Brand Color Palette', fa: 'پالت رنگ برند' },
        { en: 'Sticker Pack', fa: 'مجموعه استیکر' },
        { en: 'Door Hangers', fa: 'آویزهای در' },
        { en: 'Business Cards & Stationery', fa: 'کارت‌های ویزیت و نوشت‌افزار' },
        { en: 'Keychains', fa: 'جاکلیدی‌ها' },
        { en: 'Postcards', fa: 'کارت پستال‌ها' },
        { en: 'Room Cards & Envelopes', fa: 'کارت‌های اتاق و پاکت‌ها' },
        { en: 'Outdoor Signage', fa: 'تابلوهای خارجی' },
        { en: 'Tote Bags', fa: 'کیف‌های توت' },
        { en: 'Beach Umbrellas', fa: 'چترهای ساحلی' },
      ],
      brief: {
        en: 'The goal was to design a complete visual identity and hospitality system for a modern coastal retreat. The challenge was to keep everything clean, consistent, and easy to execute across both digital and physical applications, while still giving the brand a unique, coastal personality.',
        fa: 'هدف طراحی یک هویت بصری کامل و سیستم مهمانداری برای یک پناهگاه ساحلی مدرن بود. چالش این بود که همه چیز تمیز، منسجم و آسان برای اجرا در هر دو کاربرد دیجیتال و فیزیکی باشد، در حالی که به برند یک شخصیت منحصر به فرد ساحلی بدهد.',
      },
      approach: {
        en: 'The identity is built around simplicity and readability. The custom coral symbol creates a strong, memorable visual anchor, while the bold logotype adds warmth and character. The color palette is intentionally flat and untextured — mirroring the sunny, laid-back vibe of Antalya. Every application is designed with a "less is more" mindset, using minimal elements and plenty of breathing room to create a system that is easy to adapt and grow.',
        fa: 'هویت بر پایه‌ی سادگی و خوانایی ساخته شده است. نماد مرجان سفارشی یک لنگر بصری قوی و به‌یادماندنی ایجاد می‌کند، در حالی که لوگوتایپ جسورانه گرما و شخصیت اضافه می‌کند. پالت رنگ عمداً مسطح و بدون بافت است — جو آفتابی و آرام آنتالیا را منعکس می‌کند. هر کاربرد با ذهنیت «کمتر بیشتر است» طراحی شده، از عناصر حداقلی و فضای تنفسی فراوان برای ایجاد سیستمی آسان برای تطبیق و رشد استفاده می‌کند.',
      },
      positioning: {
        en: 'Coralia is a friendly, inviting seaside hotel focused on sunshine, relaxation, and unforgettable summer moments. Instead of formality or over-luxury, the brand uses a warm, approachable, and visually airy language built entirely around serenity, comfort, and the genuine promise of a beach day that never ends.',
        fa: 'کورالیا یک هتل ساحلی صمیمی و دعوت‌کننده است که بر آفتاب، آرامش و لحظات تابستانی فراموش‌نشدنی تمرکز دارد. به‌جای رسمیت یا تجمل افراطی، برند از یک زبان بصری گرم، در دسترس و بصری هوایی استفاده می‌کند که کاملاً بر آرامش، آسودگی و وعده‌ی واقعی یک روز ساحلی بنا شده است.',
      },
      visualIdentity: {
        en: 'The identity centers on a clean, modern visual language that perfectly reflects the calmness and vitality of the coast. A soothing palette of coral pinks, ocean aquas, golden sands, and crisp whites captures the vibrant yet untouched spirit of the Antalya shoreline. Supported by expressive sea-life illustrations — including flowing waves, starfish, and the signature coral motif — along with generous negative space, the system creates an effortless and consistent look across welcome cards, tote bags, postcards, outdoor umbrellas, and all guest offerings.',
        fa: 'هویت بر یک زبان بصری تمیز و مدرن تمرکز دارد که آرامش و سرزندگی ساحل را به‌خوبی منعکس می‌کند. یک پالت آرامش‌بخش از صورتی‌های مرجانی، آبی‌های اقیانوسی، شن‌های طلایی و سفیدهای تازه، روح پرجنب‌وجوش اما دست‌نخورده‌ی ساحل آنتالیا را به تصویر می‌کشد. با حمایت تصویرسازی‌های موجودات دریایی — از جمله امواج جاری، ستاره‌ی دریایی و نقش مرجان شاخص — سیستم ظاهری بی‌دردسر و منسجم در سراسر کارت‌های خوش‌آمد، کیف‌های توت، کارت پستال‌ها، چترهای ساحلی و همه‌ی خدمات مهمانان ایجاد می‌کند.',
      },
      result: {
        en: 'Coralia becomes more than a place to stay — it turns into a warm, graphic-driven brand experience. With a clean system, a memorable marine symbol, and a minimal approach, the identity feels cohesive across every physical touchpoint — from beach umbrellas and tote bags to key cards and signage. An identity that is not only easily remembered, but also conveys the inviting spirit of the coast to every guest.',
        fa: 'کورالیا بیش از یک محل اقامت می‌شود — به یک تجربه‌ی برند گرم و گرافیک‌محور تبدیل می‌شود. با یک سیستم تمیز، یک نماد دریایی به‌یادماندنی و یک رویکرد مینیمال، هویت در هر نقطه‌ی تماس فیزیکی — از چترهای ساحلی و کیف‌های توت تا کارت‌های کلید و تابلوها — منسجم احساس می‌شود.',
      },
    },
  },
  {
    slug: 'kooki',
    category: 'brand',
    title: { en: 'Kooki Shop', fa: 'کوکی شاپ' },
    client: { en: 'KOOKI', fa: 'KOOKI' },
    year: 2026,
    description: {
      en: 'Brand identity for KOOKI, a modern cookie bakery built around simplicity, character and everyday enjoyment.',
      fa: 'هویت بصری برند KOOKI، یک نانوایی کوکی مدرن بنا شده بر پایه‌ی سادگی، شخصیت و لذت روزانه.',
    },
    coverImage: 'Image/1222.jpg',
    tags: [tag.identity],
    role: { en: 'Brand Identity Designer', fa: 'طراح هویت برند' },
    appTool: { en: 'Adobe Illustrator · Adobe Photoshop', fa: 'ادوبی ایلاستریتور · ادوبی فتوشاپ' },
    identity: {
      palette: [
        { name: { en: 'Dark Espresso', fa: 'قهوه‌ای تیره' }, hex: '#452911' },
        { name: { en: 'Cinnamon Brown', fa: 'قهوه‌ای دارچینی' }, hex: '#8B5E2F' },
        { name: { en: 'Butter Yellow', fa: 'زرد کره‌ای' }, hex: '#F6DF90' },
        { name: { en: 'Warm Tan', fa: 'نسکافه‌ای گرم' }, hex: '#F3CE9F' },
        { name: { en: 'Cream White', fa: 'سفید کرمی' }, hex: '#FAF5EA' },
      ],
      logos: 3,
      logosLayout: 'row',
      logoImages: ['Image/L1.jpg', 'Image/L11.jpg', 'Image/L111.jpg'],
      logoImageSize: { w: 936, h: 750 },
      illustrations: 1,
      illustrationImages: ['Image/ST.jpg'],
      illustrationImageSize: { w: 2988, h: 750 },
    },
    galleryLayout: 'pair10',
    resultImages: [
      'Image/122.jpg',
      'Image/111.png',
      'Image/1222.jpg',
      'Image/12222.jpg',
      'Image/1.jpg',
      'Image/122222.png',
      'Image/11.jpg',
      'Image/1111.png',
      'Image/122.png',
    ],
    visualIdentitySplit: true,
    copy: {
      intro: {
        en: 'KOOKI is a modern cookie bakery built around simplicity, character, and everyday enjoyment. The project focuses on turning a simple product into a playful and memorable brand through a strong visual identity. At the heart of the identity is a custom mascot, supported by bold typography, expressive illustrations, and a warm, natural color palette inspired by baked goods.',
        fa: 'KOOKI یک نانوایی کوکی مدرن است که بر پایه‌ی سادگی، شخصیت و لذت روزانه بنا شده است. این پروژه بر تبدیل یک محصول ساده به یک برند بازیگوش و به‌یادماندنی از طریق یک هویت بصری قوی تمرکز دارد. در قلب هویت، یک ماسکوت سفارشی قرار دارد که با تایپوگرافی جسورانه، تصویرسازی‌های بیانگر و یک پالت رنگ گرم و طبیعی الهام‌گرفته از محصولات پخته‌شده همراه است.',
      },
      deliverablesList: [
        { en: 'Typography & Logotype', fa: 'تایپوگرافی و لوگوتایپ' },
        { en: 'Brand Color Palette', fa: 'پالت رنگ برند' },
        { en: 'Mascot Illustration System', fa: 'سیستم تصویرسازی ماسکوت' },
        { en: 'Primary Packaging – Cookie Bags', fa: 'بسته‌بندی اصلی – کیسه‌های کوکی' },
        { en: 'Menu Cards', fa: 'منو کارت‌ها' },
        { en: 'Loyalty Cards', fa: 'کارت‌های وفاداری' },
        { en: 'Brown Paper Bags / Takeaway Packaging', fa: 'کیسه‌های کاغذی قهوه‌ای / بسته‌بندی بیرون‌بر' },
        { en: 'Secondary Paper Packaging', fa: 'بسته‌بندی کاغذی ثانویه' },
        { en: 'Outdoor Signage & A-Boards', fa: 'تابلوهای خارجی و تابلوهای ایستاده' },
      ],
      brief: {
        en: 'The goal was to design a full visual identity and packaging system for a contemporary cookie bakery. The challenge was to keep the brand playful and full of personality, while making sure everything stays clean, consistent, and easy to use across different applications and flavor variations.',
        fa: 'هدف طراحی یک سیستم هویت بصری و بسته‌بندی کامل برای یک نانوایی کوکی معاصر بود. چالش این بود که برند بازیگوش و پر از شخصیت باشد، در حالی که همه چیز تمیز، منسجم و آسان برای استفاده در کاربردهای مختلف و تنوع طعم‌ها باشد.',
      },
      approach: {
        en: 'The identity is built around personality first, not decoration. A custom mascot, bold type, and a simple graphic system form the core of the brand. Each flavor gets its own color and visual detail, while everything stays part of one unified system. The packaging is designed as a single recyclable kraft bag that can fit different order sizes, making the system more flexible and reducing material use.',
        fa: 'هویت از شخصیت ساخته شده، نه تزئین. یک ماسکوت سفارشی، تایپوگرافی جسورانه و یک سیستم گرافیکی ساده هسته‌ی اصلی برند را تشکیل می‌دهند. هر طعم رنگ و جزئیات بصری خاص خود را دارد، اما همه چیز بخشی از یک سیستم یکپارچه باقی می‌ماند. بسته‌بندی به‌عنوان یک کیسه‌ی کرافت بازیافتی طراحی شده که در اندازه‌های مختلف سفارش قرار می‌گیرد و سیستم را انعطاف‌پذیرتر کرده و مصرف مواد را کاهش می‌دهد.',
      },
      positioning: {
        en: 'KOOKI is a friendly, modern bakery focused on simple joys and everyday treats. Instead of luxury or nostalgia, the brand uses a warm and approachable visual language built around character and consistency.',
        fa: 'KOOKI یک نانوایی مدرن و صمیمی است که بر لذت‌های ساده و روزانه تمرکز دارد. به‌جای تجمل یا نوستالژی، برند از یک زبان بصری گرم و در دسترس استفاده می‌کند که بر پایه‌ی شخصیت و ثبات ساخته شده است.',
      },
      visualIdentity: {
        en: 'The identity centers on a custom cat mascot and a bold logo that define the brand\'s look and feel. Warm browns, soft neutrals, and natural accents reflect the handmade nature of the product. Supporting illustrations and a modular system help the brand expand across packaging, print, and future applications while staying consistent.',
        fa: 'هویت بر یک ماسکوت گربه‌ی سفارشی و یک لوگوی جسورانه تمرکز دارد که ظاهر و حس برند را تعریف می‌کنند. قهوه‌ای‌های گرم، خنثی‌های ملایم و لهجه‌های طبیعی ماهیت دست‌ساز محصول را منعکس می‌کنند. تصویرسازی‌های حمایتی و یک سیستم ماژولار به برند کمک می‌کنند تا در بسته‌بندی، چاپ و کاربردهای آینده گسترش یابد، در حالی که سازگاری خود را حفظ کند.',
      },
      result: {
        en: 'KOOKI becomes more than a cookie bakery — it turns into a playful, character-driven brand experience. A clear system, a strong mascot, and a simple packaging solution make it easy to recognize, flexible to use, and ready to grow.',
        fa: 'KOOKI بیش از یک نانوایی کوکی می‌شود — به یک تجربه‌ی برند بازیگوش و مبتنی بر شخصیت تبدیل می‌شود. یک سیستم واضح، یک ماسکوت قوی و یک راه‌حل ساده‌ی بسته‌بندی آن را آسان برای شناخت، انعطاف‌پذیر برای استفاده و آماده برای رشد می‌کند.',
      },
    },
  },
  {
    slug: 'academic-hu',
    category: 'uiux',
    title: { en: 'Academic Hu', fa: 'Academic Hu' },
    client: { en: 'Academic Hu', fa: 'Academic Hu' },
    description: {
      en: 'Designed and developed a user-friendly university professor website to share course materials, research publications, and facilitate student communication.',
      fa: 'طراحی و توسعه‌ی یک وب‌سایت کاربرپسند برای یک استاد دانشگاه جهت اشتراک‌گذاری مطالب درسی، انتشارات پژوهشی و تسهیل ارتباط با دانشجویان.',
    },
    tags: [tag.uiDesign, tag.uxDesign, tag.dashboardDesign],
    role: { en: 'UI/UX designer', fa: 'طراح UI/UX' },
    appTool: { en: 'Figma', fa: 'فیگما' },
    hideStory: true,
  },
  {
    slug: 'photography-portfolio',
    category: 'uiux',
    title: { en: 'Photography Portfolio', fa: 'پورتفولیوی عکاسی' },
    client: { en: 'Photographer', fa: 'عکاس' },
    description: {
      en: 'Website and app design for a photography portfolio.',
      fa: 'طراحی وب‌سایت و اپلیکیشن یک پورتفولیوی عکاسی.',
    },
    tags: [tag.uiDesign, tag.uxDesign, tag.portfolioDesign],
    role: { en: 'UI/UX designer', fa: 'طراح UI/UX' },
    appTool: { en: 'Figma', fa: 'فیگما' },
    url: 'https://www.nimaserajian.com',
    hideStory: true,
  },
  {
    slug: 'tabriz-art-gallery',
    category: 'uiux',
    title: { en: 'Tabriz Art Gallery', fa: 'گالری هنری تبریز' },
    description: {
      en: 'Designed and developed a visually engaging platform connecting three art galleries in Tabriz, featuring artwork collections, artist profiles, downloadable catalogs, and gallery information.',
      fa: 'طراحی و توسعه‌ی یک پلتفرم بصری جذاب که سه گالری هنری تبریز را به هم متصل می‌کند، با مجموعه آثار هنری، پروفایل هنرمندان، کاتالوگ‌های قابل دانلود و اطلاعات گالری.',
    },
    tags: [tag.platform, tag.art, tag.virtual, tag.ecommerce],
    role: { en: 'UI/UX designer', fa: 'طراح UI/UX' },
    appTool: { en: 'Figma', fa: 'فیگما' },
    uiuxCopy: {
      overview: {
        en: 'This project is a comprehensive online platform that brings together three of Tabriz\'s most prominent art galleries in one place. Art enthusiasts can easily access current and past exhibitions, explore each gallery\'s unique collection, virtual tours that recreate the feeling of being in a physical gallery.\n\nThe site features dedicated profile pages for each gallery showcasing all available works, along with clear contact information such as email, maps, and opening hours. The main goal of the project was to recreate the rich, engaging experience of visiting a gallery — online — allowing art lovers to connect deeply with Tabriz\'s vibrant art scene.',
        fa: 'این پروژه یک پلتفرم آنلاین جامع است که سه گالری هنری برجسته‌ی تبریز را در یک مکان گرد هم می‌آورد. هنردوستان می‌توانند به راحتی به نمایشگاه‌های جاری و گذشته دسترسی داشته باشند، مجموعه‌ی منحصر به فرد هر گالری را کشف کنند و تورهای مجازی که حس بازدید از یک گالری فیزیکی را بازآفرینی می‌کنند را تجربه کنند.\n\nسایت دارای صفحات پروفایل اختصاصی برای هر گالری است که تمام آثار موجود را به نمایش می‌گذارد، به همراه اطلاعات تماس واضح شامل ایمیل، نقشه و ساعات کار. هدف اصلی پروژه، بازآفرینی تجربه‌ی غنی و جذاب بازدید از یک گالری به صورت آنلاین بود — تا هنردوستان بتوانند به عمق صحنه‌ی هنری پر جنب‌وجوش تبریز دست یابند.',
      },
      objectives: {
        en: '* Showcase exhibitions and artworks from all three galleries\n* Enable users to view arts and download catalogs for listed exhibitions\n* Offer clear "Contact Us" via email and gallery info (working hours, location)\n* Create an intuitive, delightful experience that feels like stepping into a real gallery',
        fa: '* نمایش نمایشگاه‌ها و آثار هنری از هر سه گالری\n* امکان مشاهده و دانلود کاتالوگ‌های نمایشگاه‌های فهرست‌شده\n* ارائه‌ی اطلاعات تماس واضح از طریق ایمیل و اطلاعات گالری (ساعات کار، موقعیت)\n* ایجاد تجربه‌ای شهودی و دلپذیر که حس قدم گذاشتن در یک گالری واقعی را منتقل کند',
      },
      challenges: {
        en: '* Consolidating content from three distinct galleries into a cohesive structure that ensures a smooth and intuitive user experience without causing overwhelm.\n* Designing and presenting extensive exhibition archives with a clear organizational system, visually appealing layouts, and easy access to diverse artworks.\n* Creating user-friendly navigation that allows effortless movement between exhibitions, galleries, and artwork purchase pages while maintaining overall site coherence.\n* Optimizing performance and load times through smart management of large multimedia assets, delivering a fast and uninterrupted experience even with rich visual content.',
        fa: '* ادغام محتوا از سه گالری متمایز در یک ساختار منسجم که بدون ایجاد سردرگمی، تجربه‌ای روان و شهودی فراهم کند.\n* طراحی و ارائه‌ی آرشیوهای گسترده‌ی نمایشگاه با سیستم سازمانی واضح، چیدمان‌های بصری جذاب و دسترسی آسان به آثار هنری متنوع.\n* ایجاد ناوبری کاربرپسند که حرکت بی‌دردسر بین نمایشگاه‌ها، گالری‌ها و صفحات خرید آثار هنری را ممکن سازد.\n* بهینه‌سازی عملکرد و زمان بارگذاری از طریق مدیریت هوشمند دارایی‌های چندرسانه‌ای بزرگ.',
      },
      solution: {
        en: '* Developed modular cards and listing pages for each gallery and exhibition to optimize content management and user experience\n* Designed dedicated exhibition pages featuring detailed artist information, and downloadable catalogs to provide a comprehensive visitor experience\n* Implemented gallery and artist profile pages showcasing all available artworks in a cohesive and accessible manner\n* Integrated a "Contact Us" section with active email links and complete information including address, operating hours, and maps to enhance accessibility and effective communication with users',
        fa: '* توسعه‌ی کارت‌ها و صفحات فهرست ماژولار برای هر گالری و نمایشگاه جهت بهینه‌سازی مدیریت محتوا\n* طراحی صفحات اختصاصی نمایشگاه با اطلاعات دقیق هنرمند و کاتالوگ‌های قابل دانلود\n* پیاده‌سازی صفحات پروفایل گالری و هنرمند با نمایش منسجم تمام آثار موجود\n* یکپارچه‌سازی بخش تماس با لینک‌های ایمیل فعال و اطلاعات کامل شامل آدرس، ساعات کار و نقشه',
      },
      process: {
        en: '* User Research: Conducted targeted interviews with art enthusiasts and gallery managers to deeply understand their browsing preferences and purchasing behaviors, ensuring the platform addresses real user needs.\n* Competitive Analysis: Performed a detailed study of leading art gallery websites to identify best practices in layout design, user flow, and e-commerce integration, setting benchmarks for usability and aesthetic appeal.\n* Wireframing: Developed comprehensive wireframes covering key screens such as the homepage, exhibition pages, artwork details, purchase flow, and contact sections to establish a clear and intuitive structure before visual design.\n* Prototyping & User Testing: Created an interactive prototype to validate navigation, and seamless switching between galleries, gathering user feedback to refine and optimize the experience.\n* UI Design: Delivered a sophisticated visual design that balances minimalist whitespace with rich imagery, enhancing the artistic atmosphere while maintaining commercial functionality, thus effectively representing the galleries\' unique identities.',
        fa: '* تحقیق کاربری: مصاحبه‌های هدفمند با هنردوستان و مدیران گالری برای درک عمیق ترجیحات مرور و رفتارهای خرید\n* تحلیل رقابتی: بررسی دقیق وب‌سایت‌های برجسته‌ی گالری هنری برای شناسایی بهترین شیوه‌ها در طراحی چیدمان و جریان کاربری\n* وایرفریمینگ: تهیه‌ی وایرفریم‌های جامع برای صفحات کلیدی شامل صفحه اصلی، صفحات نمایشگاه و بخش تماس\n* نمونه‌سازی و آزمون کاربری: ساخت نمونه‌ی اولیه‌ی تعاملی برای اعتبارسنجی ناوبری و دریافت بازخورد کاربران\n* طراحی رابط کاربری: ارائه‌ی طراحی بصری که فضای سفید مینیمال را با تصاویر غنی متعادل می‌کند',
      },
      keyFeatures: {
        en: '* Unified Gallery Hub: A home page that features exhibitions from all three galleries\n* Exhibition Pages: Full details including artist info, and downloadable catalogs\n* Artwork Store: Users can add and buy pieces by entering unique artwork codes\n* Gallery & Artist Profiles: Explore all works by a gallery or artist in one place\n* Contact & Info: Email links, hours, map location all clearly available',
        fa: '* مرکز یکپارچه‌ی گالری: صفحه‌ی اصلی با نمایشگاه‌های همه‌ی سه گالری\n* صفحات نمایشگاه: اطلاعات کامل شامل مشخصات هنرمند و کاتالوگ‌های قابل دانلود\n* فروشگاه آثار هنری: خرید آثار با وارد کردن کد منحصربه‌فرد اثر\n* پروفایل گالری و هنرمند: مشاهده‌ی تمام آثار یک گالری یا هنرمند در یک مکان\n* تماس و اطلاعات: لینک‌های ایمیل، ساعات کار و موقعیت روی نقشه',
      },
      conclusion: {
        en: 'This gallery website was designed to reimagine the physical art experience in a digital space — blending curated content, rich visuals, and a smooth, trustworthy buying journey. Visitors can easily explore exhibitions, view artworks in detail, and make purchases directly through the platform.\n\nWith a minimal yet image-rich interface, the site creates an environment that feels both accessible to art lovers and powerful for gallery owners. The result is a modern platform that bridges the gap between art spaces and audiences enabling deeper artistic engagement and more seamless transactions in a digital-first world.',
        fa: 'این وب‌سایت گالری برای بازآفرینی تجربه‌ی هنری فیزیکی در فضای دیجیتال طراحی شد — ترکیب محتوای کیوریت‌شده، تصاویر غنی و مسیر خرید روان و قابل اعتماد. بازدیدکنندگان می‌توانند به راحتی نمایشگاه‌ها را کشف، آثار را با جزئیات ببینند و مستقیماً از طریق پلتفرم خرید کنند.\n\nبا یک رابط کاربری مینیمال اما تصویر-محور، سایت فضایی ایجاد می‌کند که هم برای هنردوستان قابل دسترس و هم برای صاحبان گالری‌ها کارآمد است. نتیجه یک پلتفرم مدرن است که شکاف بین فضاهای هنری و مخاطبان آنلاین را پر می‌کند.',
      },
    },
  },
  {
    slug: 'mars-agency-uiux',
    category: 'uiux',
    title: { en: 'Mars Agency', fa: 'مارس آژانس' },
    client: { en: 'Mars Agency', fa: 'مارس آژانس' },
    description: {
      en: 'UI/UX design for Mars Agency — coming soon.',
      fa: 'طراحی UI/UX برای مارس آژانس — به‌زودی.',
    },
    tags: [tag.uiDesign, tag.uxDesign],
    role: { en: 'UI/UX designer', fa: 'طراح UI/UX' },
    appTool: { en: 'Figma', fa: 'فیگما' },
    deliverables: { en: 'Soon', fa: 'به‌زودی' },
    hideStory: true,
  },

  // Placeholder works (invented details). Replace or remove before sharing the site.
  {
    slug: 'bloom-cafe',
    category: 'social',
    title: { en: 'Mars Agency on Instagram', fa: 'اینستاگرام مارس آژانس' },
    client: { en: 'Mars Agency', fa: 'مارس آژانس' },
    year: 2026,
    place: { en: 'Tabriz', fa: 'تبریز' },
    description: {
      en: 'Instagram grid system, story templates, and content strategy for Mars Agency — currently in process.',
      fa: 'سیستم گرید اینستاگرام، قالب‌های استوری و استراتژی محتوا برای مارس آژانس — در حال انجام.',
    },
    tags: [tag.instagram, tag.campaign],
    deliverables: { en: 'Soon', fa: 'به‌زودی' },
    duration: { en: 'In process', fa: 'در حال انجام' },
    role: { en: 'Social media designer', fa: 'طراح شبکه‌های اجتماعی' },
    hideStory: true,
  },
]

/** Projects grouped in category order (UI/UX, Brand Identity, Social Media). */
export const projects: Project[] = [...allProjects].sort((a, b) => categories.indexOf(a.category) - categories.indexOf(b.category))
