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
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Text } from '@/components/ui/Text'
import { Switch } from '@/components/ui/Switch'
import { createTenant } from "@/actions/tenant"

export const TenantForm = () => {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    setValue,
    reset,
  } = useForm({ resolver: zodResolver(tenant) })
  const buttonState = isSubmitting ? 'Creating...' : 'Create Tenant'

  /**
   * Clears all form fields.
   * @returns void
   */
  const clear = () => reset()

  /**
   * Sends form data on submission.
   * @param data - The form data.
   * @returns void
   */
  const onSubmit: SubmitHandler<Tenant> = async (data) => {
    await createTenant(data)
    clear()
  }

  return (
    <form
      className="w-full space-y-6"
      onSubmit={handleSubmit(onSubmit)}
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
          {...register("active")}
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