'use client';
import { useState } from 'react';
import Image from 'next/image';

interface Interest {
  id: string;
  name: string;
  category: string;
}

interface UserProfileProps {
  userId: string;
}

export default function UserProfile({ userId }: UserProfileProps) {
  // Mock user data
  const [user, setUser] = useState({
    id: userId || 'user123',
    name: 'Priya Sharma',
    username: 'priya_explores',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    coverPhoto: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bio: 'Wildlife photographer, environmental activist, and adventure enthusiast. Passionate about conservation and connecting people with nature. Leading community clean-up initiatives in Mumbai.',
    location: 'Mumbai, India',
    joinedDate: 'January 2023',
    followers: 1247,
    following: 568,
    interests: [
      { id: 'int1', name: 'Wildlife Photography', category: 'Photography' },
      { id: 'int2', name: 'Environmental Conservation', category: 'Environment' },
      { id: 'int3', name: 'Hiking', category: 'Outdoors' },
      { id: 'int4', name: 'Sustainable Living', category: 'Lifestyle' },
      { id: 'int5', name: 'Community Organizing', category: 'Social' }
    ],
    achievements: [
      { id: 'ach1', name: 'Conservation Champion', description: 'Led 5 successful community clean-up events' },
      { id: 'ach2', name: 'Content Creator', description: 'Published 50+ high-quality posts' },
      { id: 'ach3', name: 'Network Builder', description: 'Connected with 1000+ like-minded individuals' }
    ]
  });

  // Friend request state
  const [friendRequestStatus, setFriendRequestStatus] = useState<'none' | 'pending' | 'accepted'>('none');

  const sendFriendRequest = () => {
    setFriendRequestStatus('pending');
  };

  const acceptFriendRequest = () => {
    setFriendRequestStatus('accepted');
  };

  const cancelFriendRequest = () => {
    setFriendRequestStatus('none');
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Cover Photo */}
      <div className="relative h-60 w-full">
        <img 
          src={user.coverPhoto} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Profile Header */}
      <div className="relative px-6 pt-4 pb-8">
        {/* Profile Picture */}
        <div className="absolute -top-20 left-6 border-4 border-white rounded-full shadow-lg">
          <img 
            src={user.photo} 
            alt={user.name} 
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 mb-12">
          {friendRequestStatus === 'none' && (
            <button 
              onClick={sendFriendRequest}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                Connect
              </span>
            </button>
          )}

          {friendRequestStatus === 'pending' && (
            <button 
              onClick={cancelFriendRequest}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Request Sent
              </span>
            </button>
          )}

          {friendRequestStatus === 'accepted' && (
            <button 
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Connected
              </span>
            </button>
          )}

          <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
              </svg>
              Message
            </span>
          </button>
        </div>

        {/* User Info */}
        <div className="mt-2">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Verified</span>
          </div>
          <p className="text-gray-500">@{user.username}</p>
          
          <div className="flex items-center mt-2 text-gray-600 text-sm">
            <span className="flex items-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {user.location}
            </span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Joined {user.joinedDate}
            </span>
          </div>

          <div className="flex mt-3 space-x-4 text-sm">
            <span className="font-medium">{user.followers} Followers</span>
            <span className="font-medium">{user.following} Following</span>
          </div>

          <p className="mt-4 text-gray-700">{user.bio}</p>
        </div>

        {/* Interests */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900">Interests</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <span 
                key={interest.id} 
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition cursor-pointer"
              >
                {interest.name}
              </span>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900">Achievements</h2>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {user.achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className="bg-amber-50 border border-amber-100 rounded-lg p-3"
              >
                <div className="flex items-center">
                  <div className="bg-amber-200 rounded-full p-2 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-900">{achievement.name}</h3>
                    <p className="text-xs text-amber-700">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}