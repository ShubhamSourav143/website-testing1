'use client';

import { useState } from 'react';
import { Search, ShoppingCart, Users, User } from 'lucide-react';
import Link from 'next/link';

interface SearchAndActionsProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchAndActions({ 
  placeholder = "Search animals, stories, or help topics...", 
  onSearch 
}: SearchAndActionsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(2); // Demo cart count

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="flex items-center space-x-4 flex-1 max-w-2xl">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 relative group">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-white hover:shadow-sm"
        />
      </form>

      {/* Cart Icon */}
      <div className="relative">
        <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110 group">
          <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Join Member Button */}
      <Link
        href="/login"
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg group"
      >
        <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Join Member</span>
        <span className="sm:hidden">Join</span>
      </Link>
    </div>
  );
}