'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Heart, DollarSign, BookOpen, HelpCircle, User, Crown, ShoppingBag } from 'lucide-react'
import { NAVIGATION_LINKS, APP_CONFIG } from '@/lib/constants'

const iconMap = {
  Home,
  Heart,
  DollarSign,
  BookOpen,
  HelpCircle,
  Crown,
  ShoppingBag
}

interface NavigationProps {
  onItemClick?: () => void
}

export default function Navigation({ onItemClick }: NavigationProps) {
  const pathname = usePathname()

  // Add Clubhouse to navigation
  const navigationLinks = [
    ...NAVIGATION_LINKS,
  ]

  return (
    <nav className="space-y-2">
      {navigationLinks.map((link, idx) => {
        const Icon = iconMap[link.icon as keyof typeof iconMap]
        const isActive = pathname === link.href
        const isClubhouse = link.href === '/dashboard'
        const isStore = link.href === '/store'
        
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onItemClick}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group animate-fadeInLeft ${
              isActive 
                ? isClubhouse
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border border-orange-300 shadow-lg'
                  : isStore
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border border-purple-300 shadow-lg'
                  : 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm hover:-translate-y-0.5'
            }`}
            style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
          >
            <Icon className={`w-5 h-5 transition-all duration-300 ${
              isActive 
                ? isClubhouse
                  ? 'text-white animate-pulse'
                  : isStore
                  ? 'text-white animate-pulse'
                  : 'text-blue-600'
                : 'text-gray-500 group-hover:text-gray-700 group-hover:scale-110'
            }`} />
            <span className="font-medium">{link.label}</span>
            {isClubhouse && (
              <span className="ml-auto px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full animate-pulse">
                NEW
              </span>
            )}
            {isStore && (
              <span className="ml-auto px-2 py-1 bg-green-400 text-green-900 text-xs font-bold rounded-full animate-pulse">
                SHOP
              </span>
            )}
          </Link>
        )
      })}
      
      {/* Clubhouse (LOGIN) Button (custom design) */}
  <Link
    href="/dashboard"
    onClick={onItemClick}
    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-yellow-100 transition mt-4"
  >
    <Crown className="w-5 h-5 text-yellow-500" />
    <span className="font-medium text-gray-800">Clubhouse</span>
    <span className="ml-2 bg-yellow-400 text-white rounded px-2 py-0.5 text-xs font-bold">LOGIN</span>
  </Link>
    </nav>
  )
}
