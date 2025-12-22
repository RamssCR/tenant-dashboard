import type { InputHTMLAttributes, Ref } from "react"
import type { Path, UseFormRegister } from 'react-hook-form'
import { classMerger } from "@/utils/classMerger"

export type InputProps<T extends Record<string, unknown>> =
  InputHTMLAttributes<HTMLInputElement> & {
    register?: UseFormRegister<T>
    ref?: Ref<HTMLInputElement>
    formName?: Path<T>
  }

/**
 * Renders a customizable input component.
 * @param props - The properties for the input component.
 * @returns JSX.Element The Input component.
 */
export const Input = <T extends Record<string, unknown>,>({
  className,
  register,
  formName,
  required = true,
  type = "text",
  ...props
}: InputProps<T>) => {
  const registration = register && formName ? register(formName, { required }) : {}

  return (
    <input
      type={type}
      className={classMerger(
        'bg-muted/60 border border-muted/60 text-foreground placeholder:text-table-header-foreground',
        'py-2 px-3 rounded-lg font-medium text-sm w-full focus:outline-none focus-visible:ring-3',
        'focus-visible:ring-ring',
        className
      )}
      {...registration}
      {...props}
    />
  )
}