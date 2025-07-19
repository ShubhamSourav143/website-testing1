'use client';

import { useState, useEffect } from 'react';
import { Heart, X, DollarSign, Users } from 'lucide-react';
import Link from 'next/link';

export default function FloatingDonationWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(0);

  // Show widget after 10 seconds of page load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isDismissed]);

  // Animate progress bar
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setCurrentGoal(67); // 67% of goal reached
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-slideInRight">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-sm relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        {/* Header */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mr-3 animate-pulse">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Urgent Need</h3>
            <p className="text-xs text-gray-600">Winter Feeding Program</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Raised: ₹2,01,000</span>
            <span className="text-gray-600">Goal: ₹3,00,000</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${currentGoal}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{currentGoal}% funded</p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-4">
          Help us feed 320+ dogs daily during campus breaks. Every ₹100 feeds 10 dogs for a day.
        </p>

        {/* Action buttons */}
        <div className="space-y-2">
          <Link
            href="/donate"
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-center block hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            <DollarSign className="w-4 h-4 inline mr-2" />
            Donate Now
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="w-full text-gray-600 py-2 px-4 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200"
          >
            Maybe Later
          </button>
        </div>

        {/* Live indicator */}
        <div className="absolute top-3 left-3 flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
          <span className="text-xs text-gray-500">Live</span>
        </div>
      </div>
    </div>
  );
}