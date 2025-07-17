import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
import Swal from 'sweetalert2';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { SyncLoader } from 'react-spinners';

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyReviews = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/my-reviews/${user.email}`);
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data = await res.json();
      setReviews(data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading my reviews:', err);
      setError('Failed to load your reviews.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReviews();
  }, [user?.email]);

  const handleDelete = async (reviewId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete your review.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete review');

      setReviews(prev => prev.filter(r => r._id !== reviewId));
      Swal.fire('Deleted!', 'Your review has been removed.', 'success');
    } catch (err) {
      console.error('Error deleting review:', err);
      Swal.fire('Error', 'Could not delete review.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
      <SyncLoader></SyncLoader>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <p>You haven’t submitted any reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4  ">
      <h1 className="text-2xl font-bold text-green-700 mb-6">My Reviews</h1>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review._id} className="p-4 bg-cyan-50 border-3 border-cyan-700 rounded-xl shadow-xl shadow-cyan-300  ">
            <div className="mb-2">
              <h2 className="text-xl font-semibold text-green-800">{review.donationTitle || 'Untitled Donation'}</h2>
              <p className="text-sm text-gray-600">{review.restaurant || 'Unknown Restaurant'}</p>
              <p className="text-xs text-green-700 mt-1">{new Date(review.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-1 text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) =>
                i < review.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
              )}
            </div>
            <p className="text-green-900 mb-4">{review.comment}</p>
            <button
              onClick={() => handleDelete(review._id)}
              className="px-4 btn py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
