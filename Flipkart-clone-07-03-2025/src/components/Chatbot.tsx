// src/components/Chatbot.tsx
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { processUserInput } from '../data/chatbotLogic';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: 'Hello! I am your Flipkart Clone assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const { cart } = useCart();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: input }]);

    // Process user input and get bot response
    const botResponse = processUserInput(input, cart);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 500); // Simulate a slight delay for realism

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#2874f0] text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center animate-bounce"
          aria-label="Open Chatbot"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 md:w-96 h-96 bg-transparent backdrop-blur-md rounded-lg shadow-lg flex flex-col animate-fadeInSlideUp border border-gray-200">
          {/* Header */}
          <div className="bg-[#2874f0] text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Flipkart Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
              aria-label="Close Chatbot"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-[#2874f0] text-white'
                      : 'bg-white/90 text-gray-800 shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] bg-white/90 text-gray-800"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#fb641b] text-white px-4 py-2 rounded-sm hover:bg-[#f4511e] transition-all"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;