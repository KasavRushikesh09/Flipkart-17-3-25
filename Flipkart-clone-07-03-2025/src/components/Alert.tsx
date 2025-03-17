// src/components/Alert.tsx
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface AlertProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  // Automatically close the alert after 5 seconds
  useEffect(() => {
    if (isOpen && !isClosing) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen, isClosing]);

  const handleClose = () => {
    setIsClosing(true); // Trigger closing animation
  };

  // When closing animation finishes, call onClose to update parent state
  const handleAnimationEnd = () => {
    if (isClosing) {
      setIsClosing(false);
      onClose();
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      ></div>

      {/* Alert Box */}
      <div
        className={`relative bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-md md:max-w-lg ${
          isClosing ? 'animate-alertClose' : 'animate-alertBounceIn'
        }`}
        onAnimationEnd={handleAnimationEnd}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-all duration-300 transform hover:scale-110"
          aria-label="Close Alert"
        >
          <X size={24} />
        </button>
        <div className="flex items-center gap-4 animate-slideInContent">
          <div className="flex-shrink-0">
            <svg
              className="w-8 h-8 text-green-500 animate-pulseGlow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-gray-800 text-lg font-medium">{message}</p>
        </div>
        <div className="mt-4 flex justify-end animate-slideInContent">
          <button
            onClick={handleClose}
            className="bg-[#2874f0] text-white px-4 py-2 rounded-sm hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;