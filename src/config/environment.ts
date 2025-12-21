import "server-only"

import { env } from '@/schemas/env'
import { treeifyError } from 'zod'

const parsed = env.safeParse(process.env)

if (!parsed.success) {
  console.error(treeifyError(parsed.error)?.properties)
  throw new Error('Invalid environment variables')
}

export const {
  NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_BACKEND_TENANT_NAME,
  NEXT_PUBLIC_BACKEND_TENANT_SECRET,
} = parsed.data