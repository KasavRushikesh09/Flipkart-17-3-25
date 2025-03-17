// src/components/ProductListingPage.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { dummyProducts, Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import '../ProductListingPage.css';

const ProductListingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showWishlistMessage, setShowWishlistMessage] = useState<{ type: 'add' | 'remove'; productName: string } | null>(null);
  const productsPerPage = 8;
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const categories = Array.from(new Set(dummyProducts.map(product => product.category)));

  const filteredProducts = useMemo(() => {
    let filtered = [...dummyProducts];

    if (searchTerm) {
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter.length > 0) {
      filtered = filtered.filter(product => categoryFilter.includes(product.category));
    }

    if (sortOption === 'priceLowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighToLow') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'newest') {
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [searchTerm, categoryFilter, sortOption]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleAddToWishlist = (product: Product) => {
    if (wishlist.some(item => item.id === product.id)) {
      removeFromWishlist(product.id);
      setShowWishlistMessage({ type: 'remove', productName: product.name });
    } else {
      addToWishlist(product);
      setShowWishlistMessage({ type: 'add', productName: product.name });
    }
    setTimeout(() => setShowWishlistMessage(null), 2000); // Hide message after 2 seconds
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {/* Filters and Sorting */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <label key={category} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={categoryFilter.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
        <select
          className="px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#2874f0]"></div>
        </div>
      ) : paginatedProducts.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map(product => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain mb-4 lazy-load"
                loading="lazy"
              />
              <h2
                className="text-lg font-semibold mb-2 hover:text-[#2874f0] cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {product.name}
              </h2>
              <p className="text-gray-600 mb-2">{product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
              <p className="text-sm text-gray-500 line-through">
                {product.originalPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </p>
              <p className="text-green-600 text-sm mb-2">{product.discount}% off</p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-400">{'★'.repeat(Math.round(product.rating))}</span>
                <span className="text-gray-500 ml-1">({product.reviewCount})</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-[#fb641b] text-white px-4 py-2 rounded-sm hover:bg-[#f4511e] transition-all duration-300 transform hover:scale-105"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform ${
                    wishlist.some(item => item.id === product.id)
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulseWishlist'
                      : 'bg-gray-200 text-gray-600 hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-400'
                  }`}
                  onAnimationEnd={(e) => e.currentTarget.classList.remove('animate-clickWishlist')}
                >
                  <Heart
                    size={20}
                    className={`transition-transform duration-300 ${
                      wishlist.some(item => item.id === product.id) ? 'fill-current' : ''
                    }`}
                  />
                  {showWishlistMessage?.productName === product.name && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md animate-fadeIn">
                      {showWishlistMessage.type === 'add' ? 'Added to Wishlist!' : 'Removed from Wishlist!'}
                    </span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !isLoading && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-sm ${
                currentPage === page
                  ? 'bg-[#2874f0] text-white'
                  : 'bg-white text-[#2874f0] border border-[#2874f0]'
              } transition-all duration-300 transform hover:scale-105`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;