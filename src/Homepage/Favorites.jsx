import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../Authentication/AuthContext';

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounts

    const fetchFavorites = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        setError(null);
        const res = await axios.get(`http://localhost:3000/favorites/${user.email}`);
        const favoriteEntries = res.data;

        if (favoriteEntries.length === 0) {
          if (isMounted) {
            setFavorites([]);
            setLoading(false);
          }
          return;
        }

        // Consider creating a backend endpoint that returns detailed favorites
        // to avoid multiple API calls
        const detailedFavorites = await Promise.all(
          favoriteEntries.map(async (fav) => {
            try {
              const donationRes = await axios.get(`/donations/${fav.donationId}`);
              return { ...donationRes.data, favoriteId: fav._id };
            } catch (err) {
              console.error(`Error fetching donation ${fav.donationId}:`, err);
              return null; // Skip this favorite if donation doesn't exist
            }
          })
        );

        const validFavorites = detailedFavorites.filter(fav => fav !== null);

        if (isMounted) {
          setFavorites(validFavorites);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching favorites:', err);
        if (isMounted) {
          setError('Failed to load favorites. Please try again.');
          setLoading(false);
        }
      }
    };

    fetchFavorites();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [user?.email]);

  const handleRemove = async (donationId) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Remove from favorites?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, remove it!'
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`/favorites/${user.email}/${donationId}`);
      
      // Update state optimistically
      setFavorites(favorites.filter(fav => fav._id !== donationId));
      
      Swal.fire('Removed!', 'Donation removed from favorites.', 'success');
    } catch (err) {
      console.error('Error removing favorite:', err);
      Swal.fire('Error', 'Failed to remove favorite. Please try again.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <span className="loading loading-spinner text-green-600 loading-lg"></span>
        <p className="mt-2 text-gray-600">Loading your favorites...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <p>You haven't saved any favorite donations yet.</p>
        <Link 
          to="/AllDonation" 
          className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Browse Donations
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 ">
      <h1 className="text-2xl font-bold text-green-700 mb-6">My Favorite Donations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favorites.map((donation) => (
          <div
            key={donation._id}
            className="bg-cyan-50 rounded-xl border-2 border-blue-400 shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col md:flex-row gap-4"
          >
            <img
              src={donation.image}
              alt={donation.title}
              className="w-full md:w-48 h-36 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg'; // Fallback image
              }}
            />
            <div className="flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-xl font-semibold text-green-700">{donation.title}</h2>
                <p className="text-sm text-gray-500">{donation.restaurant_name} - {donation.location}</p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Status:</span> 
                  <span className={`ml-1 px-2 py-1 rounded text-xs ${
                    donation.status === 'available' ? 'bg-green-100 text-green-800' : 
                    donation.status === 'claimed' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {donation.status}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-medium">Quantity:</span> {donation.quantity_kg} kg
                </p>
              </div>

              <div className="mt-3 flex gap-2">
                <Link
                  to={`/donations/${donation._id}`}
                  className="px-3 py-1 btn bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
                >
                  Details
                </Link>
                <button
                  onClick={() => handleRemove(donation._id)}
                  className="px-3 py-1 btn bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;