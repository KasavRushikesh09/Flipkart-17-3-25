// src/components/WishlistPage.tsx
import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain mb-4 lazy-load"
                loading="lazy" // Added lazy loading
              />
              <h2
                className="text-lg font-semibold mb-2 hover:text-[#2874f0] cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {product.name}
              </h2>
              <p className="text-gray-600 mb-2">
                {product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </p>
              <p className="text-sm text-gray-500 line-through">
                {product.originalPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </p>
              <p className="text-green-600 text-sm mb-2">{product.discount}% off</p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-400">{'★'.repeat(Math.round(product.rating))}</span>
                <span className="text-gray-500 ml-1">({product.reviewCount})</span>
              </div>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
              >
                <Trash2 size={20} />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;