'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { Menu, X, GraduationCap } from 'lucide-react'

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Programs', href: '/programs' },
  { name: 'Faculty', href: '/faculty' },
  { name: 'Events', href: '/events' },
  { name: 'News', href: '/news' },
  { name: 'About', href: '/about' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getActiveTab = () => {
    if (pathname === '/') return 'Home'
    for (const item of navigationItems) {
      if (item.href !== '/' && pathname.startsWith(item.href)) {
        return item.name
      }
    }
    return null
  }

  const activeTab = getActiveTab()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-900 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-lg font-bold text-purple-900 hidden sm:block">
              Decoupled University
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  activeTab === item.name
                    ? 'bg-purple-50 text-purple-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link
              href="/apply"
              className="hidden sm:inline-flex items-center bg-amber-500 text-purple-900 px-5 py-2 rounded-lg hover:bg-amber-400 transition-colors duration-200 font-bold text-sm"
            >
              Apply Now
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    activeTab === item.name
                      ? 'bg-purple-50 text-purple-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/apply"
                onClick={() => setMobileMenuOpen(false)}
                className="mx-4 mt-4 text-center bg-amber-500 text-purple-900 px-5 py-3 rounded-lg hover:bg-amber-400 transition-colors duration-200 font-bold text-sm"
              >
                Apply Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
