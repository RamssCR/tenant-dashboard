"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { type SubmitHandler, useForm } from 'react-hook-form'
import { type Tenant, tenant } from '@/schemas/tenantForm'
import { trigger, triggerJSX } from "@/helpers/toast"
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Text } from '@/components/ui/Text'
import { Switch } from '@/components/ui/Switch'
import { createTenant } from "@/actions/tenant"

/**
 * Form component for creating a new tenant.
 * @param props - Component props.
 * @returns JSX.Element The TenantForm component.
 */
export const TenantForm = ({ close }: { close: () => void }) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
    reset,
  } = useForm({ resolver: zodResolver(tenant) })
  const buttonState = isSubmitting ? 'Creating...' : 'Create Tenant'

  /**
   * Handles form errors.
   * @param errors - The form errors.
   * @returns void
   */
  const onError = () => {
    const error = Object.values(errors)[0]
    if (error)
      trigger({ message: error.message ?? 'Form submission error', type: 'error' })
  }

  /**
   * Sends form data on submission.
   * @param data - The form data.
   * @returns void
   */
  const onSubmit: SubmitHandler<Tenant> = async (data) => {
    try {
      const { secret } = await createTenant(data)
      triggerJSX({
        message: `Tenant created. Tenant Secret: ${secret}`,
        duration: Infinity
      })
      reset()
      close()
    } catch {
      trigger({ message: 'Failed to create tenant', type: 'error' })
    }
  }

  return (
    <form
      className="w-full space-y-6"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      {(['name', 'domain'] as const).map((field) => (
        <article key={field} className='space-y-2.5'>
          <Label htmlFor={field} className="capitalize">Tenant {field}</Label>
          <Input
            id={field}
            name={field}
            formName={field}
            placeholder={`Enter tenant ${field}`}
            register={register}
            autoComplete={field}
          />
        </article>
      ))}
      <article className='w-full space-y-2.5'>
        <Label htmlFor='accessLevel'>Tenant Accessibility</Label>
        <Select onValueChange={(value: Tenant['accessLevel']) => setValue('accessLevel', value)}>
          <SelectTrigger id="accessLevel" className="w-full">
            <SelectValue className="w-full" placeholder="Select access level" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="global">Global</SelectItem>
            <SelectItem value="tenant">Tenant</SelectItem>
          </SelectContent>
        </Select>
      </article>
      <article className='w-full flex items-center justify-between'>
        <section className="flex flex-col items-start gap-0.5">
          <Label htmlFor="active">Tenant Status</Label>
          <Text className="text-table-header-foreground/80 font-light text-sm">
            Active by default
          </Text>
        </section>
        <Switch
          id="active"
          defaultChecked
          onCheckedChange={(checked: boolean) => setValue('active', checked)}
        />
      </article>
      <Button
        disabled={isSubmitting}
        type="submit"
        className="w-full mt-8 py-1.75 bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background"
      >
        {buttonState}
      </Button>
    </form>
  )
}