import { X } from 'lucide-react'
import { toast } from 'react-hot-toast'

type Trigger = {
  message: string
  duration?: number
  type?: 'success' | 'error'
}

/**
 * Triggers a toast notification.
 * @param message - The message to display in the toast.
 * @param type - The type of toast ('success' | 'error').
 * @returns void
 */
export const trigger = ({ message, duration = 4000, type = 'success' }: Trigger) =>
  toast[type](message, { duration })

/**
 * Triggers a JSX toast notification with a close button.
 * @param props - The properties for the toast.
 * @returns void
 */
export const triggerJSX = ({ message, duration = 4000, type = 'success' }: Trigger) =>
  toast[type]((t) => (
    <span className='flex items-center gap-2 w-full justify-between text-sm'>
      {message}
      <button
        onClick={() => toast.dismiss(t.id)}
        className='p-1 hover:bg-transparent border border-muted/60 rounded-md ml-2'
        aria-label='Close toast'
      >
        <X aria-hidden="true" className='text-foreground text-sm' />
      </button>
    </span>
  ), { duration })