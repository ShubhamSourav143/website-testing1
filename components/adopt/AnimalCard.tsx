'use client';

import { useState, useEffect } from 'react';
import { Heart, Share2, MapPin, Calendar, Shield, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import ShareModal from './ShareModal';

interface Animal {
  id: string;
  name: string;
  age: string;
  breed: string;
  gender: string;
  location: string;
  images: string[];
  story: string;
  vaccinated: boolean;
  sterilized: boolean;
  sterilization: string;
  vaccination: string;
}

interface AnimalCardProps {
  animal: Animal;
  autoPlay?: boolean;
  onHover?: (isHovered: boolean) => void;
}

export default function AnimalCard({ animal, autoPlay = true, onHover }: AnimalCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  // Instagram story-style auto-rotate images every 5 seconds
  useEffect(() => {
    if (!autoPlay || isHovered || animal.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % animal.images.length);
    }, 5000); // Changed to 5 seconds for Instagram story feel

    return () => clearInterval(interval);
  }, [autoPlay, isHovered, animal.images.length]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(false);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  // Get story preview (2-3 lines)
  const storyPreview = animal.story.length > 120 
    ? animal.story.substring(0, 120) + '...' 
    : animal.story;

  return (
    <>
      <div 
        className="card hover-lift group h-full flex flex-col animate-fadeInUp"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Instagram Story Style Image */}
        <div className="relative overflow-hidden rounded-t-xl h-48">
          <img 
            src={animal.images[currentImageIndex]} 
            alt={`${animal.name} - ${animal.breed}`}
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-105"
          />
          
          {/* Instagram-style progress indicators */}
          {animal.images.length > 1 && (
            <div className="absolute top-2 left-2 right-2 flex space-x-1">
              {animal.images.map((_, index) => (
                <div
                  key={index}
                  className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
                >
                  <div 
                    className={`h-full bg-white rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? 'w-full' : index < currentImageIndex ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              ))}
            </div>
          )}
          
          {/* Like Button */}
          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-300 shadow-sm group"
          >
            <Heart className={`w-4 h-4 transition-all duration-300 ${
              liked ? 'text-red-500 fill-current scale-110' : 'text-gray-600 hover:text-red-500'
            }`} />
          </button>

          {/* Indian breed emoji */}
          <div className="absolute top-3 left-3">
            <span className="text-2xl">🐕</span>
          </div>

          {/* Image counter */}
          {animal.images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {currentImageIndex + 1}/{animal.images.length}
            </div>
          )}
        </div>
        
        <div className="card-body flex-1 flex flex-col p-4">
          {/* Animal Info */}
          <div className="mb-3">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Name: {animal.name}
            </h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Age: {animal.age}</p>
              <p>Gender: {animal.gender}</p>
              <p>Breed: {animal.breed}</p>
              <p>Location Found: {animal.location}</p>
              <p>Sterilization: <span className={animal.sterilization === 'Done' ? 'text-green-600' : 'text-orange-600'}>{animal.sterilization}</span></p>
              <p>Vaccination: <span className={animal.vaccination === 'Done' ? 'text-green-600' : 'text-orange-600'}>{animal.vaccination}</span></p>
            </div>
          </div>

          {/* Story Preview */}
          <div className="mb-4 flex-1">
            <p className="text-gray-700 text-sm leading-relaxed mb-2">
              {storyPreview}
            </p>
            <Link 
              href={`/adopt/${animal.id}`}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline transition-colors duration-300"
            >
              Read Full Story →
            </Link>
          </div>

          {/* Action Buttons - Removed Donate Now and Add to Cart */}
          <div className="space-y-2">
            <Link
              href={`/adopt/${animal.id}`}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-center block"
            >
              Adopt Now
            </Link>
            
            <button
              onClick={handleShare}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm flex items-center justify-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        animal={animal}
      />
    </>
  );
}