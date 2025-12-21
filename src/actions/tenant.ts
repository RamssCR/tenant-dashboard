"use server"
import {
  NEXT_PUBLIC_BACKEND_TENANT_NAME,
  NEXT_PUBLIC_BACKEND_TENANT_SECRET,
  NEXT_PUBLIC_BACKEND_URL,
} from "@/config/environment"
import { revalidateTag } from "next/cache"

/**
 * Switches the access level of a tenant.
 * @param id - The ID of the tenant.
 * @param access - The current access level of the tenant ('global' or 'tenant').
 * @returns A promise that resolves when the operation is complete.
 */
export const switchTenantAcess = async (
  name: string,
  access: 'global' | 'tenant'
): Promise<void> => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/tenants/${name}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Tenant-Name': NEXT_PUBLIC_BACKEND_TENANT_NAME,
          'X-Tenant-Secret': NEXT_PUBLIC_BACKEND_TENANT_SECRET,
        },
        body: JSON.stringify({ accessLevel: access === 'global' ? 'tenant' : 'global' }),
      }
    )
    if (!response.ok) throw new Error('Failed to switch tenant access level')
    revalidateTag('tenants', 'max')
  } catch (error) {
    console.error(error)
  }
}

/**
 * Toggles the activation status of a tenant.
 * @param name - The name of the tenant.
 * @param active - The current activation status of the tenant.
 * @returns A promise that resolves when the operation is complete.
 */
export const toggleTenantStatus = async (
  name: string,
  active: boolean
): Promise<void> => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/tenants/${name}`,
      { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Tenant-Name': NEXT_PUBLIC_BACKEND_TENANT_NAME,
          'X-Tenant-Secret': NEXT_PUBLIC_BACKEND_TENANT_SECRET,
        },
        body: JSON.stringify({ active: !active }),
      }
    )
    if (!response.ok) throw new Error('Failed to toggle tenant status')
    revalidateTag('tenants', 'max')
  } catch (error) {
    console.error(error)
  }
}