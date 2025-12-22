"use client"
import { type SubmitHandler, useForm } from 'react-hook-form'
import { type Tenant, tenant } from '@/schemas/tenantForm'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Text } from '../ui/Text'
import { Switch } from '../ui/Switch'

export const TenantForm = () => {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<Tenant>({ resolver: zodResolver(tenant) })
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
  const onSubmit: SubmitHandler<Tenant> = (data) => {
    console.log(data)
    clear()
  }

  return (
    <form
      className="w-full space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {['name', 'domain'].map((field) => (
        <article key={field} className='space-y-2.5'>
          <Label htmlFor={field} className="capitalize">Tenant {field}</Label>
          <Input
            id={field}
            formName={field}
            placeholder={`Enter tenant ${field}`}
            {...register}
          />
        </article>
      ))}
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
      <Button disabled={isSubmitting} type="submit" className="w-full mt-8 py-1.75">
        {buttonState}
      </Button>
    </form>
  )
}