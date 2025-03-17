// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProductListingPage from './components/ProductListingPage';
import ProductDetailPage from './components/ProductDetailPage';
import FloatingCart from './components/FloatingCart';
import CartPage from './components/CartPage';
import ProfilePage from './components/ProfilePage';
import WishlistPage from './components/WishlistPage'; // Added WishlistPage
import CheckoutPage from './components/CheckoutPage'; // Added CheckoutPage
import Chatbot from './components/Chatbot';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext'; // Added WishlistProvider

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <div className="min-h-screen bg-[#f1f3f6] flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListingPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/wishlist" element={<WishlistPage />} /> {/* Added Route */}
                <Route path="/checkout" element={<CheckoutPage />} /> {/* Added Route */}
              </Routes>
            </main>
            <Footer />
            <FloatingCart />
            <Chatbot />
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;