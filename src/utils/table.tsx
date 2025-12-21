import { Actions } from "@/components/tenants-table/Actions";
import { NEXT_PUBLIC_BACKEND_TENANT_NAME } from "@/config/environment";
import { PaginatedTenants } from "@/schemas/tenant";
import { TableRow } from "@/types/table";

export const TABLE_HEADERS = ['Name', 'Domain', 'Access Level', 'Status', 'Actions'];

/**
 * Formats a tenant object into a table row.
 * @param tenant - The tenant object to format.
 * @returns A formatted table row object.
 */
export const formatRow = (
  tenant: PaginatedTenants['items'][number]
): Omit<TableRow, 'accessLevel' | 'active'> => {
  const { id, active, accessLevel, ...rest } = tenant

  return {
    ...rest,
    id,
    actions: <Actions
      active={active}
      accessLevel={accessLevel}
      name={tenant.name}
      isSelfTenant={NEXT_PUBLIC_BACKEND_TENANT_NAME === tenant.name}
    />
  }
}