'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import DonationHistory from '../../components/dashboard/DonationHistory';
import AdoptionManager from '../../components/dashboard/AdoptionManager';
import ChatSupport from '../../components/dashboard/ChatSupport';
import FirstAidGame from '../../components/dashboard/FirstAidGame';
import BlogManager from '../../components/dashboard/BlogManager'; // Import the correct blog manager component
import '../../styles/animations.css';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace('/login');
      } else {
        setUser(user);
      }
      setLoading(false);
    });
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'donations', label: 'Donations', icon: '💰' },
    { id: 'blogs', label: 'Blogs', icon: '📝' },
    { id: 'adoptions', label: 'Adoptions', icon: '🐾' },
    { id: 'game', label: 'First Aid Game', icon: '🎮' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <img
                  src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user?.email}`}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg animate-float-3d"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-white">
                  <span className="text-lg">✓</span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user?.user_metadata?.name || user?.email}</h1>
                <p className="opacity-90">Member since {new Date(user?.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-orange-500 text-orange-600 bg-white'
                    : 'text-gray-600 hover:text-orange-500 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2 text-xl">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fadeInUp">
                <h2 className="text-2xl font-bold">Personal Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{user?.user_metadata?.name || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="font-medium">{new Date(user?.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Activity Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-gray-100 text-center">
                        <p className="text-3xl font-bold text-orange-500">0</p>
                        <p className="text-sm text-gray-500">Donations</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-100 text-center">
                        <p className="text-3xl font-bold text-blue-500">0</p>
                        <p className="text-sm text-gray-500">Blog Posts</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-100 text-center">
                        <p className="text-3xl font-bold text-green-500">0</p>
                        <p className="text-sm text-gray-500">Adoptions</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-100 text-center">
                        <p className="text-3xl font-bold text-purple-500">0</p>
                        <p className="text-sm text-gray-500">Game Score</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="text-center py-8 text-gray-500">
                    <p>No recent activity to display.</p>
                    <p className="mt-2">Start by making a donation, writing a blog, or adopting an animal!</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'blogs' && <BlogManager userId={user?.id} />}
            {activeTab === 'adoptions' && <AdoptionManager userId={user?.id} />}
            {activeTab === 'chat' && <ChatSupport userId={user?.id} />}
          </div>
        </div>
      </div>
    </div>
  );
}
