"use server"

import {
  NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_BACKEND_TENANT_NAME,
  NEXT_PUBLIC_BACKEND_TENANT_SECRET,
} from '@/config/environment'
import { type PaginatedTenants, paginatedTenants } from '@/schemas/tenant'
import type { Pagination } from '@/schemas/pagination'

/**
 * Fetches a list of tenants from the backend API.
 * @param params - An object containing pagination parameters.
 * @returns A promise that resolves to an array of Tenant objects or null if the fetch fails.
 */
export const getTenants = async ({
  page,
  limit,
  offset,
}: Partial<Pagination>): Promise<PaginatedTenants> => {
  const fallback = { items: [], total: 0, page: 1, limit: 1, pages: 1 }

  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/tenants?page=${page}&limit=${limit}&offset=${offset}`,
      {
        cache: 'no-store',
        next: { tags: ['tenants'] },
        headers: {
          'X-Tenant-Name': NEXT_PUBLIC_BACKEND_TENANT_NAME,
          'X-Tenant-Secret': NEXT_PUBLIC_BACKEND_TENANT_SECRET,
        }
      }
    )
  
    if (!response.ok) return fallback

    const { data } = await response.json()
    return paginatedTenants.parse(data)
  } catch (error) {
    console.error(error)
    return fallback
  }
}