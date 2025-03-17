// src/components/ProfilePage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, LogOut } from 'lucide-react';

interface User {
  name: string;
  email: string;
  address: string;
  avatar?: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped';
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Bangalore, India',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<User>({ ...user });
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [orders] = useState<Order[]>([
    { id: 'ORD001', date: '2025-02-15', total: 2999, status: 'Delivered' },
    { id: 'ORD002', date: '2025-02-10', total: 1499, status: 'Shipped' },
    { id: 'ORD003', date: '2025-02-01', total: 4999, status: 'Processing' },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setEditForm(JSON.parse(storedUser));
    }
  }, []);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser = { ...editForm, avatar: previewAvatar || editForm.avatar };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    setPreviewAvatar(null); // Clear preview after saving
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    const sections = document.querySelectorAll('.profile-section');
    sections.forEach((section, index) => {
      section.classList.add('animate-fadeInSlideUp');
      section.style.animationDelay = `${index * 0.2}s`;
    });
  }, []);

  const openFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#2874f0] to-[#1e5bb5] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg animate-scaleIn"
          />
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <p className="text-lg mt-2">{user.email}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <div className="profile-section bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center justify-between">
                Profile Details
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-[#2874f0] hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Edit size={20} />
                </button>
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 font-medium">Name:</p>
                  <p className="text-gray-800">{user.name}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Email:</p>
                  <p className="text-gray-800">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Address:</p>
                  <p className="text-gray-800">{user.address}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          </div>

          {/* Order History Card */}
          <div className="lg:col-span-2">
            <div className="profile-section bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Order History</h2>
              {orders.length === 0 ? (
                <p className="text-gray-600">No orders found.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <p className="text-gray-800 font-medium">Order ID: {order.id}</p>
                          <p className="text-gray-600">Date: {order.date}</p>
                          <p className="text-gray-600">
                            Total: {order.total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                          </p>
                        </div>
                        <div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === 'Delivered'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'Shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay with Transparent Blur */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsEditing(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-md animate-modalFadeIn">
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              {/* Avatar Upload */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Profile Image</label>
                <div className="flex items-center gap-4">
                  <img
                    src={previewAvatar || user.avatar}
                    alt="Profile Preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={openFileInput}
                    className="bg-[#2874f0] text-white px-4 py-2 rounded-sm hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Change Image
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Address</label>
                <textarea
                  name="address"
                  value={editForm.address}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] transition-all duration-300"
                  rows={3}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#2874f0] text-white px-4 py-2 rounded-sm hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;