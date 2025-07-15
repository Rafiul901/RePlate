import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
import {  SyncLoader } from 'react-spinners';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    image: '',
    role: '',
    email: '',
    joinDate: ''
  });

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setProfile({
        name: user?.displayName || 'John Doe',
        image: user?.photoURL || 'https://via.placeholder.com/150',
        role: 'admin', // or 'user'
        email: user?.email || 'user@example.com',
        joinDate: 'January 2023'
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <SyncLoader/>
          <p className="mt-4 text-lg text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">
          My Profile
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6">
          {/* User Image */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={profile.image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Full Name</label>
              <p className="px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                {profile.name}
              </p>
            </div>

            {/* Role - only shown for non-regular users */}
            {profile.role !== 'user' && (
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Role</label>
                <p className="px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 rounded-lg border border-blue-200 capitalize">
                  {profile.role}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Additional profile information */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.email}</p>
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Member Since</label>
              <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.joinDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;