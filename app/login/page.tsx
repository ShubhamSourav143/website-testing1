'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Crown, Star, Users, Gamepad2, BookOpen, Gift } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showClubhousePreview, setShowClubhousePreview] = useState(false);

const handleGoogleSignIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://www.kgppaws.org/dashboard',
    },
  });
  if (error) {
    alert('Google sign-in failed: ' + error.message);
  }
};

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    alert('Login failed: ' + error.message);
  } else {
    router.replace('/dashboard');
  }
};

  const clubhouseFeatures = [
    {
      icon: Crown,
      title: 'Digital Pet Companion',
      description: 'Adopt and customize your virtual rescue with Indian accessories',
      color: 'text-yellow-500'
    },
    {
      icon: Gamepad2,
      title: 'Street Smart Game',
      description: 'Multiplayer board game with Indian street vibes',
      color: 'text-purple-500'
    },
    {
      icon: Users,
      title: 'Paw Circles',
      description: 'Join communities like "Campus Alumni Paws" and "Rescue Warriors"',
      color: 'text-blue-500'
    },
    {
      icon: BookOpen,
      title: 'Story Platform',
      description: 'Share your rescue stories and become a Star Blogger',
      color: 'text-green-500'
    },
    {
      icon: Gift,
      title: 'Real Impact',
      description: 'Your virtual actions trigger real donations and help',
      color: 'text-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-orange-200"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to KGP Paws Clubhouse</h2>
              <p className="text-gray-600">Join the most paw-some community in India!</p>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl py-3 font-semibold mb-4 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              <svg width="20" height="20" viewBox="0 0 20 20">
                <g>
                  <path fill="#fff" d="M19.6 10.23c0-.66-.06-1.32-.18-1.95H10v3.7h5.43a4.64 4.64 0 0 1-2.01 3.04v2.5h3.25c1.9-1.75 2.99-4.34 2.99-7.29z"/>
                  <path fill="#fff" d="M10 20c2.7 0 4.96-.89 6.61-2.41l-3.25-2.5c-.91.62-2.07.99-3.36.99-2.59 0-4.78-1.75-5.56-4.1H1.1v2.57A10 10 0 0 0 10 20z"/>
                  <path fill="#fff" d="M4.44 12.48a5.97 5.97 0 0 1 0-3.96v-2.57H1.1a10.01 10.01 0 0 0 0 8.1l3.34-2.57z"/>
                  <path fill="#fff" d="M10 4.02c1.47 0 2.8.5 3.85 1.5l2.89-2.89C14.95 1.14 12.7 0 10 0A10 10 0 0 0 1.1 6.93l3.34 2.57C5.22 5.76 7.41 4.02 10 4.02z"/>
                </g>
              </svg>
              Join with Google
            </button>

            <div className="text-center text-gray-400 mb-4">or</div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                required
              />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                required
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                Enter Clubhouse
              </button>
            </form>

            <div className="flex justify-between mt-6 text-sm">
              <button className="text-orange-600 hover:text-orange-700 hover:underline transition-colors">
                Forgot password?
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="text-orange-600 hover:text-orange-700 hover:underline transition-colors"
              >
                Create account
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowClubhousePreview(!showClubhousePreview)}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                {showClubhousePreview ? 'Hide' : 'Preview'} Clubhouse Features
              </button>
            </div>
          </motion.div>

          {/* Clubhouse Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-8xl mb-4"
              >
                🐕
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                "Be a Hero, Not Just a Member"
              </h3>
              <p className="text-xl text-gray-700 mb-6">
                Every Click Saves a Life
              </p>
            </div>

            {showClubhousePreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                {clubhouseFeatures.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-orange-200 hover-lift"
                    >
                      <div className="flex items-center space-x-4">
                        <Icon className={`w-8 h-8 ${feature.color}`} />
                        <div>
                          <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 border border-green-200 text-center">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Join 500+ Members</h4>
              <p className="text-gray-700 mb-4">
                "Your Clubhouse, Your Dogs, Your Impact"
              </p>
              <div className="flex justify-center space-x-4 text-sm text-gray-600">
                <span>🏆 460+ Dogs Helped</span>
                <span>🎮 Daily Games</span>
                <span>📱 Real Impact</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
