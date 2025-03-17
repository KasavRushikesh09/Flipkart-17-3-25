// src/components/Footer.tsx
import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      console.log('Subscribed with email:', email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000); // Hide success message after 3 seconds
    } else {
      alert('Please enter a valid email address.');
    }
  };

  // Trigger animation on mount
  useEffect(() => {
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach((section, index) => {
      section.classList.add('animate-fadeInSlideUp');
      section.style.animationDelay = `${index * 0.2}s`; // Staggered animation
    });
  }, []);

  return (
    <footer className="bg-[#2874f0] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="footer-section">
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-300">
              Flipkart is India's leading e-commerce platform offering a wide range of products at unbeatable prices. Shop with us for the best deals!
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Products', 'Cart', 'Wishlist', 'Profile'].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`}
                    className="text-gray-300 hover:text-white hover:underline transition-all duration-300 transform hover:scale-105"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="footer-section">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center gap-2">
                <Phone size={16} /> +91-123-456-7890
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} /> support@flipkartclone.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} /> 123 Flipkart Towers, Bangalore, India
              </p>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="footer-section">
            <h3 className="text-xl font-bold mb-4">Subscribe</h3>
            <p className="text-gray-300 mb-4">Get the latest offers in your inbox!</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 rounded-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#fb641b] w-full sm:w-auto"
                required
              />
              <button
                type="submit"
                className="bg-[#fb641b] text-white px-4 py-2 rounded-sm hover:bg-[#f4511e] transition-all duration-300 transform hover:scale-105 animate-bounce"
              >
                Subscribe
              </button>
            </form>
            {isSubscribed && (
              <p className="text-green-300 mt-2 animate-fadeIn">Subscribed successfully!</p>
            )}
            <div className="mt-4 flex space-x-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-125"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Flipkart Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;