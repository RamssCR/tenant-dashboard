"use client"
import { TableHTMLAttributes } from "react"

type TableProps<T> =
  Omit<TableHTMLAttributes<HTMLTableElement>, 'className' | 'children'> & {
    headers: string[]
    data: T[]
  }

/**
 * Renders a table with given headers and data.
 * @param props - The properties for the table component.
 * @returns A table element displaying the provided data.
 */
export const Table = <T extends { id: number, [key: string]: unknown },>
  ({ headers, data, ...props }: TableProps<T>) => (
  <table
    className="w-full table-auto border-collapse border-spacing-0 border border-muted/50 rounded-lg overflow-x-auto lg:overflow-hidden"
    {...props}
  >
    <thead>
      <tr>
        {headers.map((header) => (
          <th
            key={header}
            className="border-b border-muted/50 bg-table-header-background px-4 py-3 text-left text-sm font-medium text-table-header-foreground"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.length === 0 ? (
        <tr>
          <td
            colSpan={headers.length}
            className="px-4 py-2 text-center text-sm text-primary-foreground/70"
          >
            No data available.
          </td>
        </tr>
      ) : (
        data.map(({ id, ...row }) => (
          <tr key={id}>
            {Object.values(row).map(cell => (
              <td
                key={crypto.randomUUID()}
                className="border-b border-muted/50 px-4 py-2 text-sm text-primary-foreground last:max-w-[20em]"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  </table>
)