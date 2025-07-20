import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
import { SyncLoader } from 'react-spinners';

const RestaurantProfile = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    image: '',
    role: 'restaurant',
    email: '',
    address: '',
    contact: '',
    joinDate: ''
  });

  useEffect(() => {
    // Simulate fetching restaurant profile data
    const timer = setTimeout(() => {
      setProfile({
        name: user?.displayName || 'Restaurant Name',
        image: user?.photoURL || 'https://via.placeholder.com/150',
        role: 'restaurant',
        email: user?.email || 'restaurant@example.com',
        address: '123 Food Street, Dhaka',
        contact: '+880123456789',
        joinDate: 'July 2025'
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <SyncLoader />
          <p className="mt-4 text-lg text-gray-600">Loading your restaurant profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
          Restaurant Profile
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6">
          {/* Logo/Image */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={profile.image}
                alt="Restaurant Logo"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Restaurant Name</label>
              <p className="px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                {profile.name}
              </p>
            </div>

            {/* Role */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Role</label>
              <p className="px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 rounded-lg border border-orange-200 capitalize">
                {profile.role}
              </p>
            </div>
          </div>
        </div>

        {/* Additional info */}
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

export default RestaurantProfile;
