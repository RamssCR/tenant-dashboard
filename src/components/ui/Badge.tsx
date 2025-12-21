import { type VariantProps, tv } from 'tailwind-variants'
import type { ComponentPropsWithRef } from 'react'
import type { Text } from './Text'
import { classMerger } from '@/utils/classMerger'

const badge = tv({
  base: 'inline-flex w-fit items-center justify-center rounded-full font-medium transition-colors duration-200 border py-0.75 px-3 text-sm capitalize',
  variants: {
    variant: {
      global: 'bg-secondary-background/10 text-secondary-background border-secondary-background',
      tenant: 'bg-primary-accent/10 text-primary-accent border-primary-accent',
      active: 'bg-success/10 text-success border-success',
      inactive: 'bg-muted/10 text-muted border-muted',
    }
  },
  defaultVariants: {
    variant: 'global'
  }
})

type BadgeProps = ComponentPropsWithRef<typeof Text> & VariantProps<typeof badge>

/**
 * Badge component to display small status or label.
 * @param props - Props for the Badge component.
 * @returns A Badge component.
 */
export const Badge = ({
  className,
  variant,
  ...props
}: BadgeProps) => (
  <p
    className={classMerger(badge({ variant, className }))}
    {...props}
  />
)