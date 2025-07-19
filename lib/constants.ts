// App-wide constants
export const APP_CONFIG = {
  name: 'Pradyogiki Animal Welfare',
  tagline: 'Registered NGO • Under West Bengal Goverment',
  description: 'Dedicated to rescuing, protecting, and giving new hope to stray, abandoned, and special-needs animals',
  contact: {
    emergency: '+91 98765 43210',
    email: 'hello@iitkgpanimalwelfare.org',
    instagram: '@animal__welfare_iitkgp',
    location: 'IIT Kharagpur, West Bengal'
  },
  stats: {
    dogsSterilized: '460+',
    vaccinations: '3,000+',
    dailyFeeding: '320 dogs',
    yearsOfService: '6+'
  }
}

export const NAVIGATION_LINKS = [
  { label: 'Home', href: '/', icon: 'Home' },
  { label: 'Adopt', href: '/adopt', icon: 'Heart' },
  { label: 'Store', href: '/store', icon: 'ShoppingBag' },
  { label: 'Donate', href: '/donate', icon: 'DollarSign' },
  { label: 'Stories', href: '/blog', icon: 'BookOpen' },
  { label: 'Help', href: '/help', icon: 'HelpCircle' }
]

export const DONATION_AMOUNTS = [1000, 3000, 5000, 10000]

export const IMPACT_AREAS = [
  {
    title: 'Emergency Medical Care',
    description: 'Surgeries, chemotherapy, specialist treatments, and 24/7 veterinary care',
    amount: 5000,
    impact: 'Covers emergency surgery for one animal'
  },
  {
    title: 'Daily Feeding Program',
    description: 'Feeding 320+ dogs daily during campus breaks for 100 days/year',
    amount: 3000,
    impact: 'Feeds all campus animals for one day'
  },
  {
    title: 'Permanent Disability Care',
    description: '24/7 care for paraplegic and quadriplegic animals',
    amount: 10000,
    impact: 'One month of specialized care for disabled animal'
  },
  {
    title: 'Vaccination Drives',
    description: 'Mass vaccination campaigns protecting 3,000+ dogs annually',
    amount: 2000,
    impact: 'Vaccinates 50 dogs against rabies and diseases'
  }
]
