// src/components/ProductDetailPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Heart } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [showWishlistMessage, setShowWishlistMessage] = useState<{ type: 'add' | 'remove'; productName: string } | null>(null);
  const product = dummyProducts.find(p => p.id === Number(id));

  if (!product) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  const handleAddToWishlist = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md h-auto object-contain"
            loading="lazy"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <div className="flex items-center mb-2">
            <span className="text-yellow-400">{'★'.repeat(Math.round(product.rating))}</span>
            <span className="text-gray-500 ml-1">({product.reviewCount} reviews)</span>
          </div>
          <p className="text-2xl font-semibold text-[#2874f0] mb-2">
            {product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
          </p>
          <p className="text-sm text-gray-500 line-through mb-2">
            {product.originalPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
          </p>
          <p className="text-green-600 mb-4">{product.discount}% off</p>
          <p className="text-gray-700 mb-2"><strong>Category:</strong> {product.category}</p>
          <p className="text-gray-700 mb-4"><strong>Brand:</strong> {product.brand}</p>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-[#fb641b] text-white px-6 py-3 rounded-sm hover:bg-[#f4511e] transition-all duration-300 transform hover:scale-105"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate('/checkout')}
              className="bg-[#ff9f00] text-white px-6 py-3 rounded-sm hover:bg-[#fb8c00] transition-all duration-300 transform hover:scale-105"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToWishlist}
              className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform ${
                wishlist.some(item => item.id === product.id)
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulseWishlist'
                  : 'bg-gray-200 text-gray-600 hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-400'
              }`}
              onAnimationEnd={(e) => e.currentTarget.classList.remove('animate-clickWishlist')}
            >
              <Heart
                size={24}
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
      </div>
    </div>
  );
};

export default ProductDetailPage;