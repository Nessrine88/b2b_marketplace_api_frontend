"use client"
import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { SunIcon } from 'lucide-react'
import { useThemeSwitch } from '@/app/Hooks/useThemeSwitch'
import Logout from '../Logout'

const Header = () => {
  const [mode, setMode] = useThemeSwitch()

  return (
    <header className='w-full fixed top-0 left-0 z-50 bg-neutral-900 border-b border-neutral-800'>
      <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
        <Logo />
        
        <nav className='hidden md:flex items-center gap-6'>
          <Link 
            href="/" 
            className='text-gray-300 hover:text-white transition-colors'
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className='text-gray-300 hover:text-white transition-colors'
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className='text-gray-300 hover:text-white transition-colors'
          >
            Contact
          </Link>
          
          <button 
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className='text-gray-300 hover:text-white transition-colors'
          >
            <SunIcon size={20} />
          </button>
          
          <div className='ml-4'>
            <Logout />
          </div>
        </nav>

        {/* Mobile menu button and logout would go here */}
        <div className='flex md:hidden items-center gap-4'>
          <button 
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className='text-gray-300 hover:text-white transition-colors'
          >
            <SunIcon size={20} />
          </button>
          <Logout />
        </div>
      </div>
    </header>
  )
}

export default Header