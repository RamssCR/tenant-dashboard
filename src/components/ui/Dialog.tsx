"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import type { ComponentProps } from "react"
import { XIcon } from "lucide-react"
import { classMerger } from "@/utils/classMerger"

/**
 * Renders a Dialog component using Radix UI primitives.
 * @param props - Component properties.
 * @returns JSX.Element The Dialog component.
 */
const Dialog = ({ ...props }: ComponentProps<typeof DialogPrimitive.Root>) => (
  <DialogPrimitive.Root data-slot="dialog" {...props} />
)

/**
 * Renders the DialogTrigger component.
 * @param props - Component properties.
 * @returns JSX.Element The DialogTrigger component.
 */
const DialogTrigger = ({ ...props }: ComponentProps<typeof DialogPrimitive.Trigger>) => (
  <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
)

/**
 * Renders the DialogPortal component.
 * @param props - Component properties.
 * @returns JSX.Element The DialogPortal component.
 */
const DialogPortal = ({ ...props }: ComponentProps<typeof DialogPrimitive.Portal>) => (
  <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
)

/**
 * Renders the DialogClose component.
 * @param props - Component properties.
 * @returns JSX.Element The DialogClose component.
 */
const DialogClose = ({ ...props }: ComponentProps<typeof DialogPrimitive.Close>) => (
  <DialogPrimitive.Close data-slot="dialog-close" {...props} />
)

/**
 * Renders the DialogOverlay component.
 * @param props - Component properties.
 * @returns JSX.Element The DialogOverlay component.
 */
const DialogOverlay = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) => (
  <DialogPrimitive.Overlay
    data-slot="dialog-overlay"
    className={classMerger(
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-dark/25 backdrop-blur-xs",
      className
    )}
    {...props}
  />
)

/**
 * Renders the DialogContent component.
 * @param props - Component properties.
 * @returns JSX.Element The DialogContent component.
 */
const DialogContent = ({
  className,
  children,
  showCloseButton = true,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & { showCloseButton?: boolean }) => (
  <DialogPortal data-slot="dialog-portal">
    <DialogOverlay />
    <DialogPrimitive.Content
      data-slot="dialog-content"
      className={classMerger(
        "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        "data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "z-50 grid fixed left-1/2 top-1/2 w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg -translate-x-1/2",
        "border border-muted/60 p-6 shadow-lg duration-200 outline-none sm:max-w-lg -translate-y-1/2",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          data-slot="dialog-close"
          className={classMerger(
            "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
            "top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2",
            "focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none",
            "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 absolute",
          )}
        >
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
)

/**
 * Renders the DialogHeader component.
 * @param props - Component properties.
 * @returns JSX.Element The DialogHeader component.
 */
const DialogHeader = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    data-slot="dialog-header"
    className={classMerger("flex flex-col gap-1.5 text-center sm:text-left", className)}
    {...props}
  />
)

/**
 * Renders the DialogFooter component.
 * @param props - Component properties.
 * @returns JSX.Element The DialogFooter component.
 */
const DialogFooter = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    data-slot="dialog-footer"
    className={classMerger(
      "flex flex-col-reverse gap-1.5 sm:flex-row sm:justify-end",
      className
    )}
    {...props}
  />
)

/**
 * Renders the DialogTitle component.
 * @param props - Component properties.
 * @returns JSX.Element The DialogTitle component.
 */
const DialogTitle = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title
    data-slot="dialog-title"
    className={classMerger("text-lg leading-none font-semibold", className)}
    {...props}
  />
)

/**
 * Renders the DialogDescription component.
 * @param props - Component properties.
 * @returns JSX.Element The DialogDescription component.
 */
const DialogDescription = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description
    data-slot="dialog-description"
    className={classMerger("text-table-header-foreground text-sm", className)}
    {...props}
  />
)


export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
