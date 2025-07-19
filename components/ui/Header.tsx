'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import SearchAndActions from './SearchAndActions'

const getPlaceholder = (pathname: string) => {
  if (pathname === '/adopt') return 'Search adoptable friends…'
  if (pathname === '/donate') return 'Search donation stories…'
  if (pathname === '/blog') return 'Search blog stories…'
  if (pathname === '/help') return 'Search for help topics…'
  return 'Search KGP Paws'
}

interface HeaderProps {
  onMenuClick: () => void
  sidebarOpen: boolean
}

export default function Header({ onMenuClick, sidebarOpen }: HeaderProps) {
  const pathname = usePathname()
  const [placeholder, setPlaceholder] = useState(getPlaceholder(pathname))
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setPlaceholder(getPlaceholder(pathname))
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [pathname])

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log('Searching for:', query);
    // You can add search logic here
  };

  return (
    <header className={`fixed top-12 left-0 right-0 h-16 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-30 transition-all duration-300 animate-slideInDown ${
      !isMobile && sidebarOpen ? 'ml-80' : 'ml-0'
    }`}>
      <div className="flex items-center justify-between h-full px-6">
        
        {/* Menu Button */}
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110 mr-4"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>

        {/* Search and Actions */}
        <SearchAndActions 
          placeholder={placeholder}
          onSearch={handleSearch}
        />
      </div>
    </header>
  )
}