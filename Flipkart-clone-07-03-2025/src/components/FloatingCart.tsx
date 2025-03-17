// src/components/FloatingCart.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FloatingCart: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCartClick = () => {
    navigate('/cart');
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 bg-[#2874f0] text-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-blue-600 transition-all duration-300 flex items-center justify-center"
      onClick={handleCartClick}
      aria-label="Cart"
    >
      <div className="relative">
        <ShoppingCart size={24} />
        {cartCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transition-all duration-300">
            {cartCount > 9 ? '9+' : cartCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingCart;