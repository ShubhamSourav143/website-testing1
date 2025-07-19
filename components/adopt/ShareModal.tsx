'use client';

import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';

interface Animal {
  id: string;
  name: string;
  age: string;
  breed: string;
  images: string[];
  story: string;
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal;
}

export default function ShareModal({ isOpen, onClose, animal }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/adopt/${animal.id}`;
  const shareText = `Meet ${animal.name}, a ${animal.age} ${animal.breed} looking for a loving home! ${animal.story.substring(0, 100)}... Help spread the word! 🐾`;

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'Instagram',
      icon: '📷',
      url: `https://www.instagram.com/`,
      color: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      name: 'Facebook',
      icon: '👥',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Gmail',
      icon: '✉️',
      url: `mailto:?subject=Meet ${animal.name} - Available for Adoption&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`,
      color: 'bg-red-500 hover:bg-red-600'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full animate-scaleIn">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Share {animal.name}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Animal Preview */}
          <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 rounded-lg">
            <img 
              src={animal.images[0]} 
              alt={animal.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold text-gray-900">{animal.name}</h4>
              <p className="text-sm text-gray-600">{animal.age} • {animal.breed}</p>
            </div>
          </div>

          {/* Share Options */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handleShare(option.url)}
                className={`flex items-center justify-center space-x-2 py-3 px-4 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${option.color}`}
              >
                <span className="text-lg">{option.icon}</span>
                <span>{option.name}</span>
              </button>
            ))}
          </div>

          {/* Copy Link */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600 mb-2">Or copy link:</p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}