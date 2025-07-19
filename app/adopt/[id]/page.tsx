'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Heart, Share2, MapPin, Calendar, Shield, Stethoscope, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import Link from 'next/link';
import { dogs, cats } from '../data';
import ShareModal from '@/components/adopt/ShareModal';

interface FormData {
  name: string;
  email: string;
  mobile: string;
  address: string;
  pincode: string;
  agreement: boolean;
}

export default function AnimalDetailPage() {
  const params = useParams();
  const animalId = params.id as string;
  
  const [animal, setAnimal] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    address: '',
    pincode: '',
    agreement: false
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [suggestedAnimals, setSuggestedAnimals] = useState<any[]>([]);

  useEffect(() => {
    // Find the animal by ID
    const allAnimals = [...dogs, ...cats];
    const foundAnimal = allAnimals.find(a => a.id === animalId);
    setAnimal(foundAnimal);

    if (foundAnimal) {
      // Get suggested animals (same type, different from current)
      const sameType = foundAnimal.breed.includes('Cat') ? cats : dogs;
      const suggestions = sameType
        .filter(a => a.id !== animalId)
        .slice(0, 3);
      setSuggestedAnimals(suggestions);
    }
  }, [animalId]);

  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Animal Not Found</h1>
          <Link href="/adopt" className="text-blue-600 hover:text-blue-700">
            ← Back to Adoption Page
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % animal.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + animal.images.length) % animal.images.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    console.log('Adoption form submitted:', { animal: animal.id, ...formData });
    
    setShowSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false);
      setShowForm(false);
      setFormData({
        name: '',
        email: '',
        mobile: '',
        address: '',
        pincode: '',
        agreement: false
      });
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center animate-scaleIn shadow-xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎉</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your interest in adopting {animal.name}. We'll review your application and contact you within 24-48 hours.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            You'll receive a confirmation email shortly.
          </p>
          <Link
            href="/adopt"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse More Animals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Back Button */}
      <Link
        href="/adopt"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Adoption Page
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative h-96 rounded-xl overflow-hidden">
            <img 
              src={animal.images[currentImageIndex]} 
              alt={`${animal.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {animal.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Action buttons overlay */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => setShowShareModal(true)}
                className="p-2 bg-white/90 rounded-full hover:bg-white transition-all shadow-sm"
              >
                <Share2 className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-all shadow-sm">
                <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
              </button>
            </div>
          </div>
          
          {animal.images.length > 1 && (
            <div className="flex justify-center space-x-2">
              {animal.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Animal Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Meet {animal.name}</h1>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <div>
                <span className="text-gray-600">Age:</span>
                <div className="font-medium">{animal.age}</div>
              </div>
              <div>
                <span className="text-gray-600">Breed:</span>
                <div className="font-medium">{animal.breed}</div>
              </div>
              <div>
                <span className="text-gray-600">Gender:</span>
                <div className="font-medium">{animal.gender}</div>
              </div>
              <div>
                <span className="text-gray-600">Location Found:</span>
                <div className="font-medium">{animal.location}</div>
              </div>
              <div>
                <span className="text-gray-600">Sterilization:</span>
                <div className={`font-medium ${animal.sterilization === 'Done' ? 'text-green-600' : 'text-orange-600'}`}>
                  {animal.sterilization}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Vaccination:</span>
                <div className={`font-medium ${animal.vaccination === 'Done' ? 'text-green-600' : 'text-orange-600'}`}>
                  {animal.vaccination}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{animal.name}'s Full Story</h3>
              <p className="text-gray-700 leading-relaxed">{animal.story}</p>
            </div>

            {!showForm ? (
              <div className="space-y-3">
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                  Adopt {animal.name} Now
                </button>
                
                <button 
                  onClick={() => setShowShareModal(true)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share {animal.name}'s Story</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Adoption Application</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Complete Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="agreement"
                        checked={formData.agreement}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                      <div className="text-sm">
                        <p className="text-gray-700">
                          I agree to the adoption terms and conditions and understand my responsibilities as a pet owner.
                        </p>
                        <a
                          href="/adoption-agreement.pdf"
                          target="_blank"
                          className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center mt-1"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download Agreement PDF
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!formData.agreement}
                      className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Suggested Animals */}
      {suggestedAnimals.length > 0 && (
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Animals Looking for Homes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestedAnimals.map((suggestedAnimal) => (
              <Link
                key={suggestedAnimal.id}
                href={`/adopt/${suggestedAnimal.id}`}
                className="card hover-lift group"
              >
                <div className="relative overflow-hidden rounded-t-xl h-48">
                  <img 
                    src={suggestedAnimal.images[0]} 
                    alt={suggestedAnimal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="card-body p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{suggestedAnimal.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{suggestedAnimal.age} • {suggestedAnimal.breed}</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{suggestedAnimal.story}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        animal={animal}
      />
    </div>
  );
}