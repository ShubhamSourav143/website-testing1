'use client';

import Link from 'next/link';
import { Heart, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface DonationButtonProps {
  variant?: 'primary' | 'secondary' | 'floating' | 'inline';
  size?: 'sm' | 'md' | 'lg';
  amount?: number;
  purpose?: string;
  className?: string;
}

export default function DonationButton({ 
  variant = 'primary', 
  size = 'md', 
  amount, 
  purpose = 'Support Our Mission',
  className = ''
}: DonationButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-green-600 border-2 border-green-600 hover:bg-green-50',
    floating: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-2xl',
    inline: 'bg-green-600 text-white hover:bg-green-700'
  };

  return (
    <Link
      href="/donate"
      className={`
        inline-flex items-center justify-center font-semibold rounded-lg 
        transition-all duration-300 transform hover:-translate-y-1 
        group animate-pulse hover:animate-none
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Heart className={`mr-2 transition-all duration-300 ${
        isHovered ? 'scale-125 text-red-300' : ''
      } ${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}`} />
      
      <span className="relative">
        {amount ? `Donate ₹${amount.toLocaleString()}` : purpose}
        {variant === 'floating' && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></span>
        )}
      </span>
      
      {variant === 'primary' && (
        <DollarSign className={`ml-2 transition-transform duration-300 ${
          isHovered ? 'translate-x-1' : ''
        } ${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}`} />
      )}
    </Link>
  );
}