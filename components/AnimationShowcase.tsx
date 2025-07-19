'use client';

import { useEffect, useRef, useState } from 'react';
import { initAllAnimations, apply3DTilt, applyParallax, applyMagneticEffect, applyRippleEffect, applyTypewriterEffect } from '../lib/animationUtils';

/**
 * AnimationShowcase Component
 * 
 * Demonstrates various advanced animation techniques:
 * - Parallax scrolling
 * - 3D transformations
 * - Interactive animations
 * - Responsive animations
 */
export default function AnimationShowcase() {
  const [activeTab, setActiveTab] = useState('parallax');
  const parallaxRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLButtonElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const staggerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Import animations CSS
    // Import animations CSS
    // Note: We'll handle this import in the page component
    
    // Initialize animations
    const cleanupFunctions: Array<() => void> = [];
    
    if (parallaxRef.current) {
      const cleanup = applyParallax(parallaxRef.current, { speed: 0.3, direction: 'up' });
      cleanupFunctions.push(cleanup);
    }
    
    if (tiltRef.current) {
      const cleanup = apply3DTilt(tiltRef.current, { intensity: 15 });
      cleanupFunctions.push(cleanup);
    }
    
    if (magneticRef.current) {
      const cleanup = applyMagneticEffect(magneticRef.current, { strength: 8, maxDistance: 100 });
      cleanupFunctions.push(cleanup);
    }
    
    if (rippleRef.current) {
      const cleanup = applyRippleEffect(rippleRef.current, { color: 'rgba(59, 130, 246, 0.5)' });
      cleanupFunctions.push(cleanup);
    }
    
    if (typewriterRef.current) {
      const cleanup = applyTypewriterEffect(
        typewriterRef.current,
        'Welcome to our cutting-edge animation showcase!',
        { speed: 70, onComplete: () => console.log('Typewriter animation completed') }
      );
      cleanupFunctions.push(cleanup);
    }
    
    // Initialize scroll animations
    const scrollElements = document.querySelectorAll('.fade-in-on-scroll');
    scrollElements.forEach(element => {
      element.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
    });
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    scrollElements.forEach(el => observer.observe(el));
    
    // Apply staggered animations to children
    if (staggerRef.current) {
      const children = staggerRef.current.children;
      Array.from(children).forEach((child, index) => {
        const element = child as HTMLElement;
        element.style.animationDelay = `${index * 100}ms`;
        element.classList.add('animate-fadeInUp');
      });
    }
    
    // Cleanup function
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
      scrollElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <div className="space-y-16 py-8">
      <section className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 animate-text-reveal">
          Animation Showcase
        </h1>
        <div ref={typewriterRef} className="text-xl text-gray-600 h-8"></div>
      </section>
      
      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
        {['parallax', '3d', 'interactive', 'scroll'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Effects
          </button>
        ))}
      </div>
      
      {/* Parallax Scrolling Section */}
      {activeTab === 'parallax' && (
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 animate-float-3d">Parallax Scrolling</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Parallax scrolling creates depth by moving elements at different speeds as you scroll.
            </p>
          </div>
          
          <div className="relative h-80 sm:h-96 overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 perspective-container">
            {/* Background Layer */}
            <div className="absolute inset-0 parallax-layer parallax-layer-back">
              <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-50"></div>
              <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-purple-100 opacity-60"></div>
            </div>
            
            {/* Middle Layer */}
            <div className="absolute inset-0 flex items-center justify-center parallax-layer">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Depth Through Motion</h3>
                <p className="text-gray-600 max-w-md">
                  As you scroll, elements move at different speeds creating a sense of depth and immersion.
                </p>
              </div>
            </div>
            
            {/* Foreground Layer */}
            <div ref={parallaxRef} className="absolute inset-0 pointer-events-none parallax-layer parallax-layer-front">
              <div className="absolute top-20 left-1/4 w-16 h-16 rounded-full bg-green-400 opacity-20"></div>
              <div className="absolute bottom-10 right-1/3 w-24 h-24 rounded-full bg-blue-400 opacity-30"></div>
              <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-purple-400 opacity-25"></div>
            </div>
          </div>
        </section>
      )}
      
      {/* 3D Transformations Section */}
      {activeTab === '3d' && (
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 animate-rotate-3d">3D Transformations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              3D transformations add depth and realism to your interface elements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 3D Tilt Card */}
            <div className="perspective-container">
              <div 
                ref={tiltRef}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover-3d"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-blue-500">★</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">3D Tilt Effect</h3>
                  <p className="text-gray-600">
                    Hover over this card to see a realistic 3D tilt effect that follows your cursor.
                  </p>
                </div>
              </div>
            </div>
            
            {/* 3D Flip Card */}
            <div className="flip-card-container h-64">
              <div className="flip-card-inner">
                <div className="flip-card-front bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 flex items-center justify-center">
                  <div className="text-center text-white">
                    <span className="text-4xl block mb-4">❤️</span>
                    <h3 className="text-xl font-bold">Hover to Flip</h3>
                  </div>
                </div>
                <div className="flip-card-back bg-gradient-to-br from-green-500 to-blue-600 rounded-xl shadow-lg p-6 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold mb-2">3D Flip Effect</h3>
                    <p>This card flips in 3D space, revealing content on both sides.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Morphing Shape */}
          <div className="flex justify-center">
            <div className="w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 animate-morph flex items-center justify-center">
              <span className="text-white font-bold">Morphing Shape</span>
            </div>
          </div>
        </section>
      )}
      
      {/* Interactive Animations Section */}
      {activeTab === 'interactive' && (
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Interactive Animations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Animations that respond to user interactions create engaging experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Magnetic Button */}
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-xl font-bold">Magnetic Effect</h3>
              <p className="text-gray-600 text-center">
                This button is attracted to your cursor when nearby.
              </p>
              <button
                ref={magneticRef}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg"
              >
                Magnetic Button
              </button>
            </div>
            
            {/* Ripple Button */}
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-xl font-bold">Ripple Effect</h3>
              <p className="text-gray-600 text-center">
                Click this button to see a material-style ripple effect.
              </p>
              <button
                ref={rippleRef}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg"
              >
                Ripple Button
              </button>
            </div>
          </div>
          
          {/* Staggered Animation */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-center mb-6">Staggered Animation</h3>
            <div ref={staggerRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 stagger-children">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div 
                  key={item}
                  className="bg-white rounded-lg shadow-md p-4 border border-gray-200 flex items-center justify-center h-24"
                >
                  <span className="text-2xl font-bold text-blue-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Scroll Animations Section */}
      {activeTab === 'scroll' && (
        <section className="space-y-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Scroll Animations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Elements animate as they enter the viewport while scrolling.
            </p>
          </div>
          
          {/* Scroll Animation Cards */}
          <div className="space-y-12">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="fade-in-on-scroll bg-white rounded-xl shadow-lg p-6 border border-gray-200 max-w-2xl mx-auto"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-bold text-blue-600">{item}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Scroll Animation {item}</h3>
                    <p className="text-gray-600">
                      This card animates as it enters the viewport. Scroll down to see more animations trigger as elements become visible.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Text Reveal Animation */}
          <div className="fade-in-on-scroll text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Text Reveal Animation</h3>
            <p className="animate-text-reveal inline-block text-gray-600">
              This text reveals itself with a smooth animation effect as it enters the viewport.
            </p>
          </div>
        </section>
      )}
      
      {/* Call to Action */}
      <section className="text-center max-w-2xl mx-auto px-4 fade-in-on-scroll">
        <h2 className="text-3xl font-bold mb-4">Ready to Implement?</h2>
        <p className="text-gray-600 mb-6">
          These animations can be easily integrated into your website to create captivating visual experiences.
        </p>
        <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          Get Started
          <span className="ml-2">→</span>
        </button>
      </section>
    </div>
  );
}