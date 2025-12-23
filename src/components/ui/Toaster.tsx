import { Toaster as Sonner } from 'react-hot-toast'

/**
 * Toaster component for displaying toast notifications.
 * @returns JSX.Element The Toaster component.
 */
export const Toaster = () => (
  <Sonner
    position="bottom-right"
    toastOptions={{
      duration: 4000,
      style: {
        background: '#1a1a1a',
        color: '#f0f0f0',
        border: '1px solid #333333',
      }
    }}
  />
)