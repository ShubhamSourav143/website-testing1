'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Animal {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  location: string;
  image: string;
  description: string;
  vaccinated: boolean;
  neutered: boolean;
  special_needs: boolean;
  care_type: string;
  tags: string[];
  story: string;
}

interface AdoptionManagerProps {
  userId: string;
}

// We need to create a new table for virtual adoptions
// For now, we'll simulate this with local state and localStorage
interface VirtualAdoption {
  id: string;
  animalId: string;
  userId: string;
  adoptedAt: string;
  animal: Animal;
}

export default function AdoptionManager({ userId }: AdoptionManagerProps) {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [adoptedAnimals, setAdoptedAnimals] = useState<VirtualAdoption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdoptModal, setShowAdoptModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch all animals
        const { data: animalsData, error: animalsError } = await supabase
          .from('animals')
          .select('*');

        if (animalsError) {
          console.error('Error fetching animals:', animalsError);
          return;
        }

        setAnimals(animalsData || []);

        // Simulate fetching virtual adoptions from localStorage
        // In a real app, this would be a database table
        const savedAdoptions = localStorage.getItem(`adoptions_${userId}`);
        if (savedAdoptions) {
          const parsedAdoptions = JSON.parse(savedAdoptions);
          
          // Merge animal data with adoptions
          const adoptionsWithAnimals = parsedAdoptions.map((adoption: any) => {
            const animal = animalsData?.find((a) => a.id === adoption.animalId);
            return { ...adoption, animal };
          }).filter((adoption: any) => adoption.animal); // Filter out any adoptions where animal wasn't found
          
          setAdoptedAnimals(adoptionsWithAnimals);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  const handleAdoptClick = (animal: Animal) => {
    setSelectedAnimal(animal);
    setShowAdoptModal(true);
  };

  const confirmAdoption = () => {
    if (!selectedAnimal) return;

    // Create new virtual adoption
    const newAdoption: VirtualAdoption = {
      id: crypto.randomUUID(),
      animalId: selectedAnimal.id,
      userId,
      adoptedAt: new Date().toISOString(),
      animal: selectedAnimal,
    };

    // Add to state
    const updatedAdoptions = [...adoptedAnimals, newAdoption];
    setAdoptedAnimals(updatedAdoptions);

    // Save to localStorage (in a real app, this would be saved to a database)
    localStorage.setItem(
      `adoptions_${userId}`,
      JSON.stringify(updatedAdoptions.map(adoption => ({
        id: adoption.id,
        animalId: adoption.animalId,
        userId: adoption.userId,
        adoptedAt: adoption.adoptedAt,
      })))
    );

    // Close modal
    setShowAdoptModal(false);
    setSelectedAnimal(null);
  };

  return (
    <div className="space-y-6 animate-fadeInUp">
      <h2 className="text-2xl font-bold">Virtual Adoptions</h2>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-500">Loading animals...</p>
        </div>
      ) : (
        <>
          {/* Adopted Animals Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Your Adopted Animals</h3>
            
            {adoptedAnimals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adoptedAnimals.map((adoption) => (
                  <div key={adoption.id} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img src={adoption.animal.image} alt={adoption.animal.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-lg font-semibold text-gray-900">{adoption.animal.name}</h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Adopted
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {adoption.animal.breed} • {adoption.animal.age} • {adoption.animal.gender}
                      </p>
                      <p className="mt-2 text-sm text-gray-500">
                        Adopted on {new Date(adoption.adoptedAt).toLocaleDateString()}
                      </p>
                      <div className="mt-4 flex justify-between">
                        <a
                          href={`/adopt/${adoption.animal.id}`}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                        >
                          View Details
                        </a>
                        <button
                          className="inline-flex items-center px-3 py-1 border border-orange-300 text-sm leading-5 font-medium rounded-md text-orange-700 bg-orange-50 hover:bg-orange-100 focus:outline-none focus:border-orange-300 focus:shadow-outline-orange active:bg-orange-200 transition ease-in-out duration-150"
                        >
                          Support
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <div className="inline-block p-3 rounded-full bg-orange-100 text-orange-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No adoptions yet</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                  You haven't virtually adopted any animals yet. Adoption helps support our care for animals in need.
                </p>
              </div>
            )}
          </div>

          {/* Available Animals Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Animals Available for Virtual Adoption</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {animals.map((animal) => {
                const isAdopted = adoptedAnimals.some((adoption) => adoption.animalId === animal.id);
                
                return (
                  <div key={animal.id} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img src={animal.image} alt={animal.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-lg font-semibold text-gray-900">{animal.name}</h4>
                        {animal.special_needs && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Special Needs
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {animal.breed} • {animal.age} • {animal.gender}
                      </p>
                      <p className="mt-2 text-sm text-gray-500 line-clamp-2">{animal.description}</p>
                      <div className="mt-4 flex justify-between">
                        <a
                          href={`/adopt/${animal.id}`}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                        >
                          View Details
                        </a>
                        {isAdopted ? (
                          <span className="inline-flex items-center px-3 py-1 border border-green-300 text-sm leading-5 font-medium rounded-md text-green-700 bg-green-50">
                            Adopted
                          </span>
                        ) : (
                          <button
                            onClick={() => handleAdoptClick(animal)}
                            className="inline-flex items-center px-3 py-1 border border-orange-300 text-sm leading-5 font-medium rounded-md text-orange-700 bg-orange-50 hover:bg-orange-100 focus:outline-none focus:border-orange-300 focus:shadow-outline-orange active:bg-orange-200 transition ease-in-out duration-150"
                          >
                            Adopt
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Adoption Info */}
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
            <h3 className="font-medium text-orange-800 mb-2">About Virtual Adoption</h3>
            <p className="text-sm text-orange-700 mb-2">
              Virtual adoption is a way to support the care of animals without physically taking them home. Your contribution helps provide:
            </p>
            <ul className="text-sm text-orange-700 space-y-1 list-disc pl-5">
              <li>Food and shelter</li>
              <li>Medical care and treatments</li>
              <li>Special equipment for disabled animals</li>
              <li>Training and socialization</li>
            </ul>
          </div>

          {/* Adoption Modal */}
          {showAdoptModal && selectedAnimal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6 animate-fadeInUp">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Virtual Adoption</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <img src={selectedAnimal.image} alt={selectedAnimal.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <p className="font-medium">{selectedAnimal.name}</p>
                    <p className="text-sm text-gray-500">{selectedAnimal.breed} • {selectedAnimal.age}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  By virtually adopting {selectedAnimal.name}, you're helping provide the care they need. You'll receive updates about their progress and well-being.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAdoptModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmAdoption}
                    className="px-4 py-2 bg-orange-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Confirm Adoption
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}