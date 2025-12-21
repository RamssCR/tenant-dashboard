import type { HTMLAttributes, Ref } from 'react'
import { classMerger } from '@/utils/classMerger'

type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  ref?: Ref<HTMLParagraphElement>
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/**
 * Renders a customizable title component.
 * @param props - Title properties including HTML attributes, a ref, and the heading level.
 * @returns A styled heading element.
 */
export const Title = ({
  className,
  as: Tag = 'h1',
  ...props
}: TextProps) => (
  <Tag
    className={classMerger(
      'font-bold text-3xl md:text-4xl leading-tight text-foreground',
      className
    )}
    {...props}
  />
)