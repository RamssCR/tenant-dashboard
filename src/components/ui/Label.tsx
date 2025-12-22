import type { LabelHTMLAttributes, Ref } from "react"
import { classMerger } from "@/utils/classMerger"

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  ref?: Ref<HTMLLabelElement>
}

/**
 * Renders a styled label component.
 * @param props - The properties for the label component.
 * @returns JSX.Element The Label component.
 */
export const Label = ({ className, ...props }: LabelProps) => (
  <label
    className={classMerger(
      'font-medium leading-none peer-disabled:cursor-not-allowed',
      'peer-disabled:opacity-70 text-table-header-foreground block',
      className,
    )}
    {...props}
  />
)