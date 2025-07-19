'use client';

import { useState } from 'react';
import { Search, Filter, Grid, List, Star, ShoppingCart, Heart, Package } from 'lucide-react';

// --- Mock product data (paste your full products array here) ---
const products = [
  // ... keep your existing products array from original code ...
  {
  id: 1,
    name: 'KGP Paws Classic T-Shirt',
    category: 'clothing',
    subcategory: 't-shirts',
    type: 'casual',
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.8,
    reviews: 156,
    image: 'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    stock: 45,
    isNew: false,
    isBestSeller: true,
    description: 'Comfortable cotton t-shirt featuring our iconic paw logo'
  },
  {
    id: 2,
    name: 'Rescue Hero Athletic Tee',
    category: 'clothing',
    subcategory: 't-shirts',
    type: 'athletic',
    price: 1199,
    originalPrice: 1599,
    discount: 25,
    rating: 4.9,
    reviews: 203,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    stock: 32,
    isNew: true,
    isBestSeller: true,
    description: 'Moisture-wicking athletic tee for active animal lovers'
  },
  {
    id: 3,
    name: 'Paws & Love Graphic Tee',
    category: 'clothing',
    subcategory: 't-shirts',
    type: 'graphic',
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    stock: 67,
    isNew: false,
    isBestSeller: false,
    description: 'Artistic graphic design celebrating animal welfare'
  },
  {
    id: 4,
    name: 'Campus Comfort Jeans',
    category: 'clothing',
    subcategory: 'pants',
    type: 'jeans',
    price: 2499,
    originalPrice: 3299,
    discount: 24,
    rating: 4.7,
    reviews: 124,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    stock: 28,
    isNew: false,
    isBestSeller: true,
    description: 'Premium denim jeans with comfort stretch'
  },
  {
    id: 5,
    name: 'Volunteer Shorts',
    category: 'clothing',
    subcategory: 'pants',
    type: 'shorts',
    price: 1299,
    originalPrice: 1699,
    discount: 24,
    rating: 4.5,
    reviews: 78,
    image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    stock: 41,
    isNew: true,
    isBestSeller: false,
    description: 'Lightweight shorts perfect for volunteer work'
  },
  {
    id: 6,
    name: 'Rescue Squad Activewear',
    category: 'clothing',
    subcategory: 'pants',
    type: 'activewear',
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    rating: 4.8,
    reviews: 167,
    image: 'https://images.pexels.com/photos/1598509/pexels-photo-1598509.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1598509/pexels-photo-1598509.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    stock: 35,
    isNew: false,
    isBestSeller: true,
    description: 'High-performance activewear for rescue operations'
  },
  {
    id: 7,
    name: 'Winter Rescue Jacket',
    category: 'clothing',
    subcategory: 'jackets',
    type: 'winter',
    price: 3999,
    originalPrice: 5299,
    discount: 25,
    rating: 4.9,
    reviews: 234,
    image: 'https://images.pexels.com/photos/1598510/pexels-photo-1598510.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1598510/pexels-photo-1598510.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    stock: 18,
    isNew: false,
    isBestSeller: true,
    description: 'Insulated winter jacket for cold weather rescues'
  },
  {
    id: 8,
    name: 'Lightweight Volunteer Jacket',
    category: 'clothing',
    subcategory: 'jackets',
    type: 'lightweight',
    price: 2299,
    originalPrice: 2899,
    discount: 21,
    rating: 4.6,
    reviews: 145,
    image: 'https://images.pexels.com/photos/1598511/pexels-photo-1598511.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1598511/pexels-photo-1598511.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    stock: 52,
    isNew: true,
    isBestSeller: false,
    description: 'Breathable lightweight jacket for everyday wear'
  },
  {
    id: 9,
    name: 'Rain Rescue Jacket',
    category: 'clothing',
    subcategory: 'jackets',
    type: 'rain',
    price: 2799,
    originalPrice: 3499,
    discount: 20,
    rating: 4.7,
    reviews: 189,
    image: 'https://images.pexels.com/photos/1598512/pexels-photo-1598512.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1598512/pexels-photo-1598512.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    stock: 29,
    isNew: false,
    isBestSeller: false,
    description: 'Waterproof jacket for rainy day rescues'
  },
  {
    id: 10,
    name: 'Insulated Water Bottle',
    category: 'accessories',
    subcategory: 'water-bottles',
    type: 'insulated',
    price: 1499,
    originalPrice: 1899,
    discount: 21,
    rating: 4.8,
    reviews: 312,
    image: 'https://images.pexels.com/photos/1598513/pexels-photo-1598513.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1598513/pexels-photo-1598513.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    stock: 76,
    isNew: false,
    isBestSeller: true,
    description: 'Double-wall insulated bottle keeps drinks cold/hot'
  },
  {
    id: 11,
    name: 'Sports Water Bottle',
    category: 'accessories',
    subcategory: 'water-bottles',
    type: 'sports',
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 4.5,
    reviews: 198,
    image: 'https://images.pexels.com/photos/1598514/pexels-photo-1598514.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1598514/pexels-photo-1598514.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    stock: 94,
    isNew: true,
    isBestSeller: false,
    description: 'Lightweight sports bottle with easy-grip design'
  },
  {
    id: 12,
    name: 'Classic KGP Bottle',
    category: 'accessories',
    subcategory: 'water-bottles',
    type: 'classic',
    price: 699,
    originalPrice: 899,
    discount: 22,
    rating: 4.4,
    reviews: 156,
    image: 'https://images.pexels.com/photos/1598515/pexels-photo-1598515.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1598515/pexels-photo-1598515.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    stock: 123,
    isNew: false,
    isBestSeller: false,
    description: 'Classic design bottle with KGP Paws logo'
  }
];

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState({});

  // --- Filtering & Sorting Logic ---
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return Number(b.isNew) - Number(a.isNew);
      case 'bestseller':
        return Number(b.isBestSeller) - Number(a.isBestSeller);
      default:
        return 0;
    }
  });

  const addToCart = async (productId) => {
    setLoading(prev => ({ ...prev, [productId]: true }));
    await new Promise(resolve => setTimeout(resolve, 800));
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
    setLoading(prev => ({ ...prev, [productId]: false }));
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const cartTotal = cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search, Sort & Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
            <span className="text-sm text-gray-600">{sortedProducts.length} products found</span>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="bestseller">Best Sellers</option>
            </select>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        }`}>
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {/* Quick Actions */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2 rounded-full transition-colors ${
                      wishlist.includes(product.id)
                        ? 'bg-red-100 text-red-600'
                        : 'bg-white/90 text-gray-600 hover:text-red-600'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product.id)}
                  disabled={loading[product.id] || product.stock === 0}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading[product.id] ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : product.stock === 0 ? (
                    'Out of Stock'
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Package className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      {/* Cart Summary (if items in cart) */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">Cart ({cartItemCount})</span>
            <span className="font-bold text-blue-600">₹{cartTotal.toLocaleString()}</span>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            View Cart
          </button>
        </div>
      )}
    </div>
  );
}
