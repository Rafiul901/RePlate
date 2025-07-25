import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageDonation = () => {
  const [pendingDonations, setPendingDonations] = useState([]);

  useEffect(() => {
    fetchPendingDonations();
  }, []);

  const fetchPendingDonations = async () => {
    try {
      const res = await axios.get('https://replate-backend.vercel.app/admin/pending-donations');
      setPendingDonations(res.data);
    } catch (err) {
      console.error('Error fetching pending donations:', err);
    }
  };

  const handleVerify = async (donation) => {
    try {
      const verifiedDonation = {
        ...donation,
        status: 'Verified',
        verifiedAt: new Date()
      };

      // Move to main donations collection
     await axios.post("https://replate-backend.vercel.app/donations", donation); // Make sure this endpoint exists
      // Remove from pending collection
       await axios.delete(`https://replate-backend.vercel.app/pending-donations/${donation._id}`);

      Swal.fire('Verified', 'Donation has been verified and published.', 'success');
      fetchPendingDonations();
    } catch (err) {
      console.error('Error verifying donation:', err);
      Swal.fire('Error', 'Failed to verify donation.', 'error');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`https://replate-backend.vercel.app/pending-donations/${id}`, { status: 'Rejected' });
      Swal.fire('Rejected', 'Donation has been rejected.', 'info');
      fetchPendingDonations();
    } catch (err) {
      console.error('Error rejecting donation:', err);
      Swal.fire('Error', 'Failed to reject donation.', 'error');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Donations</h2>

      {pendingDonations.length === 0 ? (
        <p>No pending donations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow-md">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Food Type</th>
                <th className="py-2 px-4 border">Restaurant Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Quantity (kg)</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingDonations.map((donation) => (
                <tr key={donation._id} className="border-t">
                  <td className="py-2 px-4 border">{donation.title}</td>
                  <td className="py-2 px-4 border">{donation.foodType}</td>
                  <td className="py-2 px-4 border">{donation.restaurantName}</td>
                  <td className="py-2 px-4 border">{donation.restaurantEmail}</td>
                  <td className="py-2 px-4 border">{donation.quantity}</td>
                  <td className="py-2 px-4 border">{donation.status}</td>
                  <td className="py-2 px-4 border text-center">
                    {donation.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => handleVerify(donation)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => handleReject(donation._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-sm italic text-gray-500">No action needed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageDonation;
