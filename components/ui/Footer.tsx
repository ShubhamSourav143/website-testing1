'use client'

import Link from 'next/link'
import { Instagram, Mail, Phone, MapPin, Heart, Shield, Users, Clock, Facebook, Youtube, Linkedin } from 'lucide-react'
import { APP_CONFIG } from '@/lib/constants'

export default function Footer() {
  const stats = [
    { icon: Heart, label: "Dogs Sterilized", value: APP_CONFIG.stats.dogsSterilized, color: "text-red-400" },
    { icon: Shield, label: "Vaccinations", value: APP_CONFIG.stats.vaccinations, color: "text-green-400" },
    { icon: Users, label: "Daily Feeding", value: APP_CONFIG.stats.dailyFeeding, color: "text-blue-400" },
    { icon: Clock, label: "Years of Service", value: APP_CONFIG.stats.yearsOfService, color: "text-purple-400" }
  ]

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Adopt Animals', href: '/adopt' },
    { label: 'Donate Now', href: '/donate' },
    { label: 'Our Stories', href: '/blog' },
    { label: 'Get Help', href: '/help' }
  ]

  const socialLinks = [
    { 
      icon: Facebook, 
      href: 'https://facebook.com/iitkgpanimalwelfare', 
      label: 'Facebook',
      color: 'hover:text-blue-500'
    },
    { 
      icon: Instagram, 
      href: 'https://instagram.com/animal__welfare_iitkgp', 
      label: 'Instagram',
      color: 'hover:text-pink-500'
    },
    { 
      icon: Youtube, 
      href: 'https://youtube.com/@iitkgpanimalwelfare', 
      label: 'YouTube',
      color: 'hover:text-red-500'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/iitkgp-animal-welfare', 
      label: 'LinkedIn',
      color: 'hover:text-blue-600'
    }
  ]

  return (
    <footer className="bg-gray-900 text-white mt-16 animate-fadeInUp relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 animate-float">
          <span className="text-6xl">🐕</span>
        </div>
        <div className="absolute top-20 right-20 animate-float delay-1000">
          <span className="text-4xl">🐱</span>
        </div>
        <div className="absolute bottom-20 left-1/4 animate-float delay-500">
          <span className="text-5xl">🐕</span>
        </div>
        <div className="absolute bottom-10 right-1/3 animate-float delay-1500">
          <span className="text-4xl">🐱</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Organization Info */}
          <div className="col-span-1 lg:col-span-2 animate-fadeInLeft">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center animate-float">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{APP_CONFIG.name}</h3>
                <p className="text-sm text-gray-400">{APP_CONFIG.tagline}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {APP_CONFIG.description}. Every animal deserves a life free from suffering.
            </p>
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-4 mb-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={idx}
                    href={social.href}
                    className={`flex items-center space-x-2 text-gray-300 transition-all duration-300 group ${social.color}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm">{social.label}</span>
                  </a>
                );
              })}
            </div>
            
            <div className="flex items-center space-x-2 text-gray-300">
              <Instagram className="w-4 h-4" />
              <span className="text-sm">{APP_CONFIG.contact.instagram}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fadeInUp delay-200">
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm hover:underline"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fadeInUp delay-300">
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-red-400" />
                <div>
                  <p className="text-gray-300">Emergency</p>
                  <a href={`tel:${APP_CONFIG.contact.emergency}`} className="text-red-400 font-semibold hover:text-red-300 transition-colors duration-300">
                    {APP_CONFIG.contact.emergency}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-gray-300">General</p>
                  <a href={`mailto:${APP_CONFIG.contact.email}`} className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                    {APP_CONFIG.contact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-green-400" />
                <div>
                  <p className="text-gray-300">Location</p>
                  <p className="text-green-400">{APP_CONFIG.contact.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-lg font-semibold mb-6 text-center text-white animate-fadeInUp">Our Impact Since 2019</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className="animate-fadeInUp hover-lift group" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Next Page Button */}
        <div className="border-t border-gray-800 pt-6 mb-6 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
          >
            <span>Read Our Stories</span>
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.</p>
            <p className="text-xs mt-1">Registered NGO under West Bengal Government • No Government Funding</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs">Available 24/7 for animal emergencies</p>
            <p className="text-xs text-red-400 font-medium">Emergency: {APP_CONFIG.contact.emergency}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}