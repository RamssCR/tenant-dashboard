import type { HTMLAttributes, Ref } from 'react'
import { classMerger } from '@/utils/classMerger'

type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  ref?: Ref<HTMLParagraphElement>
}

/**
 * Renders a customizable text component.
 * @param props - Text properties including HTML paragraph attributes and a ref.
 * @returns A styled paragraph element.
 */
export const Text = ({
  className,
  ...props
}: TextProps) => (
  <p
    className={classMerger(
      'text-base leading-7 text-foreground',
      className
    )}
    {...props}
  />
)