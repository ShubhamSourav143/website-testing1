'use client';

import { useState } from 'react';
import { Heart, Shield, Users, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import VideoSection from '@/components/adopt/VideoSection';
import PhotoCarousel from '@/components/adopt/PhotoCarousel';
import { dogs, cats } from './data';
import Link from 'next/link';

const supportOptions = [
  {
    title: 'Foster for a Month',
    description: 'Provide temporary care while we find permanent homes. Give an animal a safe space to recover and socialize before finding their forever family.',
    amount: 5000,
    icon: '🏠',
    image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    title: 'Sponsor Feeding',
    description: 'Support our daily feeding program for 320+ animals. Your sponsorship ensures no animal goes hungry during campus breaks.',
    amount: 3000,
    icon: '🍽️',
    image: 'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    title: 'Medical Care Fund',
    description: 'Help cover emergency surgeries and treatments. Your contribution can save lives and provide critical medical care when needed most.',
    amount: 10000,
    icon: '🏥',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    title: 'Vaccination Drive',
    description: 'Support our mass vaccination campaigns. Help us protect thousands of animals from preventable diseases and maintain community health.',
    amount: 2000,
    icon: '💉',
    image: 'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

export default function AdoptPage() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [showAllDogs, setShowAllDogs] = useState(false);
  const [showAllCats, setShowAllCats] = useState(false);

  const handleSupportClick = (option: any) => {
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  const handleKnowMore = (option: any) => {
    window.location.href = `/adopt?program=${option.title.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <div className="space-y-16">
      {/* Section 1: Video */}
      <section className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Find Your Perfect Companion</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every animal has a story of survival, resilience, and hope. Watch their journey and discover how you can be part of their next chapter.
          </p>
        </div>
        <VideoSection />
      </section>

      {/* Section 2: Medical Care Info */}
      <section className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-blue-800">Complete Medical Care Guarantee</h2>
        </div>
        <p className="text-blue-700 text-lg max-w-4xl mx-auto">
          🏥 All animals adopted through our society receive complete medical care including vaccinations, sterilization, and lifetime health monitoring for free. Your new family member comes with ongoing veterinary support.
        </p>
      </section>

      {/* Section 3: Dog Photo Carousel */}
      <PhotoCarousel 
        animals={dogs}
        title="🐕 Dogs Looking for Homes"
        seeMoreLink="#dogs-section"
      />

      {/* Section 4: Cat Photo Carousel */}
      <PhotoCarousel 
        animals={cats}
        title="🐱 Cats Looking for Homes"
        seeMoreLink="#cats-section"
      />

      {/* Section 5: Why to Adopt */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why to Adopt?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Adopting a rescued animal is one of the most rewarding decisions you can make. Here's why it matters:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl mb-3">💝</div>
            <h3 className="font-semibold text-gray-900 mb-2">Saves Lives of Street Animals</h3>
            <p className="text-gray-600 text-sm">Every adoption directly saves a life and makes space for another animal in need. You become a hero in their story of survival.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl mb-3">🌱</div>
            <h3 className="font-semibold text-gray-900 mb-2">Reduces Campus Stray Population Humanely</h3>
            <p className="text-gray-600 text-sm">Adoption is the most humane way to manage stray populations, giving animals loving homes instead of life on the streets.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-900 mb-2">Gives Animals a Second Chance</h3>
            <p className="text-gray-600 text-sm">Many of our animals have overcome trauma, illness, or abandonment. Your love gives them the second chance they deserve.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl mb-3">❤️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Fosters Compassion and Responsibility</h3>
            <p className="text-gray-600 text-sm">Adopting teaches empathy and responsibility, creating a more compassionate society that values all living beings.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl mb-3">🏠</div>
            <h3 className="font-semibold text-gray-900 mb-2">Brings Joy and Companionship</h3>
            <p className="text-gray-600 text-sm">Rescued animals often show incredible gratitude and loyalty, forming deep bonds that enrich your life immeasurably.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="font-semibold text-gray-900 mb-2">Creates a Better Community</h3>
            <p className="text-gray-600 text-sm">When you adopt, you inspire others to do the same, creating a ripple effect of compassion in your community.</p>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-lg font-medium text-green-700 mb-4">
            "The greatness of a nation can be judged by the way its animals are treated." - Mahatma Gandhi
          </p>
          <p className="text-gray-600">
            Join thousands of families who have found their perfect companion through adoption. Your new best friend is waiting for you.
          </p>
        </div>
      </section>

      {/* Section 6: Can't Adopt? You Can Still Help! */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Can't Adopt? You Can Still Help!</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Not everyone can adopt, but there are many ways to make a difference. Every form of support saves lives and brings hope to animals in need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportOptions.map((option, index) => (
            <div key={index} className="card hover-lift">
              <div className="relative overflow-hidden rounded-t-xl h-48">
                <img 
                  src={option.image} 
                  alt={option.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-2xl">{option.icon}</span>
                </div>
              </div>
              <div className="card-body text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{option.description}</p>
                <div className="text-2xl font-bold text-green-600 mb-4">₹{option.amount.toLocaleString()}</div>
                <div className="space-y-2">
                  <button
                    onClick={() => handleSupportClick(option)}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-sm"
                  >
                    Donate Now
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="border border-gray-300 text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => handleKnowMore(option)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
                    >
                      Know More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expandable Dogs Section */}
      <section id="dogs-section" className="space-y-8">
        <div className="text-center">
          <button
            onClick={() => setShowAllDogs(!showAllDogs)}
            className="inline-flex items-center space-x-2 text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            <span>🐕 All Dogs Available for Adoption</span>
            {showAllDogs ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
          </button>
          {showAllDogs && (
            <p className="text-lg text-gray-600 mt-4">
              Browse through all our wonderful dogs looking for their forever homes
            </p>
          )}
        </div>
        
        {showAllDogs && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeInUp">
            {dogs.map((dog) => (
              <div key={dog.id} className="card hover-lift">
                <div className="relative overflow-hidden rounded-t-xl h-48">
                  <img 
                    src={dog.images[0]} 
                    alt={dog.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-2xl">🐕</span>
                  </div>
                </div>
                <div className="card-body p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Name: {dog.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <p>Age: {dog.age}</p>
                    <p>Gender: {dog.gender}</p>
                    <p>Breed: {dog.breed}</p>
                  </div>
                  <Link
                    href={`/adopt/${dog.id}`}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 text-center block text-sm"
                  >
                    Adopt Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Expandable Cats Section */}
      <section id="cats-section" className="space-y-8">
        <div className="text-center">
          <button
            onClick={() => setShowAllCats(!showAllCats)}
            className="inline-flex items-center space-x-2 text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            <span>🐱 All Cats Available for Adoption</span>
            {showAllCats ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
          </button>
          {showAllCats && (
            <p className="text-lg text-gray-600 mt-4">
              Discover all our beautiful cats ready to bring joy to your home
            </p>
          )}
        </div>
        
        {showAllCats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeInUp">
            {cats.map((cat) => (
              <div key={cat.id} className="card hover-lift">
                <div className="relative overflow-hidden rounded-t-xl h-48">
                  <img 
                    src={cat.images[0]} 
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-2xl">🐱</span>
                  </div>
                </div>
                <div className="card-body p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Name: {cat.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <p>Age: {cat.age}</p>
                    <p>Gender: {cat.gender}</p>
                    <p>Breed: {cat.breed}</p>
                  </div>
                  <Link
                    href={`/adopt/${cat.id}`}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 text-center block text-sm"
                  >
                    Adopt Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Next Page Button */}
      <section className="text-center py-8">
        <button 
          onClick={() => window.location.href = '/donate'}
          className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
        >
          <span>Explore Donation Options</span>
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </section>

      {/* Thank You Message */}
      {showThankYou && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-slideInRight z-50">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5" />
            <span className="font-medium">Thank you for your support! 🙏</span>
          </div>
        </div>
      )}
    </div>
  );
}
