"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "./Button"
import { PaginatedTenants } from "@/schemas/tenant"
import { classMerger } from "@/utils/classMerger"

/**
 * Renders pagination controls for navigating through pages of tenants.
 * @param props - An object containing the total number of pages and the current page.
 * @returns A React component that displays pagination buttons.
 */
export const Pagination = ({ pages, page }: Pick<PaginatedTenants, 'pages' | 'page'>) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  /**
   * Navigates to a specific page number.
   * @param pageNumber - The page number to navigate to.
   */
  const goTo = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', pageNumber.toString())
    router.push(`?${params.toString()}`)
  }

  /**
   * Navigates to the previous page.
   * @returns void
   */
  const toPrev = () => goTo(Math.max(page - 1, 1))

  /**
   * Navigates to the next page.
   * @returns void
   */
  const toNext = () => goTo(Math.min(page + 1, pages))

  const previous = Math.max(page - 1, 1)
  const next = Math.min(page + 1, pages)

  const filtered = [previous, page, next]
    .filter((page, index, self) => self.indexOf(page) === index)
    .filter(Boolean)

  return (
    <article className="flex items-center gap-2">
      <Button
        onClick={toPrev}
        disabled={page === 1}
        className="rounded-lg bg-transparent hover:bg-muted/50 text-foreground"
      >
        Previous
      </Button>
      {filtered.map(pageNum => (
        <Button
          key={crypto.randomUUID()}
          onClick={() => goTo(pageNum)}
          className={classMerger(
            'size-8 rounded-lg bg-transparent hover:bg-secondary-background/10 text-foreground hover:text-secondary-background',
            pageNum === page && 'text-secondary-background bg-secondary-background/10'
          )}
          disabled={pageNum === page}
        >
          {pageNum}
        </Button>
      ))}
      <Button
        className="rounded-lg bg-transparent hover:bg-muted/50 text-foreground"
        onClick={toNext}
        disabled={page === pages}>
          Next
        </Button>
    </article>
  )
}