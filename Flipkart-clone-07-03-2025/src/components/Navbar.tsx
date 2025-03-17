// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface UserProfile {
  name: string;
  email: string;
  phone?: string; // Optional to match ProfilePage
  address: string;
  avatar?: string; // Changed from profilePicture to avatar to match ProfilePage
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profilePicture, setProfilePicture] = useState<string>('');
  const navigate = useNavigate();
  const { cartCount } = useCart();

  useEffect(() => {
    // Initial fetch from localStorage
    const savedProfile = localStorage.getItem('user'); // Changed key from 'userProfile' to 'user'
    if (savedProfile) {
      const profile: UserProfile = JSON.parse(savedProfile);
      setProfilePicture(profile.avatar || '');
    }

    // Listen for changes to localStorage (e.g., when ProfilePage updates the user)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'user') {
        const updatedProfile = event.newValue ? JSON.parse(event.newValue) : null;
        setProfilePicture(updatedProfile?.avatar || '');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsProfileDropdownOpen(false);
  };

  const handleWishlistClick = () => {
    navigate('/wishlist');
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Changed key from 'userProfile' to 'user'
    setProfilePicture('');
    navigate('/');
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className="bg-[#2874f0] text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center">
            <a href="/" className="flex-shrink-0 flex flex-col items-start">
              <span className="text-xl font-bold italic">Flipkart</span>
              <span className="text-xs italic flex items-center">
                Explore <span className="text-yellow-400 mx-1">Plus</span>
                <img
                  src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png"
                  alt="Flipkart Plus"
                  className="w-3 h-3"
                />
              </span>
            </a>
            <div className="hidden md:block ml-6 flex-1 max-w-2xl">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  className="w-full bg-white text-gray-800 pl-4 pr-10 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                  placeholder="Search for products, brands and more"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-0 top-0 h-full px-4 text-[#2874f0]">
                  <Search size={20} />
                </button>
              </form>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="/products" className="hover:text-gray-200 font-medium">
              Become a Seller
            </a>
            <div className="relative group">
              <button className="flex items-center hover:text-gray-200 font-medium">
                More
                <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Notification Preferences
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    24x7 Customer Care
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Advertise
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Download App
                  </a>
                </div>
              </div>
            </div>
            <a 
              href="#" 
              className="flex items-center hover:text-gray-200 font-medium"
              onClick={(e) => {
                e.preventDefault();
                handleCartClick();
              }}
            >
              <div className="relative">
                <ShoppingCart size={20} className="mr-1" />
                {cartCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-[#2874f0] text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </div>
                )}
              </div>
              Cart
            </a>
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img
                  src={
                    profilePicture ||
                    'https://via.placeholder.com/40?text=User'
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md transition-transform duration-300 ease-in-out hover:scale-110 animate-fadeIn"
                />
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 animate-fadeInSlideDown">
                  <div className="py-1">
                    <button
                      onClick={handleProfileClick}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={handleWishlistClick}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Wishlist
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <a 
              href="#" 
              className="mr-4 relative"
              onClick={(e) => {
                e.preventDefault();
                handleCartClick();
              }}
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-[#2874f0] text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </div>
              )}
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden px-4 pb-4">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            className="w-full bg-white text-gray-800 pl-4 pr-10 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
            placeholder="Search for products, brands and more"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-0 top-0 h-full px-4 text-[#2874f0]">
            <Search size={20} />
          </button>
        </form>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/profile"
              className="flex items-center gap-2 px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                handleProfileClick();
              }}
            >
              <img
                src={
                  profilePicture ||
                  'https://via.placeholder.com/32?text=User'
                }
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 animate-fadeIn"
              />
              Profile
            </a>
            <a
              href="/wishlist"
              className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                handleWishlistClick();
              }}
            >
              Wishlist
            </a>
            <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
              Become a Seller
            </a>
            <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
              More
            </a>
            <a
              href="/cart"
              className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                handleCartClick();
              }}
            >
              Cart
            </a>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;