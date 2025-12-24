"use client"
import { Power, PowerOff, RefreshCw } from "lucide-react"
import { switchTenantAcess, toggleTenantStatus } from "@/actions/tenant"
import { Button } from "@/components/ui/Button"
import { TableRow } from "@/types/table"
import { Text } from "@/components/ui/Text"
import { classMerger } from "@/utils/classMerger"
import { useTransition } from "react"

type ActionsProps = Pick<TableRow, 'name' | 'accessLevel' | 'active'> & {
  isSelfTenant?: boolean
}

const actionsState = {
  true: {
    activationMessage: 'Deactivate',
    activationClassName: 'text-error',
    activationIcon: <PowerOff className="text-error" aria-hidden="true" />
  },
  false: {
    activationMessage: 'Activate',
    activationClassName: 'text-success',
    activationIcon: <Power className="text-success" aria-hidden="true" />
  }
}

/**
 * Displays action buttons for switching access levels and toggling activation status.
 * @param props - The properties for the Actions component.
 * @returns A React component that renders action buttons.
 */
export const Actions = ({
  active,
  accessLevel,
  name,
  isSelfTenant = false,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition()
  const parsed = actionsState[String(active) as unknown as keyof typeof actionsState]
  
  /**
   * Handles the access level switch action.
   * @returns A promise that resolves when the access level is switched.
   */
  const changeAccessLevel = () => {
    startTransition(async () => 
      await switchTenantAcess(name, accessLevel)
    )
  }

  /**
   * Handles the activation status toggle action.
   * @returns A promise that resolves when the activation status is toggled.
   */
  const changeStatus = () => {
    startTransition(async () =>
      await toggleTenantStatus(name, active)
    )
  }

  return (
    <article className="flex items-center gap-6">
      <Button
        className="bg-transparent h-8 py-px px-2 gap-2 hover:bg-muted/60"
        aria-label={`Switch Access`}
        onClick={changeAccessLevel}
        title={`Switch Access`}
        disabled={isSelfTenant || !active || isPending}
      >
        <RefreshCw className="text-info" aria-hidden="true" />
        <Text className="text-info text-sm">Switch Access</Text>
      </Button>
      <Button
        className="bg-transparent h-8 py-px px-2 hover:bg-muted/60 gap-2"
        aria-label={`${parsed.activationMessage} Tenant`}
        title={`${parsed.activationMessage} Tenant`}
        onClick={changeStatus}
        disabled={isSelfTenant || isPending}
      >
        {parsed.activationIcon}
        <Text className={classMerger('text-sm', parsed.activationClassName)}>
          {parsed.activationMessage}
        </Text>
      </Button>
    </article>
  )
}