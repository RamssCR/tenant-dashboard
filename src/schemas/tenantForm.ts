import { z } from 'zod'

export const tenant = z.object({
  name: z.string({ error: 'Input tenant name' })
    .min(3, { error: 'The name must be at least 3 characters long' })
    .max(100, { error: 'The name must not exceed 100 characters' }),
  domain: z.url({ error: 'Input a valid domain for the tenant' }),
  accessLevel: z.enum(['global', 'tenant'], { error: 'The access level must be "global" or "tenant"' }),
  active: z.boolean().optional(),
})

export type Tenant = z.infer<typeof tenant>