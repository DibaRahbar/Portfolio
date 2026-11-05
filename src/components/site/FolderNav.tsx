import { ArrowLeft, Folder as FolderIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { Category } from '@/data'
import { useLang } from '@/i18n'
import { categoryLabel } from '@/lib/category'
import { folderPath, folders, projectsIn, type Folder } from '@/lib/folders'

const hrefFor = (category: Category, folderId?: string) =>
  `#/projects?category=${category}${folderId ? `&folder=${folderId}` : ''}`

/**
 * Folder browser under the category filter: subfolders of the current level as tiles,
 * plus a Back link and the current folder's name once you are inside one.
 * Navigation is plain links to `?category=&folder=`, so the browser Back button works too.
 */
export function FolderNav({ category, folderId }: { category: Category; folderId: string | null }) {
  const { t, l, n } = useLang()
  const reduce = useReducedMotion()
  const path = folderId ? (folderPath(category, folderId) ?? []) : []
  const current = path.at(-1) ?? null
  const parent = path.at(-2) ?? null
  const children: Folder[] = current ? (current.children ?? []) : (folders[category] ?? [])

  if (!current && !children.length) return null

  return (
    <motion.div
      key={`${category}/${folderId ?? ''}`}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="mt-6 space-y-5"
    >
      {current && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={hrefFor(category, parent?.id)}
            className="inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2.5 text-[13px] font-medium transition-colors hover:border-brand hover:text-brand"
          >
            <ArrowLeft className="size-4 rtl:-scale-x-100" />
            {t('backTo')} {parent ? l(parent.label) : t(categoryLabel[category])}
          </a>
          <h2 className="text-2xl font-semibold tracking-tight">
            {l(current.label)}
            <span className="ms-2 text-sm font-normal text-muted-foreground">{n(projectsIn(category, current).length)}</span>
          </h2>
        </div>
      )}

      {children.length > 0 && (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {children.map(child => (
            <li key={child.id}>
              <a
                href={hrefFor(category, child.id)}
                className="group flex h-full items-center gap-3 rounded-2xl border bg-background/80 p-4 backdrop-blur outline-none transition-colors hover:border-brand focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full border text-brand transition-colors group-hover:border-brand group-hover:bg-primary group-hover:text-primary-foreground">
                  <FolderIcon className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1 text-sm leading-snug font-medium transition-colors group-hover:text-brand">
                  {l(child.label)}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">{n(projectsIn(category, child).length)}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}
