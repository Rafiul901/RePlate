import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CharityDonation = ({ charityEmail }) => {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Fetch all pickups marked as "Picked Up"
  useEffect(() => {
    const fetchReceived = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/pickups/${charityEmail}`);
        const pickedUp = res.data.filter(d => d.status === 'Picked Up');
        setDonations(pickedUp);
      } catch (err) {
        console.error('Error fetching received donations:', err);
      }
    };
    fetchReceived();
  }, [charityEmail]);

  const openReviewModal = (donation) => {
    setSelectedDonation(donation);
    setReviewModalOpen(true);
    setRating(0);
    setComment('');
  };

  const submitReview = async () => {
    if (!rating || !comment) {
      return Swal.fire('Error', 'Please fill out rating and comment.', 'warning');
    }

    try {
      const reviewData = {
        userId: charityEmail,
        userName: charityEmail, // you may replace this with user's name
        rating,
        comment,
      };

      await axios.post(`http://localhost:3000/donations/${selectedDonation._id}/reviews`, reviewData);

      Swal.fire('Success', 'Review submitted!', 'success');
      setReviewModalOpen(false);
    } catch (err) {
      console.error('Error submitting review:', err);
      Swal.fire('Error', 'Failed to submit review.', 'error');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Received Donations</h2>

      {donations.length === 0 ? (
        <p>No donations picked up yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {donations.map((donation, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold">{donation.donationTitle}</h3>
              <p><strong>Restaurant:</strong> {donation.restaurantName}</p>
              <p><strong>Food Type:</strong> {donation.foodType}</p>
              <p><strong>Quantity:</strong> {donation.quantity} kg</p>
              <p><strong>Pickup Date:</strong> {new Date(donation.pickupTime).toLocaleString()}</p>
              <button
                className="mt-3 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => openReviewModal(donation)}
              >
                Review
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Add Review</h3>
            <p className="mb-2">For: <strong>{selectedDonation?.donationTitle}</strong></p>
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <textarea
              rows="4"
              className="w-full border p-2 rounded mb-3"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-1 bg-gray-400 text-white rounded"
                onClick={() => setReviewModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 bg-green-600 text-white rounded"
                onClick={submitReview}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharityDonation;
