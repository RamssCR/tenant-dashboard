import { z } from 'zod'

export const pagination = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  active: z.preprocess(value => {
    if (value === 'true') return true
    if (value === 'false') return false
    return value
  }, z.boolean())
    .optional(),
  accessLevel: z.enum(['global', 'tenant']).optional(),
})
  .transform(({ page, limit, active, accessLevel }) => ({
    page,
    limit,
    offset: (page - 1) * limit,
    active,
    accessLevel,
  }))

export type Pagination = z.infer<typeof pagination>