import { Title } from "@/components/ui/Title"
import { Text } from "@/components/ui/Text"

/**
 * Renders the header section of the Tenant Dashboard.
 * @returns JSX.Element The header component.
 */
export const Header = () => (
  <header className="w-full flex flex-col items-start gap-1">
    <Title className="text-4xl md:text-3xl">Tenant Dashboard</Title>
    <Text className="text-table-header-foreground font-medium">
      Manage your multitenant authentication service
    </Text>
  </header>
)