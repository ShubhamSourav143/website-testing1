/**
 * Animation Utilities for Pradyogiki
 * 
 * This file contains vanilla JavaScript utilities for creating advanced animations:
 * - Parallax scrolling effects
 * - 3D transformations
 * - Interactive animations
 * - Performance optimizations
 */

// ===== PARALLAX SCROLLING =====

/**
 * Apply parallax effect to an element based on scroll position
 * @param {HTMLElement} element - The element to apply parallax to
 * @param {Object} options - Configuration options
 * @param {number} options.speed - Speed of parallax effect (0.1 to 1.0 recommended)
 * @param {string} options.direction - Direction of parallax movement ('up', 'down', 'left', 'right')
 */
export function applyParallax(element, { speed = 0.5, direction = 'up' } = {}) {
  if (!element) return;
  
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const offset = scrollY * speed;
    
    let transform = '';
    switch (direction) {
      case 'up':
        transform = `translateY(-${offset}px)`;
        break;
      case 'down':
        transform = `translateY(${offset}px)`;
        break;
      case 'left':
        transform = `translateX(-${offset}px)`;
        break;
      case 'right':
        transform = `translateX(${offset}px)`;
        break;
      default:
        transform = `translateY(-${offset}px)`;
    }
    
    element.style.transform = transform;
    element.style.transition = 'transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)';
  };
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Initial calculation
  handleScroll();
  
  // Return cleanup function
  return () => window.removeEventListener('scroll', handleScroll);
}

/**
 * Apply advanced parallax effect with depth and rotation
 * @param {HTMLElement} element - The element to apply parallax to
 * @param {Object} options - Configuration options
 * @param {number} options.depth - Depth factor (0.1 to 1.0)
 */
export function applyAdvancedParallax(element, { depth = 0.3 } = {}) {
  if (!element) return;
  
  let mousePosition = { x: 0, y: 0 };
  
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    updateTransform(scrollPosition, mousePosition);
  };
  
  const handleMouseMove = (e) => {
    // Calculate mouse position relative to center of screen
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    
    mousePosition = { x, y };
    updateTransform(window.scrollY, mousePosition);
  };
  
  const updateTransform = (scrollPosition, mousePos) => {
    element.style.transform = `
      translateY(${scrollPosition * -depth}px)
      rotateX(${mousePos.y * 5 * depth}deg)
      rotateY(${mousePos.x * 5 * depth}deg)
      scale(${1 + depth * 0.1})
    `;
    element.style.transition = 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)';
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  
  // Initial calculation
  handleScroll();
  
  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('mousemove', handleMouseMove);
  };
}

// ===== 3D TRANSFORMATIONS =====

/**
 * Apply 3D tilt effect on hover
 * @param {HTMLElement} element - The element to apply the effect to
 * @param {Object} options - Configuration options
 * @param {number} options.intensity - Intensity of the tilt effect (1-20 recommended)
 */
export function apply3DTilt(element, { intensity = 10 } = {}) {
  if (!element) return;
  
  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;
    
    element.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.05, 1.05, 1.05)
    `;
    element.style.transition = 'transform 0.1s ease';
  };
  
  const handleMouseLeave = () => {
    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    element.style.transition = 'transform 0.3s ease';
  };
  
  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}

/**
 * Initialize a 3D flip card
 * @param {HTMLElement} container - The flip card container
 * @param {HTMLElement} front - The front element
 * @param {HTMLElement} back - The back element
 * @param {Object} options - Configuration options
 * @param {boolean} options.hoverToFlip - Whether to flip on hover (default: true)
 * @param {boolean} options.clickToFlip - Whether to flip on click (default: false)
 */
export function init3DFlipCard(container, front, back, { hoverToFlip = true, clickToFlip = false } = {}) {
  if (!container || !front || !back) return;
  
  // Add necessary classes
  container.classList.add('flip-card-container');
  const inner = document.createElement('div');
  inner.classList.add('flip-card-inner');
  
  // Rearrange DOM
  container.appendChild(inner);
  front.classList.add('flip-card-front');
  back.classList.add('flip-card-back');
  inner.appendChild(front);
  inner.appendChild(back);
  
  // Add event listeners
  if (clickToFlip) {
    container.addEventListener('click', () => {
      container.classList.toggle('flipped');
    });
  }
  
  // Return toggle function
  return {
    toggle: () => container.classList.toggle('flipped'),
    flip: () => container.classList.add('flipped'),
    unflip: () => container.classList.remove('flipped')
  };
}

// ===== SCROLL ANIMATIONS =====

/**
 * Initialize scroll animations for elements
 * @param {string} selector - CSS selector for elements to animate
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin for Intersection Observer
 * @param {string} options.visibleClass - Class to add when element is visible
 */
export function initScrollAnimations(selector, { 
  threshold = 0.1, 
  rootMargin = '0px', 
  visibleClass = 'visible' 
} = {}) {
  const elements = document.querySelectorAll(selector);
  
  if (!elements.length) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(visibleClass);
          // Once visible, no need to observe anymore
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold,
      rootMargin,
    }
  );
  
  elements.forEach(el => observer.observe(el));
  
  // Return cleanup function
  return () => {
    elements.forEach(el => observer.unobserve(el));
  };
}

/**
 * Apply staggered animations to child elements
 * @param {HTMLElement} parent - Parent element containing children to animate
 * @param {Object} options - Configuration options
 * @param {number} options.baseDelay - Base delay before starting animations (ms)
 * @param {number} options.staggerDelay - Delay between each child animation (ms)
 * @param {string} options.animationClass - Class to add to children for animation
 */
export function applyStaggeredAnimation(parent, { 
  baseDelay = 0, 
  staggerDelay = 100,
  animationClass = 'animate-fade-in'
} = {}) {
  if (!parent) return;
  
  const children = Array.from(parent.children);
  
  children.forEach((child, index) => {
    child.style.animationDelay = `${baseDelay + index * staggerDelay}ms`;
    child.classList.add(animationClass);
  });
}

// ===== INTERACTIVE ANIMATIONS =====

/**
 * Apply magnetic effect that attracts elements to cursor
 * @param {HTMLElement} element - The element to apply the effect to
 * @param {Object} options - Configuration options
 * @param {number} options.strength - Strength of magnetic pull (1-10 recommended)
 * @param {number} options.maxDistance - Maximum distance for effect (px)
 */
export function applyMagneticEffect(element, { strength = 5, maxDistance = 100 } = {}) {
  if (!element) return;
  
  element.classList.add('magnetic');
  
  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from cursor to center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Calculate distance
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < maxDistance) {
      // Calculate pull strength based on distance
      const pull = (1 - distance / maxDistance) * strength;
      
      element.style.transform = `translate(${distanceX * pull * 0.1}px, ${distanceY * pull * 0.1}px)`;
    } else {
      // Reset position when cursor is far away
      element.style.transform = 'translate(0, 0)';
    }
  };
  
  const handleMouseLeave = () => {
    // Smoothly reset position
    element.style.transform = 'translate(0, 0)';
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}

/**
 * Apply ripple effect on click
 * @param {HTMLElement} element - The element to apply the effect to
 * @param {Object} options - Configuration options
 * @param {string} options.color - Color of the ripple
 */
export function applyRippleEffect(element, { color = 'rgba(255, 255, 255, 0.7)' } = {}) {
  if (!element) return;
  
  element.classList.add('ripple-container');
  
  const createRipple = (e) => {
    const rect = element.getBoundingClientRect();
    
    // Get click position relative to element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate ripple size (should be at least as large as the element's diagonal)
    const size = Math.max(rect.width, rect.height) * 2;
    
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.backgroundColor = color;
    
    // Add ripple to element
    element.appendChild(ripple);
    
    // Remove ripple after animation completes
    setTimeout(() => {
      ripple.remove();
    }, 1000); // Match this with CSS animation duration
  };
  
  element.addEventListener('click', createRipple);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('click', createRipple);
  };
}

// ===== UTILITY FUNCTIONS =====

/**
 * Smooth scroll to element
 * @param {string} elementId - ID of element to scroll to
 * @param {Object} options - Configuration options
 * @param {number} options.offset - Offset from the top (px)
 * @param {number} options.duration - Duration of scroll animation (ms)
 */
export function smoothScrollTo(elementId, { offset = 0, duration = 1000 } = {}) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const targetPosition = elementPosition - offset;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;
  
  function animation(currentTime) {
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
 * Apply typewriter effect to element
 * @param {HTMLElement} element - Element to apply effect to
 * @param {string} text - Text to animate
 * @param {Object} options - Configuration options
 * @param {number} options.speed - Speed of typing (ms per character)
 * @param {Function} options.onComplete - Callback when animation completes
 */
export function applyTypewriterEffect(element, text, { speed = 50, onComplete = null } = {}) {
  if (!element) return;
  
  element.textContent = '';
  element.classList.add('animate-typewriter');
  
  let currentIndex = 0;
  
  const interval = setInterval(() => {
    if (currentIndex < text.length) {
      element.textContent += text.charAt(currentIndex);
      currentIndex++;
    } else {
      clearInterval(interval);
      if (onComplete) onComplete();
    }
  }, speed);
  
  // Return cleanup function
  return () => clearInterval(interval);
}

/**
 * Initialize all animations on a page
 */
export function initAllAnimations() {
  // Initialize scroll animations
  initScrollAnimations('.fade-in-on-scroll');
  
  // Apply 3D tilt to cards
  document.querySelectorAll('.hover-3d').forEach(element => {
    apply3DTilt(element);
  });
  
  // Apply magnetic effect to buttons
  document.querySelectorAll('.btn-magnetic').forEach(element => {
    applyMagneticEffect(element);
  });
  
  // Apply ripple effect to buttons
  document.querySelectorAll('.btn-ripple').forEach(element => {
    applyRippleEffect(element);
  });
  
  // Apply parallax to background elements
  document.querySelectorAll('.parallax-bg').forEach(element => {
    applyParallax(element, { speed: 0.2 });
  });
  
  // Initialize flip cards
  document.querySelectorAll('.flip-card-container').forEach(container => {
    const front = container.querySelector('.flip-card-front');
    const back = container.querySelector('.flip-card-back');
    if (front && back) {
      init3DFlipCard(container, front, back);
    }
  });
}