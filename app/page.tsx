'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useEffect, useState } from 'react';
import { ArrowRight, Users, Heart, Award, ChevronRight, Shield, Clock, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import DynamicTestimonials from '../components/DynamicTestimonials';
import DonationButton from '../components/DonationButton';

const slides = [
  {
    img: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800',
    heading: "Protecting Every Life Since 2019",
    text: "From a small group of caring students to a registered NGO - we've rescued, healed, and given hope to hundreds of animals at IIT Kharagpur.",
    cta: { label: "Meet Our Animals", href: "/adopt" },
    bgGradient: "from-blue-50 to-green-50"
  },
  {
    img: 'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=800',
    heading: "24/7 Emergency Response",
    text: "Day or night, we're here for animals in crisis. Our phone lines never close because emergencies don't wait.",
    cta: { label: "Report Emergency", href: "/help" },
    bgGradient: "from-green-50 to-blue-50"
  },
  {
    img: 'https://images.pexels.com/photos/6816861/pexels-photo-6816861.jpeg?auto=compress&cs=tinysrgb&w=800',
    heading: "Building a Compassionate Campus",
    text: "Join our mission to create a world where every animal - regardless of age, ability, or circumstance - lives free from suffering.",
    cta: { label: "Get Involved", href: "/help" },
    bgGradient: "from-purple-50 to-pink-50"
  },
];

const stats = [
  { icon: Heart, label: "Dogs Sterilized", value: "460+", color: "text-red-600", bgColor: "bg-red-100" },
  { icon: Shield, label: "Vaccinations Given", value: "3,000+", color: "text-green-600", bgColor: "bg-green-100" },
  { icon: Users, label: "Daily Feeding Program", value: "320 dogs", color: "text-blue-600", bgColor: "bg-blue-100" },
  { icon: Clock, label: "Years of Service", value: "6+", color: "text-purple-600", bgColor: "bg-purple-100" },
];

const specialCareAnimals = [
  {
    name: "Romi",
    story: "Paraplegic after car accident in 2020, but curious and playful",
    image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600",
    monthlyCare: 8000
  },
  {
    name: "Bunti",
    story: "Paralyzed at one month old, now enjoys wheelchair walks",
    image: "https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=600",
    monthlyCare: 7500
  },
  {
    name: "Shanti",
    story: "Rescued from Kolkata, now inspires everyone with her resilience",
    image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=600",
    monthlyCare: 9000
  }
];

export default function HomePage() {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
  });

  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const interval = 6000;
    function next() {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
      timer = setTimeout(next, interval);
    }
    timer = setTimeout(next, interval);
    return () => clearTimeout(timer);
  }, [instanceRef]);

  useEffect(() => {
    setIsVisible(true);
    
    // Parallax scroll effect
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-24 pb-16 relative">
      {/* Parallax Background with Real Dog Photos */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          {/* Background dog images with parallax */}
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full overflow-hidden opacity-30">
            <img 
              src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300" 
              alt="Background dog"
              className="w-full h-full object-cover"
              style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            />
          </div>
          <div className="absolute top-40 right-20 w-24 h-24 rounded-full overflow-hidden opacity-20">
            <img 
              src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=300" 
              alt="Background dog"
              className="w-full h-full object-cover"
              style={{ transform: `translateY(${scrollY * 0.4}px)` }}
            />
          </div>
          <div className="absolute top-96 left-1/4 w-28 h-28 rounded-full overflow-hidden opacity-25">
            <img 
              src="https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=300" 
              alt="Background cat"
              className="w-full h-full object-cover"
              style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            />
          </div>
          <div className="absolute bottom-40 right-1/3 w-36 h-36 rounded-full overflow-hidden opacity-15">
            <img 
              src="https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=300" 
              alt="Background dog"
              className="w-full h-full object-cover"
              style={{ transform: `translateY(${scrollY * 0.6}px)` }}
            />
          </div>
          <div className="absolute bottom-20 left-16 w-20 h-20 rounded-full overflow-hidden opacity-35">
            <img 
              src="https://images.pexels.com/photos/1390361/pexels-photo-1390361.jpeg?auto=compress&cs=tinysrgb&w=300" 
              alt="Background dog"
              className="w-full h-full object-cover"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content with z-index to appear above parallax */}
      <div className="relative z-10">
        {/* Hero Section with Carousel */}
        <section className="relative">
          <div className="keen-slider rounded-xl sm:rounded-2xl overflow-hidden shadow-professional-lg" ref={sliderRef}>
            {slides.map((slide, idx) => (
              <div key={idx} className={`keen-slider__slide bg-gradient-to-br ${slide.bgGradient} min-h-[400px] sm:min-h-[500px]`}>
                <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
                  <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
                    <div className="flex-1 space-y-4 sm:space-y-6 text-center lg:text-left">
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight animate-fadeInLeft">
                        {slide.heading}
                      </h1>
                      <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-fadeInLeft delay-200">
                        {slide.text}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fadeInLeft delay-300">
                        <Link
                          href={slide.cta.href}
                          className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl group transform hover:-translate-y-1"
                        >
                          {slide.cta.label}
                          <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                        <DonationButton variant="secondary" size="md" purpose="Support Now" />
                      </div>
                    </div>
                    <div className="flex-1 w-full animate-fadeInRight delay-300">
                      <div className="relative">
                        <img
                          src={slide.img}
                          alt={slide.heading}
                          className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl sm:rounded-2xl shadow-professional-lg hover-lift"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl sm:rounded-2xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Banner */}
        <section className="container mx-auto px-4 sm:px-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 sm:p-6 text-center animate-slideInDown emergency-pulse">
            <div className="flex items-center justify-center mb-3">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mr-2 sm:mr-3 animate-pulse" />
              <h3 className="text-lg sm:text-xl font-bold text-red-800">24/7 Emergency Hotline</h3>
            </div>
            <p className="text-red-700 mb-3 text-sm sm:text-base">Animal in distress? We're here around the clock</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a 
                href="tel:+919876543210" 
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
              >
                Call Now: +91 98765 43210
              </a>
              <DonationButton variant="inline" size="sm" purpose="Support Emergency Care" />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 animate-fadeInUp">Our Impact Since 2019</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fadeInUp delay-200">
              Registered NGO under West Bengal Government (2025) • 24/7 Emergency Response • No Government Funding
            </p>
            <div className="mt-6">
              <DonationButton variant="primary" size="lg" purpose="Fund Our Impact" />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 stagger-animation">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center hover-lift group">
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 ${stat.bgColor} rounded-full mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 icon-bounce`}>
                    <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 animate-bounceIn">{stat.value}</h3>
                  <p className="text-gray-600 font-medium text-sm sm:text-base">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mission Section with Real Photos */}
        <section className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="animate-fadeInLeft order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-reveal">Our Mission</h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-600">
                <p className="animate-fadeInUp delay-100">
                  <span className="font-semibold text-blue-600">IIT Kharagpur Animal Welfare</span> is a registered nonprofit organization dedicated to rescuing, protecting, and giving new hope to stray, abandoned, and special-needs animals on campus and in nearby communities.
                </p>
                <p className="animate-fadeInUp delay-200">
                  Our journey began in 2019 when a small group of students noticed the suffering of street dogs and decided to make a difference. Today, we operate around the clock with professors, alumni, staff, and countless volunteers.
                </p>
                <p className="font-semibold text-green-600 animate-fadeInUp delay-300">
                  Our mission is simple but ambitious: to protect, heal, and speak up for every animal in need.
                </p>
              </div>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fadeInUp delay-500">
                <Link
                  href="/help"
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-1 group text-sm sm:text-base"
                >
                  Emergency Hotline
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <DonationButton variant="secondary" size="md" purpose="Support Our Work" />
              </div>
            </div>
            <div className="animate-fadeInRight delay-300 order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/6816861/pexels-photo-6816861.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="IIT Kharagpur Animal Welfare" 
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl sm:rounded-2xl shadow-professional-lg hover-lift animate-float"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl sm:rounded-2xl"></div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white animate-slideInDown delay-700">
                  <p className="text-xs sm:text-sm font-medium">Registered NGO • West Bengal Government 2025</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Care Animals with Real Photos */}
        <section className="bg-gray-50 py-12 sm:py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 animate-fadeInUp">Permanent 24/7 Care</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fadeInUp delay-200">
                Meet some of our permanent residents who require lifelong specialized care due to disabilities. These brave souls inspire everyone who meets them.
              </p>
              <div className="mt-6">
                <DonationButton variant="primary" size="lg" amount={25000} purpose="Support Special Care" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto stagger-animation">
              {specialCareAnimals.map((animal, idx) => (
                <div key={idx} className="card hover-lift group">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img 
                      src={animal.image} 
                      alt={animal.name} 
                      className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <span className="px-2 sm:px-3 py-1 bg-red-500 text-white text-xs sm:text-sm font-medium rounded-full animate-pulse">
                        Permanent Care
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{animal.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">{animal.story}</p>
                    <div className="bg-orange-50 rounded-lg p-3 mb-4">
                      <p className="text-xs text-orange-700 mb-1">Monthly care cost:</p>
                      <p className="text-lg font-bold text-orange-600">₹{animal.monthlyCare.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/adopt"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group transition-all duration-300 text-sm sm:text-base"
                      >
                        Learn More About {animal.name}
                        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                      <DonationButton 
                        variant="inline" 
                        size="sm" 
                        amount={animal.monthlyCare} 
                        purpose={`Support ${animal.name}`}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feeding Program */}
        <section className="container mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 border border-orange-200 hover-lift">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 animate-fadeInUp">Daily Feeding Program</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fadeInUp delay-200">
                During campus breaks when students leave, we ensure no animal goes hungry. Our volunteers feed 320+ dogs daily for nearly 100 days each year.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center stagger-animation mb-8">
              <div className="animate-bounceIn">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2 animate-pulse">320+</div>
                <p className="text-gray-700 text-sm sm:text-base">Dogs Fed Daily</p>
              </div>
              <div className="animate-bounceIn delay-200">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2 animate-pulse">₹3,000</div>
                <p className="text-gray-700 text-sm sm:text-base">Daily Food Cost</p>
              </div>
              <div className="animate-bounceIn delay-300">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2 animate-pulse">100</div>
                <p className="text-gray-700 text-sm sm:text-base">Days Per Year</p>
              </div>
            </div>
            <div className="text-center animate-fadeInUp delay-500">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <DonationButton 
                  variant="primary" 
                  size="lg" 
                  amount={3000} 
                  purpose="Feed All Dogs for 1 Day"
                />
                <DonationButton 
                  variant="secondary" 
                  size="lg" 
                  amount={300000} 
                  purpose="Fund Entire Program"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Testimonials */}
        <DynamicTestimonials />

        {/* Call to Action */}
        <section className="container mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-center text-white animate-gradient hover-lift">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-fadeInUp">Join Our Mission</h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto animate-fadeInUp delay-200">
              Since 2019, we've shown that a few dedicated people can change countless lives. With your support, we can do even more.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fadeInUp delay-300">
              <Link
                href="/help"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group text-sm sm:text-base"
              >
                <MapPin className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                Emergency: 24/7 Hotline
              </Link>
              <DonationButton 
                variant="secondary" 
                size="lg" 
                purpose="Support Our Work"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600"
              />
            </div>
            <div className="mt-6 sm:mt-8 text-center animate-fadeInUp delay-500">
              <p className="text-xs sm:text-sm opacity-75">
                Follow us: @animal__welfare_iitkgp • Available 24/7 for emergencies
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}