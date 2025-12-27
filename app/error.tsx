"use client"
import Link from 'next/link'
import { Text } from '@/components/ui/Text'
import { Title } from '@/components/ui/Title'
import { X } from 'lucide-react'
import { classMerger } from '@/utils/classMerger'

export default function Error() {
  return (
    <main
      className="*:font-sans w-full flex min-h-screen flex-col items-center justify-center gap-4 px-4 py-8"
      aria-labelledby='error-title'
      aria-describedby='error-description'
    >
      <X
        className='size-16 p-2 text-error border-4 border-error rounded-full'
        aria-hidden="true"
      />
      <section className="flex flex-col items-center gap-3 w-full max-w-xl text-center">
        <Title id='error-title' className='text-3xl lg:text-4xl'>Something went wrong</Title>
        <Text id='error-description' className='font-medium text-table-header-foreground'>
          An error ocurred while during tenant manipulation.
          Try refreshing the page or try again after some time later.
        </Text>
      </section>
      <Link
        href='/'
        className={classMerger(
          'px-4.5 py-2.5 rounded-md bg-transparent font-medium border border-foreground text-foreground',
          'hover:bg-foreground hover:text-background transition-colors duration-200',
        )}
      >
        Refresh Page
      </Link>
    </main>
  )
}