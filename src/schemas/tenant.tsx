import { Domain } from '@/components/tenants-table/Domain'
import { Badge } from '@/components/ui/Badge'
import { z } from 'zod'

export const tenants = z.array(
  z.object({
    id: z.number().int().positive(),
    name: z.string().min(1),
    domain: z.string(),
    accessLevel: z.enum(['global', 'tenant']),
    active: z.boolean(),
  })
)
  .transform(tenants => tenants.map(tenant => ({
    ...tenant,
    domain: <Domain
      href={tenant.domain}
      target='_blank'
      rel='noopener noreferrer'
    >
      {tenant.domain}
    </Domain>,
    level: <Badge variant={tenant.accessLevel}>{tenant.accessLevel}</Badge>,
    status: tenant.active
      ? <Badge variant="active">Active</Badge>
      : <Badge variant="inactive">Inactive</Badge>
  })))

export const paginatedTenants = z.object({
  items: tenants,
  total: z.number().int().positive(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  pages: z.number().int().positive(),  
})

export type Tenant = z.infer<typeof tenants>[number]
export type PaginatedTenants = z.infer<typeof paginatedTenants>