import { CategoryFilter, ProjectGrid, filterProjects } from '@/components/site/ProjectFilter'
import { SectionHeading, Shell } from '@/components/site/Shell'
import { categories, type Category } from '@/data'
import { useLang } from '@/i18n'

/** Reads `?category=` from the hash query; anything unknown means "All". */
export function parseCategory(query: string): Category | null {
  const value = new URLSearchParams(query).get('category')
  return categories.find(c => c === value) ?? null
}

export function ProjectsPage({ category }: { category: Category | null }) {
  const { t } = useLang()
  const select = (c: Category | null) => {
    window.location.hash = c ? `#/projects?category=${c}` : '#/projects'
  }

  return (
    <Shell>
      <section className="mt-14">
        <SectionHeading label={t('caseStudies')} title={t('projects')} />
        <div className="mt-8">
          <CategoryFilter value={category} onChange={select} />
        </div>
        <div className="mt-10">
          <ProjectGrid items={filterProjects(category)} />
        </div>
      </section>
    </Shell>
  )
}
