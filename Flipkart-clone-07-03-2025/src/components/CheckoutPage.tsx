// src/components/CheckoutPage.tsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert'; // Import the new Alert component

const CheckoutPage: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: 'Credit Card',
  });
  const [showAlert, setShowAlert] = useState(false); // State for alert visibility
  const [alertMessage, setAlertMessage] = useState(''); // State for alert message

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.address) {
      setAlertMessage('Please fill in all required fields.');
      setShowAlert(true);
      return;
    }
    setAlertMessage('Order placed successfully! Thank you for shopping with us.');
    setShowAlert(true);
    localStorage.removeItem('cart'); // Clear cart after order
    setTimeout(() => {
      navigate('/');
    }, 5000); // Redirect after 5 seconds (same duration as alert)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty. Add some products to proceed.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                placeholder="Enter your address"
                rows={4}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="UPI">UPI</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-4 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h3 className="text-gray-800 font-medium">{item.name}</h3>
                  <p className="text-gray-600">
                    {item.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })} x {item.quantity}
                  </p>
                </div>
              </div>
            ))}
            <hr className="my-4" />
            <p className="text-2xl font-bold text-[#2874f0] mb-6">
              Total: {totalPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
            </p>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-[#ff9f00] text-white px-6 py-3 rounded-sm hover:bg-[#fb8c00] transition-all duration-300 transform hover:scale-105"
            >
              Place Order
            </button>
          </div>
        </div>
      )}

      {/* Custom Alert */}
      <Alert
        message={alertMessage}
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
};

export default CheckoutPage;