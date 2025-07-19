/**
 * Advanced Animation Utilities for Pradyogiki
 * 
 * This file contains utilities for creating advanced animations:
 * - Parallax scrolling effects
 * - 3D transformations
 * - Interactive animations
 * - Performance optimizations
 */

import { useEffect, useState, useRef, RefObject } from 'react';

// ===== PARALLAX SCROLLING =====

/**
 * Hook to create parallax scrolling effect
 * @param speed - Speed of parallax effect (0.1 to 1.0 recommended)
 * @param direction - Direction of parallax movement
 * @returns Transform style object to apply to element
 */
export function useParallax(speed: number = 0.5, direction: 'up' | 'down' | 'left' | 'right' = 'up') {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setOffset(scrollY * speed);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  // Calculate transform based on direction
  const getTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(-${offset}px)`;
      case 'down':
        return `translateY(${offset}px)`;
      case 'left':
        return `translateX(-${offset}px)`;
      case 'right':
        return `translateX(${offset}px)`;
      default:
        return `translateY(-${offset}px)`;
    }
  };
  
  return {
    transform: getTransform(),
    transition: 'transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)',
  };
}

/**
 * Advanced parallax effect with depth and rotation
 * @param depth - Depth factor (0.1 to 1.0)
 * @returns Style object with transform properties
 */
export function useAdvancedParallax(depth: number = 0.3) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      // Calculate mouse position relative to center of screen
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [depth]);
  
  return {
    transform: `
      translateY(${scrollPosition * -depth}px)
      rotateX(${mousePosition.y * 5 * depth}deg)
      rotateY(${mousePosition.x * 5 * depth}deg)
      scale(${1 + depth * 0.1})
    `,
    transition: 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)',
  };
}

// ===== 3D TRANSFORMATIONS =====

/**
 * Hook to create a 3D tilt effect on hover
 * @param intensity - Intensity of the tilt effect (1-20 recommended)
 * @returns Object with ref to attach to element and style props
 */
export function use3DTilt(intensity: number = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.1s ease',
  });
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -intensity;
      const rotateY = ((x - centerX) / centerX) * intensity;
      
      setTiltStyle({
        transform: `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          scale3d(1.05, 1.05, 1.05)
        `,
        transition: 'transform 0.1s ease',
      });
    };
    
    const handleMouseLeave = () => {
      setTiltStyle({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.3s ease',
      });
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);
  
  return { ref, style: tiltStyle };
}

/**
 * Hook to create a 3D flip card effect
 * @returns Object with refs and handlers for flip card
 */
export function use3DFlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const frontStyle = {
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    backfaceVisibility: 'hidden' as const,
    position: 'absolute' as const,
    width: '100%',
    height: '100%',
  };
  
  const backStyle = {
    transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    backfaceVisibility: 'hidden' as const,
    position: 'absolute' as const,
    width: '100%',
    height: '100%',
  };
  
  return {
    isFlipped,
    toggleFlip,
    frontRef,
    backRef,
    frontStyle,
    backStyle,
    containerStyle: {
      perspective: '1000px',
      position: 'relative' as const,
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d' as const,
    },
  };
}

// ===== SCROLL ANIMATIONS =====

/**
 * Hook to animate elements when they enter the viewport
 * @param threshold - Visibility threshold (0-1)
 * @param rootMargin - Root margin for Intersection Observer
 * @returns Object with ref to attach to element and visibility state
 */
export function useScrollAnimation(
  threshold: number = 0.1,
  rootMargin: string = '0px'
) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, no need to observe anymore
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);
  
  return { ref, isVisible };
}

/**
 * Hook to create staggered animations for child elements
 * @param childCount - Number of children to animate
 * @param baseDelay - Base delay before starting animations (ms)
 * @param staggerDelay - Delay between each child animation (ms)
 * @returns Array of delay values for each child
 */
export function useStaggeredAnimation(
  childCount: number,
  baseDelay: number = 0,
  staggerDelay: number = 100
) {
  return Array.from({ length: childCount }, (_, i) => baseDelay + i * staggerDelay);
}

// ===== INTERACTIVE ANIMATIONS =====

/**
 * Hook to create a magnetic effect that attracts elements to cursor
 * @param strength - Strength of magnetic pull (1-10 recommended)
 * @returns Object with ref and necessary handlers
 */
export function useMagneticEffect(strength: number = 5) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from cursor to center
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Calculate distance
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Maximum distance for effect (in pixels)
      const maxDistance = 100;
      
      if (distance < maxDistance) {
        // Calculate pull strength based on distance
        const pull = (1 - distance / maxDistance) * strength;
        
        setPosition({
          x: distanceX * pull * 0.1,
          y: distanceY * pull * 0.1,
        });
      } else {
        // Reset position when cursor is far away
        setPosition({ x: 0, y: 0 });
      }
    };
    
    const handleMouseLeave = () => {
      // Smoothly reset position
      setPosition({ x: 0, y: 0 });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);
  
  return {
    ref,
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)',
    },
  };
}

/**
 * Hook to create a ripple effect on click
 * @param color - Color of the ripple
 * @returns Object with ref and click handler
 */
export function useRippleEffect(color: string = 'rgba(255, 255, 255, 0.7)') {
  const ref = useRef<HTMLElement>(null);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; size: number; id: number }>>([]);
  
  useEffect(() => {
    // Cleanup ripples after animation completes
    const timeouts: number[] = [];
    
    ripples.forEach((ripple) => {
      const timeout = window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 1000); // Match this with CSS animation duration
      
      timeouts.push(timeout);
    });
    
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [ripples]);
  
  const createRipple = (e: globalThis.MouseEvent) => {
    const element = ref.current;
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    
    // Get click position relative to element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate ripple size (should be at least as large as the element's diagonal)
    const size = Math.max(rect.width, rect.height) * 2;
    
    // Add new ripple
    setRipples((prev) => [...prev, { x, y, size, id: Date.now() }]);
  };
  
  return {
    ref,
    createRipple,
    rippleStyles: {
      position: 'relative' as const,
      overflow: 'hidden' as const,
    },
    ripples: ripples.map((ripple) => ({
      id: ripple.id,
      style: {
        position: 'absolute' as const,
        left: ripple.x - ripple.size / 2,
        top: ripple.y - ripple.size / 2,
        width: ripple.size,
        height: ripple.size,
        borderRadius: '50%',
        background: color,
        transform: 'scale(0)',
        animation: 'ripple-animation 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        pointerEvents: 'none' as const,
      },
    })),
  };
}

// ===== UTILITY FUNCTIONS =====

/**
 * Utility to create a smooth scroll to element
 * @param elementId - ID of element to scroll to
 * @param offset - Offset from the top (px)
 * @param duration - Duration of scroll animation (ms)
 */
export function smoothScrollTo(elementId: string, offset: number = 0, duration: number = 1000) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const targetPosition = elementPosition - offset;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;
  
  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Easing function: easeInOutCubic
    const easeProgress = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    
    window.scrollTo(0, startPosition + distance * easeProgress);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }
  
  requestAnimationFrame(animation);
}

/**
 * Utility to create a typewriter effect
 * @param text - Text to animate
 * @param speed - Speed of typing (ms per character)
 * @returns Current text state and completion status
 */
export function useTypewriterEffect(text: string, speed: number = 50) {
  const [currentText, setCurrentText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    let currentIndex = 0;
    setCurrentText('');
    setIsComplete(false);
    
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setCurrentText((prev) => prev + text.charAt(currentIndex));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed]);
  
  return { currentText, isComplete };
}