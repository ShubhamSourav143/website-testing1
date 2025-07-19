'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, ChevronDown, ChevronRight, Clock, Heart, Users, AlertTriangle } from 'lucide-react';

const faqs = [
  {
    question: "How do I report an animal emergency?",
    answer: "Call our 24/7 emergency hotline immediately. We respond to traffic accidents, dog fights, disease outbreaks, and cases of abuse. Our team is trained to handle complex medical cases and coordinate with veterinary specialists when needed."
  },
  {
    question: "How can I volunteer with IIT KGP Animal Welfare?",
    answer: "We welcome students, faculty, staff, and local residents! You can help with feeding (especially during campus breaks), rescue operations, medical care assistance, fundraising, and awareness campaigns. Contact us to join our volunteer network."
  },
  {
    question: "What happens during campus breaks when students leave?",
    answer: "We run a massive feeding program covering 320+ dogs daily for nearly 100 days each year. Volunteers organize supply chains, prepare food, and deliver it across campus, spending roughly ₹3,000 per day to ensure no animal starves."
  },
  {
    question: "Can I adopt one of your animals?",
    answer: "Yes! We facilitate adoptions for recovered animals ready for homes. However, some animals like our paraplegic residents (Romi, Bunti, Shanti) require permanent specialized care and stay with us. Visit our Adopt page to see available animals."
  },
  {
    question: "Do you only help dogs?",
    answer: "No, our compassion extends to all animals. We rescue birds, cats (including pregnant mothers), and are planning to expand to cows and other street animals in the wider Kharagpur area."
  },
  {
    question: "How is your organization funded?",
    answer: "We receive NO government funding. Our entire operation is powered by donations and volunteer dedication. Every rupee comes from supporters like you and goes directly to animal care, medical treatment, and feeding programs."
  },
  {
    question: "What medical care do you provide?",
    answer: "We provide complete medical care including emergency surgeries, chemotherapy (like for Chedi's cancer), sterilization (460+ dogs so far), vaccinations (3,000+ annually), and specialized care for disabled animals. We work with local vets and Kolkata specialists."
  },
  {
    question: "Why do you need a permanent shelter?",
    answer: "As our number of elderly, disabled, and incurable cases grows, we urgently need a dedicated sanctuary where these animals can spend their final years in dignity, safety, and comfort. We're currently fundraising for this critical need."
  }
];

const volunteerRoles = [
  {
    title: "Emergency Response",
    description: "Join our 24/7 rescue team for animal emergencies",
    commitment: "On-call basis",
    skills: "Quick response, basic first aid helpful"
  },
  {
    title: "Feeding Program",
    description: "Help feed 320+ dogs during campus breaks",
    commitment: "Daily during breaks",
    skills: "Physical stamina, reliable schedule"
  },
  {
    title: "Medical Care Assistant",
    description: "Support veterinary treatments and rehabilitation",
    commitment: "Flexible hours",
    skills: "Gentle with animals, attention to detail"
  },
  {
    title: "Social Media & Awareness",
    description: "Document rescues, create content, spread awareness",
    commitment: "Part-time",
    skills: "Photography, social media, storytelling"
  }
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Get Help & Get Involved</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Whether you need emergency animal assistance or want to join our mission, we're here 24/7. Every volunteer and supporter makes our work possible.
        </p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <p className="text-red-800 font-medium">
              🚨 Emergency Hotline: Available 24/7 for animal emergencies
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="card bg-red-50 border-red-200">
        <div className="card-header">
          <h2 className="text-2xl font-bold text-red-800 flex items-center">
            <Clock className="w-6 h-6 mr-2" />
            24/7 Emergency Response
          </h2>
          <p className="text-red-700">For immediate animal emergencies - accidents, injuries, abuse, or distress</p>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-gray-900">Emergency Hotline</p>
                  <a href="tel:+919876543210" className="text-red-600 hover:text-red-700 font-semibold text-lg">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-gray-900">Emergency Email</p>
                  <a href="mailto:emergency@iitkgpanimalwelfare.org" className="text-red-600 hover:text-red-700">
                    emergency@iitkgpanimalwelfare.org
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <h3 className="font-semibold text-gray-900 mb-2">What We Handle:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Traffic accidents & injuries</li>
                <li>• Disease outbreaks (distemper, etc.)</li>
                <li>• Animal abuse or neglect cases</li>
                <li>• Complex medical emergencies</li>
                <li>• Rescue coordination</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center hover-lift">
          <div className="card-body">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Volunteer</h3>
            <p className="text-gray-600 mb-4">Join our team of dedicated volunteers</p>
            <button className="btn-primary w-full">Apply to Volunteer</button>
          </div>
        </div>

        <div className="card text-center hover-lift">
          <div className="card-body">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Adopt</h3>
            <p className="text-gray-600 mb-4">Give a loving home to a rescued animal</p>
            <button className="btn-success w-full">Browse Animals</button>
          </div>
        </div>

        <div className="card text-center hover-lift">
          <div className="card-body">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Report</h3>
            <p className="text-gray-600 mb-4">Report an animal in need</p>
            <button className="btn-secondary w-full">Report Now</button>
          </div>
        </div>
      </div>

      {/* Volunteer Opportunities */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-2xl font-bold text-gray-900">Volunteer Opportunities</h2>
          <p className="text-gray-600">Join our community of students, faculty, staff, and local residents</p>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {volunteerRoles.map((role, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{role.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{role.description}</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p><span className="font-medium">Commitment:</span> {role.commitment}</p>
                  <p><span className="font-medium">Skills:</span> {role.skills}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="btn-primary">Join Our Volunteer Network</button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-600">Everything you need to know about our work and how to help</p>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <div className="card-header">
            <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
            <p className="text-gray-600">Reach out for any questions or support</p>
          </div>
          <div className="card-body space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">General Inquiries</p>
                <a href="mailto:hello@iitkgpanimalwelfare.org" className="text-blue-600 hover:text-blue-700">
                  hello@iitkgpanimalwelfare.org
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Follow Our Work</p>
                <a href="https://instagram.com/animal__welfare_iitkgp" className="text-green-600 hover:text-green-700">
                  @animal__welfare_iitkgp
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-orange-600" />
              <div>
                <p className="font-medium text-gray-900">Location</p>
                <p className="text-gray-600">IIT Kharagpur, West Bengal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-xl font-semibold text-gray-900">Send a Message</h3>
            <p className="text-gray-600">Get in touch with our team</p>
          </div>
          <div className="card-body">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>General Inquiry</option>
                <option>Volunteer Application</option>
                <option>Adoption Interest</option>
                <option>Emergency Report</option>
                <option>Donation Question</option>
              </select>
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button type="submit" className="w-full btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Be Part of Our Mission</h2>
        <p className="text-xl mb-6 opacity-90 max-w-2xl mx-auto">
          Since 2019, we've built a community of compassion at IIT Kharagpur. Join us in creating a world where every animal is protected and loved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
            <Users className="mr-2 w-5 h-5" />
            Become a Volunteer
          </button>
          <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
            <Heart className="mr-2 w-5 h-5" />
            Support Our Work
          </button>
        </div>
        <div className="mt-6 text-sm opacity-75">
          <p>📱 @animal__welfare_iitkgp • 📞 24/7 Emergency Response</p>
          <p>Registered NGO under West Bengal Government (2025)</p>
        </div>
      </div>
    </div>
  );
}