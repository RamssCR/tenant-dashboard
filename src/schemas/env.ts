import { z } from 'zod'

export const env = z.object({
  NEXT_PUBLIC_BACKEND_URL: z.url(),
  NEXT_PUBLIC_BACKEND_TENANT_NAME: z.string().min(1),
  NEXT_PUBLIC_BACKEND_TENANT_SECRET: z.string().min(1)
})

export type Env = z.infer<typeof env>