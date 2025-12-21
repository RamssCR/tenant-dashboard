"use client"
import type { ButtonHTMLAttributes, Ref } from 'react'
import { classMerger } from '@/utils/classMerger'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: Ref<HTMLButtonElement>
}

/**
 * Renders a customizable button component.
 * @param props - Button properties including HTML button attributes and a ref.
 * @returns A styled button element.
 */
export const Button = ({
  className,
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={classMerger(
      'w-fit py-2 px-4 bg-foreground text-background font-medium rounded-md flex items-center justify-center',
      'hover:bg-foreground/90 hover:cursor-pointer disabled:opacity-50 disabled:pointer-events-none transition-colors duration-200',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground',
      className
    )}
    {...props}
  />
)