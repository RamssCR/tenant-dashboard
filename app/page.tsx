import { TABLE_HEADERS, formatRow } from "@/utils/table"
import { CreateTable } from "@/components/tenants-table/CreateTable"
import { Header } from "@/components/header/Header"
import { Pagination } from "@/components/ui/Pagination"
import { Table } from "@/components/ui/Table"
import { TableRow } from "@/types/table"
import { Text } from "@/components/ui/Text"
import { getTenants } from "@/services/tenant"
import { normalizeQueries } from "@/utils/normalizer"
import { pagination } from "@/schemas/pagination"

type SearchParams = Record<string, string | string[] | undefined>

/**
 * Home Page Component.
 * Renders the main page with a table of tenants.
 * @returns JSX.Element The Home page component.
 */
export default async function Home({ searchParams = {} }: { searchParams?: SearchParams }) {
  const queries = pagination.parse(normalizeQueries(await searchParams))
  const { items, pages, page, total } = await getTenants(queries)
  const rows = items.map(formatRow)

  return (
    <main className="*:font-sans w-full flex min-h-screen flex-col gap-6 py-6">
      <section className="mx-auto w-full max-w-7xl flex flex-col gap-6 items-start">
        <Header />
        <section className="w-full flex flex-col items-start gap-3">
          <article className="w-full flex justify-between items-center">
            <div className=""></div>
            <CreateTable />
          </article>
          <Table<Omit<TableRow, 'accessLevel' | 'active'>>
            headers={TABLE_HEADERS}
            data={rows}
          />
        </section>
        <section className="w-full border border-muted/50 bg-table-header-background rounded-lg flex justify-between items-center px-4 py-2">
          <Text className="font-medium">Showing {items.length} of {total} tenants</Text>
          <Pagination pages={pages} page={page} />
        </section>
      </section>
    </main>
  );
}
