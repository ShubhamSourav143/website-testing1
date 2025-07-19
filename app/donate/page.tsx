'use client';

import { useState } from 'react';
import { Heart, Shield, Stethoscope, Home, DollarSign, CreditCard, Smartphone, Users, Clock, MapPin, ShoppingCart, Target, TrendingUp, CheckCircle, Share2, Calendar } from 'lucide-react';

const impactAreas = [
  {
    icon: Stethoscope,
    title: 'Emergency Medical Care',
    description: 'Surgeries, chemotherapy, specialist treatments, and 24/7 veterinary care for animals in critical condition.',
    amount: 5000,
    impact: 'Covers emergency surgery for one animal',
    realExample: 'Like Chedi\'s cancer treatment or train accident rescues',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
    raised: 45000,
    target: 100000,
    supporters: 23,
    daysLeft: 15
  },
  {
    icon: Home,
    title: 'Daily Feeding Program',
    description: 'Feeding 320+ dogs daily during campus breaks for 100 days/year when students are away.',
    amount: 3000,
    impact: 'Feeds all campus animals for one day',
    realExample: 'Ensures no animal starves when students are away',
    image: 'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=600',
    raised: 180000,
    target: 300000,
    supporters: 67,
    daysLeft: 8
  },
  {
    icon: Shield,
    title: 'Permanent Disability Care',
    description: '24/7 care for paraplegic and quadriplegic animals like Romi, Bunti, and Shanti who need lifelong support.',
    amount: 10000,
    impact: 'One month of specialized care for disabled animal',
    realExample: 'Physiotherapy, wheelchairs, and round-the-clock attention',
    image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600',
    raised: 320000,
    target: 500000,
    supporters: 89,
    daysLeft: 22
  },
  {
    icon: Users,
    title: 'Vaccination Drives',
    description: 'Mass vaccination campaigns protecting 3,000+ dogs annually from rabies and other diseases.',
    amount: 2000,
    impact: 'Vaccinates 50 dogs against rabies and diseases',
    realExample: 'Preventing disease outbreaks across campus and community',
    image: 'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=600',
    raised: 145000,
    target: 200000,
    supporters: 156,
    daysLeft: 5
  },
  {
    icon: Home,
    title: 'Shelter Building Fund',
    description: 'Building permanent homes for elderly and disabled animals who cannot be adopted.',
    amount: 25000,
    impact: 'Contributes to permanent sanctuary construction',
    realExample: 'Safe haven for animals like Romi, Bunti, and Shanti',
    image: 'https://images.pexels.com/photos/6816861/pexels-photo-6816861.jpeg?auto=compress&cs=tinysrgb&w=600',
    raised: 1200000,
    target: 2000000,
    supporters: 234,
    daysLeft: 45
  },
  {
    icon: Heart,
    title: 'Rescue Operations',
    description: '24/7 emergency response team for animal accidents, injuries, and rescue situations.',
    amount: 7500,
    impact: 'Funds one complete rescue operation',
    realExample: 'Immediate response to traffic accidents and emergencies',
    image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=600',
    raised: 85000,
    target: 150000,
    supporters: 45,
    daysLeft: 12
  }
];

const donationAmounts = [1000, 3000, 5000, 10000];

const recentDonations = [
  { name: 'Priya S.', amount: 5000, time: '2 minutes ago', message: 'For Romi\'s care' },
  { name: 'Anonymous', amount: 10000, time: '5 minutes ago', message: 'Keep up the great work!' },
  { name: 'Rajesh K.', amount: 3000, time: '8 minutes ago', message: 'For feeding program' },
  { name: 'Meera P.', amount: 2000, time: '12 minutes ago', message: 'Every animal deserves love' },
  { name: 'Suresh G.', amount: 7500, time: '15 minutes ago', message: 'Emergency fund' }
];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(3000);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isMonthly, setIsMonthly] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(0);
  };

  const handleDonate = (amount?: number) => {
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Milaap-style Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Our Mission</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              We receive no government funding. Every rupee comes from donors like you and directly impacts animal lives.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span>Verified NGO</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-blue-600 mr-2" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 text-red-600 mr-2" />
                <span>Direct Impact</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Milaap-style Featured Campaign */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img 
                  src="https://images.pexels.com/photos/6816861/pexels-photo-6816861.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Permanent Shelter Fund"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full">
                    URGENT
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Help Us Build a Permanent Shelter
                  </h2>
                  <p className="text-gray-600">
                    We urgently need a dedicated sanctuary for our growing number of elderly and disabled animals who require lifelong care.
                  </p>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>₹12,00,000 raised</span>
                    <span>₹20,00,000 goal</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>60% funded</span>
                    <span>234 supporters</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">45</div>
                    <div className="text-xs text-gray-500">Days left</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">234</div>
                    <div className="text-xs text-gray-500">Supporters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">₹8L</div>
                    <div className="text-xs text-gray-500">Still needed</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleDonate()}
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Donate Now
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milaap-style Campaign Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">All Fundraisers</h2>
            <div className="flex items-center space-x-4">
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Most Recent</option>
                <option>Most Funded</option>
                <option>Ending Soon</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactAreas.map((area, idx) => {
              const Icon = area.icon;
              const percentage = Math.round((area.raised / area.target) * 100);
              
              return (
                <div key={idx} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="relative">
                    <img 
                      src={area.image} 
                      alt={area.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    {area.daysLeft <= 10 && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded">
                          {area.daysLeft} days left
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{area.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{area.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>₹{(area.raised / 1000).toFixed(0)}K raised</span>
                        <span>₹{(area.target / 1000).toFixed(0)}K goal</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>{percentage}% funded</span>
                        <span>{area.supporters} supporters</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{area.daysLeft} days left</span>
                      </div>
                      <button 
                        onClick={() => handleDonate(area.amount)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Support
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Donations Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Donation Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Make a Donation</h3>
              
              {/* Monthly/One-time Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setIsMonthly(false)}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    !isMonthly ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  One-time
                </button>
                <button
                  onClick={() => setIsMonthly(true)}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    isMonthly ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Monthly
                </button>
              </div>

              {/* Amount Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Amount (₹)
                </label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                        selectedAmount === amount
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      ₹{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'upi', label: 'UPI (Recommended)', icon: Smartphone },
                    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                    { id: 'bank', label: 'Net Banking', icon: DollarSign }
                  ].map((method) => {
                    const Icon = method.icon;
                    return (
                      <label key={method.id} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3"
                        />
                        <Icon className="w-5 h-5 mr-3 text-gray-500" />
                        <span className="font-medium">{method.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button 
                onClick={() => handleDonate(finalAmount)}
                className="w-full bg-green-600 text-white font-semibold py-4 rounded-lg hover:bg-green-700 transition-colors text-lg"
              >
                Donate ₹{finalAmount?.toLocaleString() || '0'} {isMonthly ? 'Monthly' : 'Now'}
              </button>

              <div className="text-center text-sm text-gray-600 mt-4">
                <p>🔒 Secure payment • Tax-deductible receipt</p>
              </div>
            </div>
          </div>

          {/* Live Feed Sidebar */}
          <div className="space-y-6">
            {/* Recent Donations */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <h3 className="font-bold text-gray-900">Recent Donations</h3>
              </div>
              <div className="space-y-3">
                {recentDonations.map((donation, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 text-sm">{donation.name}</p>
                        <p className="font-bold text-green-600 text-sm">₹{donation.amount.toLocaleString()}</p>
                      </div>
                      <p className="text-xs text-gray-500">{donation.time}</p>
                      {donation.message && (
                        <p className="text-xs text-gray-600 mt-1 italic">"{donation.message}"</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Why Trust Us?</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-sm text-gray-700">Registered NGO (2025)</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm text-gray-700">100% Transparent</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-orange-600 mr-3" />
                  <span className="text-sm text-gray-700">24/7 Emergency Response</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-sm text-gray-700">Direct Impact</span>
                </div>
              </div>
            </div>

            {/* Impact Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Our Impact</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Dogs Sterilized</span>
                  <span className="font-bold text-blue-600">460+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Vaccinations</span>
                  <span className="font-bold text-green-600">3,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Daily Feeding</span>
                  <span className="font-bold text-orange-600">320 dogs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Years of Service</span>
                  <span className="font-bold text-purple-600">6+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Message */}
      {showThankYou && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-slideInRight z-50">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5" />
            <span className="font-medium">Thank you for your donation! 🙏</span>
          </div>
        </div>
      )}
    </div>
  );
}
