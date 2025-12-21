import type { AnchorHTMLAttributes, Ref } from 'react'
import { classMerger } from '@/utils/classMerger'

type DomainProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  ref?: Ref<HTMLAnchorElement>;
}

/**
 * Renders a domain name with specific styling.
 * @param props - Properties for the domain text component.
 * @returns A styled text element representing a domain.
 */
export const Domain = ({
  className,
  ...props
}: DomainProps) => (
  <a
    className={classMerger(
      'font-mono text-sm py-1 px-2 rounded-xs bg-muted w-fit hover:bg-primary-muted',
      className
    )}
    {...props}
  />
)