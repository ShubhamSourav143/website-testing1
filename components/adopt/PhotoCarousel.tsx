'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react';
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

interface PhotoCarouselProps {
  animals: Animal[];
  title: string;
  seeMoreLink: string;
}

export default function PhotoCarousel({ animals, title, seeMoreLink }: PhotoCarouselProps) {
  const [currentCardSet, setCurrentCardSet] = useState(0);
  const [cardImageIndexes, setCardImageIndexes] = useState([0, 0, 0]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareAnimal, setShareAnimal] = useState<Animal | null>(null);
  const [likedCards, setLikedCards] = useState<Set<string>>(new Set());

  // Get current 3 animals to display
  const totalSets = Math.ceil(animals.length / 3);
  const currentAnimals = animals.slice(currentCardSet * 3, (currentCardSet * 3) + 3);

  // Auto-swipe carousel every 60 seconds
  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setCurrentCardSet((prev) => (prev + 1) % totalSets);
      setCardImageIndexes([0, 0, 0]); // Reset image indexes when cards change
    }, 60000); // 60 seconds

    return () => clearInterval(carouselInterval);
  }, [totalSets]);

  // Individual photo rotation for each card (5 seconds)
  useEffect(() => {
    const photoIntervals = currentAnimals.map((animal, cardIndex) => {
      if (animal.images.length <= 1) return null;
      
      return setInterval(() => {
        setCardImageIndexes(prev => {
          const newIndexes = [...prev];
          newIndexes[cardIndex] = (newIndexes[cardIndex] + 1) % animal.images.length;
          return newIndexes;
        });
      }, 5000); // 5 seconds
    });

    return () => {
      photoIntervals.forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, [currentAnimals]);

  const handlePrevious = () => {
    setCurrentCardSet((prev) => (prev - 1 + totalSets) % totalSets);
    setCardImageIndexes([0, 0, 0]);
  };

  const handleNext = () => {
    setCurrentCardSet((prev) => (prev + 1) % totalSets);
    setCardImageIndexes([0, 0, 0]);
  };

  const handleShare = (animal: Animal) => {
    setShareAnimal(animal);
    setShowShareModal(true);
  };

  const toggleLike = (animalId: string) => {
    setLikedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(animalId)) {
        newSet.delete(animalId);
      } else {
        newSet.add(animalId);
      }
      return newSet;
    });
  };

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-lg text-gray-600">
          Meet our wonderful animals, each with their unique personality and story
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Previous animals"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Next animals"
        >
          <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
        </button>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-12">
          {currentAnimals.map((animal, cardIndex) => {
            const currentImageIndex = cardImageIndexes[cardIndex] || 0;
            const isLiked = likedCards.has(animal.id);
            
            return (
              <div
                key={`${animal.id}-${currentCardSet}`}
                className="card hover-lift group h-full flex flex-col animate-fadeInUp"
                style={{ animationDelay: `${cardIndex * 0.1}s` }}
              >
                {/* Photo with Instagram Story Style */}
                <div className="relative overflow-hidden rounded-t-xl h-64">
                  <img 
                    src={animal.images[currentImageIndex]} 
                    alt={`${animal.name} - ${animal.breed}`}
                    className="w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-105"
                  />
                  
                  {/* Instagram-style progress indicators */}
                  {animal.images.length > 1 && (
                    <div className="absolute top-3 left-3 right-3 flex space-x-1">
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
                    onClick={() => toggleLike(animal.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-300 shadow-sm"
                  >
                    <Heart className={`w-5 h-5 transition-all duration-300 ${
                      isLiked ? 'text-red-500 fill-current scale-110' : 'text-gray-600 hover:text-red-500'
                    }`} />
                  </button>

                  {/* Indian breed emoji */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-3xl">🐕</span>
                  </div>

                  {/* Image counter */}
                  {animal.images.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      {currentImageIndex + 1}/{animal.images.length}
                    </div>
                  )}
                </div>
                
                <div className="card-body flex-1 flex flex-col p-6">
                  {/* Animal Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
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
                      {animal.story.length > 100 ? animal.story.substring(0, 100) + '...' : animal.story}
                    </p>
                    <Link 
                      href={`/adopt/${animal.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline transition-colors duration-300"
                    >
                      Read Full Story →
                    </Link>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link
                      href={`/adopt/${animal.id}`}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-center block"
                    >
                      Adopt Now
                    </Link>
                    
                    <button
                      onClick={() => handleShare(animal)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm flex items-center justify-center space-x-2"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share Now</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSets }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentCardSet(index);
                setCardImageIndexes([0, 0, 0]);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentCardSet 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* See More Button */}
      <div className="text-center">
        <Link
          href={seeMoreLink}
          className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
        >
          <span>See More Animals</span>
          <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Share Modal */}
      {shareAnimal && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => {
            setShowShareModal(false);
            setShareAnimal(null);
          }}
          animal={shareAnimal}
        />
      )}
    </section>
  );
}