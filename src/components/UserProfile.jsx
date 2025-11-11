import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Edit2, Mail, Phone, Building, Briefcase, Camera } from 'lucide-react';

const COLORS = {
  orange: '#f97316'
};

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [avatar, setAvatar] = useState('VA');
  const [profileData, setProfileData] = useState({
    name: 'Venugopal Achhe',
    empID: 'KRB-11112025',
    email: 'venugopal.achhe@kraubex.com',
    company: 'KraubexAI GmbH',
    role: 'Procurement Specialist',
    phone: '+49 176 73550445'
  });
  const [editData, setEditData] = useState({...profileData});
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    alert('Logout clicked');
  };

  const handleEditProfile = () => {
    setEditData({...profileData});
    setShowEditModal(true);
    setIsOpen(false);
  };

  const handleSaveProfile = () => {
    setProfileData({...editData});
    setShowEditModal(false);
    alert('Profile updated successfully!');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const AvatarDisplay = ({ size = 'w-10 h-10', textSize = 'text-sm' }) => (
    <div className={`${size} rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center text-white font-bold ${textSize} overflow-hidden`}>
      {typeof avatar === 'string' && avatar.startsWith('data:') ? (
        <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
      ) : (
        avatar
      )}
    </div>
  );

  return (
    <div className="p-8 flex justify-center">
      <div className="relative w-60" ref={dropdownRef}>
        {/* Profile Card - Clickable */}
        <div
          className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border cursor-pointer hover:shadow-md transition-shadow"
          style={{borderColor: COLORS.orange + '40'}}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-3">
            <AvatarDisplay />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">{profileData.name}</div>
              <div className="text-xs text-gray-500 truncate">{profileData.email}</div>
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl border shadow-lg overflow-hidden z-10">
            {/* Profile Info Section */}
            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-b">
              <div className="flex items-center gap-3 mb-3">
                <AvatarDisplay size="w-12 h-12" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{profileData.name}</div>
                  <div className="text-xs text-gray-600">{profileData.empID}</div>
                  <div className="text-xs text-gray-600">{profileData.role}</div>
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="truncate">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Building className="w-3.5 h-3.5" />
                  <span className="truncate">{profileData.company}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{profileData.phone}</span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button
                onClick={handleEditProfile}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
              >
                <Edit2 className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">Edit Profile</span>
              </button>

              <div className="border-t my-2"></div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-left group"
              >
                <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                <span className="text-sm text-gray-700 group-hover:text-red-600 font-medium">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-400 to-red-400 p-6 text-white">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <p className="text-sm text-orange-50 mt-1">Update your personal information</p>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <AvatarDisplay size="w-24 h-24" textSize="text-2xl" />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors shadow-lg"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Click camera to upload photo</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                    placeholder="your.email@company.com"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <Building className="w-4 h-4" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={editData.company}
                    onChange={(e) => setEditData({...editData, company: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <Briefcase className="w-4 h-4" />
                    Role / Position
                  </label>
                  <input
                    type="text"
                    value={editData.role}
                    onChange={(e) => setEditData({...editData, role: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                    placeholder="Your role or position"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t p-4 bg-gray-50 flex gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-lg hover:from-orange-500 hover:to-red-500 transition-all font-medium shadow-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}