import { CategoryFilter, ProjectGrid } from '@/components/site/ProjectFilter'
import { FolderNav } from '@/components/site/FolderNav'
import { SectionHeading, Shell } from '@/components/site/Shell'
import { categories, type Category } from '@/data'
import { useLang } from '@/i18n'
import { folderPath, folders, projectsIn } from '@/lib/folders'

/** Reads `?category=` from the hash query; anything unknown means "All". */
export function parseCategory(query: string): Category | null {
  const value = new URLSearchParams(query).get('category')
  return categories.find(c => c === value) ?? null
}

/** Reads `&folder=`; only valid when it exists inside the given category. */
export function parseFolder(query: string, category: Category | null): string | null {
  const value = new URLSearchParams(query).get('folder')
  return category && value && folderPath(category, value) ? value : null
}

export function ProjectsPage({ category, folder = null }: { category: Category | null; folder?: string | null }) {
  const { t } = useLang()
  const select = (c: Category | null) => {
    window.location.hash = c ? `#/projects?category=${c}` : '#/projects'
  }
  const node = category && folder ? (folderPath(category, folder)?.at(-1) ?? null) : null

  return (
    <Shell>
      <section className="mt-14">
        <SectionHeading label={t('caseStudies')} title={t('projects')} />
        <div className="mt-8">
          <CategoryFilter value={category} onChange={select} />
        </div>
        {category && folders[category] && <FolderNav category={category} folderId={folder} />}
        <div className="mt-10">
          <ProjectGrid items={projectsIn(category, node)} />
        </div>
      </section>
    </Shell>
  )
}
