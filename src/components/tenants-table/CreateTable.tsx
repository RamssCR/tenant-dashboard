"use client"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Plus } from "lucide-react"
import { TenantForm } from "./TenantForm"
import { useRef } from "react"

/**
 * Renders the CreateTable component.
 * @returns JSX.Element The CreateTable component.
 */
export const CreateTable = () => {
  const closeRef = useRef<HTMLButtonElement>(null)

  /**
   * Closes the modal dialog.
   * @returns void
   */
  const closeModal = () => closeRef.current?.click()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4 bg-primary-accent/10 text-primary-accent border-primary-accent hover:bg-primary-accent/20 focus-visible:ring-primary-accent">
          <Plus className="size-4 mr-1.5 text-primary-accent" />
          Create Tenant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="mb-2">
          <DialogTitle>Create Tenant</DialogTitle>
          <DialogDescription>
            Add a new tenant to your authentication service.
          </DialogDescription>
        </DialogHeader>
        <TenantForm close={closeModal} />
        <DialogFooter>
          <DialogClose asChild>
            <Button ref={closeRef} className="sr-only">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

