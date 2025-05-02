
"use client"
import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { useThemeSwitch } from '@/app/Hooks/useThemeSwitch'
import Logout from '../Logout'

const Header = () => {

  const [mode, setMode] = useThemeSwitch()

  return (
    
    <div className='w-full p-4 px-10 flex items-center justify-between  '>
      <Logo />
      <nav className='z-50 w-max py-3 px-8 border border-solid border-dark rounded-full font-medium capitalize flex items-center fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm'>
        <Link href="/" className='mr-2'>Home</Link>
        <Link href="/about" className='mr-2'>About</Link>
        <Link href="/contact" className='mr-2'>Contact</Link>
        {/* <button onClick={()=> setMode(mode === "light" ? "dark" : "light")}>
          <SunIcon />
        </button> */}
        <div className='md:hidden block'>
      <Logout />
      </div>
      </nav>
      <div className='hidden md:block'>
      <Logout />
      </div>
      
    </div>
  )
}

export default Header