import type { ReactNode } from "react"
import type { Tenant } from "@/schemas/tenant"

export type TableRow = Tenant & { actions?: ReactNode }