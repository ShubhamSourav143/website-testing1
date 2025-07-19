'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ExternalLink } from 'lucide-react';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(0.5);

  // YouTube video ID extracted from the URL
  const videoId = 'MEGTytO79LE';
  
  // YouTube embed URL with parameters to hide branding and autoplay
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=1&cc_load_policy=0&start=0&end=0&loop=1&playlist=${videoId}`;

  useEffect(() => {
    // Auto-hide controls after 3 seconds
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Watch Our Story</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See how we rescue, care for, and find homes for animals at IIT Kharagpur. Every animal has a story of hope and resilience.
        </p>
      </div>
      
      <div 
        className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl group bg-black"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* YouTube Embed */}
        <iframe
          src={embedUrl}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title="IIT KGP Animal Welfare Story"
        />

        {/* Custom overlay controls (optional) */}
        {showControls && (
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 backdrop-blur-sm rounded-lg p-3 transition-opacity duration-300">
            <div className="flex items-center space-x-3">
              <div className="text-white text-sm font-medium">
                🐕 Our Rescue Stories
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <a
                href={`https://youtube.com/shorts/${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
                title="Watch on YouTube"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Video Description */}
      <div className="text-center bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 font-medium">
          🎥 This video shows real rescue operations and the daily care we provide to over 320 animals on campus
        </p>
      </div>
    </div>
  );
}