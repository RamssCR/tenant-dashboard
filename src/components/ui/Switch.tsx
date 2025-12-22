import * as SwitchPrimitive from '@radix-ui/react-switch'
import type { ComponentProps } from 'react'
import { classMerger } from '@/utils/classMerger'

/**
 * A customizable switch component built using Radix UI's Switch primitive.
 * It supports styling via the `className` prop and includes default styles for various states.
 * The switch consists of a root element and a thumb element, both of which can be styled.
 * @param props - Props for the Switch component, extending Radix UI's `SwitchPrimitive.Root` props.
 * @returns A styled switch component.
 */
export const Switch = ({
  className,
  ...props
}: ComponentProps<typeof SwitchPrimitive.Root>) => {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={classMerger(
        'peer data-[state=checked]:bg-primary-accent hover:cursor-pointer data-[state=unchecked]:bg-muted',
        'focus-visible:border-table-header-foreground/60 focus-visible:ring-table-header-foreground/60 inline-flex h-[1.3rem] w-9 shrink-0 items-center rounded-full',
        'shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={classMerger(
          'bg-light pointer-events-none block size-4 rounded-full ring-0 transition-transform',
          'data-[state=checked]:translate-x-[calc(100%+1px)] data-[state=unchecked]:translate-x-0.75',
        )}
      />
    </SwitchPrimitive.Root>
  )
}
