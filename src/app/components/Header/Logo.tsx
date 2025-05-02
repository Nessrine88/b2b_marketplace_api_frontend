import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Logo = () => {
  return (
    <Link href="/" className='hidden   md:flex items-center text-dark dark:text-light dark:border-light '>
      <span className='sm:my-2 w-16 rounded-full overflow-hidden border border-solid border-dark mr-4'>
    <Image src={'/favicon.ico'} width={500 } height={500} alt="Manufacturers"className='w-full h-auto rounded-full' />
    </span>
    <span className='font-bold dark:font-semibold text-sm md:text-xl'>Manufacturers</span>
    </Link>
  )
}   

export default Logo