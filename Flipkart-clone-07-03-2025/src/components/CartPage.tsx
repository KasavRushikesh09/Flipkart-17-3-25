// src/components/CartPage.tsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cart.map(item => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                  loading="lazy" // Added lazy loading
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">
                    {item.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })} x {item.quantity}
                  </p>
                  <p className="text-gray-600 font-semibold">
                    Total: {(item.price * item.quantity).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 border rounded-sm hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                      disabled={item.quantity === 1}
                    >
                      <Minus size={20} />
                    </button>
                    <span className="px-4 py-1 border">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 border rounded-sm hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-600 transition-all duration-300 transform hover:scale-105"
                  aria-label="Remove from Cart"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
            <p className="text-gray-600 mb-2">Total Items: {cart.reduce((total, item) => total + item.quantity, 0)}</p>
            <p className="text-2xl font-bold text-[#2874f0] mb-6">
              Total Price: {totalPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
            </p>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#ff9f00] text-white px-6 py-3 rounded-sm hover:bg-[#fb8c00] transition-all duration-300 transform hover:scale-105"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;