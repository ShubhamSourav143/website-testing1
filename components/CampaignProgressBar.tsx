'use client';

import { useState } from 'react';
import { X, Info, Heart } from 'lucide-react';
import Link from 'next/link';

interface Campaign {
  id: number;
  title: string;
  description: string;
  target: number;
  raised: number;
  percentage: number;
  details: string;
}

const currentCampaign: Campaign = {
  id: 1,
  title: "Project 1/5: Permanent Sanctuary for Disabled Animals",
  description: "Help Us Build a Shelter",
  target: 2000000, // 20 lakh INR
  raised: 1360000, // 13.6 lakh INR
  percentage: 68,
  details: "We need 20 lakh INR to open a permanent shelter near IIT KGP for our elderly and disabled animals who require 24/7 specialized care. This sanctuary will provide a safe, comfortable home for animals like Romi, Bunti, and Shanti who cannot be adopted due to their medical conditions."
};

export default function CampaignProgressBar() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const remaining = currentCampaign.target - currentCampaign.raised;
  const percentageLeft = 100 - currentCampaign.percentage;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 animate-pulse flex-shrink-0" />
                <span className="font-semibold text-sm truncate">{currentCampaign.title}</span>
              </div>
              
              <div 
                className="relative flex-shrink-0"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-white/20 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-white h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${currentCampaign.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap">
                    {currentCampaign.percentage}% funded
                  </span>
                  <Info className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform" />
                </div>

                {/* Tooltip */}
                {showTooltip && (
                  <div className="absolute top-full left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-xl p-4 w-80 z-50 animate-fadeInUp">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">{currentCampaign.description}</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600">Target:</span>
                          <div className="font-semibold">₹{(currentCampaign.target / 100000).toFixed(1)}L</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Raised:</span>
                          <div className="font-semibold text-green-600">₹{(currentCampaign.raised / 100000).toFixed(1)}L</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Remaining:</span>
                          <div className="font-semibold text-orange-600">₹{(remaining / 100000).toFixed(1)}L</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Progress:</span>
                          <div className="font-semibold">{currentCampaign.percentage}%</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowDetails(true)}
                        className="text-blue-600 hover:text-blue-700 text-xs font-medium hover:underline"
                      >
                        Know more →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Link
              href="/donate"
              className="bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md transform hover:scale-105 whitespace-nowrap"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>

      {/* Detailed Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{currentCampaign.description}</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${currentCampaign.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{(currentCampaign.raised / 100000).toFixed(1)}L raised</span>
                  <span>₹{(currentCampaign.target / 100000).toFixed(1)}L goal</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {currentCampaign.details}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₹{(currentCampaign.raised / 100000).toFixed(1)}L</div>
                  <div className="text-sm text-gray-600">Raised so far</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">₹{(remaining / 100000).toFixed(1)}L</div>
                  <div className="text-sm text-gray-600">Still needed</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{currentCampaign.percentage}%</div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/donate"
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-center hover:from-green-700 hover:to-blue-700 transition-all transform hover:-translate-y-1 shadow-lg"
                >
                  Support This Campaign
                </Link>
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}