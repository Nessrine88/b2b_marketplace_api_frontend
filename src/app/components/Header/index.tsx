"use client"
import React, { useState } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { useThemeSwitch } from '@/app/Hooks/useThemeSwitch'
import Logout from '../Logout'
import { Menu, X } from 'lucide-react' // For icons

const Header = () => {
  const [mode, setMode] = useThemeSwitch()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 ">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-gray-700 dark:text-gray-200 text-base font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="transition-colors hover:text-primary dark:hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop Logout */}
        <div className="hidden md:block">
          <Logout />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4">
          <nav className="flex flex-col gap-3 text-gray-700 dark:text-gray-300 font-medium text-base border-t border-gray-200 dark:border-gray-700 pt-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-primary dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)} // Close on click
              >
                {label}
              </Link>
            ))}
            <Logout />
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
