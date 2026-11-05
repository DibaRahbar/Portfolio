import { projects, type Category, type Project } from '@/data'
import type { Localized } from '@/i18n'

/** A folder inside a category. Folders without `children` are leaves and hold projects (via `Project.folder`). */
export type Folder = { id: string; label: Localized; children?: Folder[] }

const folder = (id: string, en: string, fa: string, children?: Folder[]): Folder => ({ id, label: { en, fa }, children })

/** Folder tree per category. Categories not listed here have no folders. Leaf ids are unique across the whole tree. */
export const folders: Partial<Record<Category, Folder[]>> = {
  graphic: [
    folder('packaging-label', 'Packaging & Label Design', 'طراحی بسته‌بندی و لیبل'),
    folder('editorial-print', 'Editorial & Print Design', 'طراحی انتشاراتی و چاپی'),
    folder('menu-hospitality', 'Menu & Hospitality Design', 'طراحی منو و صنعت پذیرایی'),
    folder('stationery', 'Stationery Design', 'طراحی ست اداری'),
    folder('signage-environmental', 'Signage & Environmental Graphics', 'طراحی تابلو و گرافیک محیطی'),
    folder('promotional-merchandise', 'Promotional Merchandise Design', 'طراحی کالاهای تبلیغاتی'),
    folder('retail-exhibition', 'Retail & Exhibition Design', 'طراحی فروشگاهی و نمایشگاهی'),
    folder('ecommerce-packaging', 'E-commerce Packaging & Collateral', 'طراحی بسته‌بندی و ملزومات فروشگاه اینترنتی'),
  ],
  social: [
    folder('social-media', 'Social Media', 'شبکه‌های اجتماعی', [
      folder('post-carousel', 'Post & Carousel Design', 'طراحی پست و کاروسل'),
      folder('story-highlight', 'Story & Highlight Design', 'طراحی استوری و هایلایت'),
      folder('instagram-feed', 'Instagram Feed Design', 'طراحی فید اینستاگرام'),
      folder('content-strategy', 'Content Strategy & Planning', 'استراتژی و برنامه‌ریزی محتوا'),
      folder('content-creation', 'Content Creation', 'تولید محتوا'),
    ]),
    folder('creative-campaigns', 'Creative Campaigns', 'کمپین‌های خلاق', [
      folder('beauty-skincare', 'Beauty & Skincare', 'زیبایی و مراقبت پوست'),
      folder('jewelry-luxury', 'Jewelry & Luxury', 'جواهر و لوکس'),
      folder('fashion-apparel', 'Fashion & Apparel', 'مد و پوشاک'),
      folder('fragrance', 'Fragrance', 'عطر'),
      folder('food-beverage', 'Food & Beverage', 'غذا و نوشیدنی'),
      folder('home-lifestyle', 'Home & Lifestyle', 'خانه و سبک زندگی'),
      folder('product-advertising', 'Product Advertising', 'تبلیغات محصول'),
    ]),
  ],
}

/** Folders from the category's top level down to `id` (inclusive), or null when the id is not in that category. */
export function folderPath(category: Category, id: string): Folder[] | null {
  const walk = (nodes: Folder[], trail: Folder[]): Folder[] | null => {
    for (const node of nodes) {
      const next = [...trail, node]
      if (node.id === id) return next
      const found = node.children ? walk(node.children, next) : null
      if (found) return found
    }
    return null
  }
  return walk(folders[category] ?? [], [])
}

const leafIds = (node: Folder): string[] => (node.children ? node.children.flatMap(leafIds) : [node.id])

/** Projects in a category, narrowed to a folder (and everything below it) when one is given. */
export function projectsIn(category: Category | null, node?: Folder | null): Project[] {
  const inCategory = category ? projects.filter(p => p.category === category) : projects
  if (!node) return inCategory
  const ids = leafIds(node)
  return inCategory.filter(p => p.folder !== undefined && ids.includes(p.folder))
}
