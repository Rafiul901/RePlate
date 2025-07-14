import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

import {
  FaHeart, FaRegHeart, FaCalendarAlt, FaMapMarkerAlt,
  FaStar, FaRegStar, FaUsers
} from 'react-icons/fa';
import {
  MdLocalDining, MdOutlineRestaurant
} from 'react-icons/md';
import { AuthContext } from '../Authentication/AuthContext';

const DonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [donation, setDonation] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const statusColors = {
    'Available': 'from-lime-400 to-yellow-400',
    'Requested': 'from-amber-400 to-orange-400',
    'Picked Up': 'from-gray-400 to-gray-500'
  };

  const fetchDonation = async () => {
    try {
      const res = await fetch(`http://localhost:3000/donations/${id}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setDonation(data);
    } catch (err) {
      Swal.fire('Error', 'Could not load donation details.', 'error');
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`http://localhost:3000/donations/${id}/reviews`);
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviews([]);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    await Promise.all([fetchDonation(), fetchReviews()]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const handleFavoriteToggle = async () => {
    try {
      const userId = user?.uid || user?.id || "anonymous"; // Use actual user ID
      if (isFavorite) {
        await fetch(`http://localhost:3000/favorites/${userId}/${id}`, {
          method: 'DELETE'
        });
      } else {
        await fetch(`http://localhost:3000/favorites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, donationId: id })
        });
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      Swal.fire('Error', 'Failed to toggle favorite.', 'error');
    }
  };

  const confirmRequest = async () => {
    try {
      const requesterId = user?.uid || user?.id || "anonymous"; // Use actual user ID
      const pickupTime = new Date().toISOString(); // Replace with actual value if needed
      const res = await fetch(`http://localhost:3000/donations/${id}/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requesterId, pickupTime })
      });
      if (!res.ok) throw new Error();
      Swal.fire('Success!', 'Donation requested successfully.', 'success');
      setShowRequestModal(false);
      fetchDonation(); // Only need to fetch donation for status update
    } catch (err) {
      Swal.fire('Error', 'Could not request donation.', 'error');
    }
  };

  const submitReview = async () => {
    try {
      const userId = user?.uid || user?.id || "anonymous"; // Use actual user ID
      const userName = user?.displayName || user?.name || user?.email || "Anonymous"; // Get user name
      const res = await fetch(`http://localhost:3000/donations/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, userName, rating, comment: reviewText })
      });
      if (!res.ok) throw new Error();
      Swal.fire('Thank you!', 'Your review has been submitted.', 'success');
      setShowReviewModal(false);
      setRating(0);
      setReviewText('');
      fetchReviews(); // Fetch reviews to show the new one
    } catch (err) {
      Swal.fire('Error', 'Could not submit review.', 'error');
    }
  };

  const formatDate = (str) => {
    if (!str) return 'Not specified';
    return new Date(str).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Donation not found</h2>
        <button
          onClick={() => navigate('/donations')}
          className="mt-4 px-6 py-2 bg-gradient-to-br from-lime-500 to-amber-500 text-white rounded-lg font-bold"
        >
          Browse Donations
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex gap-2 text-sm text-green-800 mb-6">
        <button onClick={() => navigate('/')} className="hover:underline">Home</button> /
        <button onClick={() => navigate('/donations')} className="hover:underline">Donations</button> /
        <span>{donation.title}</span>
      </div>

      {/* Top Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2 relative">
          <img
            src={donation.image}
            alt={donation.title}
            className="rounded-xl shadow-xl border-2 border-cyan-300 w-full h-96 object-cover"
            onError={(e) => e.target.src = "https://via.placeholder.com/600x400"}
          />
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
          >
            {isFavorite ? <FaHeart className="text-red-500 text-xl" /> : <FaRegHeart className="text-gray-600 text-xl" />}
          </button>
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold text-green-900 bg-gradient-to-br ${statusColors[donation.status]}`}>
            {donation.status}
          </div>
        </div>

        <div className="lg:w-1/2 bg-gradient-to-br from-lime-50 to-amber-50 rounded-xl p-6 shadow-xl border-2 border-cyan-300">
          <h1 className="text-3xl font-bold text-green-900 mb-2">{donation.title}</h1>
          <p className="text-green-800 mb-4">{donation.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <InfoBlock icon={<MdOutlineRestaurant />} label="Restaurant" value={donation.restaurant} />
            <InfoBlock icon={<FaMapMarkerAlt />} label="Location" value={donation.location} />
            <InfoBlock icon={<MdLocalDining />} label="Quantity" value={`${donation.quantity_kg} kg (${donation.quantity_portions} meals)`} />
            <InfoBlock icon={<FaCalendarAlt />} label="Pickup Time" value={formatDate(donation.pickup_time)} />
          </div>

          {donation.charity && (
            <InfoBlock icon={<FaUsers />} label="Charity" value={donation.charity} />
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {donation.status === 'Available' && (
              <button
                onClick={() => setShowRequestModal(true)}
                className="flex-1 bg-gradient-to-br from-lime-500 to-amber-500 text-white font-bold py-3 px-4 rounded-lg shadow-md"
              >
                Request Donation
              </button>
            )}
            <button
              onClick={() => setShowReviewModal(true)}
              className="flex-1 border-2 border-cyan-300 text-cyan-700 bg-white font-bold py-3 px-4 rounded-lg shadow-md"
            >
              Leave Review
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8 bg-gradient-to-br from-lime-50 to-amber-50 rounded-xl p-6 shadow-xl border-2 border-cyan-300">
        <h2 className="text-xl font-bold text-green-900 mb-4">Reviews</h2>
        <div className="space-y-4">
          {reviews.length > 0 ? reviews.map((review, idx) => (
            <div key={idx} className="border-b border-green-200 pb-4 last:border-0">
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) =>
                    i < review.rating ? <FaStar key={i} className="text-yellow-400" /> : <FaRegStar key={i} className="text-yellow-400" />
                  )}
                </div>
                <span className="text-sm text-green-700/80">{formatDate(review.createdAt)}</span>
              </div>
              <p className="text-green-900">{review.comment}</p>
              <p className="text-sm text-green-700/80 mt-1">- {review.userName || 'Anonymous'}</p>
            </div>
          )) : (
            <p className="text-green-700 italic">No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <Modal title="Request Donation" onClose={() => setShowRequestModal(false)} onConfirm={confirmRequest}>
          <p className="mb-4 text-green-800">You're about to request <strong>{donation.quantity_portions}</strong> meals from <strong>{donation.restaurant}</strong>.</p>
        </Modal>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <Modal title="Leave a Review" onClose={() => setShowReviewModal(false)} onConfirm={submitReview} disableConfirm={rating === 0}>
          <div className="mb-4">
            <p className="text-sm font-medium text-green-900 mb-2">Rating</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className="text-2xl mr-1">
                  {star <= rating ? <FaStar className="text-yellow-400" /> : <FaRegStar className="text-yellow-400" />}
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            rows="4"
            placeholder="Share your experience..."
          ></textarea>
        </Modal>
      )}
    </div>
  );
};

const InfoBlock = ({ icon, label, value }) => (
  <div className="flex items-center bg-gradient-to-br from-lime-100 to-amber-100 p-3 rounded-lg shadow-inner">
    <div className="p-2 rounded-lg mr-3 bg-gradient-to-br from-lime-200 to-yellow-200 text-green-800 text-xl">{icon}</div>
    <div>
      <p className="text-xs font-medium text-green-900">{label}</p>
      <p className="text-green-900">{value}</p>
    </div>
  </div>
);

const Modal = ({ title, onClose, onConfirm, children, disableConfirm }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-gradient-to-br from-lime-50 to-amber-50 rounded-xl shadow-xl border-2 border-cyan-300 max-w-md w-full p-6">
      <h3 className="text-xl font-bold text-green-900 mb-4">{title}</h3>
      <div className="mb-6">{children}</div>
      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100">
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={disableConfirm}
          className={`px-4 py-2 rounded-lg font-bold ${disableConfirm ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-br from-lime-500 to-amber-500 text-white hover:shadow-lg'}`}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);

export default DonationDetails;