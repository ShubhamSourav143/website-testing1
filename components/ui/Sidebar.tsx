'use client'

import { useState, useEffect } from 'react'
import { X, Heart } from 'lucide-react'
import { APP_CONFIG } from '@/lib/constants'
import Navigation from './Navigation'
import DonationButton from '../DonationButton'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isOpen) return null

  return (
    <aside className="fixed left-0 top-0 w-80 h-full bg-white border-r border-gray-200 z-40 shadow-sm animate-slideInLeft overflow-y-auto">
      <div className="p-6">
        {/* Enhanced 3D Logo Header */}
        <div className="flex items-center justify-between mb-8 animate-fadeInUp">
          <div className="flex items-center space-x-3 flex-1">
            {/* 3D Animated Logo Container */}
            <div className="relative w-16 h-16 perspective-1000">
              <div className="relative w-full h-full transform-style-preserve-3d animate-3d-rotate hover:animate-3d-bounce">
                {/* Main Logo Face */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-2xl border-2 border-white transform-gpu">
                  {/* High-quality 3D dog silhouette */}
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <svg 
                      viewBox="0 0 100 100" 
                      fill="currentColor" 
                      className="w-8 h-8 text-white drop-shadow-lg transform hover:scale-110 transition-transform duration-300"
                    >
                      {/* Detailed dog silhouette */}
                      <path d="M50 15c-8 0-15 4-19 10-2-1-4-1-6 0-3 2-4 6-2 9l2 3c-1 2-1 4 0 6 1 3 3 5 6 6v8c0 8 6 14 14 14h10c8 0 14-6 14-14v-8c3-1 5-3 6-6 1-2 1-4 0-6l2-3c2-3 1-7-2-9-2-1-4-1-6 0-4-6-11-10-19-10z"/>
                      {/* Eyes */}
                      <circle cx="42" cy="35" r="3" fill="rgba(0,0,0,0.8)"/>
                      <circle cx="58" cy="35" r="3" fill="rgba(0,0,0,0.8)"/>
                      {/* Nose */}
                      <ellipse cx="50" cy="45" rx="2" ry="3" fill="rgba(0,0,0,0.9)"/>
                      {/* Mouth */}
                      <path d="M50 48 Q45 52 40 50 Q45 55 50 53 Q55 55 60 50 Q55 52 50 48" fill="rgba(0,0,0,0.7)"/>
                    </svg>
                    
                    {/* 3D Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/30 to-orange-300/30 rounded-full blur-sm animate-pulse"></div>
                  </div>
                  
                  {/* Floating Paw Prints */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 text-yellow-300 animate-float-paw">
                    🐾
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 text-orange-300 animate-float-paw-delayed">
                    🐾
                  </div>
                </div>
                
                {/* 3D Shadow/Depth Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-green-700 rounded-xl transform translate-x-1 translate-y-1 -z-10 opacity-50"></div>
              </div>
              
              {/* Animated Ring Around Logo */}
              <div className="absolute inset-0 border-2 border-blue-400/50 rounded-xl animate-spin-slow"></div>
              <div className="absolute inset-1 border border-green-400/30 rounded-lg animate-reverse-spin"></div>
            </div>
            
            {/* Enhanced Text with Better Typography */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-gray-900 leading-tight truncate bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                {APP_CONFIG.name}
              </h1>
              <p className="text-xs text-gray-500 leading-tight mt-1 font-medium">
                {APP_CONFIG.tagline}
              </p>
              {/* Animated Underline */}
              <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-green-400 mt-1 animate-pulse"></div>
            </div>
          </div>
          
          {/* Enhanced Close Button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110 ml-2 flex-shrink-0 group"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <Navigation onItemClick={isMobile ? onClose : undefined} />
        </div>

        {/* Quick Stats with Real Photo Background */}
        <div className="mb-6 p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg hover-lift animate-fadeInUp delay-700 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-2 right-2 text-4xl animate-float">🐕</div>
            <div className="absolute bottom-2 left-2 text-3xl animate-float delay-1000">🐱</div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Our Impact</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between animate-fadeIn delay-1000">
                <span className="text-gray-600">Dogs Sterilized:</span>
                <span className="font-semibold text-blue-600 animate-pulse">{APP_CONFIG.stats.dogsSterilized}</span>
              </div>
              <div className="flex justify-between animate-fadeIn delay-1000">
                <span className="text-gray-600">Vaccinations:</span>
                <span className="font-semibold text-green-600 animate-pulse">{APP_CONFIG.stats.vaccinations}</span>
              </div>
              <div className="flex justify-between animate-fadeIn delay-1000">
                <span className="text-gray-600">Daily Feeding:</span>
                <span className="font-semibold text-orange-600 animate-pulse">{APP_CONFIG.stats.dailyFeeding}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action with Enhanced Design */}
        <div className="mb-6 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200 hover-lift animate-fadeInUp delay-1000 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
          
          <div className="relative z-10">
            <h3 className="font-semibold text-gray-900 mb-2">Support Our Mission</h3>
            <p className="text-sm text-gray-600 mb-4">No government funding - we depend on supporters like you</p>
            <DonationButton 
              variant="primary" 
              size="sm" 
              purpose="Donate Now"
              className="w-full"
            />
          </div>
        </div>

        {/* Contact Info with Better Styling */}
        <div className="pt-4 border-t border-gray-200 animate-fadeInUp delay-1000">
          <p className="text-xs text-gray-500 mb-2">Follow our work:</p>
          <a 
            href={`https://instagram.com/${APP_CONFIG.contact.instagram.replace('@', '')}`}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 hover:underline inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="mr-1">📱</span>
            {APP_CONFIG.contact.instagram}
          </a>
          <p className="text-xs text-gray-500 mt-2 flex items-center">
            <span className="mr-1">📍</span>
            {APP_CONFIG.contact.location}
          </p>
        </div>
      </div>
    </aside>
  )
}
