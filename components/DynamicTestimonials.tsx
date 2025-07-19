'use client';

import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "The relationship between IIT Kharagpur and its animal residents is unique. Dogs offer company, security, and family.",
    author: "Priya Sharma",
    role: "Student Volunteer",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5
  },
  {
    id: 2,
    text: "Every animal deserves a life free from suffering. This organization makes that possible every single day.",
    author: "Dr. Rajesh Kumar",
    role: "Faculty Member",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5
  },
  {
    id: 3,
    text: "Volunteering here changed my perspective on compassion. These animals teach us about resilience and hope.",
    author: "Ankit Verma",
    role: "Alumni Volunteer",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5
  },
  {
    id: 4,
    text: "The 24/7 emergency response saved my dog's life. Their dedication is truly inspiring and life-changing.",
    author: "Meera Patel",
    role: "Local Resident",
    image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5
  },
  {
    id: 5,
    text: "From feeding programs to medical care, every rupee donated creates visible impact. Transparency at its best.",
    author: "Suresh Gupta",
    role: "Regular Donor",
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5
  },
  {
    id: 6,
    text: "Adopting from here was seamless. The follow-up care and support made the transition perfect for our family.",
    author: "Kavya Singh",
    role: "Adoptive Parent",
    image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5
  }
];

export default function DynamicTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <div className="bg-gray-50 py-12 sm:py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 animate-fadeInUp">Community Voices</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fadeInUp delay-200">
            Real stories from students, faculty, volunteers, and families whose lives we've touched
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className={`transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              
              {/* Quote icon */}
              <div className="absolute top-6 left-6 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-blue-600" />
              </div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 text-yellow-400 fill-current animate-pulse" 
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>

                {/* Testimonial text */}
                <blockquote className="text-xl sm:text-2xl text-gray-700 text-center mb-8 italic leading-relaxed">
                  "{current.text}"
                </blockquote>

                {/* Author info */}
                <div className="flex items-center justify-center space-x-4">
                  <img 
                    src={current.image} 
                    alt={current.author}
                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-200 shadow-lg hover:scale-110 transition-transform duration-300"
                  />
                  <div className="text-center sm:text-left">
                    <p className="font-bold text-gray-900 text-lg">{current.author}</p>
                    <p className="text-gray-600">{current.role}</p>
                  </div>
                </div>

                {/* Progress indicators */}
                <div className="flex justify-center mt-8 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsVisible(false);
                        setTimeout(() => {
                          setCurrentIndex(index);
                          setIsVisible(true);
                        }, 250);
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-blue-600 scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}