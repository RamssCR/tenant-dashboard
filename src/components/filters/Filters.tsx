"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select"
import { useRouter, useSearchParams } from "next/navigation"

const filters = [
  {
    id: 'accessLevel',
    placeholder: 'Select access level',
    options: [
      { label: 'All Access', value: 'all' },
      { label: 'Global', value: 'global' },
      { label: 'Tenant', value: 'tenant' }
    ]
  },
  {
    id: 'active',
    placeholder: 'Select status',
    options: [
      { label: 'All Status', value: 'all' },
      { label: 'Active', value: 'true' },
      { label: 'Inactive', value: 'false' }
    ]
  }
]

/**
 * Renders filter selection components for tenants.
 * @returns A React component that displays filter dropdowns.
 */
export const Filters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  /**
   * Handles the change event for filter selection.
   * @param id - The filter identifier.
   * @param value - The selected value.
   * @returns void
   */
  const onChange = (id: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') {
      params.delete(id)
    } else {
      params.set(id, value)
    }

    return router.push(`?${params.toString()}`)
  }

  return (
    <section className="w-1/3 inline-flex items-center gap-3">
      {filters.map(({ id, placeholder, options }) => (
        <Select
          key={id}
          value={searchParams.get(id) ?? 'all'}
          onValueChange={(value) => onChange(id, value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent position="popper">
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </section>
  )
}