import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../Authentication/AuthContext';


const CharityDonation = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchReceivedDonations = async () => {
      if (!user?.email) {
        console.log('❌ No user email available');
        setLoading(false);  
        return;
      }
      
      setLoading(true);
      try {
        console.log('🌐 Making API call for charity:', user.email);
        const res = await axios.get(`http://localhost:3000/charity/${user.email}/received-donations`);
        console.log('📡 Response status:', res.status);
        console.log('📦 Received donations:', res.data);
        console.log('📊 Donations count:', res.data?.length);
        setDonations(res.data || []);
      } catch (err) {
        console.error('❌ Full error object:', err);
        console.error('❌ Error response:', err.response?.data);
        console.error('❌ Error status:', err.response?.status);
        
        // Try the original endpoint as fallback
        console.log('🔄 Trying fallback endpoint...');
        try {
          const fallbackRes = await axios.get(`http://localhost:3000/pickups/${user.email}`);
          const pickedUp = fallbackRes.data.filter(d => d.status === 'Picked Up');
          console.log('📦 Fallback data:', pickedUp);
          setDonations(pickedUp);
        } catch (fallbackErr) {
          console.error('❌ Fallback also failed:', fallbackErr);
          Swal.fire('Error', 'Failed to load received donations.', 'error');
        }
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchReceivedDonations();
    }
  }, [user?.email, authLoading]);

  const openReviewModal = (donation) => {
    setSelectedDonation(donation);
    setReviewModalOpen(true);
    setRating(0);
    setComment('');
  };

  const closeReviewModal = () => {
    setReviewModalOpen(false);
    setSelectedDonation(null);
    setRating(0);
    setComment('');
  };

  const submitReview = async () => {
    if (!rating || rating < 1 || rating > 5) {
      return Swal.fire('Error', 'Please select a rating (1-5 stars).', 'warning');
    }

    if (!comment || comment.trim().length === 0) {
      return Swal.fire('Error', 'Please write a comment.', 'warning');
    }

    setSubmittingReview(true);

    try {
      const reviewData = {
        userId: user.email,
        userName: user.displayName || user.email,
        rating,
        comment: comment.trim(),
      };

      console.log('📝 Submitting review for donation:', selectedDonation.donationId);
      await axios.post(`http://localhost:3000/donations/${selectedDonation.donationId}/reviews`, reviewData);

      Swal.fire('Success', 'Review submitted successfully!', 'success');
      closeReviewModal();
    } catch (err) {
      console.error('❌ Error submitting review:', err);
      
      // Handle specific error messages
      if (err.response?.data?.message) {
        Swal.fire('Error', err.response.data.message, 'error');
      } else {
        Swal.fire('Error', 'Failed to submit review. Please try again.', 'error');
      }
    } finally {
      setSubmittingReview(false);
    }
  };

  // Show loading while auth is being determined
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading user data...</span>
      </div>
    );
  }

  // Show login prompt if no user
  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mt-20 text-gray-600">
          <h3 className="text-xl font-semibold mb-2">Authentication Required</h3>
          <p>Please log in to view your received donations.</p>
        </div>
      </div>
    );
  }

  // Show loading while fetching donations
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-green-900 mb-6">Received Donations</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading donations...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-900">Received Donations</h2>
        <div className="bg-blue-50 px-4 py-2 rounded-lg">
          
        </div>
      </div>

      {donations.length === 0 ? (
        <div className="text-center mt-20 text-gray-600">
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-2">No donations received yet</h3>
            <p className="text-gray-500">Donations you've picked up will appear here.</p>
            <p className="text-sm text-gray-400 mt-2">
              Once you confirm pickup of requested donations, they will be listed here for you to review.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {donations.length} received donation{donations.length !== 1 ? 's' : ''}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <div key={donation._id} className="bg-white border-2 shadow-lg rounded-xl p-6 border-cyan-500 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-cyan-900 mb-3">
                  {donation.donationTitle || 'Unknown Donation'}
                </h3>
                
                <div className="space-y-3 text-gray-700 mb-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Restaurant:</span>
                    <span className="text-right">{donation.restaurant || 'Unknown'}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-medium">Location:</span>
                    <span className="text-right text-sm">{donation.location || 'Not specified'}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-medium">Food Type:</span>
                    <span className="text-right">{donation.foodType || 'Not specified'}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-medium">Quantity:</span>
                    <span className="text-right font-semibold text-green-600">
                      {donation.donationQuantity ? `${donation.donationQuantity} kg` : 'Not specified'}
                    </span>
                  </div>
                  
                  <div className="border-t pt-2 mt-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Picked Up:</span>
                      <span className="text-right text-gray-600">
                        {donation.confirmedAt 
                          ? new Date(donation.confirmedAt).toLocaleString() 
                          : new Date(donation.pickupTime).toLocaleString()
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center justify-center"
                    onClick={() => openReviewModal(donation)}
                  >
                    <FaStar className="mr-2" />
                    Write Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Review Modal */}
      {reviewModalOpen && selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Write a Review</h3>
              
              <div className="mb-4 bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>Donation:</strong> {selectedDonation.donationTitle}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>From:</strong> {selectedDonation.restaurant}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Quantity:</strong> {selectedDonation.donationQuantity || 'N/A'} kg
                </p>
              </div>

              {/* Star Rating */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer text-2xl transition-colors ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-gray-600">
                    {rating === 1 && "Poor - Not satisfied"}
                    {rating === 2 && "Fair - Below expectations"} 
                    {rating === 3 && "Good - Met expectations"}
                    {rating === 4 && "Very Good - Above expectations"}
                    {rating === 5 && "Excellent - Outstanding"}
                  </p>
                )}
              </div>

              {/* Comment */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Share your experience with this donation... How was the quality? Was the pickup process smooth?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={submittingReview}
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {comment.length}/500 characters
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50"
                  onClick={closeReviewModal}
                  disabled={submittingReview}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  onClick={submitReview}
                  disabled={submittingReview || !rating || !comment.trim()}
                >
                  {submittingReview ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaStar className="mr-2" />
                      Submit Review
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharityDonation;