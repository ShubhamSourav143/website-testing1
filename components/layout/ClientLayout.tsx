'use client'

import { useState, useEffect } from 'react'
import Sidebar from '../ui/Sidebar'
import Header from '../ui/Header'
import Footer from '../ui/Footer'
import CampaignProgressBar from '../CampaignProgressBar'
import FloatingDonationWidget from '../FloatingDonationWidget'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile) {
        setSidebarOpen(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Mobile overlay
  const showOverlay = isMobile && sidebarOpen

  return (
    <>
      {/* Campaign Progress Bar - Always at top */}
      <CampaignProgressBar />
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Mobile Overlay */}
      {showOverlay && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Header - Adjusted for campaign bar */}
      <Header 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      {/* Main Content - Adjusted for campaign bar */}
      <main className={`min-h-screen transition-all duration-300 ${
        sidebarOpen && !isMobile ? 'ml-80' : 'ml-0'
      } mt-28 px-4 sm:px-6 lg:px-8 py-8`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
        <Footer />
      </main>

      {/* Additional Components */}
      <FloatingDonationWidget />
    </>
  )
}